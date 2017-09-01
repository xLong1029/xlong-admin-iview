// store 的计算属性
const getters = {
    // 登录凭证
    token: state => state.user.token,
    // 用户头像
    userFace: state => state.user.userFace,
   	// 昵称
    nickName: state => state.user.nickName,
    // 用户ID
    userId: state => state.user.userId,
    // 侧边栏span宽度
    sidebarSpan: state => state.common.sidebarSpan,
    // 面包屑路径
    breadcrumb: state => state.common.breadcrumb,
    // 图片上传-获取单图片显示路径
    getImageUrl: state => state.common.getImageUrl,
    // 图片上传-获取单图片上传的ID
    getImageId: state => state.common.getImageId,
    // 图片上传-获取多图片显示路径
    getImageUrlArr: state => state.common.getImageUrlArr,
    // 图片上传-获取多图片上传的ID
    getImageIdArr: state => state.common.getImageIdArr,
    // 获取可输入下拉框的值
	getInputValue: state => state.common.getInputValue,
};

export default getters
