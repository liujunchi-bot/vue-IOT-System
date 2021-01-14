webpackJsonp([46],{AEzD:function(s,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={data:function(){return{visible:!1,dataForm:{sensorClassId:0,sensorClassType:"",sensorAttributeId:"",sensorClassDescribe:"",sensorSaveTable:""},dataRule:{sensorClassType:[{required:!0,message:"传感器类名不能为空",trigger:"blur"}],sensorAttributeId:[{required:!0,message:"测量数据类型id不能为空",trigger:"blur"}],sensorClassDescribe:[{required:!0,message:"类描述不能为空",trigger:"blur"}],sensorSaveTable:[{required:!0,message:"数据存储表名不能为空",trigger:"blur"}]}}},methods:{init:function(s){var e=this;this.dataForm.sensorClassId=s||0,this.visible=!0,this.$nextTick(function(){e.$refs.dataForm.resetFields(),e.dataForm.sensorClassId&&e.$http({url:e.$http.adornUrl("/sen/sensorclass/info/"+e.dataForm.sensorClassId),method:"get",params:e.$http.adornParams()}).then(function(s){var a=s.data;a&&0===a.code&&(e.dataForm.sensorClassType=a.sensorClass.sensorClassType,e.dataForm.sensorAttributeId=a.sensorClass.sensorAttributeId,e.dataForm.sensorClassDescribe=a.sensorClass.sensorClassDescribe,e.dataForm.sensorSaveTable=a.sensorClass.sensorSaveTable)})})},dataFormSubmit:function(){var s=this;this.$refs.dataForm.validate(function(e){e&&s.$http({url:s.$http.adornUrl("/sen/sensorclass/"+(s.dataForm.sensorClassId?"update":"save")),method:"post",data:s.$http.adornData({sensorClassId:s.dataForm.sensorClassId||void 0,sensorClassType:s.dataForm.sensorClassType,sensorAttributeId:s.dataForm.sensorAttributeId,sensorClassDescribe:s.dataForm.sensorClassDescribe,sensorSaveTable:s.dataForm.sensorSaveTable})}).then(function(e){var a=e.data;a&&0===a.code?s.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){s.visible=!1,s.$emit("refreshDataList")}}):s.$message.error(a.msg)})})}}},t={render:function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("el-dialog",{attrs:{title:s.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:s.visible},on:{"update:visible":function(e){s.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:s.dataForm,rules:s.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){if(!("button"in e)&&s._k(e.keyCode,"enter",13,e.key,"Enter"))return null;s.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"传感器类名",prop:"sensorClassType"}},[a("el-input",{attrs:{placeholder:"传感器类名"},model:{value:s.dataForm.sensorClassType,callback:function(e){s.$set(s.dataForm,"sensorClassType",e)},expression:"dataForm.sensorClassType"}})],1),s._v(" "),a("el-form-item",{attrs:{label:"测量数据类型id",prop:"sensorAttributeId"}},[a("el-input",{attrs:{placeholder:"测量数据类型id"},model:{value:s.dataForm.sensorAttributeId,callback:function(e){s.$set(s.dataForm,"sensorAttributeId",e)},expression:"dataForm.sensorAttributeId"}})],1),s._v(" "),a("el-form-item",{attrs:{label:"类描述",prop:"sensorClassDescribe"}},[a("el-input",{attrs:{placeholder:"类描述"},model:{value:s.dataForm.sensorClassDescribe,callback:function(e){s.$set(s.dataForm,"sensorClassDescribe",e)},expression:"dataForm.sensorClassDescribe"}})],1),s._v(" "),a("el-form-item",{attrs:{label:"数据存储表名",prop:"sensorSaveTable"}},[a("el-input",{attrs:{placeholder:"数据存储表名"},model:{value:s.dataForm.sensorSaveTable,callback:function(e){s.$set(s.dataForm,"sensorSaveTable",e)},expression:"dataForm.sensorSaveTable"}})],1)],1),s._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){s.visible=!1}}},[s._v("取消")]),s._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){s.dataFormSubmit()}}},[s._v("确定")])],1)],1)},staticRenderFns:[]},o=a("VU/8")(r,t,!1,null,null,null);e.default=o.exports}});