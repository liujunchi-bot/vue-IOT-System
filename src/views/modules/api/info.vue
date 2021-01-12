<template>
  <div>
    <div class="apiList" v-for="item in dataList">
      <el-card>
        <div v-for="(value, key) in item" :key="key">
          <div class="bigTitle" v-if="key === 'api_title'">{{ value }}</div>
          <div v-else>
            <div v-if="key === 'apiParams'">
              <div class="Title" style="font-weight: bold">
                {{ nameExchange[key] }}:
              </div>
              <el-table
                :data="value"
                border="true"
                :header-cell-style="{
                  background: '#00BFFF',
                  color: '#606266',
                  height: '40px',
                }"
                class="table"
                :row-style="{ height: '50px' }"
                :cell-style="{ padding: '10px' }"
                style="font-size: 20px"
                size="medium"
              >
                <el-table-column
                  property="api_param"
                  label="参数名"
                ></el-table-column>
                <el-table-column property="need" label="必选"></el-table-column>
                <el-table-column
                  property="param_type"
                  label="参数类型"
                ></el-table-column>
                <el-table-column
                  property="description"
                  label="说明"
                ></el-table-column>
                <el-table-column
                  width="400px"
                  property="param_remark"
                  label="备注"
                ></el-table-column>
              </el-table>
            </div>
            <p class="Title" v-if="key != 'apiParams'">
              <span class="smallTitle">{{ nameExchange[key] }}:&nbsp;</span>
              <span class="detail">{{ value }}</span>
            </p>
          </div>
        </div>
      </el-card>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tmpList: [],
      dataList: [

      ],
      nameExchange: {
        api_description: '说明',
        apiParams: '请求参数说明',
        api_url: '接口地址',
        api_request_map: '请求方式',
        api_example: '请求示例',
        api_response: '返回数据样例'
      },
      // apiData: [
      //   {
      //     title: '搜索建议',
      //     describe: '调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息',
      //     requestType: 'get',
      //     url: '/search/suggest',
      //     exampleurl: '/search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile',
      //     params: [
      //       {
      //         name: 'keywords',
      //         isselect: '是',
      //         type: 'string',
      //         explain: '关键词',
      //         comment: '输入关键词可以搜索出需要的内容',
      //       },
      //       {
      //         name: 'type',
      //         isselect: '否',
      //         type: 'string',
      //         explain: '返回的数据类型',
      //         comment: "如果传 'mobile' 则返回移动端数据",
      //       }
      //     ],
      //   },
      //   {
      //     title: '搜索多重匹配',
      //     describe: '调用此接口 , 传入搜索关键词可获得搜索结果',
      //     requestType: 'get',
      //     url: '/comment/playlist',
      //     exampleurl: '/comment/playlist?id=705123491',
      //     params: [
      //       {
      //         name: 'keywords',
      //         isselect: '是',
      //         type: 'string',
      //         explain: '关键词',
      //         comment: '输入关键词可以搜索出需要的内容',
      //       }
      //     ]
      //   },
      //   {
      //     title: '歌单评论',
      //     describe: '调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )',
      //     requestType: 'get',
      //     params: [
      //       {
      //         name: 'id',
      //         isselect: '是',
      //         type: 'string',
      //         explain: '歌单 id',
      //         comment: '可以定位到某歌单id下的评论数据',
      //       },
      //       {
      //         name: 'limit',
      //         isselect: '否',
      //         type: 'string',
      //         explain: '评论数量',
      //         comment: '取出评论数量 , 默认为 20',
      //       },
      //       {
      //         name: 'offset',
      //         isselect: '否',
      //         type: 'string',
      //         explain: '偏移数量',
      //         comment: '用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值',
      //       },
      //       {
      //         name: 'before',
      //         isselect: '否',
      //         type: 'string',
      //         explain: '分页参数',
      //         comment: '取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)',
      //       }
      //     ],
      // }
      // ]
    }
  },

  activated () {

  },
  mounted () {
    this.getDataList()

  },
  methods: {
    getDataList () {

      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/api/info/list'),
        method: 'get'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log('data')
          console.log(data)
          this.tmpList = data.apiInfoList
          for (var i = 0; i < this.tmpList.length; i++) {
            let map = {}
            map['api_title'] = this.tmpList[i]['api_title']
            map['api_description'] = this.tmpList[i]['api_description']
            map['api_request_map'] = this.tmpList[i]['api_request_map']
            map['api_url'] = this.tmpList[i]['api_url']
            map['api_example'] = this.tmpList[i]['api_example']
            map['api_response'] = this.tmpList[i]['api_response']
            map['apiParams'] = this.tmpList[i]['apiParams']
            // if (map['apiParams'] != null) {
            console.log('len')
            console.log(map['apiParams'].length)
            for (var j = 0; j < map['apiParams'].length; j++) {
              if (map['apiParams'][j]['need'] == true) {
                map['apiParams'][j]['need'] = '是'
              }
              else {
                map['apiParams'][j]['need'] = '否'
              }
            }
            // }
            this.dataList.push(map)
          }
          console.log('dataList')
          console.log(this.dataList)
        }
      })
    },

  }
}
</script>
<style scoped>
* {
  font-family: "Microsoft YaHei";
}
.bigTitle {
  font-weight: bold;
  font-size: 30px;
  color: #2c3e50;
  padding-bottom: 10px;
}
.smallTitle {
  font-weight: bold;
  /* font-size: 15px; */
  color: #2c3e50;
}
.detail {
  color: #34495e;
  /* font-size: 15px; */
}
.Title {
  margin-left: 30px;
  font-size: 20px;
  white-space: pre-wrap;
  white-space: pre-line;
}
.table {
  padding-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  width: 1000px;
}
.apiList {
  margin-left: 100px;
  /* white-space: pre-line; */
  /* white-space: pre-wrap; */
}
</style>
