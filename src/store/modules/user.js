import Api from 'api/login.js'
import { GetCookie, DelCookie } from 'common/important'

// 设置账户信息
function setAccount(_commit, info){
	// 设置用户信息
	_commit('SET_USER_FACE', info.userface);
	_commit('SET_USER_NICKNAME', info.nickname);
	_commit('SET_USER_ID', info.id);
}

// 清空账户信息
function clearAccount(_commit){
	// 清除token
	DelCookie('xl_admin_t');
	_commit('SET_USER_TOKEN', '');
	_commit('SET_USER_FACE', '');
	_commit('SET_USER_NICKNAME', '');
	_commit('SET_USER_ID', '');
}

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
			CheckToken ({ commit }) {
					Api.GetUserInfo(GetCookie('xl_admin_t'))
					.then(res => {
							// 登录成功
							if(res.code == 200) setAccount(commit, res.data);
							// 登录失败
							else clearAccount(commit);
					})
					.catch(() => clearAccount(commit))
			},
			// 登出
			LogOut ({ commit }) {
					clearAccount(commit);           
			},
	}
}

export default user;
