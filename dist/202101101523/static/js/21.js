webpackJsonp([21,61],{"6hFz":function(e,t,a){var r=a("yKtv");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("22d48637",r,!0)},"7aZL":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{tmpList:[],dataForm:{key:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1}},components:{AddOrUpdate:a("zEYB").default},activated:function(){this.getDataList()},methods:{searchKey:function(){console.log("search"),this.dataListLoading=!0;var e=[];if(""==this.dataForm.key)this.getDataList();else{for(var t=0;t<this.tmpList.length;t++)this.dataForm.key!=this.tmpList[t].logId&&this.dataForm.key!=this.tmpList[t].terminalId&&this.dataForm.key!=this.tmpList[t].sensorId||e.push(this.tmpList[t]);this.dataList=e}this.dataListLoading=!1},getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/ala/alarmrule2/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,key:this.dataForm.key})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.tmpList=e.dataList,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},selectionChangeHandle:function(e){this.dataListSelections=e},addOrUpdateHandle:function(e){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init(e)})},deleteHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.logId});this.$confirm("确定对[id="+a.join(",")+"]进行["+(e?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/ala/alarmrule2/delete"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-config"},[a("el-form",{staticStyle:{"margin-left":"10px"},attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.getDataList()}}},[a("el-form-item",[a("el-input",{staticStyle:{"font-size":"18px",width:"300px"},attrs:{placeholder:"报警规则id/终端id/传感器id",clearable:""},model:{value:e.dataForm.key,callback:function(t){e.$set(e.dataForm,"key",t)},expression:"dataForm.key"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticStyle:{"font-size":"18px"},attrs:{round:"",type:"info"},on:{click:e.searchKey}},[e._v("查询")]),e._v(" "),e.isAuth("ala:alarmrule2:save")?a("el-button",{staticStyle:{"font-size":"18px"},attrs:{round:"",type:"primary"},on:{click:function(t){e.addOrUpdateHandle()}}},[e._v("新增")]):e._e(),e._v(" "),e.isAuth("ala:alarmrule2:delete")?a("el-button",{staticStyle:{"font-size":"18px"},attrs:{round:"",type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){e.deleteHandle()}}},[e._v("批量删除")]):e._e()],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%","margin-left":"10px"},attrs:{"show-overflow-tooltip":"",fit:"","header-cell-style":{background:"#00BFFF",color:"#F5F5F5",fontSize:"19px"},"row-style":{fontSize:"16px",color:"#1f2d3d"},data:e.dataList,border:""},on:{"selection-change":e.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logId","header-align":"center",align:"center",label:"报警规则id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"terminalId","header-align":"center",align:"center",label:"终端id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sensorId","header-align":"center",align:"center",label:"对应传感器id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"alarmLowLimit","header-align":"center",align:"center",label:"报警下限"}}),e._v(" "),a("el-table-column",{attrs:{prop:"alarmHighLimit","header-align":"center",align:"center",label:"报警数值上限"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logUpdateTime","header-align":"center",align:"center",width:"180px",label:"最近更新时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"logDescribe","header-align":"center",align:"center",label:"报警规则描述"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sensorSaveTable","header-align":"center",align:"center",label:"数据存储表名"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.addOrUpdateHandle(t.row.logId)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteHandle(t.row.logId)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}}),e._v(" "),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},staticRenderFns:[]};var l=a("VU/8")(r,i,!1,function(e){a("6hFz")},"data-v-b16df756",null);t.default=l.exports},yKtv:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,'\n*[data-v-b16df756] {\n  font-family: STHeiti;\n  /* font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,\n   STHeiti, MingLiu; */\n}\n',""])},zEYB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{visible:!1,dataForm:{logId:0,terminalId:"",sensorId:"",alarmLowLimit:"",alarmHighLimit:"",logUpdateTime:"",logDescribe:"",sensorSaveTable:""},dataRule:{terminalId:[{required:!0,message:"终端id不能为空",trigger:"blur"}],sensorId:[{required:!0,message:"该终端下对标此规则的传感器id不能为空",trigger:"blur"}],alarmLowLimit:[{required:!0,message:"报警下限不能为空",trigger:"blur"}],alarmHighLimit:[{required:!0,message:"报警数值上限（必须在测量范围内）不能为空",trigger:"blur"}],logUpdateTime:[{required:!0,message:"最近一次更新该报警规则的时间不能为空",trigger:"blur"}],logDescribe:[{required:!0,message:"报警规则描述不能为空",trigger:"blur"}],sensorSaveTable:[{required:!0,message:"数据存储表名不能为空",trigger:"blur"}]}}},methods:{init:function(e){var t=this;this.dataForm.logId=e||0,this.visible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields(),t.dataForm.logId&&t.$http({url:t.$http.adornUrl("/ala/alarmrule2/info/"+t.dataForm.logId),method:"get",params:t.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code&&(t.dataForm.terminalId=a.alarmRule2.terminalId,t.dataForm.sensorId=a.alarmRule2.sensorId,t.dataForm.alarmLowLimit=a.alarmRule2.alarmLowLimit,t.dataForm.alarmHighLimit=a.alarmRule2.alarmHighLimit,t.dataForm.logUpdateTime=a.alarmRule2.logUpdateTime,t.dataForm.logDescribe=a.alarmRule2.logDescribe,t.dataForm.sensorSaveTable=a.alarmRule2.sensorSaveTable)})})},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&e.$http({url:e.$http.adornUrl("/ala/alarmrule2/"+(e.dataForm.logId?"update":"save")),method:"post",data:e.$http.adornData({logId:e.dataForm.logId||void 0,terminalId:e.dataForm.terminalId,sensorId:e.dataForm.sensorId,alarmLowLimit:e.dataForm.alarmLowLimit,alarmHighLimit:e.dataForm.alarmHighLimit,logUpdateTime:e.dataForm.logUpdateTime,logDescribe:e.dataForm.logDescribe,sensorSaveTable:e.dataForm.sensorSaveTable})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"终端id",prop:"terminalId"}},[a("el-input",{attrs:{placeholder:"终端id"},model:{value:e.dataForm.terminalId,callback:function(t){e.$set(e.dataForm,"terminalId",t)},expression:"dataForm.terminalId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"该终端下对标此规则的传感器id",prop:"sensorId"}},[a("el-input",{attrs:{placeholder:"该终端下对标此规则的传感器id"},model:{value:e.dataForm.sensorId,callback:function(t){e.$set(e.dataForm,"sensorId",t)},expression:"dataForm.sensorId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"报警下限",prop:"alarmLowLimit"}},[a("el-input",{attrs:{placeholder:"报警下限"},model:{value:e.dataForm.alarmLowLimit,callback:function(t){e.$set(e.dataForm,"alarmLowLimit",t)},expression:"dataForm.alarmLowLimit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"报警数值上限（必须在测量范围内）",prop:"alarmHighLimit"}},[a("el-input",{attrs:{placeholder:"报警数值上限（必须在测量范围内）"},model:{value:e.dataForm.alarmHighLimit,callback:function(t){e.$set(e.dataForm,"alarmHighLimit",t)},expression:"dataForm.alarmHighLimit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"最近一次更新该报警规则的时间",prop:"logUpdateTime"}},[a("el-input",{attrs:{placeholder:"最近一次更新该报警规则的时间"},model:{value:e.dataForm.logUpdateTime,callback:function(t){e.$set(e.dataForm,"logUpdateTime",t)},expression:"dataForm.logUpdateTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"报警规则描述",prop:"logDescribe"}},[a("el-input",{attrs:{placeholder:"报警规则描述"},model:{value:e.dataForm.logDescribe,callback:function(t){e.$set(e.dataForm,"logDescribe",t)},expression:"dataForm.logDescribe"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"数据存储表名",prop:"sensorSaveTable"}},[a("el-input",{attrs:{placeholder:"数据存储表名"},model:{value:e.dataForm.sensorSaveTable,callback:function(t){e.$set(e.dataForm,"sensorSaveTable",t)},expression:"dataForm.sensorSaveTable"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]},l=a("VU/8")(r,i,!1,null,null,null);t.default=l.exports}});