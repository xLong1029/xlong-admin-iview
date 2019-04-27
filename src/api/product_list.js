/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 产品操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-5-22
 * 版本 : version 1.0
 */
import BmobServer from 'bmob/bmob-server.js'

export default {
    // 获取产品列表
    // pageNo：当前第一页, pageSize：每页显示几条数据
    GetProdList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Product');
        if(params){
            // 筛选查询
            if(params.id != '') query.equalTo('objectId', '==', params.id);
            if(params.productName != '') query.equalTo('productName', '==', params.productName);
            if(params.dataFrom != '') query.equalTo('dataFrom', '==', parseInt(params.dataFrom));
            // if(params.sTime != '') query.equalTo('createdAt', '>=', params.sTime );
            // if(params.eTime != '') query.equalTo('createdAt', '<=', params.eTime );
        }
        return new Promise((resolve, reject) => {
            BmobServer.GetData(query, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 筛选产品列表
    // params: 筛选参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    // FilterProdList: (params, pageNo, pageSize) => {
    //     let query = BmobServer.GetQuery('Product');
    //     // 查询语句
    //     if(params.id != '') query.equalTo('objectId', '==', params.id);
    //     if(params.productName != '') query.equalTo('productName', '==', params.productName);
    //     if(params.dataFrom != '') query.equalTo('dataFrom', '==', parseInt(params.dataFrom));
    //     return new Promise((resolve, reject) => {
    //         BmobServer.FilterQuery(query, params, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err))
    //     });
    // },
    // 新增产品
    // params: 新增的参数对象
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
    // 获取产品详情
    // id：查询的objectId
    GetProdInfo: (id) => {
        return new Promise((resolve, reject) => {
            BmobServer.GetOne('Product', id).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 修改产品信息
    // params: 修改的参数对象, id：查询的objectId
    EditProduct: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('Product', id, params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 获取案例列表
    // id：查询的objectId
    GetCaseList: (id) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => { 
            query.get(id, {
                success: (obj) => resolve({ code: 200, data: obj.attributes.caseList }),
                error: (obj, err) => reject(err)
            });
        });
    },
    // 新增案例
    // params: 新增的参数对象, id：查询的objectId
    AddCase: (params, id) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => { 
            query.get(id, {
                success: (obj) => {
                    if(obj == undefined){
                        resolve({ code: 404, msg: '无该id数据可获取！' });
                        return false;
                    }
                    obj.addUnique('caseList', params);
                    // 设置并保存数据
                    obj.save(null, {
                        success: res => resolve({ code: 200, data: res }),
                        err: err => reject(err)
                    });
                },
                error: (obj, err) => reject(err)
            });
        });
    },
    // 编辑案例
    // params: 修改的参数对象, id：查询的objectId, index: 案例数组对应索引
    EditCase: (params, id, index) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => { 
            query.get(id, {
                success: (obj) => {
                    if(obj == undefined){
                        resolve({ code: 404, msg: '无该id数据可获取！' });
                        return false;
                    }
                    let arr = obj.attributes.caseList;
                    // 删除当前对象并插入一项
                    arr.splice(index, 1, params);
                    // 修改数据
                    BmobServer.EditOne('Product', id, { caseList : arr }).then(res => resolve(res)).catch(err => reject(err))
                },
                error: (obj, err) => reject(err)
            });
        });
    },
    // 删除案例
    // id：查询的objectId, index: 案例数组对应索引
    DelCase: (id, index) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => { 
            query.get(id, {
                success: (obj) => {
                    if(obj == undefined){
                        resolve({ code: 404, msg: '无该id数据可获取！' });
                        return false;
                    }
                    let arr = obj.attributes.caseList;
                    // 删除当前对象
                    arr.splice(index, 1);
                    // 修改数据
                    BmobServer.EditOne('Product', id, { caseList : arr }).then(res => resolve(res)).catch(err => reject(err))
                },
                error: (obj, err) => reject(err)
            });
        });
    }
}