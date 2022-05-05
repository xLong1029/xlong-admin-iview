/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 登录验证操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-05
 * 版本 : version 3.0
 */

export default {
    /**
     * 登录
     *
     * @param {*} data 参数
     */
     Login: (data) => {
        return request({
            url: '/api/user/login',
            method: 'post',
            data
        })
    },
    // 获取用户信息
    // token: 用户token参数
    // GetUserInfo: (token) => {
    //     let query = BmobServer.GetQuery('_User');
    //     query.equalTo('token', '==', token);

    //     return new Promise((resolve, reject) => {
    //         query.find().then(res => resolve({ code: 200, data: res[0] })).catch(err => reject(err));
	// 	});
    // }
}