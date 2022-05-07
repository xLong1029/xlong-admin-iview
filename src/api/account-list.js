/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 账户操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
    /**
     * 获取所有账户列表
     *
     * @param {*} params 查询参数对象
     * @param {*} pageNo 当前页码
     * @param {*} pageSize 每页显示几条数据
     */
    GetAccList: (params, pageNo, pageSize) => {
        return request({
            url: `/api/account/list`,
            method: 'get',
            params: {
                params, pageNo, pageSize
            }
        })
    },
    // // 新增账户
    // // params: 新增的参数对象
    // AddAccount: (params) => {
    //     let query = BmobServer.GetQuery('Account');
    //     // 默认启用
    //     params.enabledState = 1;
    //     return new Promise((resolve, reject) => {
    //         query.equalTo('mobile', '==', params.mobile);
    //         BmobServer.FindOneData(query).then(res => {
    //             if(res.data) resolve({ code: 404, msg: '手机号已存在！' });
    //             else{
    //                 query.equalTo('email', '==', params.email);
    //                 BmobServer.FindOneData(query).then(res => {
    //                     if(res.data) resolve({ code: 404, msg: '邮箱已存在！' });
    //                     else{
    //                         BmobServer.AddOne('Account', params).then(res => resolve(res)).catch(err => reject(err))
    //                     }
    //                 }).catch(err => reject(err));
    //             }
    //         }).catch(err => reject(err));
    //     });
    // },
    // // 获取账户信息
    // // id：查询的objectId
    // GetAccInfo: (id) => {
    //     return new Promise((resolve, reject) => {
    //         BmobServer.GetOne('Account', id).then(res => resolve(res)).catch(err => reject(err))
    //     });
    // },
    // // 修改账户信息
    // // params: 修改的参数对象, id：查询的objectId
    // EditAccount: (params, id) => {
    //   let query = BmobServer.GetQuery('Account');
    //   return new Promise((resolve, reject) => {
    //       query.equalTo('mobile', '==', params.mobile);
    //       query.equalTo('objectId', '!=', id);
    //       BmobServer.FindAllData(query).then(res => {
    //           if(res.data && res.data.length) resolve({ code: 404, msg: '手机号已存在！' });
    //           else{
    //               query.equalTo('email', '==', params.email);
    //               query.equalTo('objectId', '!=', id);
    //               BmobServer.FindAllData(query).then(res => {
    //                   if(res.data && res.data.length) resolve({ code: 404, msg: '邮箱已存在！' });
    //                   else{
    //                     BmobServer.EditOne('Account', id, params).then(res => resolve(res)).catch(err => reject(err))
    //                   }
    //               }).catch(err => reject(err));
    //           }
    //       }).catch(err => reject(err));
    //   });
    // },
    // // 删除账户
    // // ids：需要删除的对象的objectId
    // DeleteAcc: (ids) => {
    //     return new Promise((resolve, reject) => {
    //         BmobServer.DelMore('Account', ids).then(res => resolve(res)).catch(err => reject(err))
    //     });
    // },
    // // 启用或禁用账户
    // // params: 修改的参数对象, ids：需要操作的对象的objectId
    // EnableAcc: (params, ids) => {
    //     return new Promise((resolve, reject) => {
    //         BmobServer.EditMore('Account', ids, params).then(res => resolve(res)).catch(err => reject(err))
    //     });
    // },
}
