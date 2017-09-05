import { GetCookie } from 'common/important.js'

// 用户信息
const user = {
	// 负责存储整个应用的状态数据
	state: {
			// 登录凭证
	  	token: GetCookie('xl_admin_t'),
	  	// 用户头像
	  	userFace:'',
	  	// 昵称
	  	nickName: '',	  	
	  	// 用户ID
	  	userId: '',
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
			SET_USER_TOKEN: (state, token) => {
	      state.token = token;
	    },
	    SET_USER_FACE: (state, userFace) => {
	      state.userFace = userFace;
	    },
	    SET_USER_NICKNAME: (state, nickName) => {
	      state.nickName = nickName;
	    },	    
	    SET_USER_ID: (state, userId) => {
	      state.userId = userId;
	    },
	},
}

export default user;
