import Api from 'api/api.js'
import LoginCheck from 'common/login_check.js'
import { GetCookie } from 'common/important'

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
	// 计算属性
	getters: {
    token: state => state.token,
    userFace: state => state.userFace,
    nickName: state => state.nickName,
    userId: state => state.userId,
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
	// 异步操作
	actions: {
			// Token验证
			CheckToken ({ commit , state }) {
					Api.GetUserInfo(GetCookie('xl_admin_t'))
					.then(res => {
							// 登录成功
							if(res.code == 200) LoginCheck.setAccount(commit, res.data);
							// 登录失败
							else LoginCheck.clearAccount(commit);
					})
					.catch(err => LoginCheck.clearAccount(commit))
			},
			// 登出
			LogOut ({ commit, state }) {
					LoginCheck.clearAccount(commit);           
			},
	}
}

export default user;
