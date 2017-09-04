/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'
import { GetParams } from 'common/important.js'

export default {
    // 登录
    // params: 修改的参数对象
    Login : (params) => {
        let query = BmobServer.Query('Login');
        // 两条查询语句一起写，就相当于AND查询
        query.equalTo('username', params.username);
        query.equalTo('password', params.password);
        return new Promise((resolve, reject) => {
            // 仅获取一行数据
			query.first({
                success: (res) => resolve({ code: 200, data: res }),
                err: (err) => reject({ code: 0, data: err })
            });
		});
    },
    // 获取用户信息
    // token: 用户token参数
    GetUserInfo: (token) => {
        let query = BmobServer.Query('UserInfo');
        query.equalTo('token', token);
        return new Promise((resolve, reject) => {
			query.first({
                success: (res) => resolve({ code: 200, data: res }),
                err: (err) => reject({ code: 0, data: err })
            });
		});
    },
    // 修改个人资料
    // params: 修改的参数对象, key：查询的唯一键
    EditProfile: (params, key) => {
        let query = BmobServer.Query('UserInfo');
        // 获取键值对
        let p = GetParams(key);
        // 根据唯一键查询对象
        query.equalTo(p.key[0], p.value[0]);
        return new Promise((resolve, reject) => { 
            query.first({
                success: (obj) => {
                    // 设置数据
                    obj.set('nickname', params.nickname);
                    obj.set('realname', params.realname);
                    obj.set('userface', params.userface);
                    obj.set('gender', params.gender);
                    obj.save(null, {
                        success: (res) => resolve({ code: 200, data: res }),
                        err: (err) => reject({ code: 0, data: err })
                    });                    
                },
                error: (err) => console.log('无法通过该键值对获取数据')
            });
        });
    },
    // 修改密码
    // params: 修改的参数对象, key：查询的唯一键
    ChangePwd: (params, key) => {
        let query = BmobServer.Query('Login');
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
                    // 设置数据
                    obj.set('password', params.newPassword);
                    obj.save(null, {
                        success: (res) => resolve({ code: 200, data: res }),
                        err: (err) => reject({ code: 0, data: err })
                    });                    
                },
                error: (err) => console.log('无法通过该键值对获取数据')
            });
        });
    },
    // 获取账户列表
    // num：返回的条数
    GetAccList: (num) => {
        let query = BmobServer.Query('Account');
        // 默认返回10条数据
        query.limit(num);
        return new Promise((resolve, reject) => { 
            query.find({
                success: (res) => resolve({ code: 200, data: res }),
                err: (err) => reject({ code: 0, data: err })
            });
        });
    },
    // 新增账户
    // params: 修改的参数对象
    AddAccount: (params) => {
        let obj = BmobServer.Add('Account');
        return new Promise((resolve, reject) => { 
            // 添加数据，第一个入口参数是Json数据
            obj.save(params, {
                success: (res) => resolve({ code: 200, data: res }),
                error: (res, err) => reject({ code: 0, data: err })
            });
        });
    },
    // 获取账户信息
    // id：查询的objectId
    GetAccInfo: (id) => {
        let query = BmobServer.Query('Account');
        return new Promise((resolve, reject) => { 
            //查询单条数据，第一个参数是这条数据的objectId值
            query.get(id, {
                success: (res) => resolve({ code: 200, data: res }),
                error: (res, err) => reject({ code: 0, data: err })
            });
        });
    },
    // 修改账户信息
    // params: 修改的参数对象, id：查询的objectId
    EditAccount: (params, id) => {
        let query = BmobServer.Query('Account');
        return new Promise((resolve, reject) => {
            query.get(id, {
                success: (obj) => {
                    if(obj == undefined){
                        resolve({ code: 404, msg: '无该id用户数据可获取！' });
                        return false;
                    }
                    // 设置并保存数据
                    obj.save(params, {
                        success: (res) => resolve({ code: 200, data: res }),
                        err: (err) => reject({ code: 0, data: err })
                    });                    
                },
                error: (err) => console.log(err)
            });
        });
    },
}