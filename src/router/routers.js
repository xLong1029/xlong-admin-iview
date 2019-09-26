export default [
  // 后台登录
  {
    path: '/Login',
    name: 'Login',
    component: () => import('views/Passport/Login')
  },
  // 后台管理页
  {
    path: '/',
    name: 'Main',
    component: () => import('views/Layout/Main'),
    // 路由重定向
    redirect: '/Home',
    children: [
      // 后台首页
      {
        path: '/Home',
        name: 'Home',
        meta: {
          roles: ['admin', 'manage', 'user'],
          icon: 'md-home',
					isTitle: true
				},
        hidden: true,
        component: () => import('views/Home/Home')
      },
      // 个人资料
      {
        path: '/Profile',
        name: 'Profile',
        hidden: true,
        component: () => import('views/Profile/Profile')
      },
      // 修改密码
      {
        path: '/ChangePwd',
        name: 'ChangePwd',
        hidden: true,
        component: () => import('views/Profile/ChangePwd')
      },
      // 自定义组件
			{
				path: '/Components',
				name: 'Components',
				meta: {
					title: 'Components',
					icon: 'ios-keypad'
				},
				component: () => import('views/Layout/SecondPane'),
				children:[
					// 图片上传页面
          {
            path: '/Components/Image',
            name: 'Image',
            component: () => import('views/Components/Image')
          },
          // Input输入框页面
          {
            path: '/Components/Input',
            name: 'Input',
            component: () => import('views/Components/Input')
          },
          // 树形演示页面
          {
            path: '/Components/Tree',
            name: 'Tree',
            component: () => import('views/Components/Tree')
          },
          // 侧边栏演示页面
          {
            path: '/Components/Sidebar',
            name: 'Sidebar',
            component: () => import('views/Components/Sidebar/Sidebar'),
            redirect: '/Components/Sidebar/PageA',
            children: [
              // 测试页面一
              {
                path: '/Components/Sidebar/PageA',
                name: 'PageA',
                component: () => import('views/Components/Sidebar/PageA')
              },
              // 测试页面二
              {
                path: '/Components/Sidebar/PageB',
                name: 'PageB',
                component: () => import('views/Components/Sidebar/PageB')
              },
              // 测试页面三
              {
                path: '/Components/Sidebar/PageC',
                name: 'PageC',
                component: () => import('views/Components/Sidebar/PageC')
              },
              // 测试页面四
              {
                path: '/Components/Sidebar/PageD',
                name: 'PageD',
                component: () => import('views/Components/Sidebar/PageD')
              },
            ]
          }
				]
      },
      // 示例
			{
				path: '/Examples',
				name: 'Examples',
				meta: {
          roles: ['admin', 'manage', 'user'],
					title: 'Examples',
					icon: 'ios-paper'
				},
				component: () => import('views/Layout/SecondPane'),
				children:[
					// 账户列表页面
          {
            path: '/Examples/AccountList',
            name: 'AccountList',
            meta: {
              roles: ['admin'],
              title: 'Examples',
              icon: 'ios-paper'
            },
            component: () => import('views/Examples/AccountList/AccountList')
          },
          // 账户列表-新增/编辑
          {
            path: '/Examples/AccountList/StoreAccount',
            name: 'StoreAccount',
            meta: {
              roles: ['admin'],
            },
            hidden: true,
            component: () => import('views/Examples/AccountList/StoreAccount')
          },
          // 板块列表页面
          {
            path: '/Examples/SectionList',
            name: 'SectionList',
            meta: {
              roles: ['admin', 'manage']
            },
            component: () => import('views/Examples/SectionList/SectionList')
          },
          // 板块内容管理页面
          {
            path: '/Examples/SectionList/ContManage',
            name: 'ContManage',
            hidden: true,
            component: () => import('views/Examples/SectionList/ContManage')
          },
          // 产品列表页面
          {
            path: '/Examples/ProductList',
            name: 'ProductList',
            meta: {
              roles: ['admin', 'manage']
            },
            component: () => import('views/Examples/ProductList/ProductList')
          },
          // 产品列表-产品详情
          {
            path: '/Examples/ProductList/ProductDetail',
            name: 'ProductDetail',
            meta: {
              roles: ['admin', 'manage']
            },
            hidden: true,
            component: () => import('views/Examples/ProductList/ProductDetail')
          },
          // 文章列表页面
          {
            path: '/Examples/ArticleList',
            name: 'ArticleList',
            meta: {
              roles: ['admin', 'manage']
            },
            component: () => import('views/Examples/ArticleList/ArticleList')
          },
          // 文章列表-文章详情
          {
            path: '/Examples/ArticleList/StoreArticle',
            name: 'StoreArticle',
            meta: {
              roles: ['admin', 'manage']
            },
            hidden: true,
            component: () => import('views/Examples/ArticleList/StoreArticle')
          },
          // 消息列表页面
          {
            path: '/Examples/MessageList',
            name: 'MessageList',
            meta: {
              roles: ['admin', 'manage', 'user']
            },
            component: () => import('views/Examples/MessageList/MessageList')
          },
				]
			}
    ]
  },
  // 404
  {
    path: '*',
    name: 'Err404',
    component: () => import('views/Error/Err404')
  }
]
