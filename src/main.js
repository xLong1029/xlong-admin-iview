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

// 启动Mock
import { setupMock } from "./mock/mock-server";
setupMock();

Vue.config.productionTip = false

const app =new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
