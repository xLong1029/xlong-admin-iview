(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58467a4e"],{"23a2":function(t,e,a){"use strict";var r=a("a483"),n=a.n(r);n.a},"2ad4":function(t,e,a){},6599:function(t,e,a){"use strict";a("a434"),a("b64b"),a("d3b7");var r,n=a("ade3"),o=a("56c6");e["a"]=(r={GetProdList:function(t,e,a){var r=o["a"].GetQuery("Product");return t&&Object.keys(t).length&&(t.id&&r.equalTo("objectId","==",t.id),t.productName&&r.equalTo("productName","==",t.productName),t.dataFrom&&r.equalTo("dataFrom","==",parseInt(t.dataFrom))),new Promise((function(t,n){o["a"].GetListData(r,e,a).then((function(e){return t(e)})).catch((function(t){return n(t)}))}))},AddProduct:function(t){return new Promise((function(e,a){o["a"].AddOne("Product",t).then((function(t){return e(t)})).catch((function(t){return a(t)}))}))},EditProduct:function(t,e){return new Promise((function(a,r){o["a"].EditOne("Product",e,t).then((function(t){return a(t)})).catch((function(t){return r(t)}))}))},DeleteProd:function(t){return new Promise((function(e,a){o["a"].DelMore("Product",t).then((function(t){return e(t)})).catch((function(t){return a(t)}))}))},GetProdInfo:function(t){return new Promise((function(e,a){o["a"].GetOne("Product",t).then((function(t){return e(t)})).catch((function(t){return a(t)}))}))}},Object(n["a"])(r,"EditProduct",(function(t,e){return new Promise((function(a,r){o["a"].EditOne("Product",e,t).then((function(t){return a(t)})).catch((function(t){return r(t)}))}))})),Object(n["a"])(r,"GetCaseList",(function(t){return new Promise((function(e,a){o["a"].GetOne("Product",t).then((function(t){return e({code:200,data:t.data.caseList})})).catch((function(t){return a(t)}))}))})),Object(n["a"])(r,"AddCase",(function(t,e){var a=o["a"].GetQuery("Product");return new Promise((function(r,n){a.get(e).then((function(e){var a=e.caseList?e.caseList:[];a.push(t),e.set("caseList",a),e.save().then((function(){return r({code:200,msg:"操作成功！"})})).catch((function(t){return n(t)}))})).catch((function(){return r({code:404,msg:"对象不存在！"})}))}))})),Object(n["a"])(r,"EditCase",(function(t,e,a){var r=o["a"].GetQuery("Product");return new Promise((function(n,o){r.get(e).then((function(e){var r=e.caseList?e.caseList:[];r.splice(a,1,t),e.set("caseList",r),e.save().then((function(){return n({code:200,msg:"操作成功！"})})).catch((function(t){return o(t)}))})).catch((function(){return n({code:404,msg:"对象不存在！"})}))}))})),Object(n["a"])(r,"DelCase",(function(t,e){var a=o["a"].GetQuery("Product");return new Promise((function(r,n){a.get(t).then((function(t){var a=t.caseList?t.caseList:[];a.splice(e,1),t.set("caseList",a),t.save().then((function(){return r({code:200,msg:"操作成功！"})})).catch((function(t){return n(t)}))})).catch((function(){return r({code:404,msg:"对象不存在！"})}))}))})),r)},"818a":function(t,e,a){"use strict";var r=a("2ad4"),n=a.n(r);n.a},"971f":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"g-content"},[a("div",{staticClass:"m-query-form fr"},[a("Form",{ref:"queryForm",attrs:{model:t.queryForm}},[a("Form-item",{staticClass:"query-item"},[a("Input",{attrs:{placeholder:"产品编号"},model:{value:t.queryForm.id,callback:function(e){t.$set(t.queryForm,"id",e)},expression:"queryForm.id"}})],1),a("Form-item",{staticClass:"query-item"},[a("Input",{attrs:{placeholder:"产品名称"},model:{value:t.queryForm.productName,callback:function(e){t.$set(t.queryForm,"productName",e)},expression:"queryForm.productName"}})],1),a("Form-item",{staticClass:"query-item"},[a("Select",{attrs:{placeholder:"数据来源"},model:{value:t.queryForm.dataFrom,callback:function(e){t.$set(t.queryForm,"dataFrom",e)},expression:"queryForm.dataFrom"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),a("Option",{attrs:{value:"1"}},[t._v("系统录入")]),a("Option",{attrs:{value:"2"}},[t._v("数据库添加")])],1)],1),a("Form-item",{staticClass:"fl"},[a("Button",{staticClass:"query-button",attrs:{type:"primary"},on:{click:function(e){return t.query("queryForm","")}}},[t._v("查询")]),a("Button",{staticClass:"query-button",attrs:{type:"default"},on:{click:function(e){return t.resetQuery("queryForm")}}},[t._v("重置")])],1)],1)],1),a("div",{staticClass:"m-operation fl"},[a("Button",{staticClass:"operation-btn",attrs:{type:"primary"},on:{click:t.addSection}},[t._v("新增")]),a("Button",{staticClass:"operation-btn",attrs:{disabled:0==t.selectList.length,type:"warning"},on:{click:t.deleteData}},[t._v("删除")])],1),a("div",{staticClass:"clearfix"}),t.pageLoading?a("Loading"):a("div",[a("Table",{staticClass:"m-table-list",attrs:{border:"",columns:t.tableList,data:t.listData},on:{"on-selection-change":t.setSelectList}})],1),a("Page",{attrs:{"class-name":"m-page","show-elevator":"","show-sizer":"","show-total":"",total:t.page.dataCount,"page-size":t.page.pageSize,current:t.page.pageNo,"page-size-opts":t.page.pageSizeOpts},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}}),a("div",{staticClass:"clearfix"}),a("Modal",{attrs:{width:"500"},on:{"on-cancel":function(e){return t.closeModal("paramsForm")}},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[a("p",{attrs:{slot:"header"},slot:"header"},[a("span",{domProps:{textContent:t._s(""==t.paramsForm.title?"新增版块":"编辑版块")}})]),a("div",[a("Form",{ref:"paramsForm",attrs:{model:t.paramsForm,rules:t.validate,"label-width":100}},[a("Form-item",{attrs:{label:"产品名称：",prop:"productName"}},[a("Input",{model:{value:t.paramsForm.productName,callback:function(e){t.$set(t.paramsForm,"productName",e)},expression:"paramsForm.productName"}})],1)],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{size:"large"},on:{click:function(e){return t.closeModal("paramsForm")}}},[t._v("取消")]),a("Button",{attrs:{type:"primary",size:"large"},on:{click:function(e){return t.add("paramsForm")}}},[t._v("确定")])],1)])],1)},n=[],o=(a("d81d"),a("be51")),i=a("6599"),c=a("d7fd"),s=a("1b62"),u={components:{Loading:o["a"]},mixins:[s["e"],s["d"],s["c"]],computed:{apiGetList:function(){var t=this;return function(){return i["a"].GetProdList(t.queryForm,t.page.pageNo,t.page.pageSize)}},apiAdd:function(){var t=this;return function(){return i["a"].AddProduct(t.paramsForm)}},apiEdit:function(){var t=this;return function(){return i["a"].EditProduct(t.paramsForm,t.editId)}},apiDelete:function(){var t=this;return function(){return i["a"].DeleteProd(t.selectList)}}},data:function(){var t=this;return{pageLoading:!0,showModal:!1,paramsForm:{productName:"",dataFrom:1},editId:"",operateType:0,validate:{productName:[{required:!0,message:"产品名称不能为空",trigger:"blur"}]},queryForm:{id:"",productName:"",dataFrom:""},tableList:[{title:"全选",type:"selection",key:"selectAll",width:"60",align:"center"},{title:"产品编号",key:"id",align:"center"},{title:"产品名称",key:"productName",align:"center"},{title:"数据来源",key:"dataFrom",align:"center",render:function(t,e){return t("span",{},1==e.row.dataFrom?"系统录入":"数据库添加")}},{title:"创建时间",key:"createTime",align:"center"},{title:"更新时间",key:"updateTime",align:"center"},{title:"操作",key:"operation",width:"120",align:"center",render:function(e,a){return e("div",[c["a"].gotoDetail(e,a,t,"查看详情","ProductDetail")])}}],listData:[]}},created:function(){this.$store.commit("SET_BREADCRUMB",[{name:"首页",path:"/Home"},{name:"产品列表",path:""}]),this.getTableList()},methods:{setListData:function(t){t.length>0?this.listData=t.map((function(t){return{id:t.objectId,productName:t.productName,dataFrom:t.dataFrom,createTime:t.createdAt,updateTime:t.updatedAt}})):this.listData=[]},closeModal:function(t){this.showModal=!1,this.$refs[t].resetFields()},openModel:function(t){this.showModal=!0,this.paramsForm.productName=t.productName,this.paramsForm.dataFrom=t.dataFrom,this.editId=t.id},add:function(t){var e=this;this.$refs[t].validate((function(a){a?(e.addData(),setTimeout((function(){e.closeModal(t)}),500)):e.$Message.error("提交失败！填写有误")}))},addSection:function(){this.showModal=!0,this.operateType=1}}},d=u,l=(a("23a2"),a("2877")),m=Object(l["a"])(d,r,n,!1,null,"b8ba31ec",null);e["default"]=m.exports},a483:function(t,e,a){},be51:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-load",attrs:{id:"loading"}},[a("Spin",[a("Icon",{staticClass:"spin-icon-load",attrs:{type:"ios-loading",size:"18"}}),a("div",[t._v("玩命加载中...")])],1)],1)},n=[],o={name:"loading",data:function(){return{}}},i=o,c=(a("818a"),a("2877")),s=Object(c["a"])(i,r,n,!1,null,"f624f8be",null);e["a"]=s.exports},d7fd:function(t,e,a){"use strict";var r=a("ed08");e["a"]={common:function(t,e,a,r,n,o,i){return t("Button",{props:{type:o,size:"small"},style:{minWidth:"64px",marginRight:i},on:{click:function(){a[r](e)}}},n)},gotoDetail:function(t,e,a,r,n,o){return t("Button",{props:{type:"primary",size:"small"},style:{minWidth:"64px",marginRight:o},on:{click:function(){a.$router.push({name:n,query:{id:e.row.id}})}}},r)},gotoPage:function(t,e,a,r,n,o){return t("Button",{props:{type:"primary",size:"small"},style:{minWidth:"64px",marginRight:o},on:{click:function(){a.$router.push({name:n})}}},r)},popUp:function(t,e,a,r,n){return t("Button",{props:{type:"primary",size:"small"},style:{minWidth:"64px",marginRight:n},on:{click:function(){a.openModel(e.row)}}},r)},showImage:function(t,e,a){return t("img",{attrs:{src:e.row.imgUrl},style:{width:"auto",maxHeight:"120px",maxWidth:"90%",margin:"15px",borderRadius:"4px",border:"1px solid #e4e5e7"},on:{error:function(t){Object(r["p"])(t,2)}}})}}}}]);