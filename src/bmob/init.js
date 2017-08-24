import Bmob from './bmob/bmob.js'
export default {
    // 初始化
    BmobInit: () => {
        Bmob.initialize("你的Application ID", "你的REST API Key");
    }
}