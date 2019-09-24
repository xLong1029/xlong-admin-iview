// 解决 ie11打开vue2.0项目空白 问题
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// iView框架
import iView from 'iview'
// 定制iView主题样式
// 这里有个坑，会出现各种css-loader,style-loader和less-loader的报错
// 解决方法是安装最新的vue-cli和loader以来，webpack就不需要配置了，因为vue-cli会帮你配置安装的loader
import './theme/index.less'
Vue.use(iView)

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
