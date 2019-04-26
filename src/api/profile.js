/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 用户信息操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-5-22
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'
import { GetParams } from 'common/important.js'

export default {
    // 获取用户信息
    // token: 用户token参数
    GetUserInfo: (token) => {
        let query = BmobServer.GetQuery('UserInfo');
        query.equalTo('token', '==', token);

        return new Promise((resolve, reject) => {
            query.find().then(res => resolve({ code: 200, data: res[0] })).catch(err => reject(err));
		});
    },
    // 修改个人资料
    // params: 修改的参数对象, key：查询的唯一键
    EditProfile: (params, key) => {
        let query = BmobServer.GetQuery('UserInfo');
        // 获取键值对
        let p = GetParams(key);
        // 根据唯一键查询对象
        query.equalTo(p.key[0], p.value[0]);
        return new Promise((resolve, reject) => { 
            query.first({
                success: (obj) => {
                    // 修改数据
                    obj.save(params, {
                        success: res => resolve({ code: 200, data: res }),
                        err: err => reject(err)
                    });
                },
                error: err => console.log('无法通过该键值对获取数据')
            });
        });
    },
    // 修改密码
    // params: 修改的参数对象, key：查询的唯一键
    ChangePwd: (params, key) => {
        let query = BmobServer.GetQuery('Login');
        // 获取键值对
        let p = GetParams(key);
        // 根据唯一键查询对象
        query.equalTo(p.key[0], p.value[0]);
        query.equalTo('password', params.oldPassword);        
        return new Promise((resolve, reject) => {
            query.first({
                success: (obj) => {
                    if(obj == undefined){
                        resolve({ code: 404, msg: '旧密码不正确！请重试' });
                        return false;
                    }
                    // 修改数据
                    obj.save({ password: params.newPassword }, {
                        success: res => resolve({ code: 200, data: res }),
                        err: err => reject(err)
                    });                    
                },
                error: err => reject(err)
            });
        });
    }
}