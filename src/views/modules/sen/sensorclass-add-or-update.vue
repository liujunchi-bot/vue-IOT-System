<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="传感器类名" prop="sensorClassType">
      <el-input v-model="dataForm.sensorClassType" placeholder="传感器类名"></el-input>
    </el-form-item>
    <el-form-item label="测量数据类型id" prop="sensorAttributeId">
      <el-input v-model="dataForm.sensorAttributeId" placeholder="测量数据类型id"></el-input>
    </el-form-item>
    <el-form-item label="类描述" prop="sensorClassDescribe">
      <el-input v-model="dataForm.sensorClassDescribe" placeholder="类描述"></el-input>
    </el-form-item>
    <el-form-item label="数据存储表名" prop="sensorSaveTable">
      <el-input v-model="dataForm.sensorSaveTable" placeholder="数据存储表名"></el-input>
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
          sensorClassId: 0,
          sensorClassType: '',
          sensorAttributeId: '',
          sensorClassDescribe: '',
          sensorSaveTable: ''
        },
        dataRule: {
          sensorClassType: [
            { required: true, message: '传感器类名不能为空', trigger: 'blur' }
          ],
          sensorAttributeId: [
            { required: true, message: '测量数据类型id不能为空', trigger: 'blur' }
          ],
          sensorClassDescribe: [
            { required: true, message: '类描述不能为空', trigger: 'blur' }
          ],
          sensorSaveTable: [
            { required: true, message: '数据存储表名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.sensorClassId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.sensorClassId) {
            this.$http({
              url: this.$http.adornUrl(`/sen/sensorclass/info/${this.dataForm.sensorClassId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sensorClassType = data.sensorClass.sensorClassType
                this.dataForm.sensorAttributeId = data.sensorClass.sensorAttributeId
                this.dataForm.sensorClassDescribe = data.sensorClass.sensorClassDescribe
                this.dataForm.sensorSaveTable = data.sensorClass.sensorSaveTable
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
              url: this.$http.adornUrl(`/sen/sensorclass/${!this.dataForm.sensorClassId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'sensorClassId': this.dataForm.sensorClassId || undefined,
                'sensorClassType': this.dataForm.sensorClassType,
                'sensorAttributeId': this.dataForm.sensorAttributeId,
                'sensorClassDescribe': this.dataForm.sensorClassDescribe,
                'sensorSaveTable': this.dataForm.sensorSaveTable
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
