/*
    登录和TOken验证设置账户信息
*/
export default {
	// 设置账户信息
	setAccount: (_commit, info) => {
		// 设置用户信息
		_commit('SET_USER_ACCOUNT', info.account);
		_commit('SET_USER_FACE', info.face);
		_commit('SET_USER_NICKNAME', info.nickname);
		_commit('SET_USER_ID', info.userId);
		_commit('SET_USER_TYPE', info.userType);
		// 本地存储token值
		localStorage.userType = info.userType;
	},
	// 清空账户信息
	claerAccount: (_commit) => {
		// 清除token
		localStorage.removeItem('token');
		// 清除userType
		localStorage.removeItem('userType');
		_commit('SET_USER_TOKEN', '');
		_commit('SET_USER_ACCOUNT', '');
		_commit('SET_USER_FACE', '');
		_commit('SET_USER_NICKNAME', '');
		_commit('SET_USER_ID', '');
		_commit('SET_USER_TYPE', ''); 
	},
}
