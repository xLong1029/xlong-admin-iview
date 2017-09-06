/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'
import { GetParams } from 'common/important.js'
import Common from 'common/common.js'

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
                success: res => resolve({ code: 200, data: res }),
                error: err => reject(err)
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
                success: res => resolve({ code: 200, data: res }),
                error: err => reject(err)
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
                    // 修改数据
                    obj.save({ password: params.newPassword }, {
                        success: res => resolve({ code: 200, data: res }),
                        err: err => reject(err)
                    });                    
                },
                error: err => console.log('无法通过该键值对获取数据')
            });
        });
    },
    // 获取所有账户列表
    // pageNo：当前第一页, pageSize：每页显示几条数据
    GetAccList: (pageNo, pageSize) => {
        let query = BmobServer.Query('Account');
        return new Promise((resolve, reject) => {
            query.find({
                success: obj => {
                    let page = { count: obj.length, pages: Math.ceil(obj.length / pageSize) };
                    // 返回数据条数，默认返回10条数据
                    query.limit(pageSize);
                    // 跳过前面几条数据开始
                    query.skip((pageNo - 1) * pageSize);
                    query.find({
                        success: res => resolve({ code: 200, data: res, page }),
                        error: err => reject(err)
                    });
                },
                error: err => console.log(err)
            });
        });
    },
    // 筛选账户列表
    // params: 筛选参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    FilterAccList: (params, pageNo, pageSize) => {
        let query = BmobServer.Query('Account');
        // 查询语句
        if(params.id != '') query.equalTo('objectId', params.id);
        if(params.mobile != '') query.equalTo('mobile', params.mobile);
        if(params.email != '') query.equalTo('email', params.email);
        if(params.job != '') query.equalTo('job', params.job);
        if(params.province != '') query.equalTo('province', params.province);
        if(params.enabledState != '') query.equalTo('enabledState', parseInt(params.enabledState));
        return new Promise((resolve, reject) => {
            query.find({
                success: obj => {                 
                    /* 筛选制定日期内的数据 */					
                    if(params.sTime != '' && params.eTime != ''){
                        let result = [];
                        for(let item of obj){
                            // 比较日期大小，若第一个值小于第二个值则返回true
                            let start = Common.CompareDate(params.sTime, item.createdAt),
                                end = Common.CompareDate(item.createdAt, params.eTime);
                            // 满足条件则保留数据
                            if(start && end) result.push(item);
                        }
                        let page = { count: result.length, pages: Math.ceil(result.length / pageSize) };
                        // 截取部分数据
                        result = result.splice((pageNo - 1)* pageSize, pageNo* pageSize);                        
                        resolve({ code: 200, data: result, page });
                    }
                    /* 筛选制定日期内的数据 */
                    else{
                        let page = { count: obj.length, pages: Math.ceil(obj.length / pageSize) };
                        // 返回数据条数，默认返回10条数据
                        query.limit(pageSize);
                        // 跳过前面几条数据开始
                        query.skip((pageNo - 1) * pageSize);
                        query.find({
                            success: res => resolve({ code: 200, data: res, page }),
                            error: err => reject(err)
                        });
                    }                   
                },
                error: err => console.log(err)
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
                success: res => resolve({ code: 200, data: res }),
                error: (res, err) => reject(err)
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
                error: (err) => reject(err)
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
                        success: res => resolve({ code: 200, data: res }),
                        err: err => reject(err)
                    });
                },
                error: err => console.log('无法通过该objectId获取数据')
            });
        });
    },
    // 删除账户
    // ids：需要删除的对象的objectId
    DeleteAcc: (ids) => {
        // 未成功删除的对象
        let failObj = [];
        // 是否删除失败
        let fail = false;        
        return new Promise((resolve, reject) => {
            // 遍历删除
            for(var id of ids){
                // 获取一行对象并删除
                BmobServer.DelOne('Account', id).then().catch(err => { failObj.push(err); fail = true; })
            }
            // 延迟判断
            setTimeout(() => {
                if(!fail) resolve({ code: 200 })
                else resolve({ code: 0, data: failObj })
            }, 1000);
        });
    },
    // 启用或禁用账户
    // params: 修改的参数对象, ids：需要操作的对象的objectId
    EnableAcc: (params, ids) => {
        // 未成功修改的对象
        let failObj = [];
        // 是否修改失败
        let fail = false;
        let query = BmobServer.Query('Account');
        return new Promise((resolve, reject) => {            
            // 遍历修改
            for(var id of ids){
                // 获取一行对象并修改
                BmobServer.EditOne('Account', id, params).then().catch(err => { failObj.push(err); fail = true; })
            }
            // 延迟判断
            setTimeout(() => {
                if(!fail) resolve({ code: 200 })
                else resolve({ code: 0, data: failObj })
            }, 1000);
        });
    },
}