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
      <el-form-item label="终端所属的类id" prop="terminalClassId">
        <el-input
          v-model="dataForm.terminalClassId"
          placeholder="终端所属的类id"
        ></el-input>
      </el-form-item>
      <el-form-item label="终端型号" prop="terminalModel">
        <el-input
          v-model="dataForm.terminalModel"
          placeholder="终端型号，命名规则 大写*2 + 小写*3 + 数字*5"
        ></el-input>
      </el-form-item>
      <el-form-item label="终端产商公司名" prop="terminalCompany">
        <el-input
          v-model="dataForm.terminalCompany"
          placeholder="终端产商公司名"
        ></el-input>
      </el-form-item>
      <el-form-item label="加入系统的时间" prop="terminalCreateTime">
        <!-- <el-input v-model="dataForm.terminalCreateTime" placeholder="加入系统的时间"></el-input> -->
        <el-date-picker
          v-model="dataForm.terminalCreateTime"
          type="datetime"
          placeholder="选择加入系统的时间"
          align="right"
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所处经度" prop="terminalLong">
        <el-input
          v-model="dataForm.terminalLong"
          placeholder="所处经度"
        ></el-input>
      </el-form-item>
      <el-form-item label="所处纬度" prop="terminalLot">
        <el-input
          v-model="dataForm.terminalLot"
          placeholder="所处纬度"
        ></el-input>
      </el-form-item>
      <el-form-item label="通信方式" prop="terminalCommunication">
        <!-- <el-input v-model="dataForm.terminalCommunication" placeholder="通信方式（有线，wifi，3G，4G，5G，局域网，红外）"></el-input> -->
        <el-select
          v-model="dataForm.terminalCommunication"
          placeholder="请选择通信方式"
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
      <el-form-item label="终端ip地址" prop="terminalIp">
        <el-input
          v-model="dataForm.terminalIp"
          placeholder="终端ip地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="终端状态" prop="terminalState">
        <!-- <el-input v-model="dataForm.terminalState" placeholder="终端状态（状态：运行，停运，测试，警报）"></el-input> -->
        <el-select
          v-model="dataForm.terminalState"
          placeholder="请选择终端状态"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地理位置描述" prop="terminalLocationDescribe">
        <el-input
          v-model="dataForm.terminalLocationDescribe"
          placeholder="地理位置描述（x省x市x号）"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户公司id" prop="terminalUserId">
        <el-input
          v-model="dataForm.terminalUserId"
          placeholder="使用该终端的公司id"
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
      options: [{
        value: '有线',
        label: '有线'
      }, {
        value: 'wifi',
        label: 'wifi'
      }, {
        value: '3G',
        label: '3G'
      }, {
        value: '4G',
        label: '4G'
      }, {
        value: '5G',
        label: '5G'
      }, {
        value: '局域网',
        label: '局域网'
      }, {
        value: '红外',
        label: '红外'
      }
      ],
      options1: [{
        value: '运行',
        label: '运行'
      }, {
        value: '停运',
        label: '停运'
      }, {
        value: '测试',
        label: '测试'
      }, {
        value: '警报',
        label: '警报'
      }
      ],
      visible: false,
      dataForm: {
        terminalId: 0,
        terminalClassId: '',
        terminalModel: '',
        terminalCompany: '',
        terminalCreateTime: '',
        terminalLong: '',
        terminalLot: '',
        terminalCommunication: '',
        terminalIp: '',
        terminalState: '',
        terminalLocationDescribe: '',
        terminalUserId: ''
      },
      dataRule: {
        terminalClassId: [
          { required: true, message: '终端所属的类id不能为空', trigger: 'blur' }
        ],
        terminalModel: [
          { required: true, message: '终端型号，命名规则 大写*2 + 小写*3 + 数字*5不能为空', trigger: 'blur' }
        ],
        terminalCompany: [
          { required: true, message: '终端产商公司名不能为空', trigger: 'blur' }
        ],
        terminalCreateTime: [
          { required: true, message: '加入系统的时间不能为空', trigger: 'blur' }
        ],
        terminalLong: [
          { required: true, message: '所处经度不能为空', trigger: 'blur' }
        ],
        terminalLot: [
          { required: true, message: '所处纬度不能为空', trigger: 'blur' }
        ],
        terminalCommunication: [
          { required: true, message: '通信方式（有线，wifi，3G，4G，5G，局域网，红外）不能为空', trigger: 'blur' }
        ],
        terminalIp: [
          { required: true, message: '终端ip地址不能为空', trigger: 'blur' }
        ],
        terminalState: [
          { required: true, message: '终端状态（状态：运行，停运，测试，警报）不能为空', trigger: 'blur' }
        ],
        terminalLocationDescribe: [
          { required: true, message: '地理位置描述（x省x市x号）不能为空', trigger: 'blur' }
        ],
        terminalUserId: [
          { required: true, message: '使用该终端的公司id不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.terminalId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.terminalId) {
          this.$http({
            url: this.$http.adornUrl(`/ter/terminal/info/${this.dataForm.terminalId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.terminalClassId = data.terminal.terminalClassId
              this.dataForm.terminalModel = data.terminal.terminalModel
              this.dataForm.terminalCompany = data.terminal.terminalCompany
              this.dataForm.terminalCreateTime = data.terminal.terminalCreateTime
              this.dataForm.terminalLong = data.terminal.terminalLong
              this.dataForm.terminalLot = data.terminal.terminalLot
              this.dataForm.terminalCommunication = data.terminal.terminalCommunication
              this.dataForm.terminalIp = data.terminal.terminalIp
              this.dataForm.terminalState = data.terminal.terminalState
              this.dataForm.terminalLocationDescribe = data.terminal.terminalLocationDescribe
              this.dataForm.terminalUserId = data.terminal.terminalUserId
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
      var oldtime = new Date(this.dataForm.terminalCreateTime)
      var time = oldtime.pattern("yyyy-MM-dd hh:mm:ss")
      console.log(time)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/ter/terminal/${!this.dataForm.terminalId ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'terminalId': this.dataForm.terminalId || undefined,
              'terminalClassId': this.dataForm.terminalClassId,
              'terminalModel': this.dataForm.terminalModel,
              'terminalCompany': this.dataForm.terminalCompany,
              'terminalCreateTime': time,
              'terminalLong': this.dataForm.terminalLong,
              'terminalLot': this.dataForm.terminalLot,
              'terminalCommunication': this.dataForm.terminalCommunication,
              'terminalIp': this.dataForm.terminalIp,
              'terminalState': this.dataForm.terminalState,
              'terminalLocationDescribe': this.dataForm.terminalLocationDescribe,
              'terminalUserId': this.dataForm.terminalUserId
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
