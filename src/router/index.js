import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
import Login from '@/views/Login/Login'

// 管理后台主页
import Main from '@/views/Main'
import Home from '@/views/Home/Home'

// 组件相关页面
import UploadImage from '@/views/Components/UploadImage'
import Input from '@/views/Components/Input'

// 示例相关页面
import AccountList from '@/views/Examples/AccountList'

// 错误页面
import Err404 from '@/views/Error/Err404'

const RouterMap = [
    // 后台登录
    { path: '/Login', name: 'Login', component: Login }, 
    // 后台管理页
    {
      path: '/',
      name: 'Main',
      component: Main,
      // 路由重定向
      redirect: '/Home',
      children: [
            // 后台首页
            { path: '/Home', name: 'Home', component: Home },
            // 后台首页
            { path: '/Components/UploadImage', name: 'UploadImage', component: UploadImage },
            // 后台首页
            { path: '/Components/Input', name: 'Input', component: Input },
            // 后台首页
            { path: '/Examples/AccountList', name: 'AccountList', component: AccountList },
            // 404
            { path: '/404', name: '404', component: Err404 },
        ]
    }
]

export default new Router({
    routes: RouterMap
});
