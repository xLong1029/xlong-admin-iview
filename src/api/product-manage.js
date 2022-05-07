/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 产品操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
    /**
     * 获取产品列表
     *
     * @param {*} params 查询参数对象
     * @param {*} pageNo 当前页码
     * @param {*} pageSize 每页显示几条数据
     */
    GetProdList: (params, pageNo, pageSize) => {
        return request({
            url: `/api/product/list`,
            method: "get",
            params: {
                params,
                pageNo,
                pageSize,
            },
        });
    },
    /**
     * 新增产品
     *
     * @param {*} data 新增的参数对象
     */
    AddProduct: (data) => {
        return request({
            url: `/api/product/add`,
            method: "post",
            data,
        });
    },
    /**
    * 编辑产品
    *
    * @param {*} data 修改的参数对象
    */
    EditProduct: (data) => {
        return request({
            url: `/api/product/edit`,
            method: "post",
            data,
        });
    },
    /**
     * 删除产品
     *
     * @param {*} ids 需要删除的对象的Id
     */
    DeleteProd: (ids) => {
        return request({
            url: `/api/product/delete`,
            method: "post",
            data: {
                ids
            }
        });
    },
    /**
     * 获取产品信息
     *
     * @param {*} id 对象的Id
     */
    GetProdInfo: (id) => {
        return request({
            url: `/api/product/info`,
            method: "get",
            params: {
                id,
            },
        });
    },
    /**
     * 获取案例列表
     *
     * @param {*} id 对象的Id
     */
    GetCaseList: (id) => {
        return request({
            url: `/api/case/list`,
            method: "get",
            params: {
                id
            },
        });
    },
    /**
     * 新增案例
     *
     * @param {*} data 新增的参数对象
     */
    AddCase: (data) => {
        return request({
            url: `/api/case/add`,
            method: "post",
            data,
        });
    },
    /**
   * 编辑案例
   *
   * @param {*} data 修改的参数对象
   */
    EditCase: (data) => {
        return request({
            url: `/api/case/edit`,
            method: "post",
            data,
        });
    },
    /**
   * 删除案例
   *
   * @param {*} ids 需要删除的对象的Id
   */
    DeleteCase: (ids) => {
        return request({
            url: `/api/article/delete`,
            method: "post",
            data: {
                ids,
            },
        });
    },
    // // 删除案例
    // // id：查询的objectId, index: 案例数组对应索引
    // DelCase: (id, index) => {
    //     let query = BmobServer.GetQuery('Product');
    //     return new Promise((resolve, reject) => {
    //         query.get(id).then(res => {
    //             let caseList = res.caseList ? res.caseList : [];
    //             // 删除当前对象
    //             caseList.splice(index, 1);

    //             res.set('caseList',caseList);
    //             res.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
    //         }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
    //     });
    // }
}
