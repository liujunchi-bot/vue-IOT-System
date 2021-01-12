<template>
  <div id="mod-home">
    <h1>系统概况</h1>
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <dv-border-box-13 style="width: 150px; height: 80px">
          <h2 class="ml-3 colorBlue fw-b">{{ item.title }}</h2>
          <div>
            <dv-digital-flop
              :config="item.number"
              style="width: 100px; height: 50px"
            />
          </div>
        </dv-border-box-13>
      </div>
      <!-- <el-divider></el-divider> -->
    </div>
    <el-divider></el-divider>
    <div class="mod-demo-echarts">
      <h1>数据概览</h1>
      <!-- <el-card style="width: 700px; height: 400px"> -->
      <!-- <el-radio-group v-model="radio" @change="changeHandler">
        <el-radio-button label="0">本周</el-radio-button>
        <el-radio-button label="1">本月</el-radio-button>
        <el-radio-button label="2">今天</el-radio-button>
        <el-radio-button label="3">昨天</el-radio-button>
      </el-radio-group> -->

      <el-row :gutter="20">
        <el-col :span="10">
          <el-card style="width: 700px; height: 460px">
            <el-radio-group v-model="radio" @change="changeHandler">
              <el-radio-button label="0">本周</el-radio-button>
              <!-- <el-radio-button label="1">本月</el-radio-button> -->
              <el-radio-button label="1">今天</el-radio-button>
              <el-radio-button label="2">昨天</el-radio-button>
            </el-radio-group>
            <div
              id="J_chartBarBox"
              class="chart-box"
              v-show="dataFlag[0]"
            ></div>
            <!-- <div
              id="J_chartLineBoxMonth"
              class="chart-box"
              v-show="dataFlag[1]"
            ></div> -->
            <div
              id="J_chartLineBoxToday"
              class="chart-box"
              v-show="dataFlag[1]"
            ></div>
            <div
              id="J_chartLineBoxYestoday"
              class="chart-box"
              v-show="dataFlag[2]"
            ></div>
          </el-card>
        </el-col>
        <el-col :span="2"> </el-col>

        <el-col :span="10" style="paddding-top: 100px">
          <el-card>
            <div slot="header">
              <el-radio-group v-model="radio1" @change="changeWarning">
                <el-radio-button label="0">按周</el-radio-button>
                <el-radio-button label="1">按月</el-radio-button>
              </el-radio-group>
            </div>
            <div
              id="J_chartLineWeekWarning"
              style="width: 500px; height: 350px"
              v-show="dataVis[0]"
            ></div>
            <div
              id="J_chartLineMonthWarning"
              style="width: 500px; height: 350px"
              v-show="!dataVis[0]"
            ></div>
          </el-card>
        </el-col>
        <!-- <el-col :span="12">
          <el-card>
            <div id="J_chartPieBox" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div id="J_chartScatterBox" class="chart-box"></div>
          </el-card>
        </el-col> -->
      </el-row>
      <!-- </el-card> -->
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
// import { Loading } from 'element-ui';
import echarts from 'echarts'
export default {
  name: 'home',

  data () {
    return {
      dataVisible: true,
      dataVis: [true],
      titleItem: [
        {
          title: "传感器类别",
          number: {
            number: [120],
            // toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "传感器数量",
          number: {
            number: [180],
            // toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "设备种类",
          number: {
            number: [2],
            // toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "设备数量",
          number: {
            number: [14],
            // toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "报警次数",
          number: {
            number: [106],
            // toFixed: 1,
            content: "{nt}"
          }
        }
      ],
      radio: 0,
      radio1: 0,
      dataFlag: [
        false,
        false,
        false,
      ],

      chartLine1: null,
      chartLine2: null,
      chartLine3: null,
      chartLine4: null,
      chartLine5: null,
      chartBar: null,
      chartPie: null,
      chartScatter: null,
      dataList: {
        sensorYesNumList: [],
        terminalYesNumList: [],
        lastWeekNumList: [],                 //过去一周的报警次数
        monthDayNumList: [],                 //过去一个月的报警次数
        lastWeekDataSenList: [],              //过去一周传感器增加的数量
        todayDataSenList: [],                //今天传感器增加的数量
        lastWeekDataTermList: [],             //过去一周终端增加的数量
        todayDataTermList: []                 //今天终端设备增加的数量
      }
    }
  },
  updated () {
    // this.querySumData()
  },

  created: function () {
    // this.querySumData()
    // this.initChartLineWarning()
  }
  ,
  mounted () {
    // let ld = this.$loading({ fullscreen: true })
    this.querySumData()
    this.querymonthDayNumList()
    this.querytodayDataSenList()
    this.querytodayDataTermList()
    this.querylastWeekDataSenList()
    this.querylastWeekDataTermList()
    // this.initChartLineWeekWarning()
    console.log('mounted')
    // for (var i = 0; i < 4; i++) {
    this.$set(this.dataFlag, 0, true)
    this.initChartBar()
    this.$set(this.dataVis, 0, true)
    this.initChartLineWeekWarning()
    // this.dataVisible = false
    // this.$nextTick(() => {
    //   ld.close()
    // })
    // }
    // this.$set(this.dataFlag, this.radio, true)
    // if (this.radio == 0) {

    //   this.initChartBar()
    // }
    // else if (this.radio == 1) {
    //   this.initChartLineMonth()
    // }
    // else if (this.radio == 2) {
    //   this.initChartLineToday()
    // }
    // else {
    //   this.initChartLineYestoday()
    // }
    // for (var i = 0; i < 4; i++) {
    //   console.log('test: ' + i + this.dataFlag[i])
    // }


  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    // if (this.chartLine1) {
    //   this.chartLine1.resize()
    // }
    if (this.chartLine2) {
      this.chartLine2.resize()
    }
    if (this.chartLine3) {
      this.chartLine3.resize()
    }
    if (this.chartBar) {
      this.chartBar.resize()
    }
    if (this.chartPie) {
      this.chartPie.resize()
    }
    if (this.chartScatter) {
      this.chartScatter.resize()
    }
    if (this.chartLine4) {
      this.chartLine4.resize()
    }
    if (this.chartLine5) {
      this.chartLine5.resize()
    }
    this.initChartBar()
    this.initChartLineWeekWarning()
    this.initChartLineWeekWarning()
  },
  methods: {
    changeWarning (value) {
      this.$set(this.dataVis, 0, !this.dataVis[0])
      this.initChartLineWeekWarning()
      this.initChartLineMonthWarning()
      console.log(value + "   " + this.dataVis[0])
    },
    querytodayDataTermList () {
      this.$http({
        url: this.$http.adornUrl('/ter/terminaldata/todaydata'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          this.$set(this.dataList, 'todayDataTermList', data.todayDataNumList)
          console.log('sucess1')
        }
      })
    },
    querylastWeekDataTermList () {
      this.$http({
        url: this.$http.adornUrl('/ter/terminaldata/lastweekdata'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          this.$set(this.dataList, 'lastWeekDataTermList', data.lastWeekDataNumList)
          console.log('sucess1')
        }
      })
    },
    querytodayDataSenList () {
      this.$http({
        url: this.$http.adornUrl('/sen/data/todaydata'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          this.$set(this.dataList, 'todayDataSenList', data.todayDataNumList)
          console.log('sucess1')
        }
      })
    },
    querylastWeekDataSenList () {
      this.$http({
        url: this.$http.adornUrl('/sen/data/lastweekdata'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          this.$set(this.dataList, 'lastWeekDataSenList', data.lastWeekDataSenList)
          console.log('sucess1')
        }
      })
    },
    querymonthDayNumList () {
      this.$http({
        url: this.$http.adornUrl('/ala/alarmlog/monthdaynum'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          this.$set(this.dataList, 'monthDayNumList', data.monthNumList)

          // this.dataList.monthDayNumList = data.monthDayNumList
          console.log('data.monthDayNumList:   ' + this.dataList['monthDayNumList'])
          console.log('sucess1')
        }
      })
    },
    querySumData () {
      this.$http({
        url: this.$http.adornUrl('/sen/sensor/firstpage'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          this.$set(this.titleItem[0], 'number', { number: [data.sensorClassNum], content: "{nt}" })
          this.$set(this.titleItem[1], 'number', { number: [data.sensorNum], content: "{nt}" })
          this.$set(this.titleItem[2], 'number', { number: [data.terminalClassNum], content: "{nt}" })
          this.$set(this.titleItem[3], 'number', { number: [data.terminalNum], content: "{nt}" })
          this.$set(this.titleItem[4], 'number', { number: [data.alarmNum], content: "{nt}" })
          this.$set(this.dataList, 'sensorYesNumList', data.sensorYesNumList)
          this.$set(this.dataList, 'terminalYesNumList', data.terminalYesNumList)
          this.$set(this.dataList, 'lastWeekNumList', data.lastWeekNumList)
          console.log('sucess1')
        }
      })
    },
    querySensorType () {
      this.$http({
        url: this.$http.adornUrl('/sen/sensorclass/count'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // alert(data.num)
          this.$set(this.titleItem[0], 'number', { number: [data.num], content: "{nt}" })
          console.log('sucess1')
        }
      })
    },
    querySensorNumber () {
      this.$http({
        url: this.$http.adornUrl('/sen/sensor/count'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // alert(data.num)
          this.$set(this.titleItem[1], 'number', { number: [data.num], content: "{nt}" })
          console.log('sucess2')
        }
      })
    },
    queryTerminalClass () {
      this.$http({
        url: this.$http.adornUrl('/ter/terminalclass/count'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // alert(data.num)
          this.$set(this.titleItem[2], 'number', { number: [data.num], content: "{nt}" })
          console.log('sucess3')
        }
      })
    },
    queryTerminalCount () {
      this.$http({
        url: this.$http.adornUrl('/ter/terminal/count'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // alert(data.num)
          this.$set(this.titleItem[3], 'number', { number: [data.num], content: "{nt}" })
          console.log('sucess4')
        }
      })
    },
    queryAlarmCount () {
      this.$http({
        url: this.$http.adornUrl('/ala/alarmlog/count'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // alert(data.num)
          this.$set(this.titleItem[4], 'number', { number: [data.num], content: "{nt}" })
          console.log('sucess5')
        }
      })
    },
    changeHandler (value) {
      console.log('value:   ' + value)
      for (var i = 0; i < 3; i++) {
        // if (value == i) {
        //   console.log('radio:   ' + this.radio)
        //   // this.$set(this.dataFlag, i, true)
        //   this.dataFlag[i] = true
        // }
        // else {
        // this.dataFlag[i] = false
        this.$set(this.dataFlag, i, false)
        // }
      }
      // this.dataFlag[value] = true
      this.$set(this.dataFlag, value, true)
      if (value == 0) {

        this.initChartBar()
      }
      // else if (value == 1) {
      //   this.initChartLineMonth()
      // }
      else if (value == 1) {
        this.initChartLineToday()
      }
      else {
        this.initChartLineYestoday()
      }
      for (var i = 0; i < 3; i++) {
        console.log('test: ' + this.dataFlag[i])
      }





    },

    // 折线图
    initChartLineMonth () {
      var option = {
        'title': {
          'text': '当月数据'
        },
        'tooltip': {
          'trigger': 'axis'
        },
        'legend': {
          'data': ['传感器数据', '终端数据']
        },
        'grid': {
          'left': '3%',
          'right': '4%',
          'bottom': '3%',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
            'saveAsImage': {}
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': ['1', '5', '10', '15', '25', '30']
        },
        'yAxis': {
          'type': 'value'
        },
        'series': [
          {
            'name': '传感器数据',
            'type': 'line',
            'stack': '总量',
            'data': [120, 132, 101, 134, 90, 230]
          },
          {
            'name': '终端数据',
            'type': 'line',
            'stack': '总量',
            'data': [220, 182, 191, 234, 290, 330]
          }
        ]
      }
      this.chartLine1 = echarts.init(document.getElementById('J_chartLineBoxMonth'))

      this.chartLine1.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine1.resize()
      })
    },

    // 折线图
    initChartLineWeekWarning () {
      var option = {
        'title': {
          'text': '设备报警'
        },
        'tooltip': {
          'trigger': 'axis'
        },
        'legend': {
          'data': ['111']
        },
        'grid': {
          'left': '3%',
          'right': '4%',
          'bottom': '3%',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
            'saveAsImage': {}
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        'yAxis': {
          'type': 'value'
        },
        'series': [
          {
            'name': '设备报警情况',
            'type': 'line',
            'data': this.dataList['lastWeekNumList']
          }
        ]
      }
      this.chartLine4 = echarts.init(document.getElementById('J_chartLineWeekWarning'))
      this.chartLine4.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine4.resize()
      })
    },
    // 折线图
    initChartLineMonthWarning () {
      var option = {
        'title': {
          'text': '设备报警'
        },
        'tooltip': {
          'trigger': 'axis'
        },
        'legend': {
          'data': ['111']
        },
        'grid': {
          'left': '1%',
          'right': '1%',
          'bottom': '3%',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
            'saveAsImage': {}
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        'yAxis': {
          'type': 'value'
        },
        'series': [
          {
            'name': '设备报警情况',
            'type': 'line',
            'data': this.dataList['monthDayNumList']
            // 'data': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
          }
        ]
      }
      this.chartLine5 = echarts.init(document.getElementById('J_chartLineMonthWarning'))
      // this.querymonthDayNumList()
      console.log('monthDayNumList:  ' + this.dataList['monthDayNumList'])
      this.chartLine5.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine5.resize()
      })
    },

    initChartLineToday () {
      var option = {
        'title': {
          'text': '今天数据'
        },
        'tooltip': {
          'trigger': 'axis'
        },
        'legend': {
          'data': ['传感器数据', '终端数据']
        },
        'grid': {
          'left': '3%',
          'right': '4%',
          'bottom': '3%',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
            'saveAsImage': {}
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
        },
        'yAxis': {
          'type': 'value'
        },
        'series': [
          {
            'name': '传感器数据',
            'type': 'line',
            'stack': '总量',
            'data': this.dataList['todayDataSenList']
          },
          {
            'name': '终端数据',
            'type': 'line',
            'stack': '总量',
            'data': this.dataList['todayDataTermList']
          }
        ]
      }
      this.chartLine2 = echarts.init(document.getElementById('J_chartLineBoxToday'))
      // this.querytodayDataSenList()
      // this.querytodayDataTermList()
      this.chartLine2.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine2.resize()
      })
    },
    initChartLineYestoday () {
      var option = {
        'title': {
          'text': '昨天数据'
        },
        'tooltip': {
          'trigger': 'axis'
        },
        'legend': {
          'data': ['传感器数据', '终端数据']
        },
        'grid': {
          'left': '3%',
          'right': '4%',
          'bottom': '3%',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
            'saveAsImage': {}
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
        },
        'yAxis': {
          'type': 'value'
        },
        'series': [
          {
            'name': '传感器数据',
            'type': 'line',
            'stack': '总量',
            'data': this.dataList['sensorYesNumList']
          },
          {
            'name': '终端数据',
            'type': 'line',
            'stack': '总量',
            'data': this.dataList['terminalYesNumList']
          }
        ]
      }
      this.chartLine3 = echarts.init(document.getElementById('J_chartLineBoxYestoday'))
      this.chartLine3.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine3.resize()
      })
    },



    // 柱状图
    initChartBar () {
      var option = {
        color: ['chocolate', '#9400D3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['传感器数据量', '终端数据']
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            name: '时间段'
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '一周内数据产生量/次'
          }
        ],
        series: [
          {
            name: '传感器数据量',
            type: 'bar',
            data: this.dataList['lastWeekDataSenList']
          },
          {
            name: '终端数据',
            type: 'bar',
            data: this.dataList['lastWeekDataTermList']
          }
        ]
      }
      this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
      // this.querylastWeekDataSenList()
      // this.querylastWeekDataTermList()
      this.chartBar.setOption(option)
      window.addEventListener('resize', () => {
        this.chartBar.resize()
      })
    },



  },

}
</script>

<style lang="scss" scoped>
.up {
  // color: antiquewhite;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.chart-box {
  min-height: 400px;
  width: 600px;
  height: 340px;
}
.mod-demo-echarts {
  > .el-alert {
    margin-bottom: 10px;
  }
  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;
    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>

