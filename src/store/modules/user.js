import Api from 'api/login.js'
import { GetCookie, DelCookie } from 'utils'

// 设置账户信息
function setAccount(_commit, info){
  let face = info.userFace ? info.userFace : null;

	_commit('SET_USER', {
    face,
    nickName: info.nickName,
    role: info.role,
    id: info.objectId
  });
}

// 清空账户信息
function clearAccount(_commit){
	DelCookie('xl_admin_t');
	_commit('SET_USER_TOKEN', '');
	_commit('SET_USER', {});
}

// 用户信息
const user = {
	// 负责存储整个应用的状态数据
	state: {
			// 登录凭证
      token: GetCookie('xl_admin_t'),
      user: {
        face: '',
        nickName: '',
        role: '',
        id: 0
      }
	},
	// 计算属性
	getters: {
    token: state => state.token,
    user: state => state.user
	},
	// 用来处理数据的函数，只能同步操作
	mutations: {
			SET_USER_TOKEN: (state, token) => {
	      state.token = token;
      },
      SET_USER: (state, user) => {
	      state.user = user;
	    }
	},
	// 异步操作
	actions: {
			// Token验证
			CheckToken ({ commit }) {
        return new Promise((resolve, reject) => {
          Api.GetUserInfo(GetCookie('xl_admin_t'))
					.then(res => {
							// 登录成功
							if(res.code == 200){
                setAccount(commit, res.data);
                resolve(res);
              }
							// 登录失败
							else{
                clearAccount(commit);
                reject(res);
              }
					})
					.catch(err => {
            clearAccount(commit);
            reject(err);
          });
        });
			},
			// 登出
			LogOut ({ commit }) {
				return new Promise(resolve => {
          clearAccount(commit);
          resolve(true);
        });
			},
	}
}

export default user;
