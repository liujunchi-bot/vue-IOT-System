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
    <el-form-item label="传感器数据" prop="data">
      <el-input v-model="dataForm.data" placeholder="传感器数据"></el-input>
    </el-form-item>
    <el-form-item label="终端发送时间" prop="date">
      <el-input v-model="dataForm.date" placeholder="终端发送时间"></el-input>
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
          dataId: 0,
          terminalId: '',
          sensorId: '',
          data: '',
          date: ''
        },
        dataRule: {
          terminalId: [
            { required: true, message: '终端id不能为空', trigger: 'blur' }
          ],
          sensorId: [
            { required: true, message: '该终端下对标此规则的传感器id不能为空', trigger: 'blur' }
          ],
          data: [
            { required: true, message: '传感器数据不能为空', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '终端发送时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.dataId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.dataId) {
            this.$http({
              url: this.$http.adornUrl(`/ter/terminaldata/info/${this.dataForm.dataId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.terminalId = data.terminalData.terminalId
                this.dataForm.sensorId = data.terminalData.sensorId
                this.dataForm.data = data.terminalData.data
                this.dataForm.date = data.terminalData.date
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
              url: this.$http.adornUrl(`/ter/terminaldata/${!this.dataForm.dataId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'dataId': this.dataForm.dataId || undefined,
                'terminalId': this.dataForm.terminalId,
                'sensorId': this.dataForm.sensorId,
                'data': this.dataForm.data,
                'date': this.dataForm.date
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
