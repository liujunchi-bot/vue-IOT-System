<template>
  <div class="mod-config">
    <el-form
      style="margin-left: 30px"
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-input
          v-model="dataForm.key"
          placeholder="参数名"
          clearable
          style="font-size: 18px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          round
          type="info"
          style="font-size: 18px"
          @click="getDataList()"
          >查询</el-button
        >
        <el-button
          v-if="isAuth('api:attribute:save')"
          type="primary"
          round
          style="font-size: 18px"
          @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          v-if="isAuth('api:attribute:delete')"
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
      :data="dataList"
      border
      class="tables"
      v-loading="dataListLoading"
      style="width: 95%; margin-left: 30px"
      @selection-change="selectionChangeHandle"
      :header-cell-style="{
        background: '#00BFFF',
        color: '#F5F5F5',
        fontSize: '19px',
      }"
      :row-style="{
        fontSize: '16px',
        color: '#1f2d3d',
      }"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
        class="select"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="100"
        label="参数总id"
      >
      </el-table-column>
      <el-table-column
        prop="apiId"
        header-align="center"
        align="center"
        width="127"
        label="apiid"
      >
      </el-table-column>
      <el-table-column
        prop="apiParam"
        header-align="center"
        align="center"
        label="请求参数"
      >
      </el-table-column>
      <el-table-column
        prop="need"
        header-align="center"
        align="center"
        label="必选"
      >
      </el-table-column>
      <el-table-column
        prop="paramType"
        header-align="center"
        align="center"
        label="参数类型"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="说明"
      >
      </el-table-column>
      <el-table-column
        prop="paramRemark"
        header-align="center"
        align="center"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作"
      >
        <template slot-scope="scope" width>
          <el-button type="text" @click="addOrUpdateHandle(scope.row.id)"
            >修改</el-button
          >
          <el-button type="text" @click="deleteHandle(scope.row.id)"
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
import AddOrUpdate from './attribute-add-or-update'
export default {
  data () {
    return {
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
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/api/attribute/list'),
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
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/api/attribute/delete'),
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
<style>
* {
  font-family: STHeiti;
  /* font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
   STHeiti, MingLiu; */
}
</style>
