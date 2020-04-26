// 解决 ie11打开vue2.0项目空白 问题
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// ViewUI框架
import ViewUI from 'view-design';
// 定制ViewUI主题样式
import './theme/index.less'
Vue.use(ViewUI)

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// 引用Bomb
import Bmob from "hydrogen-js-sdk";
// Bmob封装方法
import BmobServer from './bmob/bmob-server'
// 挂载到全局使用
Vue.prototype.Bmob = Bmob

Vue.config.productionTip = false

// 初始化BmobSDK
BmobServer.Init();

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
