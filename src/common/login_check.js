/*
 * 功能 : 登录和TOken验证设置账户信息
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import { DelCookie } from '@/common/important.js'

export default {
	// 设置账户信息
	setAccount: (_commit, info) => {
		// 设置用户信息
		_commit('SET_USER_FACE', info.attributes.userFace);
		_commit('SET_USER_NICKNAME', info.attributes.nickName);
		_commit('SET_USER_ID', info.id);
	},
	// 清空账户信息
	clearAccount: (_commit) => {
		// 清除token
		DelCookie('xl_admin_t');
		_commit('SET_USER_TOKEN', '');
		_commit('SET_USER_FACE', '');
		_commit('SET_USER_NICKNAME', '');
		_commit('SET_USER_ID', '');
	},
}
