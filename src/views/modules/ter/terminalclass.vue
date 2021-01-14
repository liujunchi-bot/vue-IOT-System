<template>
  <div class="mod-config">
    <el-dialog
      center
      style="font-size: 25px"
      title="查看传感器类下属列表"
      :visible.sync="dialogTableVisible"
      width="80%"
      height="50%"
    >
      <el-table
        show-overflow-tooltip
        fit
        border
        style="width: 100%; margin-left: 10px"
        :header-cell-style="{
          background: '#00BFFF',
          color: '#F5F5F5',
          fontSize: '19px',
          height: '50px',
        }"
        :row-style="{
          fontSize: '16px',
          color: '#1f2d3d',
        }"
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="gridData"
      >
        <el-table-column
          align="center"
          property="terminal_id"
          label="设备id"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_class_name"
          label="终端名字"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_model"
          label="设备型号"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_company"
          label="生产厂商"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_create_time"
          width="180"
          label="加入时间"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_long"
          width="100"
          label="经度"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          property="terminal_lot"
          label="纬度"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120"
          property="terminal_communication"
          label="通信方式"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150"
          property="terminal_ip"
          label="终端IP地址"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_state"
          width="120"
          label="终端状态"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_location_describe"
          label="地理位置描述"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminal_user_id"
          label="用户id"
        ></el-table-column>
      </el-table>
    </el-dialog>
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
          placeholder="终端类id"
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
          v-if="isAuth('ter:terminalclass:save')"
          type="primary"
          @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          v-if="isAuth('ter:terminalclass:delete')"
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
        prop="id"
        header-align="center"
        align="center"
        label="终端类id"
      >
      </el-table-column>
      <el-table-column
        prop="terminalClassName"
        header-align="center"
        align="center"
        label="终端类名"
      >
      </el-table-column>
      <el-table-column
        prop="terminalClassDescribe"
        header-align="center"
        align="center"
        width="600px"
        label="终端类描述"
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
            @click="querySubTerminal(scope.row.id)"
            >查看设备列表</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.id)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.id)"
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
import AddOrUpdate from './terminalclass-add-or-update'
export default {
  data () {
    return {
      tmpList: [],
      tmpData: [],
      sumData: [],
      gridData: [],
      loading2: true,
      dialogTableVisible: false,
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
    querySubTerminal (id) {
      this.dialogTableVisible = true
      this.$http({
        url: this.$http.adornUrl('/ter/terminalclass/terClassBindList'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {

          this.sumData = data.terClassBindList
          for (var i = 0; i < this.sumData.length; i++) {
            if (this.sumData[i]['terminal_class_id'] == id) {
              this.tmpData.push(this.sumData[i])
            }
          }
          this.gridData = this.tmpData
          this.tmpData = []
          console.log('gridData')
          console.log(this.gridData)

        }


      })
      this.loading2 = false
    },
    searchKey () {
      console.log('search')
      this.dataListLoading = true
      let data = []
      if (this.dataForm.key == '') {
        this.getDataList()
      }
      else {
        for (var i = 0; i < this.tmpList.length; i++) {
          if (this.dataForm.key == this.tmpList[i]['id'] || this.dataForm.key == this.tmpList[i]['terminalClassName']) {
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
        url: this.$http.adornUrl('/ter/terminalclass/list'),
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
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/ter/terminalclass/delete'),
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