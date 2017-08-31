/*
 * 功能 : 登录和TOken验证设置账户信息
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import Common from '@/common/common.js'

export default {
	// 设置账户信息
	setAccount: (_commit, info) => {
		// 设置用户信息
		_commit('SET_USER_ACCOUNT', info.account);
		_commit('SET_USER_FACE', info.face);
		_commit('SET_USER_NICKNAME', info.nickname);
		_commit('SET_USER_ID', info.userId);
		_commit('SET_USER_TYPE', info.userType);
	},
	// 清空账户信息
	clearAccount: (_commit) => {
		// 清除token
		Common.DelCookie('token');
		_commit('SET_USER_TOKEN', '');
		_commit('SET_USER_ACCOUNT', '');
		_commit('SET_USER_FACE', '');
		_commit('SET_USER_NICKNAME', '');
		_commit('SET_USER_ID', '');
		_commit('SET_USER_TYPE', ''); 
	},
}
