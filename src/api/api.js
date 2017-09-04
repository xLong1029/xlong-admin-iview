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
    Login : (params) => {
        let obj = BmobServer.Query('Login');
        // 两条查询语句一起写，就相当于AND查询
        obj.equalTo('username', params.username);
        obj.equalTo('password', params.password);
        return new Promise((resolve, reject) => {
			obj.first({
                success: (res) => resolve({ code: 200, data: res }),
                err: (err) => reject({ code: 0, data: err })
            });
		})
    },
    // 获取用户信息
    GetUserInfo: (params) => {
        let obj = BmobServer.Query('UserInfo');
        obj.equalTo('token', params.token);
        return new Promise((resolve, reject) => {
			obj.first({
                success: (res) => resolve({ code: 200, data: res }),
                err: (err) => reject({ code: 0, data: err })
            });
		})
    },
    // 修改个人资料
    // params: 修改的参数对象, key：查询的唯一键
    EditProfile: (params, key) => {
        let query = BmobServer.Query('UserInfo');
        // 获取键值对
        let p = GetParams(key);
        // 根据唯一键查询对象
        query.equalTo(p.key[0], p.value[0]);
        // 仅获取一行数据
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
                } ,
                error: (err) => console.log('无法通过该键值对获取数据')
            })
        })
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
        // 仅获取一行数据
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
                } ,
                error: (err) => console.log('无法通过该键值对获取数据')
            })
        })
    }
}