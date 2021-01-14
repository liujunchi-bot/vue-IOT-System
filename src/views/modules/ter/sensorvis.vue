/* eslint-disable */
<template>
  <div class="Echarts">
    <div class="select">
      <span class="title" style="padding-left: 70px; padding-right: 10px"
        >传感器类</span
      >
      <el-select
        @change="classChanged"
        clearable
        v-model="value"
        placeholder="请选择传感器类"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span class="title" style="padding-left: 70px; padding-right: 10px"
        >下属传感器</span
      >
      <el-select
        clearable
        v-model="value1"
        placeholder="请选择下属传感器id"
        @change="sensorChanged"
        style="padding-right: 10px"
      >
        <el-option
          v-for="item in classopt[value]"
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
      id="main"
      style="width: 700px; height: 400px; margin-left: 140px"
    ></div>
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
      myChart: null
    };
  },
  activated () {
    if (this.myChart) {
      this.myChart.resize()
    }
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
      this.myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
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
          text: this.dataTitle['sensor_class_type'] + '测量' + this.dataTitle['attribute_value'] + '图\n'
        },
        legend: {
          data: [this.dataTitle['sensor_class_type'] + this.dataTitle['sensor_id']],
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
          name: "测量值(" + this.dataTitle['attribute_unit'] + ')',
          min: this.dataTitle['sensor_measure_lower'],
          max: this.dataTitle['sensor_measure_higher'],
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
            name: this.dataTitle['sensor_class_type'] + this.dataTitle['sensor_id'],
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
                  yAxis: this.dataTitle['alarm_low_limit'],
                },
                {
                  yAxis: this.dataTitle['alarm_high_limit'],
                },
              ],
            },
            data: this.t,

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

      // 使用刚指定的配置项和数据显示图表。
      if (this.t.length == 0)
        this.myChart.clear()
      this.myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
      this.myChart.hideLoading();
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
    getSensorClass () {
      console.log('getSensorClass')
      this.$http({
        url: this.$http.adornUrl('/sen/sensorclass/senClassBindList'),
        method: 'get',

      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data.senClassBindList.length)
          for (var i = 0; i < data.senClassBindList.length; i++) {
            let map = {
              value: data.senClassBindList[i]['sensor_id'],
              label: data.senClassBindList[i]['sensor_id']
            }
            if (this.classopt.hasOwnProperty(data.senClassBindList[i]['sensor_class_type'])) {
              this.classopt[data.senClassBindList[i]['sensor_class_type']].push(map)
            }
            else {
              let new_map = {
                value: data.senClassBindList[i]['sensor_class_type'],
                label: data.senClassBindList[i]['sensor_class_type']
              }
              this.options.push(new_map)
              console.log(this.classopt)
              this.classopt[data.senClassBindList[i]['sensor_class_type']] = []
              this.classopt[data.senClassBindList[i]['sensor_class_type']].push(map)
            }
          }
          console.log('options' + '   classopt')
          console.log(this.options)
          console.log(this.classopt)
        }
      })
    },
    updateData () {
      this.t = []
      this.dataTitle = []
      // this.myChart.clear()
      console.log(this.value1)
      if (this.value1 == '') {
        this.$message({
          showClose: true,
          message: '请选择类和传感器id',
          type: 'error'
        });
      }
      this.$http({
        url: this.$http.adornUrl(`/sen/data/senOneHourData/${this.value1}`),
        method: 'get',
        // params:this.$http.adornParams({
        //   sensor_id:this.value1
        // })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log('data')
          console.log(data)
          this.dataTitle = data.senAttribute[0]

          // for (var i = 0; i < array.length; i++) {
          //   this.t.push([array[i]['date'], array[i]['sensorData']])
          // }
          this.t = data.senOneHourData
          console.log(this.dataTitle)
          console.log('tttttt')
          console.log(this.t)
          if (this.t.length == 0) {
            console.log(this.t.length)
            // this.t.push(["2021-01-09 23:52:48", 4.21])
            // this.myChart.clean()
            this.$message({
              showClose: true,
              message: '该传感器这段时间未产生数据',
              type: 'warning'
            });

            this.myChart.hideLoading();

          }

        }
        this.myEcharts()

      })

    },
    classChanged (value) {
      console.log('value')
      this.value1 = ''
      this.t = []
    },
    sensorChanged (value) {

      this.t = []
    }
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
    this.getSensorClass()
    // this.myEcharts()
    this.$notify({
      title: '加载成功',
      message: '注意：选择传感器以后才会进行可视化展览',
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
