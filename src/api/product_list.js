/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 产品操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2019-4-29
 * 版本 : version 2.0
 */
import BmobServer from 'bmob/bmob-server.js'

export default {
    // 获取产品列表
    // params：查询参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    GetProdList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Product');
        if(params && Object.keys(params).length){
            // 筛选查询
            if(params.id) query.equalTo('objectId', '==', params.id);
            if(params.productName) query.equalTo('productName', '==', params.productName);
            if(params.dataFrom) query.equalTo('dataFrom', '==', parseInt(params.dataFrom));
        }
        return new Promise((resolve, reject) => {
            BmobServer.GetListData(query, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err));
        });
    },
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
        return new Promise((resolve, reject) => {
            BmobServer.GetOne('Product', id).then(res => resolve({ code: 200, data: res.data.caseList })).catch(err => reject(err))
        });
    },
    // 新增案例
    // params: 新增的参数对象, id：查询的objectId
    AddCase: (params, id) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => {
            query.get(id).then(res => {
                let caseList = res.caseList ? res.caseList : [];
                caseList.push(params);

                res.set('caseList',caseList);
                res.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
        });
    },
    // 编辑案例
    // params: 修改的参数对象, id：查询的objectId, index: 案例数组对应索引
    EditCase: (params, id, index) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => {
            query.get(id).then(res => {
                let caseList = res.caseList ? res.caseList : [];
                // 删除当前对象并在当前位置插入一项
                caseList.splice(index, 1, params);
                
                res.set('caseList',caseList);
                res.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
        });
    },
    // 删除案例
    // id：查询的objectId, index: 案例数组对应索引
    DelCase: (id, index) => {
        let query = BmobServer.GetQuery('Product');
        return new Promise((resolve, reject) => {
            query.get(id).then(res => {
                let caseList = res.caseList ? res.caseList : [];
                // 删除当前对象
                caseList.splice(index, 1);
                
                res.set('caseList',caseList);
                res.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => resolve({ code: 404, msg: '对象不存在！' }))
        });
    }
}