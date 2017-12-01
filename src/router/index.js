import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
import Login from 'pages/Login/Login'

// 管理后台主页
import Main from 'pages/Main'
import Home from 'pages/Home/Home'

// 个人资料
import Profile from 'pages/Profile/Profile'
import ChangePwd from 'pages/Profile/ChangePwd'

// 组件相关页面
import UploadImage from 'pages/Components/UploadImage'
import Input from 'pages/Components/Input'

import Sidebar from 'pages/Components/Sidebar/Sidebar'
import PageOne from 'pages/Components/Sidebar/PageOne'
import PageTwo from 'pages/Components/Sidebar/PageTwo'
import PageThree from 'pages/Components/Sidebar/PageThree'
import PageFour from 'pages/Components/Sidebar/PageFour'

// 示例相关页面
import AccountList from 'pages/Examples/AccountList/AccountList'
import AddAccount from 'pages/Examples/AccountList/AddAccount'
import AccountDetail from 'pages/Examples/AccountList/AccountDetail'

import SectionList from 'pages/Examples/SectionList/SectionList'
import ContManage from 'pages/Examples/SectionList/ContManage'

import ProductList from 'pages/Examples/ProductList/ProductList'
import ProductDetail from 'pages/Examples/ProductList/ProductDetail'

import MessageList from 'pages/Examples/MessageList/MessageList'


// 错误页面
import Err404 from 'pages/Error/Err404'

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
            // 个人资料
            { path: '/Profile', name: 'Profile', component: Profile },
            // 修改密码
            { path: '/ChangePwd', name: 'ChangePwd', component: ChangePwd },
            // 图片上传页面
            { path: '/Components/UploadImage', name: 'UploadImage', component: UploadImage },
            // Input输入框页面
            { path: '/Components/Input', name: 'Input', component: Input },
            // 侧边栏演示页面
            {   
                path: '/Components/Sidebar',
                name: 'Sidebar',
                component: Sidebar,
                redirect: '/Components/Sidebar/PageOne',
                children:[
                    // 测试页面一
                    { path: '/Components/Sidebar/PageOne', name:'PageOne', component: PageOne },
                    // 测试页面二
                    { path: '/Components/Sidebar/PageTwo', name:'PageTwo', component: PageTwo },
                    // 测试页面三
                    { path: '/Components/Sidebar/PageThree', name:'PageThree', component: PageThree },
                    // 测试页面四
                    { path: '/Components/Sidebar/PageFour', name:'PageFour', component: PageFour },
                ]
            },
            // 账户列表页面
            { path: '/Examples/AccountList', name: 'AccountList', component: AccountList },
            // 账户列表-新增账户
            { path: '/Examples/AddAccount', name: 'AddAccount', component: AddAccount },
            // 账户列表-账户详情
            { path: '/Examples/AccountDetail', name: 'AccountDetail', component: AccountDetail },
            // 板块列表页面
            { path: '/Examples/SectionList', name: 'SectionList', component: SectionList },
            // 板块内容管理页面
            { path: '/Examples/SectionList/ContManage', name: 'ContManage', component: ContManage },
            // 产品列表页面
            { path: '/Examples/ProductList', name: 'ProductList', component: ProductList },
            // 产品列表-产品详情
            { path: '/Examples/ProductDetail', name: 'ProductDetail', component: ProductDetail },
            // 消息列表页面
            { path: '/Examples/MessageList', name: 'MessageList', component: MessageList },            
            // 404
            { path: '/404', name: '404', component: Err404 },
        ]
    }
]

export default new Router({
    routes: RouterMap
});
