/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 板块操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2019-4-29
 * 版本 : version 2.0
 */
import BmobServer from 'bmob/bmob-server.js'

export default {
    // 获取版块列表
    // params：查询参数对象, pageNo：当前第一页, pageSize：每页显示几条数据
    GetSecList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Section');
        if(params && Object.keys(params).length){
            if(params.id) query.equalTo('objectId', '==', params.id);
            if(params.title) query.equalTo('title', '==', params.title);
            if(params.type) query.equalTo('type', '==', parseInt(params.type));
        }
        return new Promise((resolve, reject) => {
            BmobServer.GetListData(query, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 新增版块
    // params: 新增的参数对象
    AddSection: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('Section', params).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 编辑版块
    // params: 修改的参数对象, id：查询的objectId
    EditSection: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('Section', id, params).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 删除版块
    // ids：需要删除的对象的objectId
    DeleteSec: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('Section', ids).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 获取内容列表
    // pageNo：当前第一页, pageSize：每页显示几条数据, parentId：父级板块id
    GetContList: (parentId, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('SectionCont');
        // 查询语句
        query.equalTo('parentId', '==', parentId);
        return new Promise((resolve, reject) => {
            BmobServer.GetListData(query, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 新增内容
    // params: 新增的参数对象
    AddContent: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('SectionCont', params).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 删除内容
    // ids：需要删除的对象的objectId
    DeleteCont: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('SectionCont', ids).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 编辑内容
    // params: 修改的参数对象, id：查询的objectId
    EditContent: (params, id) => {
        console.log(params);
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('SectionCont', id, params).then(res => resolve(res)).catch(err => reject(err));
        });
    }
}