// 通用设置
const common = {
	state: {
		// 侧边栏span宽度
		sidebarSpan: 3,
		// 面包屑路径
		breadcrumb: [{
			name: '首页',
			path: '/Home'
		}],
		// 获取多图片显示路径
		getImageUrlArr: [],
	},
	// 计算属性
	getters: {
		sidebarSpan: state => state.sidebarSpan,
		breadcrumb: state => state.breadcrumb,
		getImageUrlArr: state => state.getImageUrlArr,
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
		SET_SIDEBAR_SPAN: (state, sidebarSpan) => {
	      state.sidebarSpan = sidebarSpan;
	    },
	    SET_BREADCRUMB: (state, breadcrumb) => {
	      state.breadcrumb = breadcrumb;
		},
		SET_IMAGE_URL_ARR: (state, getImageUrlArr) => {
		  state.getImageUrlArr = getImageUrlArr;
		},
	},
}

export default common;
