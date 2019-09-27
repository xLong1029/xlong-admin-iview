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
          title: 'XLONG家里蹲管理系统',
          roles: ['admin', 'manage', 'user'],
          icon: 'md-home',
          isTitle: true,
          sidebarName: 'Home'
				},
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
          title: '自定义组件',
					icon: 'ios-keypad'
				},
				component: () => import('views/Layout/SecondPane'),
				children:[
					// 图片上传页面
          {
            path: '/Components/Image',
            name: 'Image',
            meta: {
              title: '图片上传',
              sidebarName: 'Image'
            },
            component: () => import('views/Components/Image')
          },
          // Input输入框页面
          {
            path: '/Components/Input',
            name: 'Input',
            meta: {
              title: 'Input 输入框',
              sidebarName: 'Input'
            },
            component: () => import('views/Components/Input')
          },
          // 树形演示页面
          {
            path: '/Components/Tree',
            name: 'Tree',
            meta: {
              title: '树形组件',
              sidebarName: 'Tree'
            },
            component: () => import('views/Components/Tree')
          },
          // 侧边栏演示页面
          {
            path: '/Components/Sidebar',
            name: 'Sidebar',
            component: () => import('views/Components/Sidebar/Sidebar'),
            redirect: '/Components/Sidebar/PageA',
            meta: {
              title: '侧边栏',
              sidebarName: 'Sidebar'
            },
            children: [
              // 测试页面一
              {
                path: '/Components/Sidebar/PageA',
                name: 'PageA',
                meta: {
                  sidebarName: 'Sidebar'
                },
                component: () => import('views/Components/Sidebar/PageA')
              },
              // 测试页面二
              {
                path: '/Components/Sidebar/PageB',
                name: 'PageB',
                meta: {
                  sidebarName: 'Sidebar'
                },
                component: () => import('views/Components/Sidebar/PageB')
              },
              // 测试页面三
              {
                path: '/Components/Sidebar/PageC',
                name: 'PageC',
                meta: {
                  sidebarName: 'Sidebar'
                },
                component: () => import('views/Components/Sidebar/PageC')
              },
              // 测试页面四
              {
                path: '/Components/Sidebar/PageD',
                name: 'PageD',
                meta: {
                  sidebarName: 'Sidebar'
                },
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
          title: '布局示例',
          roles: ['admin', 'manage', 'user'],
					icon: 'ios-paper'
				},
				component: () => import('views/Layout/SecondPane'),
				children:[
					// 账户列表页面
          {
            path: '/Examples/AccountManage/List',
            name: 'AccountList',
            meta: {
              roles: ['admin'],
              title: '账户管理',
              sidebarName: 'AccountList',
              icon: 'ios-paper'
            },
            component: () => import('views/Examples/AccountManage/AccountList')
          },
          // 账户列表-新增/编辑
          {
            path: '/Examples/AccountManage/Store',
            name: 'StoreAccount',
            meta: {
              roles: ['admin'],
              sidebarName: 'AccountList'
            },
            hidden: true,
            component: () => import('views/Examples/AccountManage/StoreAccount')
          },
          // 板块列表页面
          {
            path: '/Examples/SectionManage/List',
            name: 'SectionList',
            meta: {
              roles: ['admin', 'manage'],
              sidebarName: 'SectionList',
              title: '板块管理',
            },
            component: () => import('views/Examples/SectionManage/SectionList')
          },
          // 板块内容管理页面
          {
            path: '/Examples/SectionManage/ContManage',
            name: 'ContManage',
            meta: {
              sidebarName: 'SectionList',
            },
            hidden: true,
            component: () => import('views/Examples/SectionManage/ContManage')
          },
          // 产品列表页面
          {
            path: '/Examples/ProductManage/List',
            name: 'ProductList',
            meta: {
              roles: ['admin', 'manage'],
              sidebarName: 'ProductList',
              title: '产品管理',
            },
            component: () => import('views/Examples/ProductManage/ProductList')
          },
          // 产品列表-产品详情
          {
            path: '/Examples/ProductManage/ProductDetail',
            name: 'ProductDetail',
            meta: {
              roles: ['admin', 'manage'],
              sidebarName: 'ProductList',
            },
            hidden: true,
            component: () => import('views/Examples/ProductManage/ProductDetail')
          },
          // 文章列表页面
          {
            path: '/Examples/ArticleManage/List',
            name: 'ArticleList',
            meta: {
              roles: ['admin', 'manage'],
              sidebarName: 'ArticleList',
              title: '文章管理',
            },
            component: () => import('views/Examples/ArticleManage/ArticleList')
          },
          // 文章列表-文章详情
          {
            path: '/Examples/ArticleManage/Store',
            name: 'StoreArticle',
            meta: {
              roles: ['admin', 'manage'],
              sidebarName: 'ArticleList',
            },
            hidden: true,
            component: () => import('views/Examples/ArticleManage/StoreArticle')
          },
          // 消息列表页面
          {
            path: '/Examples/MessageManage/List',
            name: 'MessageList',
            meta: {
              roles: ['admin', 'manage', 'user'],
              sidebarName: 'MessageList',
              title: '消息列表',
            },
            component: () => import('views/Examples/MessageManage/MessageList')
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
