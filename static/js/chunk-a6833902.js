(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a6833902"],{"1df5":function(t,e,r){},2386:function(t,e,r){"use strict";var i=r("97d8"),s=r.n(i);s.a},"57f7":function(t,e,r){},"62cd":function(t,e,r){"use strict";var i=r("57f7"),s=r.n(i);s.a},"846d":function(t,e,r){},"97d8":function(t,e,r){},"9dc9":function(t,e,r){"use strict";var i=r("846d"),s=r.n(i);s.a},a6c3:function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-Upload",attrs:{id:"singleImage"}},[""!=t.getImageUrl?r("div",{staticClass:"upload-show"},[r("div",{staticClass:"upload-img-wrap"},[r("img",{staticClass:"upload-image",attrs:{src:t.getImageUrl,alt:"图片加载失败"},on:{error:t.notFoundPic}})]),t.preview?r("div",{staticClass:"upload-mask"},[t.preview?r("Icon",{staticClass:"g-mr10",attrs:{type:"md-eye"},nativeOn:{click:function(e){return t.viewImage(e)}}}):t._e(),r("Icon",{attrs:{type:"md-create"},nativeOn:{click:function(e){return t.uploadClick(e)}}})],1):t._e()]):t._e(),r("div",{directives:[{name:"show",rawName:"v-show",value:t.showUploadBtn,expression:"showUploadBtn"}],staticClass:"upload-btn",on:{click:t.uploadClick}},[r("Icon",{attrs:{type:"md-camera",size:"20"}}),r("input",{ref:"imgFile",attrs:{type:"file",accept:t.format,hidden:""},on:{change:t.selectFile}})],1),"finished"!=t.uploadStatus?[t.showProgress?r("Progress",{staticStyle:{width:"340px"},attrs:{percent:t.percentage,"hide-info":"","stroke-width":3}}):t._e()]:t._e(),r("br"),r("span",{staticClass:"hint"},[t._v("\n    * 图片格式要求：jpg、jpeg、png，文件大小为\n    "),t.fileSize<1024?r("span",[t._v(t._s(t.fileSize)+"kb")]):r("span",[t._v(t._s(Math.floor(t.fileSize/1024))+"M")]),t._v("\n    以内。\n  ")]),r("div",{staticClass:"clearfix"}),r("Modal",{staticClass:"m-view-img",attrs:{title:"查看图片",width:"600"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[r("img",{attrs:{src:t.getImageUrl},on:{error:t.notFoundPic}}),r("div",{attrs:{slot:"footer"},slot:"footer"})])],2)},s=[],a=(r("7f7f"),r("c5f6"),r("ff51"),r("1b62")),l={name:"singleImage",mixins:[a["f"]],props:{src:{type:String,default:""},preview:{type:Boolean,default:!1},sizeHint:{type:String,default:"100*100px"},fileSize:{type:Number,default:150}},watch:{src:function(t){this.showUploadBtn=!t,this.getImageUrl=t}},data:function(){return{getImageUrl:this.src,showUploadBtn:!this.src}},methods:{uploadFile:function(t){var e=this;this.progressShow();var r=Bmob.File(t.name,t);this.uploadToBomb(r).then((function(t){e.getImageUrl=t[0].url,e.$emit("update:src",e.getImageUrl),e.$emit("get-img-url",e.getImageUrl)})).catch((function(t){return console.log(t)}))}}},o=l,p=(r("62cd"),r("2877")),n=Object(p["a"])(o,i,s,!1,null,"3111636a",null);e["a"]=n.exports},ddb3:function(t,e,r){"use strict";var i=r("1df5"),s=r.n(i);s.a},e9ee:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"g-content"},[r("h2",{staticClass:"m-title"},[t._v("单图片上传")]),r("div",{staticClass:"m-content"},[r("div",{staticClass:"m-compo-part"},[r("SingleImage",{attrs:{src:t.sUploadAttr.src,preview:t.sUploadAttr.preview,"size-hint":t.sUploadAttr.sizeHint,"file-size":t.sUploadAttr.fileSize},on:{"update:src":function(e){return t.$set(t.sUploadAttr,"src",e)}}}),t._m(0),t._m(1)],1),r("div",{staticClass:"m-test-part"},[r("p",{staticClass:"g-mb10"},[t._v("组件属性值测试：")]),r("Form",{ref:"sUploadAttr",staticStyle:{width:"400px"},attrs:{model:t.sUploadAttr,rules:t.uploadValid,"label-width":75}},[r("Form-item",{attrs:{label:"preview：",prop:"setPreview"}},[r("RadioGroup",{model:{value:t.sUploadAttr.setPreview,callback:function(e){t.$set(t.sUploadAttr,"setPreview",e)},expression:"sUploadAttr.setPreview"}},[r("Radio",{attrs:{label:"true"}},[t._v("true")]),r("Radio",{attrs:{label:"false"}},[t._v("false")])],1)],1),r("Form-item",{attrs:{label:"src：",prop:"setSrc"}},[r("Input",{attrs:{placeholder:"请输入显示图片路径，例如：https://file.iviewui.com/dist/87ead0a68423c0844ddd159f0cde42b3.jpg"},model:{value:t.sUploadAttr.setSrc,callback:function(e){t.$set(t.sUploadAttr,"setSrc",e)},expression:"sUploadAttr.setSrc"}})],1),r("Form-item",{attrs:{label:"sizeHint：",prop:"setSizeHint"}},[r("Input",{attrs:{placeholder:"请输入尺寸建议，例如：100*100px"},model:{value:t.sUploadAttr.setSizeHint,callback:function(e){t.$set(t.sUploadAttr,"setSizeHint",e)},expression:"sUploadAttr.setSizeHint"}})],1),r("Form-item",{attrs:{label:"fileSize：",prop:"setFileSize"}},[r("Input",{attrs:{placeholder:"请输入限制最大文件大小，例如：1024"},model:{value:t.sUploadAttr.setFileSize,callback:function(e){t.$set(t.sUploadAttr,"setFileSize",e)},expression:"sUploadAttr.setFileSize"}})],1),r("Form-item",[r("Button",{staticClass:"g-mr10",attrs:{type:"primary"},on:{click:function(e){return t.uploadAttrTest("sUploadAttr",1)}}},[t._v("测试")]),r("Button",{attrs:{type:"default"},on:{click:function(e){return t.clearForm("sUploadAttr",1)}}},[t._v("重置")])],1)],1)],1)]),r("h2",{staticClass:"m-title"},[t._v("多图片上传")]),r("div",{staticClass:"m-content"},[r("div",{staticClass:"m-compo-part"},[r("MultipleImage",{attrs:{"img-list":t.mUploadAttr.imgList,preview:t.mUploadAttr.preview,"size-hint":t.mUploadAttr.sizeHint,"file-size":t.mUploadAttr.fileSize,"max-num":t.mUploadAttr.maxNum},on:{"update:imgList":function(e){return t.$set(t.mUploadAttr,"imgList",e)},"update:img-list":function(e){return t.$set(t.mUploadAttr,"imgList",e)}}}),t._m(2),t._m(3)],1),r("div",{staticClass:"m-test-part"},[r("p",{staticClass:"g-mb10"},[t._v("组件属性值测试：")]),r("Form",{ref:"mUploadAttr",staticStyle:{width:"400px"},attrs:{model:t.mUploadAttr,rules:t.uploadValid,"label-width":75}},[r("Form-item",{attrs:{label:"preview：",prop:"setPreview"}},[r("RadioGroup",{model:{value:t.mUploadAttr.setPreview,callback:function(e){t.$set(t.mUploadAttr,"setPreview",e)},expression:"mUploadAttr.setPreview"}},[r("Radio",{attrs:{label:"true"}},[t._v("true")]),r("Radio",{attrs:{label:"false"}},[t._v("false")])],1)],1),r("Form-item",{attrs:{label:"sizeHint：",prop:"setSizeHint"}},[r("Input",{attrs:{placeholder:"请输入尺寸建议，例如：100*100px"},model:{value:t.mUploadAttr.setSizeHint,callback:function(e){t.$set(t.mUploadAttr,"setSizeHint",e)},expression:"mUploadAttr.setSizeHint"}})],1),r("Form-item",{attrs:{label:"fileSize：",prop:"setFileSize"}},[r("Input",{attrs:{placeholder:"请输入限制最大文件大小，例如：1024"},model:{value:t.mUploadAttr.setFileSize,callback:function(e){t.$set(t.mUploadAttr,"setFileSize",e)},expression:"mUploadAttr.setFileSize"}})],1),r("Form-item",{attrs:{label:"fileSize：",prop:"setMaxNum"}},[r("Input",{attrs:{placeholder:"请输入限制上传最大个数，例如：3"},model:{value:t.mUploadAttr.setMaxNum,callback:function(e){t.$set(t.mUploadAttr,"setMaxNum",e)},expression:"mUploadAttr.setMaxNum"}})],1),r("Form-item",[r("Button",{staticClass:"g-mr10",attrs:{type:"primary"},on:{click:function(e){return t.uploadAttrTest("mUploadAttr",2)}}},[t._v("测试")]),r("Button",{attrs:{type:"default"},on:{click:function(e){return t.clearForm("mUploadAttr",2)}}},[t._v("重置")])],1)],1)],1)]),r("h2",{staticClass:"m-title"},[t._v("图片裁剪")]),r("div",{staticClass:"m-content"},[r("div",{staticClass:"m-compo-part"},[r("ImageCropper",{attrs:{src:t.imgCropAttr.src,preview:t.imgCropAttr.preview,"size-hint":t.imgCropAttr.sizeHint,"file-size":t.imgCropAttr.fileSize,"auto-crop-width":t.imgCropAttr.autoCropWidth,"auto-crop-height":t.imgCropAttr.autoCropHeight,fixed:t.imgCropAttr.fixed,"fixed-number":t.imgCropAttr.fixedNumber},on:{"update:src":function(e){return t.$set(t.imgCropAttr,"src",e)}}}),t._m(4),t._m(5)],1),r("div",{staticClass:"m-test-part"},[r("p",{staticClass:"g-mb10"},[t._v("组件属性值测试：")]),r("Form",{ref:"imgCropAttr",staticStyle:{width:"400px"},attrs:{model:t.imgCropAttr,rules:t.uploadValid,"label-width":110}},[r("Form-item",{attrs:{label:"preview：",prop:"setPreview"}},[r("RadioGroup",{model:{value:t.imgCropAttr.setPreview,callback:function(e){t.$set(t.imgCropAttr,"setPreview",e)},expression:"imgCropAttr.setPreview"}},[r("Radio",{attrs:{label:"true"}},[t._v("true")]),r("Radio",{attrs:{label:"false"}},[t._v("false")])],1)],1),r("Form-item",{attrs:{label:"src：",prop:"setSrc"}},[r("Input",{attrs:{placeholder:"请输入显示图片路径，例如：https://file.iviewui.com/dist/87ead0a68423c0844ddd159f0cde42b3.jpg"},model:{value:t.imgCropAttr.setSrc,callback:function(e){t.$set(t.imgCropAttr,"setSrc",e)},expression:"imgCropAttr.setSrc"}})],1),r("Form-item",{attrs:{label:"sizeHint：",prop:"setSizeHint"}},[r("Input",{attrs:{placeholder:"请输入尺寸建议，例如：100*100px"},model:{value:t.imgCropAttr.setSizeHint,callback:function(e){t.$set(t.imgCropAttr,"setSizeHint",e)},expression:"imgCropAttr.setSizeHint"}})],1),r("Form-item",{attrs:{label:"fileSize：",prop:"setFileSize"}},[r("Input",{attrs:{placeholder:"请输入限制最大文件大小，例如：1024"},model:{value:t.imgCropAttr.setFileSize,callback:function(e){t.$set(t.imgCropAttr,"setFileSize",e)},expression:"imgCropAttr.setFileSize"}})],1),r("Form-item",{attrs:{label:"autoCropWidth：",prop:"setAutoCropWidth"}},[r("Input",{attrs:{placeholder:"请输入裁剪宽度，例如：200"},model:{value:t.imgCropAttr.setAutoCropWidth,callback:function(e){t.$set(t.imgCropAttr,"setAutoCropWidth",e)},expression:"imgCropAttr.setAutoCropWidth"}})],1),r("Form-item",{attrs:{label:"autoCropHeight：",prop:"setAutoCropHeight"}},[r("Input",{attrs:{placeholder:"请输入裁剪高度，例如：200"},model:{value:t.imgCropAttr.setAutoCropHeight,callback:function(e){t.$set(t.imgCropAttr,"setAutoCropHeight",e)},expression:"imgCropAttr.setAutoCropHeight"}})],1),r("Form-item",{attrs:{label:"fixed：",prop:"setFixed"}},[r("RadioGroup",{model:{value:t.imgCropAttr.setFixed,callback:function(e){t.$set(t.imgCropAttr,"setFixed",e)},expression:"imgCropAttr.setFixed"}},[r("Radio",{attrs:{label:"true"}},[t._v("true")]),r("Radio",{attrs:{label:"false"}},[t._v("false")])],1)],1),r("Form-item",{attrs:{label:"fixedNumber：",prop:"setFixedNumber"}},[r("Input",{attrs:{placeholder:"请输入高宽比例以冒号隔开，例如 4:3"},model:{value:t.imgCropAttr.setFixedNumber,callback:function(e){t.$set(t.imgCropAttr,"setFixedNumber",e)},expression:"imgCropAttr.setFixedNumber"}})],1),r("Form-item",[r("Button",{staticClass:"g-mr10",attrs:{type:"primary"},on:{click:function(e){return t.uploadAttrTest("imgCropAttr",3)}}},[t._v("测试")]),r("Button",{attrs:{type:"default"},on:{click:function(e){return t.clearForm("imgCropAttr",3)}}},[t._v("重置")])],1)],1)],1)]),r("h2",{staticClass:"m-title"},[t._v("图片展示（可多图展示）")]),r("div",{staticClass:"m-content"},[r("div",{staticClass:"m-compo-part"},[t.imgUrlArr.length?r("ShowImage",{attrs:{"image-url-arr":t.imgUrlArr}}):r("div",[t._v("暂无图片，请在测试功能中添加链接查看效果")]),t._m(6)],1),r("div",{staticClass:"m-test-part m-show-img-block"},[r("Button",{staticClass:"fl g-mr10",attrs:{type:"primary"},on:{click:t.clearImgUrl}},[t._v("清空图片链接")]),r("Button",{staticClass:"fl",attrs:{type:"primary"},on:{click:t.showTest}},[t._v("测试功能")]),r("div",{staticClass:"clearfix"}),t.addFunDisplay?r("Form",{ref:"addUrlPart",staticClass:"g-mt20",attrs:{model:t.addUrlPart,rules:t.addValid,"label-width":100}},[r("Form-item",{staticClass:"fl g-mr10",attrs:{label:"新增URL：",prop:"url"}},[r("Input",{staticStyle:{width:"460px"},attrs:{placeholder:"请输入需要展示的图片链接"},model:{value:t.addUrlPart.url,callback:function(e){t.$set(t.addUrlPart,"url",e)},expression:"addUrlPart.url"}})],1),r("Button",{staticClass:"fl g-mr10",attrs:{type:"primary"},on:{click:function(e){return t.addShowImgUrl("addUrlPart")}}},[t._v("新增")]),r("Button",{staticClass:"fl",attrs:{type:"default"},on:{click:function(e){return t.clearForm("addUrlPart",4)}}},[t._v("重置")]),r("div",{staticClass:"clearfix"})],1):t._e(),t.imgUrlArr.length?r("p",{class:t.addFunDisplay?"":"g-mt20"},[t._v("当前显示图片Url: ")]):t._e(),t.imgUrlArr.length&&""!=t.imgUrlArr[0]?r("ul",{staticClass:"g-mt15"},t._l(t.imgUrlArr,(function(e,i){return r("li",{key:i,staticClass:"g-mb10"},[r("a",{attrs:{href:e,target:"_blank"}},[t._v(t._s(i+1)+". "+t._s(e))])])})),0):r("p",{staticClass:"g-mt15",staticStyle:{color:"#aaa"}},[t._v("暂无图片链接")])],1)])])},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("属性：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("src")]),t._v('：显示的图片路径。String类型，默认值为""，不显示')]),r("p",[r("span",{staticClass:"attr-text"},[t._v("preview")]),t._v("：是否可预览。Boolean类型，默认值为false，不可预览")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("sizeHint")]),t._v('：是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"')]),r("p",[r("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大图片文件大小，单位kb。Number类型，默认值为150")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("事件：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("get-img-url")]),t._v("：上传成功触发，返回图片URL")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("属性：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("preview")]),t._v("：是否可预览。Boolean类型，默认值为false，不可预览")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("sizeHint")]),t._v('：是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"')]),r("p",[r("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大图片文件大小，单位kb。Number类型，默认值为150")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("maxNum")]),t._v("：设置最大上传个数。Number类型，默认值为5")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("事件：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("get-img-list")]),t._v("：上传成功触发，返回图片URL数组")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("属性：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("src")]),t._v('：显示的图片路径。String类型，默认值为""，不显示')]),r("p",[r("span",{staticClass:"attr-text"},[t._v("preview")]),t._v("：是否可预览。Boolean类型，默认值为false，不可预览")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("sizeHint")]),t._v('：是否显示图片尺寸建议。String类型，默认不显示。设置其他值：size-hint="100*100px"')]),r("p",[r("span",{staticClass:"attr-text"},[t._v("fileSize")]),t._v("：设置最大图片文件大小，单位kb。Number类型，默认值为150")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("autoCropWidth")]),t._v("：设置裁剪宽度，单位px。Number类型，默认值为100")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("autoCropHeight")]),t._v("：设置裁剪高度，单位px。Number类型，默认值为100")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("fixed")]),t._v("：是否限制裁剪高宽比例。Boolean类型，默认值为false，不限制")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("fixedNumber")]),t._v("：设置裁剪高宽比例，只有限制高宽比例时才有用。Array类型，默认值为[4, 3]，即比例为4：3")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("事件：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("get-img-url")]),t._v("：上传成功触发，返回图片URL")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-desc"},[r("p",[t._v("属性：")]),r("p",[r("span",{staticClass:"attr-text"},[t._v("imageUrlArr")]),t._v("：图片的URL地址集合。Array类型，默认值为空数组")])])}],a=(r("a481"),r("c5f6"),r("a6c3")),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"m-Upload",attrs:{id:"multipleImage"}},[t._l(t.getImageUrlArr,(function(e,i){return r("div",{key:i,ref:"upload-img-"+i,refInFor:!0,staticClass:"upload-show"},[r("div",{staticClass:"upload-img-wrap"},[r("img",{staticClass:"upload-image",attrs:{src:e,alt:"图片加载失败"},on:{error:t.notFoundPic}})]),r("div",{staticClass:"upload-mask"},[t.preview?r("Icon",{staticClass:"g-mr10",attrs:{type:"md-eye"},nativeOn:{click:function(r){return t.viewImage(e)}}}):t._e(),r("Icon",{attrs:{type:"md-trash"},nativeOn:{click:function(e){return t.removeImage("upload-img-"+i,i)}}})],1)])})),r("div",{staticClass:"upload-btn",on:{click:t.uploadClick}},[r("Icon",{attrs:{type:"md-camera",size:"20"}}),r("input",{ref:"imgFile",attrs:{type:"file",accept:t.format,hidden:""},on:{change:t.selectFile}})],1),"finished"!=t.uploadStatus?[t.showProgress?r("Progress",{staticStyle:{width:"340px"},attrs:{percent:t.percentage,"hide-info":"","stroke-width":3}}):t._e()]:t._e(),r("br"),r("span",{staticClass:"hint"},[t._v("\n    * 图片格式要求：jpg、jpeg、png，文件大小为\n    "),t.fileSize<1024?r("span",[t._v(t._s(t.fileSize)+"kb")]):r("span",[t._v(t._s(Math.floor(t.fileSize/1024))+"M")]),t._v("\n    以内，最多可上传"+t._s(t.maxNum)+"个文件。\n  ")]),r("div",{staticClass:"clearfix"}),r("Modal",{staticClass:"m-view-img",attrs:{title:"查看图片",width:"600"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[r("img",{attrs:{src:t.showImgUrl},on:{error:t.notFoundPic}}),r("div",{attrs:{slot:"footer"},slot:"footer"})])],2)},o=[],p=(r("7f7f"),r("ff51"),r("1b62")),n={name:"multipleImage",mixins:[p["f"]],props:{imgList:{type:Array,default:function(){return[]}},preview:{type:Boolean,default:!1},sizeHint:{type:String,default:""},fileSize:{type:Number,default:150},maxNum:{type:Number,default:5}},watch:{imgList:function(t){this.getImageUrlArr=t}},data:function(){return{getImageUrlArr:this.imgList}},methods:{viewImage:function(t){this.showImgUrl=t,this.showModal=!0},removeImage:function(t,e){this.getImageUrlArr.splice(e,1),this.$emit("update:imgList",this.getImageUrlArr),this.$emit("get-img-list",this.getImageUrlArr)},uploadFile:function(t){var e=this,r=this.getImageUrlArr.length<this.maxNum;if(!r)return this.$Notice.warning({title:"超出文件个数限制",desc:"最多只能上传"+this.maxNum+"张图片"}),this.progressHide(),r;var i=Bmob.File(t.name,t);this.uploadToBomb(i).then((function(t){e.getImageUrlArr.push(t[0].url),e.$emit("update:imgList",e.getImageUrlArr),e.$emit("get-img-list",e.getImageUrlArr)})).catch((function(t){return console.log(t)}))}}},m=n,c=(r("9dc9"),r("2877")),d=Object(c["a"])(m,l,o,!1,null,"793a73ee",null),u=d.exports,g=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"showImg"}},[t._l(t.imageUrlArr,(function(e,i){return r("div",{key:i,staticClass:"m-show-img"},[r("div",{staticClass:"img-show"},[r("img",{attrs:{src:e},on:{error:t.notFoundPic}})]),r("div",{staticClass:"img-mask"},[r("Icon",{attrs:{type:"md-eye"},nativeOn:{click:function(r){return t.viewImage(e)}}})],1)])})),r("div",{staticClass:"clearfix"}),r("Modal",{staticClass:"m-pop-img",attrs:{title:"查看图片",width:"900"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[r("img",{attrs:{src:t.showImgUrl},on:{error:t.notFoundPic}}),r("div",{attrs:{slot:"footer"},slot:"footer"})])],2)},h=[],v=r("ed08"),f={name:"showImg",props:{imageUrlArr:{type:Array,default:[]}},data:function(){return{showModal:!1,showImgUrl:""}},methods:{viewImage:function(t){this.showModal=!0,this.showImgUrl=t},notFoundPic:function(t){Object(v["p"])(t,2)}}},C=f,A=(r("2386"),Object(c["a"])(C,g,h,!1,null,"84525dba",null)),_=A.exports,b=r("e634"),U={components:{SingleImage:a["a"],MultipleImage:u,ShowImage:_,ImageCropper:b["a"]},data:function(){return{imgCropAttr:{src:"",setSrc:"",preview:!0,setPreview:"true",sizeHint:"",setSizeHint:"",fileSize:150,setFileSize:"",autoCropWidth:100,setAutoCropWidth:"",autoCropHeight:100,setAutoCropHeight:"",fixed:!1,setFixed:"true",fixedNumber:[4,3],setFixedNumber:""},sUploadAttr:{src:"",setSrc:"",preview:!0,setPreview:"true",sizeHint:"",setSizeHint:"",fileSize:150,setFileSize:""},a:{imgList:[]},mUploadAttr:{imgList:[],preview:!0,setPreview:"true",sizeHint:"",setSizeHint:"",fileSize:150,setFileSize:"",maxNum:5,setMaxNum:""},uploadValid:{setSrc:[{pattern:/^[\S]+$/,message:"请不要输入空字符",trigger:"blur"}],setSizeHint:[{pattern:/^[\S]+$/,message:"请不要输入空字符",trigger:"blur"}],setFileSize:[{pattern:/^[\d]+$/,message:"请输入纯数字",trigger:"blur"}],setMaxNum:[{pattern:/^[\d]+$/,message:"请输入纯数字",trigger:"blur"}],setAutoCropWidth:[{pattern:/^[\d]+$/,message:"请输入纯数字",trigger:"blur"}],setAutoCropHeight:[{pattern:/^[\d]+$/,message:"请输入纯数字",trigger:"blur"}]},imgUrlArr:["https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1569462993,172008204&fm=5"],addFunDisplay:!1,addUrlPart:{url:""},addValid:{url:[{required:!0,message:"图片链接不能为空",trigger:"blur"},{pattern:/^[\S]+$/,message:"请不要输入空字符",trigger:"blur"}]}}},created:function(){this.$store.commit("SET_BREADCRUMB",[{name:"首页",path:"/Home"},{name:"Image图片操作",path:"/Components/Image"}])},methods:{addShowImgUrl:function(t){var e=this;this.$refs[t].validate((function(t){t?(e.imgUrlArr.push(e.addUrlPart.url),e.$Message.success("新增成功！请查看功能是否正确")):e.$Message.error("提交失败！填写有误")}))},showTest:function(){this.addFunDisplay=!0},clearImgUrl:function(){this.imgUrlArr=[]},uploadAttrTest:function(t,e){switch(e){case 1:this.sUploadAttr.src=this.sUploadAttr.setSrc,this.sUploadAttr.preview="true"==this.sUploadAttr.setPreview,this.sUploadAttr.sizeHint=this.sUploadAttr.setSizeHint,this.sUploadAttr.fileSize=0==Number(this.sUploadAttr.setFileSize)?150:Number(this.sUploadAttr.setFileSize);break;case 2:this.mUploadAttr.preview="true"==this.mUploadAttr.setPreview,this.mUploadAttr.sizeHint=this.mUploadAttr.setSizeHint,this.mUploadAttr.fileSize=0==Number(this.mUploadAttr.setFileSize)?150:Number(this.mUploadAttr.setFileSize),this.mUploadAttr.maxNum=0==Number(this.mUploadAttr.setMaxNum)?5:Number(this.mUploadAttr.setMaxNum);break;case 3:this.imgCropAttr.src=this.imgCropAttr.setSrc,this.imgCropAttr.preview="true"==this.imgCropAttr.setPreview,this.imgCropAttr.sizeHint=this.imgCropAttr.setSizeHint,this.imgCropAttr.fileSize=0==Number(this.imgCropAttr.setFileSize)?150:Number(this.imgCropAttr.setFileSize),this.imgCropAttr.autoCropWidth=0==Number(this.imgCropAttr.setAutoCropWidth)?100:Number(this.imgCropAttr.setAutoCropWidth),this.imgCropAttr.autoCropHeight=0==Number(this.imgCropAttr.setAutoCropHeight)?100:Number(this.imgCropAttr.setAutoCropHeight),this.imgCropAttr.fixed="true"==this.imgCropAttr.setFixed,this.imgCropAttr.fixedNumber=Object(v["u"])(this.imgCropAttr.setFixedNumber.replace(/：/g,":"),":");break;default:console.log("清空type传值出错")}},clearForm:function(t,e){switch(this.$refs[t].resetFields(),e){case 1:this.sUploadAttr.preview=!0,this.sUploadAttr.sizeHint="",this.sUploadAttr.fileSize=150;break;case 2:this.mUploadAttr.preview=!0,this.mUploadAttr.sizeHint="",this.mUploadAttr.fileSize=150,this.mUploadAttr.maxNum=5;break;case 3:this.imgCropAttr.preview=!0,this.imgCropAttr.sizeHint="",this.imgCropAttr.fileSize=150,this.imgCropAttr.autoCropWidth=100,this.imgCropAttr.autoCropHeight=100,this.imgCropAttr.fixed=!1,this.imgCropAttr.fixedNumber=[4,3];break;case 4:break;default:console.log("清空type传值出错")}}}},w=U,x=(r("ddb3"),Object(c["a"])(w,i,s,!1,null,"1a34efe3",null));e["default"]=x.exports}}]);