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
      <el-form-item label="传感器类id" prop="sensorClassId">
        <el-input
          v-model="dataForm.sensorClassId"
          placeholder="所属传感器类id"
        ></el-input>
      </el-form-item>
      <el-form-item label="绑定终端id" prop="terminalId">
        <el-input v-model="dataForm.terminalId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="传感器型号" prop="sensorModel">
        <el-input
          v-model="dataForm.sensorModel"
          placeholder="传感器型号"
        ></el-input>
      </el-form-item>
      <el-form-item label="生产厂商" prop="sensorCompany">
        <el-input
          v-model="dataForm.sensorCompany"
          placeholder="生产厂商"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司id" prop="sensorUserId">
        <el-input
          v-model="dataForm.sensorUserId"
          placeholder="使用该传感器的公司id"
        ></el-input>
      </el-form-item>
      <el-form-item label="测量上限" prop="sensorMeasureHigher">
        <el-input
          v-model="dataForm.sensorMeasureHigher"
          placeholder="测量上限"
        ></el-input>
      </el-form-item>
      <el-form-item label="测量下限" prop="sensorMeasureLower">
        <el-input
          v-model="dataForm.sensorMeasureLower"
          placeholder="测量下限"
        ></el-input>
      </el-form-item>
      <el-form-item label="传感器加入时间" prop="sensorCreateTime">
        <!-- <el-input
          v-model="dataForm.sensorCreateTime"
          placeholder="传感器加入时间"
        ></el-input> -->
        <el-date-picker
          v-model="dataForm.sensorCreateTime"
          type="datetime"
          placeholder="选择加入系统的时间"
          align="right"
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所在经度" prop="sensorLongitude">
        <el-input
          v-model="dataForm.sensorLongitude"
          placeholder="所在经度"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在纬度" prop="sensorLatitude">
        <el-input
          v-model="dataForm.sensorLatitude"
          placeholder="所在纬度"
        ></el-input>
      </el-form-item>
      <el-form-item label="地理位置描述" prop="sensorLocationDescribe">
        <el-input
          v-model="dataForm.sensorLocationDescribe"
          placeholder="传感器所在地理位置描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="传感器状态(1：开启，0：关闭）" prop="sensorState">
        <!-- <el-input
          v-model="dataForm.sensorState"
          placeholder="传感器状态(1：开启，0：关闭）"
        ></el-input> -->
        <el-select
          v-model="dataForm.sensorState"
          placeholder="请选择传感器状态"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通信方式" prop="sensorCommit">
        <!-- <el-input
          v-model="dataForm.sensorCommit"
          placeholder="通信方式（单工、半双工、全双工）"
        ></el-input> -->
        <el-select v-model="dataForm.sensorCommit" placeholder="请选择通信方式">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集频率（以毫秒为单位）" prop="sensorRate">
        <el-input
          v-model="dataForm.sensorRate"
          placeholder="采集频率（以毫秒为单位）"
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
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      options1: [{
        value: '单工',
        label: '单工'
      }, {
        value: '半双工',
        label: '半双工'
      }, {
        value: '全双工',
        label: '全双工'
      }
      ],
      options: [{
        value: '0',
        label: '关闭'
      }, {
        value: '1',
        label: '开启'
      }
      ],
      visible: false,
      dataForm: {
        sensorId: 0,
        sensorClassId: '',
        terminalId: '',
        sensorModel: '',
        sensorCompany: '',
        sensorUserId: '',
        sensorMeasureHigher: '',
        sensorMeasureLower: '',
        sensorCreateTime: '',
        sensorLongitude: '',
        sensorLatitude: '',
        sensorLocationDescribe: '',
        sensorState: '',
        sensorCommit: '',
        sensorRate: ''
      },
      dataRule: {
        sensorClassId: [
          { required: true, message: '所属传感器类id不能为空', trigger: 'blur' }
        ],
        terminalId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sensorModel: [
          { required: true, message: '传感器型号不能为空', trigger: 'blur' }
        ],
        sensorCompany: [
          { required: true, message: '生产厂商不能为空', trigger: 'blur' }
        ],
        sensorUserId: [
          { required: true, message: '使用该传感器的公司id不能为空', trigger: 'blur' }
        ],
        sensorMeasureHigher: [
          { required: true, message: '测量上限不能为空', trigger: 'blur' }
        ],
        sensorMeasureLower: [
          { required: true, message: '测量下限不能为空', trigger: 'blur' }
        ],
        sensorCreateTime: [
          { required: true, message: '传感器加入时间不能为空', trigger: 'blur' }
        ],
        sensorLongitude: [
          { required: true, message: '所在经度不能为空', trigger: 'blur' }
        ],
        sensorLatitude: [
          { required: true, message: '所在纬度不能为空', trigger: 'blur' }
        ],
        sensorLocationDescribe: [
          { required: true, message: '传感器所在地理位置描述不能为空', trigger: 'blur' }
        ],
        sensorState: [
          { required: true, message: '传感器状态(1：开启，0：关闭）不能为空', trigger: 'blur' }
        ],
        sensorCommit: [
          { required: true, message: '通信方式（单工、半双工、全双工）不能为空', trigger: 'blur' }
        ],
        sensorRate: [
          { required: true, message: '采集频率（以毫秒为单位）不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    init (id) {
      this.dataForm.sensorId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.sensorId) {
          this.$http({
            url: this.$http.adornUrl(`/sen/sensor/info/${this.dataForm.sensorId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.sensorClassId = data.sensor.sensorClassId
              this.dataForm.terminalId = data.sensor.terminalId
              this.dataForm.sensorModel = data.sensor.sensorModel
              this.dataForm.sensorCompany = data.sensor.sensorCompany
              this.dataForm.sensorUserId = data.sensor.sensorUserId
              this.dataForm.sensorMeasureHigher = data.sensor.sensorMeasureHigher
              this.dataForm.sensorMeasureLower = data.sensor.sensorMeasureLower
              this.dataForm.sensorCreateTime = data.sensor.sensorCreateTime
              this.dataForm.sensorLongitude = data.sensor.sensorLongitude
              this.dataForm.sensorLatitude = data.sensor.sensorLatitude
              this.dataForm.sensorLocationDescribe = data.sensor.sensorLocationDescribe
              this.dataForm.sensorState = data.sensor.sensorState
              this.dataForm.sensorCommit = data.sensor.sensorCommit
              this.dataForm.sensorRate = data.sensor.sensorRate
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      Date.prototype.pattern = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份         
          "d+": this.getDate(), //日         
          "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
          "H+": this.getHours(), //小时         
          "m+": this.getMinutes(), //分         
          "s+": this.getSeconds(), //秒         
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
          "S": this.getMilliseconds() //毫秒         
        };
        var week = {
          "0": "/u65e5",
          "1": "/u4e00",
          "2": "/u4e8c",
          "3": "/u4e09",
          "4": "/u56db",
          "5": "/u4e94",
          "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }
      console.log('test')
      var oldtime = new Date(this.dataForm.sensorCreateTime)
      var time = oldtime.pattern("yyyy-MM-dd hh:mm:ss")
      console.log(time)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/sen/sensor/${!this.dataForm.sensorId ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'sensorId': this.dataForm.sensorId || undefined,
              'sensorClassId': this.dataForm.sensorClassId,
              'terminalId': this.dataForm.terminalId,
              'sensorModel': this.dataForm.sensorModel,
              'sensorCompany': this.dataForm.sensorCompany,
              'sensorUserId': this.dataForm.sensorUserId,
              'sensorMeasureHigher': this.dataForm.sensorMeasureHigher,
              'sensorMeasureLower': this.dataForm.sensorMeasureLower,
              'sensorCreateTime': time,
              'sensorLongitude': this.dataForm.sensorLongitude,
              'sensorLatitude': this.dataForm.sensorLatitude,
              'sensorLocationDescribe': this.dataForm.sensorLocationDescribe,
              'sensorState': this.dataForm.sensorState,
              'sensorCommit': this.dataForm.sensorCommit,
              'sensorRate': this.dataForm.sensorRate
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
