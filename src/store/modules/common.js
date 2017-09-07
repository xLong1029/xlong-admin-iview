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
		// 获取单图片显示路径
		getImageUrl: '',
		// 获取多图片显示路径
		getImageUrlArr: [],
		// 输入框的值
		inputValue: '',
	},
	mutations: {
		SET_SIDEBAR_SPAN: (state, sidebarSpan) => {
	      state.sidebarSpan = sidebarSpan;
	    },
	    SET_BREADCRUMB: (state, breadcrumb) => {
	      state.breadcrumb = breadcrumb;
		},
		SET_IMAGE_URL: (state, getImageUrl) => {
		  state.getImageUrl = getImageUrl;
		},
		SET_IMAGE_URL_ARR: (state, getImageUrlArr) => {
		  state.getImageUrlArr = getImageUrlArr;
		},
		SET_INPUT_VALUE:(state, inputValue) =>{
			state.inputValue = inputValue;
		},
	},
}

export default common;
