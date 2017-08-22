// store 的计算属性
const getters = {
	// 用户账号
	userAccount: state => state.user.userAccount,
    // 用户头像图片url
    userFace: state => state.user.userFace,
   	// 昵称
    userNickname: state => state.user.userNickname,
    // 登录凭证
    token: state => state.user.token,
    // 用户ID
    userId: state => state.user.userId,
    // 用户类型
    userType: state => state.user.userType,
};

export default getters
