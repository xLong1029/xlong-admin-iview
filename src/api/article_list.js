/*
 * 功能 : 封装数据交互api接口(数据使用的是bmob云数据，请求方法使用bmob云规定方法)。
 * 用处 : 文章操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2019-4-29
 * 版本 : version 2.0
 */
import BmobServer from 'bmob/bmob-server.js'

export default {
    // 获取文章列表
    // params：查询参数对象, pageNo：当前页码, pageSize：每页显示几条数据
    GetArtcList: (params, pageNo, pageSize) => {
        let query = BmobServer.GetQuery('Article');
        if(params && Object.keys(params).length){
            if(params.id) query.equalTo('objectId', '==', params.id);
            if(params.sTime) query.equalTo('createdAt', '>=', params.sTime);
            if(params.eTime) query.equalTo('createdAt', '<=', params.eTime );
        }
        return new Promise((resolve, reject) => {
            BmobServer.GetListData(query, pageNo, pageSize).then(res => resolve(res)).catch(err => reject(err));
        });
    },
    // 删除文章
    // ids：需要删除的对象的objectId
    DeleteArtc: (ids) => {
        return new Promise((resolve, reject) => {
            BmobServer.DelMore('Article', ids).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 获取文章详情
    // id：查询的objectId
    GetArtcDetail: (id) => {
        return new Promise((resolve, reject) => {
            BmobServer.GetOne('Article', id).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 新增文章
    // params: 新增的参数对象
    AddArticle: (params) => {
        return new Promise((resolve, reject) => {
            BmobServer.AddOne('Article', params).then(res => resolve(res)).catch(err => reject(err))
        });
    },
    // 编辑文章
    // params: 修改的参数对象, id：查询的objectId
    EditArticle: (params, id) => {
        return new Promise((resolve, reject) => {
            BmobServer.EditOne('Article', id, params).then(res => resolve(res)).catch(err => reject(err))
        });
    }
}
