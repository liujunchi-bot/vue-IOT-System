<template>
  <!-- <baidu-map :center="center" :zoom="zoom" @ready="handler">1111</baidu-map> -->
  <baidu-map
    style="height: 600px"
    center="长沙"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    class="baidu-map-view"
    @ready="map_handler"
    ak="9PByTo9m5ROyZ8OfkC1L8g38VmDnG2rv"
  >
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT">
      <el-button type="primary" @click="addZoom(19)">缩放至最大</el-button>
      <el-button type="primary" @click="addZoom(10)">还原</el-button>
      <el-button type="primary" @click="addZoom(3)">缩放至最小</el-button>
    </bm-control>

    <div class="markable" v-for="item in dataList" :key="item.sensorId">
      <bm-marker
        draggable="true"
        :title="
          item.title +
          item.sensorId +
          '：' +
          item.describe +
          '\n' +
          '报警数据：' +
          item.alarm_data
        "
        :position="item.position"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
    </div>
  </baidu-map>
</template>
<script>
import { BaiduMap, BmScale, BmGeolocation, BmCityList, BmMarker, BmLable, BmControl } from 'vue-baidu-map'

export default {
  components: {
    BaiduMap,
    BmGeolocation,
    BmScale,
    BmCityList,
    BmMarker,
    BmLable,
    BmControl
  },
  data () {
    return {
      zoom: 10,
      dataList: [
        // {
        //   title: '传感器',
        //   sensorId: 1,
        //   position: {
        //     lng: 116.402,
        //     lat: 30.583
        //   },
        //   describe: '湖南省长沙市岳麓区湖南大学',
        //   alarm_data: 30,
        //   type: 'N'

        // },
        // {
        //   title: '传感器',
        //   sensorId: 2,
        //   position: {
        //     lng: 120.405,
        //     lat: 35.586
        //   },
        //   describe: '湖南省长沙市天心区',
        //   alarm_data: 35,
        //   type: 'h'
        // },
        // {
        //   title: '传感器',
        //   sensorId: 3,
        //   position: {
        //     lng: 125.406,
        //     lat: 39.587
        //   },
        //   describe: '湖南省长沙市开福区',
        //   alarm_data: 38,
        //   type: 'm'
        // }
      ]
    }
  },
  methods: {
    queryMapData () {
      this.$http({
        url: this.$http.adornUrl('/ala/alarmlog/mapdata'),
        method: 'get',
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          // alert('加载成功')
          let array = []
          array = data.mapData
          console.log(array)
          for (var i = 0; i < array.length; i++) {
            this.$set(this.dataList, i, {
              title: '传感器',
              sensorId: data.mapData[i]['sensor_id'],
              position: {
                lng: data.mapData[i]['sensor_longitude'],
                lat: data.mapData[i]['sensor_latitude']
              },
              log_id: data.mapData[i]['log_id'],
              describe: data.mapData[i]['sensor_location_describe'],
              alarm_data: data.mapData[i]['alarm_data']

            })
          }
          console.log(this.dataList)
        }
      })
    },
    map_handler ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.queryMapData()
    },
    addZoom (level) {
      this.zoom = level
    }
  }
}
</script>