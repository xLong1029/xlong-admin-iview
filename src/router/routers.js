export default [
  // 后台登录
  {
    path: '/Login',
    name: 'Login',
    component: () => import('views/Login/Login')
  },
  // 后台管理页
  {
    path: '/',
    name: 'Main',
    component: () => import('views/Main'),
    // 路由重定向
    redirect: '/Home',
    children: [
      // 后台首页
      {
        path: '/Home',
        name: 'Home',
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
      },
      // 账户列表页面
      {
        path: '/Examples/AccountList',
        name: 'AccountList',
        component: () => import('views/Examples/AccountList/AccountList')
      },
      // 账户列表-新增/编辑
      {
        path: '/Examples/AccountList/StoreAccount',
        name: 'StoreAccount',
        component: () => import('views/Examples/AccountList/StoreAccount')
      },
      // 板块列表页面
      {
        path: '/Examples/SectionList',
        name: 'SectionList',
        component: () => import('views/Examples/SectionList/SectionList')
      },
      // 板块内容管理页面
      {
        path: '/Examples/SectionList/ContManage',
        name: 'ContManage',
        component: () => import('views/Examples/SectionList/ContManage')
      },
      // 产品列表页面
      {
        path: '/Examples/ProductList',
        name: 'ProductList',
        component: () => import('views/Examples/ProductList/ProductList')
      },
      // 产品列表-产品详情
      {
        path: '/Examples/ProductDetail',
        name: 'ProductDetail',
        component: () => import('views/Examples/ProductList/ProductDetail')
      },
      // 文章列表页面
      {
        path: '/Examples/ArticleList',
        name: 'ArticleList',
        component: () => import('views/Examples/ArticleList/ArticleList')
      },
      // 文章列表-文章详情
      {
        path: '/Examples/StoreArticle',
        name: 'StoreArticle',
        component: () => import('views/Examples/ArticleList/StoreArticle')
      },
      // 消息列表页面
      {
        path: '/Examples/MessageList',
        name: 'MessageList',
        component: () => import('views/Examples/MessageList/MessageList')
      },
    ]
  },
  // 404
  {
    path: '*',
    name: 'Err404',
    component: () => import('views/Error/Err404')
  }
]
