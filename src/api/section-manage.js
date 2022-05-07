/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 板块操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
    /**
     * 获取板块列表
     *
     * @param {*} params 查询参数对象
     * @param {*} pageNo 当前页码
     * @param {*} pageSize 每页显示几条数据
     */
    GetSecList: (params, pageNo, pageSize) => {
        return request({
            url: `/api/section/list`,
            method: "get",
            params: {
                params,
                pageNo,
                pageSize,
            },
        });
    },
    /**
     * 删除版块
     *
     * @param {*} ids 需要删除的对象的Id
     */
    DeleteSec: (ids) => {
        return request({
            url: `/api/section/delete`,
            method: "post",
            data: {
                ids,
            },
        });
    },
    /**
     * 新增版块
     *
     * @param {*} ids 新增的参数对象
     */
    AddSection: (data) => {
        return request({
            url: `/api/section/add`,
            method: "post",
            data,
        });
    },
    /**
     * 编辑版块
     *
     * @param {*} data 修改的参数对象
     */
    EditSection: (data) => {
        return request({
            url: `/api/section/edit`,
            method: "post",
            data,
        });
    },
    // // 获取内容列表
    // // pageNo：当前第一页, pageSize：每页显示几条数据, parentId：父级板块id
    // GetContList: (parentId, pageNo, pageSize) => {
    //     let query = BmobServer.GetQuery('SectionCont');
    //     // 查询语句
    //     query.equalTo('parentId', '==', parentId);
    //     return new Promise((resolve, reject) => {
    //         BmobServer.GetListData(query, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err));
    //     });
    // },
    // // 新增内容
    // // params: 新增的参数对象
    // AddContent: (params) => {
    //     return new Promise((resolve, reject) => {
    //         BmobServer.AddOne('SectionCont', params).then(res => resolve(res)).catch(err => reject(err));
    //     });
    // },
    // // 删除内容
    // // ids：需要删除的对象的objectId
    // DeleteCont: (ids) => {
    //     return new Promise((resolve, reject) => {
    //         BmobServer.DelMore('SectionCont', ids).then(res => resolve(res)).catch(err => reject(err));
    //     });
    // },
    // // 编辑内容
    // // params: 修改的参数对象, id：查询的objectId
    // EditContent: (params, id) => {
    //     console.log(params);
    //     return new Promise((resolve, reject) => {
    //         BmobServer.EditOne('SectionCont', id, params).then(res => resolve(res)).catch(err => reject(err));
    //     });
    // }
}
