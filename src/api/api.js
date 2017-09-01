/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'
export default {
    // 登录
    Login : (params) => {
        let obj = BmobServer.Query('Login');
        // 两条查询语句一起写，就相当于AND查询
        obj.equalTo('username', params.username);
        obj.equalTo('password', params.password);
        return new Promise((resolve, reject) => {
			obj.find({ success: (result) => resolve(result), error: (error) => reject(error) });
		})
    },
    // 获取用户信息
    GetUserInfo: (params) => {
        let obj = BmobServer.Query('UserInfo');
        // 两条查询语句一起写，就相当于AND查询
        obj.equalTo('token', params.token);
        return new Promise((resolve, reject) => {
			obj.find({ success: (result) => resolve(result), error: (error) => reject(error) });
		})
    }
    // Login : (objectId) => {
    //     return new Promise((resolve, reject) => {
    //         // 查询单条数据，第一个参数是这条数据的objectId值
	// 		BmobServer.Query('Login').get(objectId, { success: (object) => resolve(object), error: (error) => reject(error) })
	// 	})
    // },
}