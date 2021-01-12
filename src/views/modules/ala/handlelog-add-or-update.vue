<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="被处理的报警id（外键）" prop="alarmId">
      <el-input v-model="dataForm.alarmId" placeholder="被处理的报警id（外键）"></el-input>
    </el-form-item>
    <el-form-item label="处置人" prop="handlePerson">
      <el-input v-model="dataForm.handlePerson" placeholder="处置人"></el-input>
    </el-form-item>
    <el-form-item label="处置时间" prop="handleTime">
      <el-input v-model="dataForm.handleTime" placeholder="处置时间"></el-input>
    </el-form-item>
    <el-form-item label="处置方法" prop="handleMethod">
      <el-input v-model="dataForm.handleMethod" placeholder="处置方法"></el-input>
    </el-form-item>
    <el-form-item label="处理结果描述" prop="handleResult">
      <el-input v-model="dataForm.handleResult" placeholder="处理结果描述"></el-input>
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
          handleId: 0,
          alarmId: '',
          handlePerson: '',
          handleTime: '',
          handleMethod: '',
          handleResult: ''
        },
        dataRule: {
          alarmId: [
            { required: true, message: '被处理的报警id（外键）不能为空', trigger: 'blur' }
          ],
          handlePerson: [
            { required: true, message: '处置人不能为空', trigger: 'blur' }
          ],
          handleTime: [
            { required: true, message: '处置时间不能为空', trigger: 'blur' }
          ],
          handleMethod: [
            { required: true, message: '处置方法不能为空', trigger: 'blur' }
          ],
          handleResult: [
            { required: true, message: '处理结果描述不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.handleId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.handleId) {
            this.$http({
              url: this.$http.adornUrl(`/ala/handlelog/info/${this.dataForm.handleId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.alarmId = data.handleLog.alarmId
                this.dataForm.handlePerson = data.handleLog.handlePerson
                this.dataForm.handleTime = data.handleLog.handleTime
                this.dataForm.handleMethod = data.handleLog.handleMethod
                this.dataForm.handleResult = data.handleLog.handleResult
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
              url: this.$http.adornUrl(`/ala/handlelog/${!this.dataForm.handleId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'handleId': this.dataForm.handleId || undefined,
                'alarmId': this.dataForm.alarmId,
                'handlePerson': this.dataForm.handlePerson,
                'handleTime': this.dataForm.handleTime,
                'handleMethod': this.dataForm.handleMethod,
                'handleResult': this.dataForm.handleResult
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
