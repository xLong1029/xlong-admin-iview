import Common from 'common/common.js'

// 用户信息
const user = {
	// 负责存储整个应用的状态数据
	state: {
		// 用户账号
		userAccount: '',
	  	// 用户头像图片url
	  	userFace:'',
	  	// 昵称
	  	userNickname: '',
	  	// 登录凭证
	  	token: Common.GetCookie('token'),
	  	// 用户ID
	  	userId: '',
	  	// 用户类型，1024：管理员，1：普通用户
	  	userType: Common.GetCookie('userType')
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
		SET_USER_ACCOUNT: (state, userAccount) => {
	      state.userAccount = userAccount;
	    },
	    SET_USER_FACE: (state, userFace) => {
	      state.userFace = userFace;
	    },
	    SET_USER_NICKNAME: (state, userNickname) => {
	      state.userNickname = userNickname;
	    },
	    SET_USER_TOKEN: (state, token) => {
	      state.token = token;
	    },
	    SET_USER_ID: (state, userId) => {
	      state.userId = userId;
	    },
	    SET_USER_TYPE: (state, userType) => {
	      state.userType = userType;
	    },
	},
}

export default user;
