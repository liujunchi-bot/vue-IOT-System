<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="终端id" prop="terminalId">
      <el-input v-model="dataForm.terminalId" placeholder="终端id"></el-input>
    </el-form-item>
    <el-form-item label="该终端下对标此规则的传感器id" prop="sensorId">
      <el-input v-model="dataForm.sensorId" placeholder="该终端下对标此规则的传感器id"></el-input>
    </el-form-item>
    <el-form-item label="报警下限" prop="alarmLowLimit">
      <el-input v-model="dataForm.alarmLowLimit" placeholder="报警下限"></el-input>
    </el-form-item>
    <el-form-item label="报警数值上限（必须在测量范围内）" prop="alarmHighLimit">
      <el-input v-model="dataForm.alarmHighLimit" placeholder="报警数值上限（必须在测量范围内）"></el-input>
    </el-form-item>
    <el-form-item label="最近一次更新该报警规则的时间" prop="logUpdateTime">
      <el-input v-model="dataForm.logUpdateTime" placeholder="最近一次更新该报警规则的时间"></el-input>
    </el-form-item>
    <el-form-item label="报警规则描述" prop="logDescribe">
      <el-input v-model="dataForm.logDescribe" placeholder="报警规则描述"></el-input>
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
          logId: 0,
          terminalId: '',
          sensorId: '',
          alarmLowLimit: '',
          alarmHighLimit: '',
          logUpdateTime: '',
          logDescribe: '',
          sensorSaveTable: ''
        },
        dataRule: {
          terminalId: [
            { required: true, message: '终端id不能为空', trigger: 'blur' }
          ],
          sensorId: [
            { required: true, message: '该终端下对标此规则的传感器id不能为空', trigger: 'blur' }
          ],
          alarmLowLimit: [
            { required: true, message: '报警下限不能为空', trigger: 'blur' }
          ],
          alarmHighLimit: [
            { required: true, message: '报警数值上限（必须在测量范围内）不能为空', trigger: 'blur' }
          ],
          logUpdateTime: [
            { required: true, message: '最近一次更新该报警规则的时间不能为空', trigger: 'blur' }
          ],
          logDescribe: [
            { required: true, message: '报警规则描述不能为空', trigger: 'blur' }
          ],
          sensorSaveTable: [
            { required: true, message: '数据存储表名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.logId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.logId) {
            this.$http({
              url: this.$http.adornUrl(`/ala/alarmrule/info/${this.dataForm.logId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.terminalId = data.alarmRule.terminalId
                this.dataForm.sensorId = data.alarmRule.sensorId
                this.dataForm.alarmLowLimit = data.alarmRule.alarmLowLimit
                this.dataForm.alarmHighLimit = data.alarmRule.alarmHighLimit
                this.dataForm.logUpdateTime = data.alarmRule.logUpdateTime
                this.dataForm.logDescribe = data.alarmRule.logDescribe
                this.dataForm.sensorSaveTable = data.alarmRule.sensorSaveTable
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
              url: this.$http.adornUrl(`/ala/alarmrule/${!this.dataForm.logId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'logId': this.dataForm.logId || undefined,
                'terminalId': this.dataForm.terminalId,
                'sensorId': this.dataForm.sensorId,
                'alarmLowLimit': this.dataForm.alarmLowLimit,
                'alarmHighLimit': this.dataForm.alarmHighLimit,
                'logUpdateTime': this.dataForm.logUpdateTime,
                'logDescribe': this.dataForm.logDescribe,
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
