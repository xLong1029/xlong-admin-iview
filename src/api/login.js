/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 登录验证操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'

export default {
    // 登录
    // params: 参数对象
    Login : (params) => {
        return new Promise((resolve, reject) => {
            Bmob.User.login(params.username, params.password).then(res => resolve({ code: 200, data: res })).catch(err => reject(err));
		});
    },
    // 获取用户信息
    // token: 用户token参数
    GetUserInfo: (token) => {
        let query = BmobServer.GetQuery('UserInfo');
        query.equalTo('token', '==', token);

        return new Promise((resolve, reject) => {
            query.find().then(res => resolve({ code: 200, data: res[0] })).catch(err => reject(err));
		});
    }
}