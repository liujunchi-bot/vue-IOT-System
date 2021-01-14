<template>
  <div class="mod-config">
    <el-dialog
      center
      style="font-size: 25px"
      title="查看传感器列表"
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
          height: '60px',
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
          property="sensorId"
          label="id"
          width="80px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="terminalId"
          label="设备id"
          width="120px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorModel"
          label="传感器型号"
          width="120px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorCompany"
          label="生产厂商"
          width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorUserId"
          label="公司用户id"
          width="140px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorMeasureHigher"
          label="测量上限"
          width="120px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorMeasureLower"
          label="测量下限"
          width="120px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorCreateTime"
          label="加入时间"
          width="180px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorLongitude"
          label="经度"
          width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorLatitude"
          label="纬度"
          width="100px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorLocationDescribe"
          label="地理信息描述"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorState"
          label="传感器状态"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorCommit"
          label="通信方式"
          width="120px"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sensorRate"
          label="采集频率"
          width="120px"
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
          v-model="dataForm.key"
          placeholder="根据传感器类id查询"
          clearable
          style="font-size: 18px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button round type="info" style="font-size: 18px" @click="searchKey"
          >查询</el-button
        >
        <el-button
          v-if="isAuth('sen:sensorclass:save')"
          type="primary"
          round
          style="font-size: 18px"
          @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          v-if="isAuth('sen:sensorclass:delete')"
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
        prop="sensorClassId"
        header-align="center"
        align="center"
        label="类id"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="sensorClassType"
        header-align="center"
        align="center"
        width="120px"
        label="传感器类名"
      >
      </el-table-column>
      <el-table-column
        prop="sensorAttributeId"
        header-align="center"
        align="center"
        width="200px"
        label="测量数据类型id"
      >
      </el-table-column>
      <el-table-column
        prop="sensorClassDescribe"
        header-align="center"
        align="center"
        label="类描述"
      >
      </el-table-column>
      <el-table-column
        prop="sensorSaveTable"
        header-align="center"
        align="center"
        label="数据存储表名"
        width="150px"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="querySubsensor(scope.row.sensorClassId)"
            >查看传感器列表</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.sensorClassId)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.sensorClassId)"
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
import AddOrUpdate from './sensorclass-add-or-update'
export default {
  data () {
    return {
      loading2: true,
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
    querySubsensor (id) {
      this.dialogTableVisible = true
      this.$http({
        url: this.$http.adornUrl('/sen/sensor/senclassbindlist'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log('sensorclass')
          console.log(data.allClassBindResult)
          this.sumData = data.allClassBindResult
          console.log(this.sumData)
          for (var i = 0; i < this.sumData.length; i++) {
            if (this.sumData[i]['sensor_class_id'] == id) {
              this.gridData = this.sumData[i]['sensorListInfo']
            }
          }
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
        this.$http({
          url: this.$http.adornUrl(`/sen/sensorclass/info/${this.dataForm.key}`),
          method: 'get',
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = [data.sensorClass]

          }

        })
      }


      this.dataListLoading = false
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/sen/sensorclass/list'),
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
        return item.sensorClassId
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sen/sensorclass/delete'),
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