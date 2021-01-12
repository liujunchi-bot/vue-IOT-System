<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="对应的apiid" prop="apiId">
      <el-input v-model="dataForm.apiId" placeholder="对应的apiid"></el-input>
    </el-form-item>
    <el-form-item label="api请求的参数" prop="apiAttribute">
      <el-input v-model="dataForm.apiAttribute" placeholder="api请求的参数"></el-input>
    </el-form-item>
    <el-form-item label="此参数是否必选[0-否；1-是]" prop="select">
      <el-input v-model="dataForm.select" placeholder="此参数是否必选[0-否；1-是]"></el-input>
    </el-form-item>
    <el-form-item label="此参数类型" prop="type">
      <el-input v-model="dataForm.type" placeholder="此参数类型"></el-input>
    </el-form-item>
    <el-form-item label="备注注释" prop="desc">
      <el-input v-model="dataForm.desc" placeholder="备注注释"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="beizhu">
      <el-input v-model="dataForm.beizhu" placeholder="备注"></el-input>
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
          apiId: '',
          apiAttribute: '',
          select: '',
          type: '',
          desc: '',
          beizhu: ''
        },
        dataRule: {
          apiId: [
            { required: true, message: '对应的apiid不能为空', trigger: 'blur' }
          ],
          apiAttribute: [
            { required: true, message: 'api请求的参数不能为空', trigger: 'blur' }
          ],
          select: [
            { required: true, message: '此参数是否必选[0-否；1-是]不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '此参数类型不能为空', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '备注注释不能为空', trigger: 'blur' }
          ],
          beizhu: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/api/attribute/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.apiId = data.attribute.apiId
                this.dataForm.apiAttribute = data.attribute.apiAttribute
                this.dataForm.select = data.attribute.select
                this.dataForm.type = data.attribute.type
                this.dataForm.desc = data.attribute.desc
                this.dataForm.beizhu = data.attribute.beizhu
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
              url: this.$http.adornUrl(`/api/attribute/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'apiId': this.dataForm.apiId,
                'apiAttribute': this.dataForm.apiAttribute,
                'select': this.dataForm.select,
                'type': this.dataForm.type,
                'desc': this.dataForm.desc,
                'beizhu': this.dataForm.beizhu
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
