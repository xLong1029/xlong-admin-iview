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
    // params: 参数对象
    Login : (params) => {
        let query = BmobServer.GetQuery('Login');
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
        let query = BmobServer.GetQuery('UserInfo');
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
                error: err => console.log('无法通过该键值对获取数据')
            });
        });
    },
    // 获取所有账户列表
    // pageNo：当前第一页, pageSize：每页显示几条数据
    GetAccList: (pageNo, pageSize) => {
        return new Promise((resolve, reject) => {
            BmobServer.PageQuery('Account', pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 筛选账户列表
    // params: 筛选参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    FilterAccList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Account');
        // 查询语句
        if(params.id != '') query.equalTo('objectId', params.id);
        if(params.mobile != '') query.equalTo('mobile', params.mobile);
        if(params.email != '') query.equalTo('email', params.email);
        if(params.job != '') query.equalTo('job', params.job);
        if(params.province != '') query.equalTo('province', params.province);
        if(params.enabledState != '') query.equalTo('enabledState', parseInt(params.enabledState));
        return new Promise((resolve, reject) => {
            BmobServer.DateFilterQuery(query, params, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 新增账户
    // params: 修改的参数对象
    AddAccount: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('Account', params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 获取账户信息
    // id：查询的objectId
    GetAccInfo: (id) => {
        return new Promise((resolve, reject) => {
            BmobServer.GetOne('Account', id).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 修改账户信息
    // params: 修改的参数对象, id：查询的objectId
    EditAccount: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('Account', id, params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 删除账户
    // ids：需要删除的对象的objectId
    DeleteAcc: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('Account', ids).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 启用或禁用账户
    // params: 修改的参数对象, ids：需要操作的对象的objectId
    EnableAcc: (params, ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditMore('Account', ids, params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 获取版块列表
    // pageNo：当前第一页, pageSize：每页显示几条数据
    GetSecList: (pageNo, pageSize) => {
        return new Promise((resolve, reject) => {
            BmobServer.PageQuery('Section', pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 筛选版块列表
    // params: 筛选参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    FilterSecList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Section');
        // 查询语句
        if(params.id != '') query.equalTo('objectId', params.id);
        if(params.title != '') query.equalTo('title', params.title);
        if(params.type != '') query.equalTo('type', parseInt(params.type));
        return new Promise((resolve, reject) => {
            BmobServer.FilterQuery(query, params, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 新增版块
    // params: 修改的参数对象
    AddSection: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('Section', params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 编辑版块
    // params: 修改的参数对象, id：查询的objectId
    EditSection: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('Section', id, params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 删除版块
    // ids：需要删除的对象的objectId
    DeleteSec: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('Section', ids).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 获取内容列表
    // pageNo：当前第一页, pageSize：每页显示几条数据
    GetContList: (pageNo, pageSize) => {
        return new Promise((resolve, reject) => {
            BmobServer.PageQuery('SectionCont', pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 新增内容
    // params: 修改的参数对象
    AddContent: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('SectionCont', params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 删除内容
    // ids：需要删除的对象的objectId
    DeleteCont: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('SectionCont', ids).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 编辑内容
    // params: 修改的参数对象, id：查询的objectId
    EditContent: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('SectionCont', id, params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 获取产品列表
    // pageNo：当前第一页, pageSize：每页显示几条数据
    GetProdList: (pageNo, pageSize) => {
        return new Promise((resolve, reject) => {
            BmobServer.PageQuery('Product', pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 筛选产品列表
    // params: 筛选参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    FilterProdList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Product');
        // 查询语句
        if(params.id != '') query.equalTo('objectId', params.id);
        if(params.productName != '') query.equalTo('productName', params.productName);
        if(params.dataFrom != '') query.equalTo('dataFrom', parseInt(params.dataFrom));
        return new Promise((resolve, reject) => {
            BmobServer.FilterQuery(query, params, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 新增产品
    // params: 修改的参数对象
    AddProduct: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('Product', params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 编辑产品
    // params: 修改的参数对象, id：查询的objectId
    EditProduct: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('Product', id, params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 删除产品
    // ids：需要删除的对象的objectId
    DeleteProd: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('Product', ids).then(res => resolve(res)).catch(err => reject(err))
        });
    },
}