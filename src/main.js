// 解决 ie11打开vue2.0项目空白 问题
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 获取cookie
import { GetCookie } from './common/important'

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

// 不重定向白名单
const whiteList = [ '404', 'Login']

router.beforeEach((to, from, next) => {
	// 获取存储token
	let isLogin = Boolean(GetCookie('xl_admin_t'));
	// 判断是否已登录
	if(isLogin){
		// 如果路由地址为登录页，则重定向到管理后台主页
		if(to.name === 'Login') next({ name : 'Main'});
		else{
			// token验证
			store.dispatch('CheckToken').then(() => next()).catch(() => next({ name : 'Login'}))
		}
	}
	// 没有token则全部重定向到登录页
	else{
		// 免登录白名单，可直接进入
		if(whiteList.indexOf(to.name) !== -1) next();
		else next({ name : 'Login'});
	}
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
