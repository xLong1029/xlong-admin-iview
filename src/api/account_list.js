/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 账户操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-5-22
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'

export default {
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
        if(params.id != '') query.equalTo('objectId', '==', params.id);
        if(params.mobile != '') query.equalTo('mobile', '==', params.mobile);
        if(params.email != '') query.equalTo('email', '==', params.email);
        if(params.job != '') query.equalTo('job', '==', params.job);
        if(params.province != '') query.equalTo('province', '==', params.province);
        if(params.enabledState != '') query.equalTo('enabledState', '==', parseInt(params.enabledState));
        return new Promise((resolve, reject) => {
            BmobServer.DateFilterQuery(query, params, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 新增账户
    // params: 新增的参数对象
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
}