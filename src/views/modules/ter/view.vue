/* eslint-disable */
<template>
  <div class="Echarts">
    <div class="select">
      <span class="title" style="padding-left: 70px; padding-right: 10px"
        >终端设备id</span
      >
      <el-select
        @change="classChanged"
        clearable
        v-model="value"
        placeholder="请选择终端设备"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-button type="primary" round @click="updateData">确定</el-button>
    </div>
    <!-- <button @click="myEcharts()">@click事件触发</button> -->
    <div
      class="DataVis"
      style="
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        justify-content: space-around;
      "
    >
      <div
        id="pieChart"
        style="width: 600px; height: 400px; margin-left: 10px"
      ></div>
      <span v-for="(item, index) in mychartData" :key="index">
        <span style="width: 500px; height: 400px" class="roseChart"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data () {
    var id = 1001;
    var t = [];
    var name = "导论测斜仪" + "1001";
    return {

      mychartData: [],
      classopt: {
        // '导轮测斜仪': [
        //   {
        //     value: '1001',
        //     label: '1001'
        //   },
        //   {
        //     value: '1002',
        //     label: '1002'
        //   },
        //   {
        //     value: '1004',
        //     label: '1004'
        //   },
        // ],
        // '盒式测斜仪': [
        //   {
        //     value: '1003',
        //     label: '1003'
        //   },
        //   {
        //     value: '1006',
        //     label: '1006'
        //   },
        //   {
        //     value: '1008',
        //     label: '1008'
        //   },
        //   {
        //     value: '1010',
        //     label: '1010'
        //   },
        // ],
        // '激光测距仪': [
        //   {
        //     value: '1005',
        //     label: '1005'
        //   },
        //   {
        //     value: '1011',
        //     label: '1011'
        //   },
        // ],
        // '静力水准仪': [
        //   {
        //     value: '1012',
        //     label: '1012'
        //   },
        //   {
        //     value: '1013',
        //     label: '1013'
        //   },
        //   {
        //     value: '1020',
        //     label: '1020'
        //   },
        //   {
        //     value: '1021',
        //     label: '1021'
        //   },
        //   {
        //     value: '1022',
        //     label: '1022'
        //   },
        // ],
        // '拉线位移计': [
        //   {
        //     value: '1014',
        //     label: '1014'
        //   },
        //   {
        //     value: '1015',
        //     label: '1015'
        //   },
        //   {
        //     value: '1016',
        //     label: '1016'
        //   }
        // ],
        // '无线倾角仪': [
        //   {
        //     value: '1025',
        //     label: '1025'
        //   },
        //   {
        //     value: '1026',
        //     label: '1026'
        //   },
        //   {
        //     value: '1030',
        //     label: '1030'
        //   }
        // ]
      },
      options: [
        // {
        //   value: '导轮测斜仪',
        //   label: '导轮测斜仪'
        // },
        // {
        //   value: '盒式测斜仪',
        //   label: '盒式测斜仪'
        // },
        // {
        //   value: '激光测距仪',
        //   label: '激光测距仪'
        // },
        // {
        //   value: '静力水准仪',
        //   label: '静力水准仪'
        // },
        // {
        //   value: '拉线位移计',
        //   label: '拉线位移计'
        // },
        // {
        //   value: '无线倾角仪',
        //   label: '无线倾角仪'
        // },
      ],
      value: '',
      value1: '',
      timer: "",
      name,
      id,
      t: [],
      Date: [],
      Data: [],
      Length: 0,
      temp: 0,
      dataTitle: {
      },
      pieData: {

      },
      // myChart: null
    };
  },
  activated () {

  },
  methods: {
    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/sen/data/info/${this.id}`),
        method: "get",
        // params: this.$http.adornParams({
        //   'id': 1001,
        // })
      }).then(({ data }) => {
        console.log('getDataList')
        console.log(data)
        this.Length = data.data.length
        this.temp = this.Length - 500
        if (data && data.code === 0) {
          // this.t = data.sensorData
          console.log("success");

          for (let i = this.Length - 1000; i < this.Length - 500; i++) {
            this.t.push([data.data[i].date, data.data[i].sensorData]);
          }
          for (let i = 0; i < 500; i++) {
            this.Date[i] = data.data[this.temp + i].date,
              this.Data[i] = data.data[this.temp + i].sensorData
          }
        } else {
          console.log(data.msg);
          this.test = [];
        }
      });


    },
    myEcharts () {
      // 基于准备好的dom，初始化echarts实例
      var pieCharts = document.getElementsByClassName('roseChart')
      console.log('pieCharts')
      console.log(pieCharts.length)
      console.log(this.mychartData)
      if (pieCharts.length == 0) {
        this.updateData()
      }
      for (var i = 0; i < pieCharts.length; i++) {
        var myChart = this.$echarts.init(pieCharts[i]);
        // 指定图表的配置项和数据
        let mapTitle = {}
        mapTitle = this.mychartData[i]['senAttribute'][0]
        let mapData = []
        for (var j = 0; j < this.mychartData[i]['senTodayData'].length; j++) {
          mapData.push([this.mychartData[i]['senTodayData'][j]['date'], this.mychartData[i]['senTodayData'][j]['data']])

        }
        console.log(mapTitle)
        console.log(mapData)
        const option = {
          visualMap: {
            top: 20,
            right: 0,
            pieces: [
              {
                gt: 4.0,
                lte: 6.0,
                color: "#FFA07A",
              },
              {
                lte: 4.0,
                color: "#000000",
              },
              {
                gt: 6.0,
                color: "#000000",
              },
            ],
            outOfRange: {
              color: "#DC143C",
            },
          },
          tooltip: {
            trigger: "axis",
            position: function (pt) {
              return [pt[0], "10%"];
            },
            axisPointer: {
              snap: true,
            },

          }
          ,
          title: {
            left: "center",
            // text: "导论测斜仪测量量面积图\n",
            text: mapTitle['sensor_class_type'] + '测量' + mapTitle['attribute_value'] + '图\n'
          },
          legend: {
            data: [mapTitle['sensor_class_type'] + mapTitle['sensor_id']],
            // data: [this.name],
            top: "6%", //与上方的距离 可百分比% 可像素px
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: "none",
              },
              restore: {},
              saveAsImage: {},
            },
          },

          xAxis: {
            type: "time",
            name: "测量时间",
            boundaryGap: false,
            interval: 1000 * 3600 * 24,
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            name: "测量值(" + mapTitle['attribute_unit'] + ')',
            min: mapTitle['sensor_measure_lower'],
            max: mapTitle['sensor_measure_higher'],
            type: "value",
            boundaryGap: [0, "100%"],
          },
          dataZoom: [
            {
              type: "inside",
              start: 0,
              end: 25,
            },
            {
              start: 0,
              end: 15,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "80%",
              handleStyle: {
                color: "#fff",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2,
              },
            },
          ],
          series: [
            {
              // name: this.name,
              name: mapTitle['sensor_class_type'] + mapTitle['sensor_id'],
              type: "line",
              smooth: true,
              symbol: "none",
              sampling: "average",
              itemStyle: {
                color: "rgb(255, 70, 131)",
              },
              markLine: {
                silent: true,
                data: [
                  {
                    yAxis: mapTitle['alarm_low_limit'],
                  },
                  {
                    yAxis: mapTitle['alarm_high_limit'],
                  },
                ],
              },
              data: mapData,

              areaStyle: {
                normal: {
                  color: {
                    type: "linear", //设置线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FF4683", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FF9E44", // 100% 处的颜色
                      },
                    ],
                    globalCoord: false, // 缺省为 false
                  },
                },
              },
            },
          ],
        };

        console.log(option)
        if (mapData.length == 0) {
          myChart.clear()
          myChart.hideLoading()
        }
        myChart.setOption(option, true);
        // myChart.hideLoading()
      }
      console.log('sucess')
      // myChart.hideLoading();
      // var len = 0
      // var te = this.t
      // var s = this.Date
      // var q = this.Data
      // this.timer = setInterval(function () {
      //   len++
      //   te.push([s[len], q[len]])

      //   myChart.setOption({
      //     series: [{
      //       data: te
      //     }]
      //   })

      // }, 1000)
    },
    getAlarmTerminal () {
      // console.log('getSensorClass')
      this.$http({
        url: this.$http.adornUrl('/ter/terminal/alaTerInfo'),
        method: 'get',

      }).then(({ data }) => {
        if (data && data.code === 0) {
          // console.log(data.senClassBindList.length)
          for (var i = 0; i < data.alaTerInfoSet.length; i++) {
            let map = {
              value: data.alaTerInfoSet[i]['terminal_id'],
              label: data.alaTerInfoSet[i]['terminal_class_name'] + data.alaTerInfoSet[i]['terminal_model']
            }
            this.options.push(map)

          }
        }
      })
    },
    myPie () {
      var mypie = this.$echarts.init(document.getElementById("pieChart"))
      let legendData = []
      let factData = []
      for (var key in this.pieData) {
        legendData.push(key)
        factData.push({
          value: this.pieData[key],
          name: key
        })
      }
      console.log('mypie')
      console.log(legendData)
      console.log(factData)
      const option = {
        title: {
          left: 'center',
          text: '该终端的传感器各数据占比',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: legendData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: factData
          }
        ]
      };
      if (this.value == '' || this.value == null) {
        mypie.dispose()
        mypie.hideLoading()
      }
      mypie.setOption(option, true)

    },
    updateData () {
      console.log(this.value)
      if (this.value == '' || this.value == null) {
        this.$message({
          showClose: true,
          message: '请选择终端设备',
          type: 'warning'
        });
        this.mychartData = []

      }
      this.$http({
        url: this.$http.adornUrl(`/ter/terminaldata/terSenDataNum/${this.value}`),
        method: 'get',
        // params:this.$http.adornParams({
        //   sensor_id:this.value1
        // })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log('data')
          console.log(data)
          this.pieData = data.terSenDataNumMap
          this.mychartData = data.sensorInfoAndDataList


          console.log(this.pieData)

        }
        this.myPie()
        this.myEcharts()
        this.$message({
          showClose: true,
          message: '成功获取可视化图表',
          type: 'success'
        });

      })

    },

    classChanged (value) {
      console.log('value')
      this.value1 = ''
      this.t = []
    },
  },
  get () {

    // this.temp++
    console.log("this.temp")
    //   this.t.push([this.date[this.temp],this.data[this.temp]])
    //   this.myChart.setOption({
    //   series: [{
    //   data: this.t
    //   }]
    // })
  },
  mounted () {
    // this.getDataList();
    this.getAlarmTerminal()
    this.myEcharts()
    this.$notify({
      title: '加载成功',
      message: '注意：选择终端设备以后才会进行可视化展览',
      type: 'success'
    });

  }
  ,
};
</script>

<style>
.select {
  padding-bottom: 60px;
  margin-left: 100px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
}
.title {
  font-weight: bold;
  color: #7b68ee;
}
</style>
