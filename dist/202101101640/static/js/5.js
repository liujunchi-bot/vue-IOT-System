webpackJsonp([5,42],{"5fse":function(e,t,a){var l=a("plk4");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("300a3891",l,!0)},"9dKd":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{pickerOptions1:{shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]},options:[{value:"有线",label:"有线"},{value:"wifi",label:"wifi"},{value:"3G",label:"3G"},{value:"4G",label:"4G"},{value:"5G",label:"5G"},{value:"局域网",label:"局域网"},{value:"红外",label:"红外"}],options1:[{value:"运行",label:"运行"},{value:"停运",label:"停运"},{value:"测试",label:"测试"},{value:"警报",label:"警报"}],visible:!1,dataForm:{terminalId:0,terminalClassId:"",terminalModel:"",terminalCompany:"",terminalCreateTime:"",terminalLong:"",terminalLot:"",terminalCommunication:"",terminalIp:"",terminalState:"",terminalLocationDescribe:"",terminalUserId:""},dataRule:{terminalClassId:[{required:!0,message:"终端所属的类id不能为空",trigger:"blur"}],terminalModel:[{required:!0,message:"终端型号，命名规则 大写*2 + 小写*3 + 数字*5不能为空",trigger:"blur"}],terminalCompany:[{required:!0,message:"终端产商公司名不能为空",trigger:"blur"}],terminalCreateTime:[{required:!0,message:"加入系统的时间不能为空",trigger:"blur"}],terminalLong:[{required:!0,message:"所处经度不能为空",trigger:"blur"}],terminalLot:[{required:!0,message:"所处纬度不能为空",trigger:"blur"}],terminalCommunication:[{required:!0,message:"通信方式（有线，wifi，3G，4G，5G，局域网，红外）不能为空",trigger:"blur"}],terminalIp:[{required:!0,message:"终端ip地址不能为空",trigger:"blur"}],terminalState:[{required:!0,message:"终端状态（状态：运行，停运，测试，警报）不能为空",trigger:"blur"}],terminalLocationDescribe:[{required:!0,message:"地理位置描述（x省x市x号）不能为空",trigger:"blur"}],terminalUserId:[{required:!0,message:"使用该终端的公司id不能为空",trigger:"blur"}]}}},methods:{init:function(e){var t=this;this.dataForm.terminalId=e||0,this.visible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields(),t.dataForm.terminalId&&t.$http({url:t.$http.adornUrl("/ter/terminal/info/"+t.dataForm.terminalId),method:"get",params:t.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code&&(t.dataForm.terminalClassId=a.terminal.terminalClassId,t.dataForm.terminalModel=a.terminal.terminalModel,t.dataForm.terminalCompany=a.terminal.terminalCompany,t.dataForm.terminalCreateTime=a.terminal.terminalCreateTime,t.dataForm.terminalLong=a.terminal.terminalLong,t.dataForm.terminalLot=a.terminal.terminalLot,t.dataForm.terminalCommunication=a.terminal.terminalCommunication,t.dataForm.terminalIp=a.terminal.terminalIp,t.dataForm.terminalState=a.terminal.terminalState,t.dataForm.terminalLocationDescribe=a.terminal.terminalLocationDescribe,t.dataForm.terminalUserId=a.terminal.terminalUserId)})})},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&e.$http({url:e.$http.adornUrl("/ter/terminal/"+(e.dataForm.terminalId?"update":"save")),method:"post",data:e.$http.adornData({terminalId:e.dataForm.terminalId||void 0,terminalClassId:e.dataForm.terminalClassId,terminalModel:e.dataForm.terminalModel,terminalCompany:e.dataForm.terminalCompany,terminalCreateTime:e.dataForm.terminalCreateTime,terminalLong:e.dataForm.terminalLong,terminalLot:e.dataForm.terminalLot,terminalCommunication:e.dataForm.terminalCommunication,terminalIp:e.dataForm.terminalIp,terminalState:e.dataForm.terminalState,terminalLocationDescribe:e.dataForm.terminalLocationDescribe,terminalUserId:e.dataForm.terminalUserId})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"终端所属的类id",prop:"terminalClassId"}},[a("el-input",{attrs:{placeholder:"终端所属的类id"},model:{value:e.dataForm.terminalClassId,callback:function(t){e.$set(e.dataForm,"terminalClassId",t)},expression:"dataForm.terminalClassId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"终端型号",prop:"terminalModel"}},[a("el-input",{attrs:{placeholder:"终端型号，命名规则 大写*2 + 小写*3 + 数字*5"},model:{value:e.dataForm.terminalModel,callback:function(t){e.$set(e.dataForm,"terminalModel",t)},expression:"dataForm.terminalModel"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"终端产商公司名",prop:"terminalCompany"}},[a("el-input",{attrs:{placeholder:"终端产商公司名"},model:{value:e.dataForm.terminalCompany,callback:function(t){e.$set(e.dataForm,"terminalCompany",t)},expression:"dataForm.terminalCompany"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"加入系统的时间",prop:"terminalCreateTime"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择加入系统的时间",align:"right","picker-options":e.pickerOptions1},model:{value:e.dataForm.terminalCreateTime,callback:function(t){e.$set(e.dataForm,"terminalCreateTime",t)},expression:"dataForm.terminalCreateTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所处经度",prop:"terminalLong"}},[a("el-input",{attrs:{placeholder:"所处经度"},model:{value:e.dataForm.terminalLong,callback:function(t){e.$set(e.dataForm,"terminalLong",t)},expression:"dataForm.terminalLong"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所处纬度",prop:"terminalLot"}},[a("el-input",{attrs:{placeholder:"所处纬度"},model:{value:e.dataForm.terminalLot,callback:function(t){e.$set(e.dataForm,"terminalLot",t)},expression:"dataForm.terminalLot"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"通信方式",prop:"terminalCommunication"}},[a("el-select",{attrs:{placeholder:"请选择通信方式"},model:{value:e.dataForm.terminalCommunication,callback:function(t){e.$set(e.dataForm,"terminalCommunication",t)},expression:"dataForm.terminalCommunication"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"终端ip地址",prop:"terminalIp"}},[a("el-input",{attrs:{placeholder:"终端ip地址"},model:{value:e.dataForm.terminalIp,callback:function(t){e.$set(e.dataForm,"terminalIp",t)},expression:"dataForm.terminalIp"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"终端状态",prop:"terminalState"}},[a("el-select",{attrs:{placeholder:"请选择终端状态"},model:{value:e.dataForm.terminalState,callback:function(t){e.$set(e.dataForm,"terminalState",t)},expression:"dataForm.terminalState"}},e._l(e.options1,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"地理位置描述",prop:"terminalLocationDescribe"}},[a("el-input",{attrs:{placeholder:"地理位置描述（x省x市x号）"},model:{value:e.dataForm.terminalLocationDescribe,callback:function(t){e.$set(e.dataForm,"terminalLocationDescribe",t)},expression:"dataForm.terminalLocationDescribe"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户公司id",prop:"terminalUserId"}},[a("el-input",{attrs:{placeholder:"使用该终端的公司id"},model:{value:e.dataForm.terminalUserId,callback:function(t){e.$set(e.dataForm,"terminalUserId",t)},expression:"dataForm.terminalUserId"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]},i=a("VU/8")(l,r,!1,null,null,null);t.default=i.exports},UBih:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{tmpList:[],loading2:!0,tmpData:[],sumData:[],gridData:[],dialogTableVisible:!1,dataForm:{key:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1}},components:{AddOrUpdate:a("9dKd").default},activated:function(){this.getDataList()},methods:{searchKey:function(){console.log("search"),this.dataListLoading=!0;var e=[];if(""==this.dataForm.key)this.getDataList();else{for(var t=0;t<this.tmpList.length;t++)this.dataForm.key!=this.tmpList[t].terminalState&&this.dataForm.key!=this.tmpList[t].terminalId&&this.dataForm.key!=this.tmpList[t].terminalCompany&&this.dataForm.key!=this.tmpList[t].terminalCommunication||e.push(this.tmpList[t]);this.dataList=e}this.dataListLoading=!1},querySubsensor:function(e){var t=this;this.dialogTableVisible=!0,this.$http({url:this.$http.adornUrl("/ter/terminal/terSenBindList"),method:"get"}).then(function(a){var l=a.data;if(l&&0===l.code){t.sumData=l.terSenBindList,console.log(t.sumData);for(var r=0;r<t.sumData.length;r++)t.sumData[r].terminal_id==e&&t.tmpData.push(t.sumData[r]);t.gridData=t.tmpData,t.tmpData=[],console.log("gridData"),console.log(t.gridData)}}),this.loading2=!1},getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/ter/terminal/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,key:this.dataForm.key})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.tmpList=e.dataList,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},selectionChangeHandle:function(e){this.dataListSelections=e},addOrUpdateHandle:function(e){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init(e)})},deleteHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.terminalId});this.$confirm("确定对[id="+a.join(",")+"]进行["+(e?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/ter/terminal/delete"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-config"},[a("el-dialog",{staticStyle:{"font-size":"25px"},attrs:{title:"查询终端下属列表",center:"",visible:e.dialogTableVisible,width:"80%"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading2,expression:"loading2"}],staticStyle:{width:"100%","margin-left":"10px"},attrs:{"show-overflow-tooltip":"",fit:"",border:"","header-cell-style":{background:"#00BFFF",color:"#F5F5F5",fontSize:"19px",height:"50px"},"row-style":{fontSize:"16px",color:"#1f2d3d"},"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",data:e.gridData}},[a("el-table-column",{attrs:{property:"sensor_id",label:"传感器id",align:"center",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{property:"sensor_model",align:"center",label:"传感器型号",width:"130"}}),e._v(" "),a("el-table-column",{attrs:{property:"sensor_company",align:"center",label:"生产厂商",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{property:"sensor_user_id",align:"center",width:"120",label:"公司用户id"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"120",property:"sensor_measure_higher",label:"测量上限"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"120",property:"sensor_measure_lower",label:"测量下限"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"180",property:"sensor_create_time",label:"加入时间"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"sensor_longitude",label:"经度"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",property:"sensor_latitude",label:"纬度"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150px",property:"sensor_location_describe",label:"地理信息描述"}}),e._v(" "),a("el-table-column",{attrs:{width:"140",align:"center",property:"sensor_state",label:"传感器状态"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"120",property:"sensor_commit",label:"通信方式"}}),e._v(" "),a("el-table-column",{attrs:{width:"120",align:"center",property:"sensor_rate",label:"采集频率"}})],1)],1),e._v(" "),a("el-form",{staticStyle:{"margin-left":"10px"},attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.getDataList()}}},[a("el-form-item",[a("el-input",{staticStyle:{"font-size":"18px",width:"300px"},attrs:{placeholder:"id/厂商/通信方式/终端状态",clearable:""},model:{value:e.dataForm.key,callback:function(t){e.$set(e.dataForm,"key",t)},expression:"dataForm.key"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"font-size":"18px"},attrs:{round:"",type:"info"},on:{click:e.searchKey}},[e._v("查询")]),e._v(" "),e.isAuth("ter:terminal:save")?a("el-button",{staticStyle:{"font-size":"18px"},attrs:{round:"",type:"primary"},on:{click:function(t){e.addOrUpdateHandle()}}},[e._v("新增")]):e._e(),e._v(" "),e.isAuth("ter:terminal:delete")?a("el-button",{staticStyle:{"font-size":"18px"},attrs:{round:"",type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){e.deleteHandle()}}},[e._v("批量删除")]):e._e()],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%","margin-left":"10px"},attrs:{"show-overflow-tooltip":"",fit:"","header-cell-style":{background:"#00BFFF",color:"#F5F5F5",fontSize:"19px"},"row-style":{fontSize:"16px",color:"#1f2d3d"},data:e.dataList,border:""},on:{"selection-change":e.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalId","header-align":"center",align:"center",label:"设备id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalClassId","header-align":"center",align:"center",label:"类id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalModel","header-align":"center",align:"center",width:"130px",label:"终端型号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalCompany","header-align":"center",align:"center",width:"100px",label:"终端产商"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalCreateTime","header-align":"center",align:"center",width:"180px",label:"加入时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalLong","header-align":"center",align:"center",width:"100px",label:"所处经度"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalLot","header-align":"center",align:"center",width:"100px",label:"所处纬度"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalCommunication","header-align":"center",align:"center",width:"100px",label:"通信方式"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalIp","header-align":"center",align:"center",label:"终端ip地址",width:"150px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalState","header-align":"center",align:"center",width:"100px",label:"终端状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalLocationDescribe","header-align":"center",align:"center",width:"160px",label:"地理位置描述"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalUserId","header-align":"center",align:"center",width:"120px",label:"用户公司id"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.querySubsensor(t.row.terminalId)}}},[e._v("查看下属传感器列表")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.addOrUpdateHandle(t.row.terminalId)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteHandle(t.row.terminalId)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}}),e._v(" "),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},staticRenderFns:[]};var i=a("VU/8")(l,r,!1,function(e){a("5fse")},"data-v-20d5cba1",null);t.default=i.exports},plk4:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,'\n*[data-v-20d5cba1] {\n  font-family: STHeiti;\n  /* font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,\n   STHeiti, MingLiu; */\n}\n',""])}});