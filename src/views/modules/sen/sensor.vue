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
          v-model="dataForm.key"
          placeholder="请输入传感器id"
          clearable
          style="font-size: 18px; width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button round type="info" style="font-size: 18px" @click="searchKey"
          >查询</el-button
        >
        <el-button
          v-if="isAuth('sen:sensor:save')"
          type="primary"
          round
          style="font-size: 18px"
          @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          v-if="isAuth('sen:sensor:delete')"
          type="danger"
          round
          style="font-size: 18px"
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
        prop="sensorId"
        header-align="center"
        align="center"
        label="id"
      >
      </el-table-column>
      <el-table-column
        prop="sensorClassId"
        header-align="center"
        align="center"
        label="类id"
      >
      </el-table-column>
      <el-table-column
        prop="terminalId"
        header-align="center"
        align="center"
        width="120px"
        label="终端id"
      >
      </el-table-column>
      <el-table-column
        prop="sensorModel"
        header-align="center"
        align="center"
        label="型号"
      >
      </el-table-column>

      <el-table-column
        prop="sensorCompany"
        header-align="center"
        align="center"
        width="100px"
        label="生产厂商"
      >
      </el-table-column>
      <el-table-column
        prop="sensorUserId"
        header-align="center"
        align="center"
        width="120px"
        label="用户公司id"
      >
      </el-table-column>
      <el-table-column
        prop="sensorMeasureHigher"
        header-align="center"
        align="center"
        width="100px"
        label="测量上限"
      >
      </el-table-column>
      <el-table-column
        prop="sensorMeasureLower"
        header-align="center"
        align="center"
        width="100px"
        label="测量下限"
      >
      </el-table-column>
      <el-table-column
        prop="sensorCreateTime"
        header-align="center"
        align="center"
        width="100px"
        label="加入时间"
      >
      </el-table-column>
      <el-table-column
        prop="sensorLongitude"
        header-align="center"
        align="center"
        width="100px"
        label="所在经度"
      >
      </el-table-column>
      <el-table-column
        prop="sensorLatitude"
        header-align="center"
        align="center"
        width="100px"
        label="所在纬度"
      >
      </el-table-column>
      <el-table-column
        prop="sensorLocationDescribe"
        header-align="center"
        align="center"
        width="140px"
        label="地理位置描述"
      >
      </el-table-column>
      <el-table-column
        prop="sensorState"
        header-align="center"
        align="center"
        width="120px"
        label="状态(1/0)"
      >
      </el-table-column>
      <el-table-column
        prop="sensorCommit"
        header-align="center"
        align="center"
        width="100px"
        label="通信方式"
      >
      </el-table-column>
      <el-table-column
        prop="sensorRate"
        header-align="center"
        align="center"
        width="120px"
        label="采集频率（ms）"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="120"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.sensorId)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.sensorId)"
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
import AddOrUpdate from './sensor-add-or-update'
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
        this.$http({
          url: this.$http.adornUrl(`/sen/sensor/info/${this.dataForm.key}`),
          method: 'get',
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = [data.sensor]

          }
          this.dataListLoading = false
        })
      }


      this.dataListLoading = false
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/sen/sensor/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
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
        return item.sensorId
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sen/sensor/delete'),
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