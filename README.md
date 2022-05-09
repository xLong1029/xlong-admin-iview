# xlong-admin-iview

## 介绍

xlong-admin-iview 是一套基于 Vue + iView + Mock 开发的单页面客户端渲染管理后台系统示例。  

温馨提示：  
1. 原来使用Bmob开发的版本用的是开发版套餐（2022 年 5 月 5 日起，Bomb已对开发版应用创建时间超过 12 个月的停止免费服务），因为穷不想充值，所以不打算继续维护了。  
2. Bmob版传送门：[develop-vite-bmob](https://github.com/xLong1029/xlong-admin-iview/tree/develop-bmob)

*该项目仅作学习参考，请勿商用

## 迭代说明

1. 因为穷，移除Bomb，改用Mock模拟请求
2. 新增：环境配置
3. 修改：Main界面布局，固定头部，仅内容区域滚动  
4. 修改：很多地方文字显示有误
5. 修复BUG：图片上传第二次change事件未触发

## 项目用到技术、框架与插件
[Vue.js](https://github.com/vuejs)  
[webpack](https://github.com/webpack)  
[iView](https://github.com/iview/iview)  
[Tinymce](https://github.com/tinymce/tinymce)  
[vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)  
[Mock](https://github.com/nuysoft/Mock) 

## 部分项目运行截图
* 登录界面

![Image text](static/images/screen-1.gif)

* 个人资料

![Image text](static/images/screen-2.gif)

* 树形筛选

![Image text](static/images/screen-3.gif)

* 可编辑表格

![Image text](static/images/screen-4.gif)

* 图片上传

![Image text](static/images/screen-5.gif)

* 账户管理功能

![Image text](static/images/screen-6.gif)

* 版块管理功能

![Image text](static/images/screen-7.gif)

## 目录结构

```
│  .browserslistrc // 浏览器可访问配置
│  .env.development
│  .env.production
│  .env.staging
│  .gitignore
│  package.json
│  babel.config.js // babel配置
│  vue.config.js // 配置文件
│  README.md
│
├─pubilc
│   favicon.ico // 图标
│   index.html // 首页入口文件
│
├─src
│  │  main.js // 项目入口js
│  │  App.vue // 根组件
│  │
│  ├─assets // 资源目录，这里的资源会被wabpack构建
│  ├─api // api接口文件
│  ├─theme // iView主题样式
│  ├─store  // 应用级数据（state）
│  │
│  ├─mock // 模拟请求数据
│  │    index.js // mock数据
│  │    mock-handle.js // mock数据处理
│  │    mock-server.js // mock服务
│  │
│  ├─components // 功能组件
│  │  │
│  │  ├─Common // 通用组件
│  │  ├─Image // 图片相关组件
│  │  ├─Input // 信息输入相关组件
│  │  ├─Sidebar // 侧边栏相关组件
│  │  ├─Tree // 树形相关组件
│  │  └─Table // 表格相关组件
│  │
│  ├─views // 视图
│  │  │
│  │  ├─Layout // 布局视图
│  │  ├─Home // 主页
│  │  ├─Components // 组件展示相关
│  │  ├─Error // 错误页面
│  │  ├─Examples // 操作示例相关
│  │  ├─Passport // 通行验证，登录注册等
│  │  └─Profile // 个人信息相关
│  │
│  ├─mixins // 混合模块
│  │    city_select.js // 城市联级选择
│  │    email_complete.js // 邮件地址自动填充
│  │    page.js // 页码配置
│  │    table_operate.js // 表格操作
│  │    table_query.js // 表格查询
│  │    upload_img.js // 上传图片
│  │
│  ├─common // 通用js模块
│  │    common.js // 封装一些公共常量
│  │    table-setting.js // 封装一些iView表格按钮渲染
│  │    validate.js // 封装一些iView表单验证方法
│  │
│  ├─utils // 通用工具函数
│  │    index.js
│  │
│  └─router  // 路由配置
│       index.js
│       routes.js
│
├─static // 静态资源
│
└─tests // 单元测试文件
```

## 本地运行
1. 安装前台依赖
> npm install
2. 运行前台项目
> npm run serve
3. 访问地址：http://localhost:6060

## 项目打包
按需求选择打包命令(请将vue.config.js中publicPath改成你的项目)：

> npm run build:prod

> npm run build:stage

## 作者联系方式

QQ：381612175
TEL: 18376686974

github：https://github.com/xLong1029/

站酷主页：http://xlong.zcool.com.cn/

UI中国：http://i.ui.cn/ucenter/358591.html

* 此项目做学习Vuejs测试使用，有什么问题可联系我讨论
