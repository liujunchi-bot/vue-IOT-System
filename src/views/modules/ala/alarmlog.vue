<template>
  <div class="mod-config">
    <el-form
      style="margin-left: 10px"
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-input
          style="font-size: 18px"
          v-model="dataForm.key"
          placeholder="报警规则id"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button round type="info" style="font-size: 18px" @click="searchKey"
          >查询</el-button
        >
        <el-button
          round
          style="font-size: 18px"
          v-if="isAuth('ala:alarmlog:save')"
          type="primary"
          @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          round
          style="font-size: 18px"
          v-if="isAuth('ala:alarmlog:delete')"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      show-overflow-tooltip
      fit
      style="width: 100%; margin-left: 10px"
      :header-cell-style="{
        background: '#00BFFF',
        color: '#F5F5F5',
        fontSize: '19px',
      }"
      :row-style="{
        fontSize: '16px',
        color: '#1f2d3d',
      }"
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="logId"
        header-align="center"
        align="center"
        label="报警日志id"
      >
      </el-table-column>
      <el-table-column
        prop="alarmRuleId"
        header-align="center"
        align="center"
        label="触发的报警规则id"
      >
      </el-table-column>
      <el-table-column
        prop="alarmData"
        header-align="center"
        align="center"
        label="报警数据"
      >
      </el-table-column>
      <el-table-column
        prop="sensor_longitude"
        header-align="center"
        align="center"
        label="经度"
      ></el-table-column>
      <el-table-column
        prop="sensor_latitude"
        header-align="center"
        align="center"
        label="纬度"
      >
      </el-table-column>
      <el-table-column
        prop="sensor_location_describe"
        header-align="center"
        align="center"
        label="位置描述"
      >
      </el-table-column>
      <el-table-column
        prop="alarmTime"
        header-align="center"
        align="center"
        label="报警时间"
      >
      </el-table-column>
      <el-table-column
        prop="handled"
        header-align="center"
        align="center"
        label="是否已经处理(0/1 否/是)"
      >
      </el-table-column>
      <el-table-column
        prop="hangleLogId"
        header-align="center"
        align="center"
        label="处理日志id"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.logId)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.logId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './alarmlog-add-or-update'
export default {
  data () {
    return {
      tmpList: [],
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    searchKey () {
      console.log('search')
      this.dataListLoading = true
      let data = []
      if (this.dataForm.key == '') {
        this.getDataList()
      }
      else {
        for (var i = 0; i < this.tmpList.length; i++) {
          if (this.dataForm.key == this.tmpList[i]['alarmRuleId']) {
            data.push(this.tmpList[i])
          }
        }
        this.dataList = data
      }


      this.dataListLoading = false
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/ala/alarmlog/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.tmpList = this.dataList
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.logId
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/ala/alarmlog/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>
<style scoped>
* {
  font-family: STHeiti;
  /* font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
   STHeiti, MingLiu; */
}
</style>