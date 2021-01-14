<template>
  <div class="mod-config">
    <el-dialog
      title="查询终端下属列表"
      center
      style="font-size: 25px"
      :visible.sync="dialogTableVisible"
      width="80%"
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
          property="sensor_id"
          label="传感器id"
          align="center"
          width="120"
        ></el-table-column>

        <el-table-column
          property="sensor_model"
          align="center"
          label="传感器型号"
          width="130"
        ></el-table-column>
        <el-table-column
          property="sensor_company"
          align="center"
          label="生产厂商"
          width="120"
        ></el-table-column>
        <el-table-column
          property="sensor_user_id"
          align="center"
          width="120"
          label="公司用户id"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120"
          property="sensor_measure_higher"
          label="测量上限"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120"
          property="sensor_measure_lower"
          label="测量下限"
        ></el-table-column>
        <el-table-column
          align="center"
          width="180"
          property="sensor_create_time"
          label="加入时间"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensor_longitude"
          label="经度"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensor_latitude"
          label="纬度"
        ></el-table-column>
        <el-table-column
          align="center"
          width="150px"
          property="sensor_location_describe"
          label="地理信息描述"
        ></el-table-column>
        <el-table-column
          width="140"
          align="center"
          property="sensor_state"
          label="传感器状态"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120"
          property="sensor_commit"
          label="通信方式"
        ></el-table-column>
        <el-table-column
          width="120"
          align="center"
          property="sensor_rate"
          label="采集频率"
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
          style="font-size: 18px; width: 300px"
          v-model="dataForm.key"
          placeholder="设备id"
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
          v-if="isAuth('ter:terminal:save')"
          type="primary"
          @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          round
          style="font-size: 18px"
          v-if="isAuth('ter:terminal:delete')"
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
        prop="terminalId"
        header-align="center"
        align="center"
        label="设备id"
      >
      </el-table-column>
      <el-table-column
        prop="terminalClassId"
        header-align="center"
        align="center"
        label="类id"
      >
      </el-table-column>
      <el-table-column
        prop="terminalModel"
        header-align="center"
        align="center"
        width="130px"
        label="终端型号"
      >
      </el-table-column>
      <el-table-column
        prop="terminalCompany"
        header-align="center"
        align="center"
        width="100px"
        label="终端产商"
      >
      </el-table-column>
      <el-table-column
        prop="terminalCreateTime"
        header-align="center"
        align="center"
        width="180px"
        label="加入时间"
      >
      </el-table-column>
      <el-table-column
        prop="terminalLong"
        header-align="center"
        align="center"
        width="100px"
        label="所处经度"
      >
      </el-table-column>
      <el-table-column
        prop="terminalLot"
        header-align="center"
        align="center"
        width="100px"
        label="所处纬度"
      >
      </el-table-column>
      <el-table-column
        prop="terminalCommunication"
        header-align="center"
        align="center"
        width="100px"
        label="通信方式"
      >
      </el-table-column>
      <el-table-column
        prop="terminalIp"
        header-align="center"
        align="center"
        label="终端ip地址"
        width="150px"
      >
      </el-table-column>
      <el-table-column
        prop="terminalState"
        header-align="center"
        align="center"
        width="100px"
        label="终端状态"
      >
      </el-table-column>
      <el-table-column
        prop="terminalLocationDescribe"
        header-align="center"
        align="center"
        width="160px"
        label="地理位置描述"
      >
      </el-table-column>
      <el-table-column
        prop="terminalUserId"
        header-align="center"
        align="center"
        width="120px"
        label="用户公司id"
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
            @click="querySubsensor(scope.row.terminalId)"
            >查看下属传感器列表</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.terminalId)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.terminalId)"
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
import AddOrUpdate from './terminal-add-or-update'
export default {
  data () {
    return {
      tmpList: [],
      loading2: true,
      tmpData: [],
      sumData: [],
      gridData: [
      ],
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
    searchKey () {
      console.log('search')
      this.dataListLoading = true
      let data = []
      if (this.dataForm.key == '') {
        this.getDataList()
      }
      else {
        for (var i = 0; i < this.tmpList.length; i++) {
          if (this.dataForm.key == this.tmpList[i]['terminalState'] || this.dataForm.key == this.tmpList[i]['terminalId'] || this.dataForm.key == this.tmpList[i]['terminalCompany'] || this.dataForm.key == this.tmpList[i]['terminalCommunication']) {
            data.push(this.tmpList[i])
          }
        }
        this.dataList = data
      }


      this.dataListLoading = false
    },
    querySubsensor (id) {
      this.dialogTableVisible = true
      this.$http({
        url: this.$http.adornUrl('/ter/terminal/terSenBindList'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.sumData = data.terSenBindList
          console.log(this.sumData)
          for (var i = 0; i < this.sumData.length; i++) {
            if (this.sumData[i]['terminal_id'] == id) {
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
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/ter/terminal/list'),
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
        return item.terminalId
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/ter/terminal/delete'),
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