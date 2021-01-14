<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="触发的报警规则id" prop="alarmRuleId">
        <el-input
          v-model="dataForm.alarmRuleId"
          placeholder="触发的报警规则id"
        ></el-input>
      </el-form-item>
      <el-form-item label="报警值下限" prop="minValue">
        <el-input
          v-model="dataForm.minValue"
          placeholder="报警值下限"
        ></el-input>
      </el-form-item>
      <el-form-item label="报警值最大值" prop="maxValue">
        <el-input
          v-model="dataForm.maxValue"
          placeholder="报警值最大值"
        ></el-input>
      </el-form-item>
      <el-form-item label="报警时间" prop="alarmTime">
        <el-input
          v-model="dataForm.alarmTime"
          placeholder="报警时间"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否已经处理(0/1 否/是)" prop="handled">
        <el-input
          v-model="dataForm.handled"
          placeholder="是否已经处理(0/1 否/是)"
        ></el-input>
      </el-form-item>
      <el-form-item label="处理日志id" prop="hangleLogId">
        <el-input
          v-model="dataForm.hangleLogId"
          placeholder="处理日志id"
        ></el-input>
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
        alarmRuleId: '',
        minValue: '',
        maxValue: '',
        alarmTime: '',
        handled: '',
        hangleLogId: ''
      },
      dataRule: {
        alarmRuleId: [
          { required: true, message: '触发的报警规则id不能为空', trigger: 'blur' }
        ],
        minValue: [
          { required: true, message: '报警值下限不能为空', trigger: 'blur' }
        ],
        maxValue: [
          { required: true, message: '报警值最大值不能为空', trigger: 'blur' }
        ],
        alarmTime: [
          { required: true, message: '报警时间不能为空', trigger: 'blur' }
        ],
        handled: [
          { required: true, message: '是否已经处理(0/1 否/是)不能为空', trigger: 'blur' }
        ],
        hangleLogId: [
          { required: true, message: '处理日志id不能为空', trigger: 'blur' }
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
            url: this.$http.adornUrl(`/ala/alarmlog/info/${this.dataForm.logId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.alarmRuleId = data.alarmLog.alarmRuleId
              this.dataForm.minValue = data.alarmLog.minValue
              this.dataForm.maxValue = data.alarmLog.maxValue
              this.dataForm.alarmTime = data.alarmLog.alarmTime
              this.dataForm.handled = data.alarmLog.handled
              this.dataForm.hangleLogId = data.alarmLog.hangleLogId
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      var time = new Date(this.dataForm.alarmTime).format("yyyy-MM-dd hh:mm:ss")
      console.log(time)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/ala/alarmlog/${!this.dataForm.logId ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'logId': this.dataForm.logId || undefined,
              'alarmRuleId': this.dataForm.alarmRuleId,
              'minValue': this.dataForm.minValue,
              'maxValue': this.dataForm.maxValue,
              'alarmTime': this.dataForm.alarmTime,
              'handled': this.dataForm.handled,
              'hangleLogId': this.dataForm.hangleLogId
            })
          }).then(({ data }) => {
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
