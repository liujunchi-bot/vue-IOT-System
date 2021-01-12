<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="传感器id" prop="snesorId">
      <el-input v-model="dataForm.snesorId" placeholder="传感器id"></el-input>
    </el-form-item>
    <el-form-item label="传感器数据" prop="sensorData">
      <el-input v-model="dataForm.sensorData" placeholder="传感器数据"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="date">
      <el-input v-model="dataForm.date" placeholder="时间"></el-input>
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
          snesorId: '',
          sensorData: '',
          date: ''
        },
        dataRule: {
          snesorId: [
            { required: true, message: '传感器id不能为空', trigger: 'blur' }
          ],
          sensorData: [
            { required: true, message: '传感器数据不能为空', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/sen/datawxqjj/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.snesorId = data.dataWxqjj.snesorId
                this.dataForm.sensorData = data.dataWxqjj.sensorData
                this.dataForm.date = data.dataWxqjj.date
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
              url: this.$http.adornUrl(`/sen/datawxqjj/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'snesorId': this.dataForm.snesorId,
                'sensorData': this.dataForm.sensorData,
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
