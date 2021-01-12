<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="API名" prop="apiName">
      <el-input v-model="dataForm.apiName" placeholder="API名"></el-input>
    </el-form-item>
    <el-form-item label="API实现的功能详细说明" prop="apiFunction">
      <el-input v-model="dataForm.apiFunction" placeholder="API实现的功能详细说明"></el-input>
    </el-form-item>
    <el-form-item label="API的访问URL地址" prop="apiUrl">
      <el-input v-model="dataForm.apiUrl" placeholder="API的访问URL地址"></el-input>
    </el-form-item>
    <el-form-item label="访问举例" prop="apiExample">
      <el-input v-model="dataForm.apiExample" placeholder="访问举例"></el-input>
    </el-form-item>
    <el-form-item label="响应数据格式" prop="apiResponse">
      <el-input v-model="dataForm.apiResponse" placeholder="响应数据格式"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          apiName: '',
          apiFunction: '',
          apiUrl: '',
          apiExample: '',
          apiResponse: ''
        },
        dataRule: {
          apiName: [
            { required: true, message: 'API名不能为空', trigger: 'blur' }
          ],
          apiFunction: [
            { required: true, message: 'API实现的功能详细说明不能为空', trigger: 'blur' }
          ],
          apiUrl: [
            { required: true, message: 'API的访问URL地址不能为空', trigger: 'blur' }
          ],
          apiExample: [
            { required: true, message: '访问举例不能为空', trigger: 'blur' }
          ],
          apiResponse: [
            { required: true, message: '响应数据格式不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/api/info/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.apiName = data.info.apiName
                this.dataForm.apiFunction = data.info.apiFunction
                this.dataForm.apiUrl = data.info.apiUrl
                this.dataForm.apiExample = data.info.apiExample
                this.dataForm.apiResponse = data.info.apiResponse
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/api/info/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'apiName': this.dataForm.apiName,
                'apiFunction': this.dataForm.apiFunction,
                'apiUrl': this.dataForm.apiUrl,
                'apiExample': this.dataForm.apiExample,
                'apiResponse': this.dataForm.apiResponse
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
