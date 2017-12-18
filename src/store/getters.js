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
    // 图片上传-获取多图片显示路径
    getImageUrlArr: state => state.common.getImageUrlArr,
    // 输入框的值
    inputValue: state => state.common.inputValue,
    // 企业名称
    companyName: state => state.common.companyName,
};

export default getters
