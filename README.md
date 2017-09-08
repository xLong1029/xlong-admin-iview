# xlong-test-admin-vue

> a management system for testing only

## 项目说明
该项目为单页应用测试项目，请勿商用。

项目用到技术、框架与插件：Vue2.0+、iView、Less、Bmob。

<<<<<<< HEAD
图片上传用的是七牛云存储。
=======
Bmob的图片上传SDK有跨域问题，所以改用七牛云存储，需要配置token才可以上传。
七牛云存储在线上传凭证地址：http://jsfiddle.net/gh/get/extjs/4.2/icattlecoder/jsfiddle/tree/master/uptoken?ref=developer.qiniu.com
在common.js文件中可修改token
>>>>>>> develop

## 安装项目依赖包
npm install

## 启动项目 端口:6060
npm run dev

## 项目打包
npm run build

## 项目目录
api ----- api目录，专门用来封装api数据请求接口

assets ----- 前端静态资源目录，包括公用css、特殊css、images静态图片、pic大图、js文件、jQuery插件等

bmob ----- 后端云目录，专门用来存放bmob后端云方法

common ----- 专门用来存放一些通用方法、常量

components ----- 专门存放项目中的vue组件，包括公用组件、各页面的功能组件

mixins ----- 专门用来存放混合对象，高效的实现组件内容的复用

mock ----- 专门用来存放一些本地的模拟数据

router ----- 路由目录，专门用来存放页面跳转路由文件

store ----- 仓库目录，数据源存储

theme ----- 主题目录，专门用来存放iView的定制主题样式

pages ----- 项目的页面目录，专门用来存放各页面

* 组件

Loading.vue ----- 封装iView的加载效果

LocatePath.vue ----- 封装iView面包屑组件

MenuTop.vue ----- 封装iView菜单组件的顶部菜单

Sidebar.vue ----- 封装iView菜单组件的侧边栏

FuzzyQuery.vue ----- 模糊查询

InputAndSelect.vue ----- 可输入下拉框 

SingleImage.vue ----- 封装iView文件上传的单图片上传显示

MultipleImage.vue ----- 封装iView文件上传的多图片上传显示

* API数据来源

bmob后端云

* 作者联系方式	
	
QQ：381612175
	
github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI中国：http://i.ui.cn/ucenter/358591.html

* 此项目做学习Vuejs测试使用，有什么问题可联系我讨论
