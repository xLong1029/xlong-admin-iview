(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d490a16"],{1979:function(t,e,a){},"1e6c":function(t,e,a){},"381b":function(t,e,a){"use strict";a("477f")},"408a":function(t,e,a){var i=a("e330");t.exports=i(1..valueOf)},4210:function(t,e,a){"use strict";var i=a("b775");e["a"]={GetSecList:function(t,e,a){return Object(i["a"])({url:"/api/section/list",method:"get",params:{params:t,pageNo:e,pageSize:a}})},AddSection:function(t){return Object(i["a"])({url:"/api/section/add",method:"post",data:t})},EditSection:function(t){return Object(i["a"])({url:"/api/section/edit",method:"post",data:t})},DeleteSec:function(t){return Object(i["a"])({url:"/api/section/delete",method:"post",data:{ids:t}})},GetContList:function(t,e,a){return Object(i["a"])({url:"/api/content/list",method:"get",params:{sectionId:t,pageNo:e,pageSize:a}})},AddCont:function(t){return Object(i["a"])({url:"/api/content/add",method:"post",data:t})},EditCont:function(t){return Object(i["a"])({url:"/api/content/edit",method:"post",data:t})},DeleteCont:function(t){return Object(i["a"])({url:"/api/content/delete",method:"post",data:{ids:t}})}}},"477f":function(t,e,a){},"60d3":function(t,e,a){"use strict";a("1e6c")},"648f":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"editableTable"}},[a("table",{ref:"table",staticClass:"m-table",attrs:{width:"100%",cellpadding:"0",cellspacing:"0"}},[t._l(t.title,(function(e,i){return a("th",{key:"th"+i,style:{width:e.width+"px"},attrs:{align:e.align}},["CheckBox"==e.type?a("Checkbox",{on:{"on-change":function(e){return t.selectAll(t.checkAll)}},model:{value:t.checkAll,callback:function(e){t.checkAll=e},expression:"checkAll"}}):a("span",[t._v(t._s(e.title))])],1)})),t.data.length?t._l(t.data,(function(e,i){return a("tr",{key:"tr"+i},t._l(t.title,(function(n,s){return a("td",{key:"td"+s,attrs:{align:n.align}},["CheckBox"==n.type?a("Checkbox",{on:{"on-change":function(a){return t.selectRow(i,e.isCheck)}},model:{value:e.isCheck,callback:function(a){t.$set(e,"isCheck",a)},expression:"item.isCheck"}}):t._e(),"Text"==n.type?a("span",["isDisable"==n.key&&0==e[n.key]?a("span",{staticClass:"status-success"},[t._v("启用")]):"isDisable"==n.key&&1==e[n.key]?a("span",{staticClass:"status-fail"},[t._v("禁用")]):"target"==n.key&&1==e[n.key]?a("span",[t._v("当前页打开")]):"target"==n.key&&2==e[n.key]?a("span",[t._v("新页面跳转")]):a("span",[t._v(t._s(e[n.key]))])]):t._e(),"Input"==n.type?a("Input",{model:{value:e[n.key],callback:function(a){t.$set(e,n.key,a)},expression:"item[th.key]"}}):t._e(),"UploadImg"==n.type?a("div",[a("SingleImage",{attrs:{src:e[n.key],index:i,preview:!0,"show-hint":!1,"file-size":t.imgMaxSize},on:{"get-img-url":function(e){return t.setImg(e,i)}}})],1):t._e(),"Button"==n.type?a("div",t._l(n.button,(function(e,n){return a("span",{key:n},[a("Button",{staticClass:"table-btn",style:{"min-width":e.minWidth+"px"},attrs:{type:e.type,size:e.size},on:{click:function(a){return t.buttonOperate(e,i)}}},[t._v(t._s(e.text))])],1)})),0):t._e()],1)})),0)})):a("tr",[a("td",{attrs:{colspan:t.title.length,align:"center"}},[t._v(t._s(t.emptyText))])])],2)])},n=[],s=(a("a9e3"),a("d3b7"),a("159b"),a("a434"),a("a6c3")),o=a("ed08"),r={name:"editableTable",components:{SingleImage:s["a"]},props:{title:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},emptyText:{type:String,default:"暂无数据"},imgMaxSize:{type:Number,default:2048}},data:function(){return{selectList:[],checkAll:!1,showImgModal:!1,imgUrl:"",rowIndex:-1}},methods:{selectAll:function(t){var e=this;this.data.forEach((function(a){t?(a.isCheck=!0,e.selectList.push(a)):(a.isCheck=!1,e.clearSelect())})),this.$emit("on-all-select",this.selectList)},selectRow:function(t,e){var a=this.data[t];e?this.selectList.push(a):this.removeSelectRow(t),this.$emit("on-select",this.selectList,a)},removeSelectRow:function(t){var e=this,a=this.data[t];this.selectList.forEach((function(t,i){t==a&&(a.isCheck=!1,e.selectList.splice(i,1))}))},clearSelect:function(){this.selectList=[]},setImg:function(t,e){this.data[e].img=t},buttonOperate:function(t,e){var a=this.data[e];"save"==t.click?this.$emit("on-save",a):"delete"==t.click&&(this.$emit("on-delete",a),a.isCheck&&this.removeSelectRow(e),this.data.splice(e,1))},notFoundPic:function(t){Object(o["p"])(t,2)}}},c=r,l=(a("381b"),a("2877")),u=Object(l["a"])(c,i,n,!1,null,"3a3ebc50",null);e["a"]=u.exports},"6b15":function(t,e,a){},"78b5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"g-content"},[a("Alert",{staticClass:"g-mb15",attrs:{closable:""}},[t._v("温馨提醒：Mock数据，请勿刷新页面，刷新后当前数据则不存在啦，会提示“找不到该板块下的内容”")]),a("div",{staticClass:"m-operation"},[a("Button",{staticClass:"operation-btn",attrs:{type:"primary"},on:{click:t.openModel}},[t._v("新增")]),a("Button",{staticClass:"operation-btn",attrs:{type:"warning",disabled:0==t.selectList.length},on:{click:t.deleteData}},[t._v("删除")]),a("Button",{staticClass:"operation-btn",attrs:{type:"default"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),t.pageLoading?a("Loading"):a("div",[a("EditableTable",{attrs:{title:t.title,data:t.listData},on:{"on-select":t.getSelectRowData,"on-all-select":t.getSelectRowData,"on-save":t.saveThis}}),a("Page",{attrs:{"class-name":"m-page","show-elevator":"","show-sizer":"","show-total":"",total:t.page.dataCount,"page-size":t.page.pageSize,current:t.page.pageNo,"page-size-opts":t.page.pageSizeOpts},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}}),a("div",{staticClass:"clearfix"})],1),a("Modal",{attrs:{title:"新增内容"},on:{"on-cancel":function(e){return t.closeModal("paramsForm")}},model:{value:t.showAddModal,callback:function(e){t.showAddModal=e},expression:"showAddModal"}},[a("div",[a("Form",{ref:"paramsForm",attrs:{model:t.paramsForm,rules:t.validate,"label-width":100}},[a("Form-item",{attrs:{label:"内容标题：",prop:"title"}},[a("Input",{model:{value:t.paramsForm.title,callback:function(e){t.$set(t.paramsForm,"title",e)},expression:"paramsForm.title"}})],1),a("Form-item",{attrs:{label:"封面图片："}},[a("SingleImage",{attrs:{src:t.paramsForm.img},on:{"update:src":function(e){return t.$set(t.paramsForm,"img",e)}}})],1),a("Form-item",{attrs:{label:"跳转链接："}},[a("Input",{model:{value:t.paramsForm.url,callback:function(e){t.$set(t.paramsForm,"url",e)},expression:"paramsForm.url"}})],1)],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{size:"large"},on:{click:function(e){return t.closeModal("paramsForm")}}},[t._v("取消")]),a("Button",{attrs:{type:"primary",size:"large"},on:{click:function(e){return t.add("paramsForm")}}},[t._v("确定")])],1)])],1)},n=[],s=a("5530"),o=(a("d3b7"),a("159b"),a("d81d"),a("a6c3")),r=a("648f"),c=a("be51"),l=(a("ff51"),a("ed08")),u=a("4210"),d=a("1b62"),p=a("2f62"),m={components:{SingleImage:o["a"],EditableTable:r["a"],Loading:c["a"]},mixins:[d["e"],d["d"],d["c"],d["f"]],computed:Object(s["a"])(Object(s["a"])({},Object(p["b"])(["getImageUrl"])),{},{apiGetList:function(){var t=this;return function(){return u["a"].GetContList(t.sectionId,t.page.pageNo,t.page.pageSize)}},apiAdd:function(){var t=this;return function(){return u["a"].AddCont(t.paramsForm)}},apiDelete:function(){var t=this;return function(){return u["a"].DeleteCont(t.selectList)}},apiEdit:function(){var t=this;return function(){return u["a"].EditCont(t.paramsForm,t.editId)}}}),data:function(){return{pageLoading:!1,checkAll:!1,paramsForm:{title:"",img:"",url:"",sectionId:""},validate:{title:[{required:!0,message:"内容标题不能为空",trigger:"blur"}]},sectionId:"",showAddModal:!1,title:[{title:"全选",key:"selecAll",align:"center",type:"CheckBox",width:"50"},{title:"编号",key:"id",align:"center",type:"Text",width:"100"},{title:"内容标题",key:"title",align:"center",type:"Input"},{title:"封面图片",key:"img",align:"center",type:"UploadImg",width:"300"},{title:"跳转链接",key:"url",align:"center",type:"Input"},{title:"操作",key:"operate",align:"center",type:"Button",button:[{type:"primary",size:"small",minWidth:"64",text:"保存",click:"save"}],width:"180"}],listData:[]}},created:function(){this.init()},methods:{init:function(){this.$store.commit("SET_BREADCRUMB",[{name:"首页",path:"/Home"},{name:"板块列表",path:"/Examples/SectionManage/List"},{name:"内容管理",path:""}]),this.sectionId=Object(l["l"])("id"),this.getTableList(),this.initData(this.listData)},initData:function(t){if(!t||!t.length)return!1;t.forEach((function(t){t.isCheck=!1}))},setListData:function(t){t.length>0?this.listData=t.map((function(t){return{id:t.objectId,title:t.title,img:t.img,url:t.url}})):this.listData=[]},saveThis:function(t){var e=t.id,a=t.title,i=t.img,n=t.url;this.paramsForm={sectionId:this.sectionId,id:e,title:a,img:i,url:n},this.editData()},openModel:function(){this.showAddModal=!0,this.paramsForm.title="",this.paramsForm.img="",this.paramsForm.url="",this.paramsForm.sectionId=this.sectionId},closeModal:function(t){this.showAddModal=!1,this.$refs[t].resetFields()},add:function(t){var e=this;this.$refs[t].validate((function(a){a?(e.addData(),e.closeModal(t)):e.$Message.error("提交失败！填写有误")}))},getSelectRowData:function(t){var e=this;t.forEach((function(t){return e.selectList.push(t.id)}))},notFoundPic:function(t){Object(l["p"])(t,2)}}},f=m,h=(a("826d"),a("2877")),g=Object(h["a"])(f,i,n,!1,null,"dcb9a896",null);e["default"]=g.exports},"826d":function(t,e,a){"use strict";a("1979")},a6c3:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-Upload",attrs:{id:"singleImage"}},[""!=t.getImageUrl?a("div",{staticClass:"upload-show"},[a("div",{staticClass:"upload-img-wrap"},[a("img",{staticClass:"upload-image",attrs:{src:t.getImageUrl,alt:"图片加载失败"},on:{error:t.notFoundPic}})]),a("div",{staticClass:"upload-mask"},[t.preview?a("Icon",{staticClass:"g-mr10",attrs:{type:"md-eye"},nativeOn:{click:function(e){return t.viewImage.apply(null,arguments)}}}):t._e(),a("Icon",{attrs:{type:"md-create"},nativeOn:{click:function(e){return t.uploadClick.apply(null,arguments)}}})],1)]):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showUploadBtn,expression:"showUploadBtn"}],staticClass:"upload-btn",on:{click:t.uploadClick}},[a("Icon",{attrs:{type:"md-camera",size:"20"}}),a("input",{ref:"imgFile",attrs:{type:"file",accept:t.format,hidden:""},on:{change:t.selectFile}})],1),"finished"!=t.uploadStatus?[t.showProgress?a("Progress",{staticStyle:{width:"340px"},attrs:{percent:t.percentage,"hide-info":"","stroke-width":3}}):t._e()]:t._e(),t.showHint?a("div",{staticClass:"hint"},[t._v(" * 图片格式要求：jpg、jpeg、png，文件大小为 "),t.fileSize<1024?a("span",[t._v(t._s(t.fileSize)+"kb")]):a("span",[t._v(t._s(Math.floor(t.fileSize/1024))+"M")]),t._v(" 以内。 ")]):t._e(),a("div",{staticClass:"clearfix"}),a("Modal",{staticClass:"m-view-img",attrs:{title:"查看图片",width:"600"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[a("img",{attrs:{src:t.getImageUrl},on:{error:t.notFoundPic}}),a("div",{attrs:{slot:"footer"},slot:"footer"})])],2)},n=[],s=(a("a9e3"),a("ff51"),a("1b62")),o={name:"singleImage",mixins:[s["f"]],props:{src:{type:String,default:""},preview:{type:Boolean,default:!1},showHint:{type:Boolean,default:!0},sizeHint:{type:String,default:"100*100px"},fileSize:{type:Number,default:150},index:{type:Number,default:-1}},watch:{src:function(t){this.showUploadBtn=!t,this.getImageUrl=t}},data:function(){return{getImageUrl:this.src,showUploadBtn:!this.src}},methods:{uploadFile:function(t){var e=this;this.uploadFileDemo(t).then((function(t){var a=t.data.url;e.$emit("update:src",a),e.$emit("get-img-url",a)})).catch((function(t){return console.log(t)}))}}},r=o,c=(a("d222"),a("2877")),l=Object(c["a"])(r,i,n,!1,null,"2a164318",null);e["a"]=l.exports},a9e3:function(t,e,a){"use strict";var i=a("83ab"),n=a("da84"),s=a("e330"),o=a("94ca"),r=a("cb2d"),c=a("1a2d"),l=a("7156"),u=a("3a9b"),d=a("d9b5"),p=a("c04e"),m=a("d039"),f=a("241c").f,h=a("06cf").f,g=a("9bf2").f,b=a("408a"),v=a("58a8").trim,y="Number",k=n[y],w=k.prototype,I=n.TypeError,_=s("".slice),A=s("".charCodeAt),C=function(t){var e=p(t,"number");return"bigint"==typeof e?e:F(e)},F=function(t){var e,a,i,n,s,o,r,c,l=p(t,"number");if(d(l))throw I("Cannot convert a Symbol value to a number");if("string"==typeof l&&l.length>2)if(l=v(l),e=A(l,0),43===e||45===e){if(a=A(l,2),88===a||120===a)return NaN}else if(48===e){switch(A(l,1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+l}for(s=_(l,2),o=s.length,r=0;r<o;r++)if(c=A(s,r),c<48||c>n)return NaN;return parseInt(s,i)}return+l};if(o(y,!k(" 0o1")||!k("0b1")||k("+0x1"))){for(var E,S=function(t){var e=arguments.length<1?0:k(C(t)),a=this;return u(w,a)&&m((function(){b(a)}))?l(Object(e),a,S):e},x=i?f(k):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),O=0;x.length>O;O++)c(k,E=x[O])&&!c(S,E)&&g(S,E,h(k,E));S.prototype=w,w.constructor=S,r(n,y,S)}},be51:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-load",attrs:{id:"loading"}},[a("Spin",[a("Icon",{staticClass:"spin-icon-load",attrs:{type:"ios-loading",size:"18"}}),a("div",[t._v("玩命加载中...")])],1)],1)},n=[],s={name:"loading",data:function(){return{}}},o=s,r=(a("60d3"),a("2877")),c=Object(r["a"])(o,i,n,!1,null,"7ab36466",null);e["a"]=c.exports},d222:function(t,e,a){"use strict";a("6b15")},ff51:function(t,e,a){"use strict";var i,n=a("ade3");e["a"]=(i={APPLICATION_ID:"07ffab130cdf11f91381f18779fcf697",REST_API_KEY:"653887187daf660941971acf257cccc1",regCompanyName:/^[\u4E00-\u9FA5a-zA-Z]((?![·\.\(\)（）]{2,4})([\u4E00-\u9FA5a-zA-Z·\.\(\)（）])){0,98}[\u4E00-\u9FA5]$/,regRealName:/^[\u4E00-\u9FA5](([\u4E00-\u9FA5]|·(?!·))){0,18}[\u4E00-\u9FA5]$/,regUscCode:/^[0-9A-ZW]{18}$/,regBankAccount:/^[1-9]\d{7,25}$/,regPostCode:/^[1-9]\d{5}$/,regEmail:/^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/},Object(n["a"])(i,"regCompanyName",/^[\u4E00-\u9FA5a-zA-Z]((?![·\.\(\)（）]{2,4})([\u4E00-\u9FA5a-zA-Z·\.\(\)（）])){0,98}[\u4E00-\u9FA5]$/),Object(n["a"])(i,"regMobile",/^1(3|4|5|7|8)\d{9}$/),Object(n["a"])(i,"regPassword",/^[\w]{6,12}$/),Object(n["a"])(i,"regWebsite",/^[\u4E00-\u9FA5A\w\-_]+(\.[\u4E00-\u9FA5A\w\-_]+)+([\u4E00-\u9FA5A\w\-\.,@?^=%&amp;:/~\+#]*[\u4E00-\u9FA5A\w\-\@?^=%&amp;/~\+#])?/),Object(n["a"])(i,"regPhone",/^(1\d{10}$)|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/),Object(n["a"])(i,"regExpressNum",/^[1-9]\d{9,17}$/),Object(n["a"])(i,"regOrderID",/^[0-9A-ZW]{20}$/),Object(n["a"])(i,"regInvoiceID",/^[1-9]\d{1,10}$/),i)}}]);