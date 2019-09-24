import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
// 获取cookie
import { GetCookie } from 'common/important'

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
})

// 不重定向白名单
const whiteList = [ '404', 'Login'];

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
});

export default router
