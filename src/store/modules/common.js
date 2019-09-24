// 通用设置
const common = {
  state: {
    // 侧边栏span宽度
    sidebarSpan: 3,
    // 侧边栏导航菜单
    sidebarMenu: [],
    // 面包屑路径
    // [{
    // 	name: '首页',
    // 	path: '/Home'
    // }]
    breadcrumb: []
  },
  // 计算属性
  getters: {
    sidebarSpan: state => state.sidebarSpan,
    sidebarMenu: state => state.sidebarMenu,
    breadcrumb: state => state.breadcrumb
  },
  // 用来处理数据的函数，只能同步操作
  mutations: {
    SET_SIDEBAR_SPAN: (state, sidebarSpan) => {
      state.sidebarSpan = sidebarSpan;
    },
    SET_SIDERBAR_MENU: (state, sidebarMenu) => {
      state.sidebarMenu = sidebarMenu;
    },
    SET_BREADCRUMB: (state, breadcrumb) => {
      state.breadcrumb = breadcrumb;
    }
  },
}

export default common;
