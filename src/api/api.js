/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
// Bmob方法
import BmobServer from 'bmob/bmob-server.js'
export default {
    // 获取登录信息
    Login : (params) => {
        return BmobServer.Get('Login', params);
    },
}