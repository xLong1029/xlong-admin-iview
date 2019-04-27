/*
 * 功能 : 封装bmob的增删改查数据方法。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import Common from 'common/common.js'
import { GetParams, ObjOmit } from 'common/important.js'

export default {
    // 初始化
    Init: () => {
        // Bmob.initialize("Application ID", "REST API Key");
        Bmob.initialize(Common.APPLICATION_ID, Common.REST_API_KEY);
    },
    // 获取查询数据对象
    GetQuery: (tableName) => {
        // 创建查询对象，入口参数是对象类的实例
        const query = Bmob.Query(tableName);
        return query;
    },
    // 根据分页查询数据
    PageQuery: (tableName, pageNo, pageSize) => {
        let query = Bmob.Query(tableName);
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
                error: err => reject(err)
            });
        });
    },
    // 筛选数据
    FilterQuery: (query, params, pageNo, pageSize) => {
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
                error: err => reject(err)
            });
        });
    },
    // 根据日期筛选数据
    DateFilterQuery: (query, params, pageNo, pageSize) => {
        return new Promise((resolve, reject) => {
            query.find({
                success: obj => {                 
                    /* 筛选指定日期内的数据 */
                    if(params.sTime != '' && params.eTime != ''){
                        let result = [];
                        for(let item of obj){
                            let startDate = (new Date(params.sTime)).toLocaleDateString();
                            // bmob的问题，结束日期当天获取不到，只能获取到结束日期的前一天，所以此处需要多加一天
                            let endDate = new Date(params.eTime);
                            endDate = endDate.getFullYear() + '/' + (endDate.getMonth() + 1) + '/' + (endDate.getDate() + 1);
                            // 比较日期大小，若第一个值小于第二个值则返回true
                            let start = Common.CompareDate(startDate, item.createdAt),
                                end = Common.CompareDate(item.createdAt, endDate);
                            // 满足条件则保留数据
                            if(start && end) result.push(item);
                        }
                        let page = { count: result.length, pages: Math.ceil(result.length / pageSize) };
                        // 截取部分数据
                        result = result.splice((pageNo - 1)* pageSize, pageNo* pageSize);                        
                        resolve({ code: 200, data: result, page });
                    }
                    /* 筛选指定日期内的数据 */
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
                error: err => reject(err)
            });
        });
    },
    // 获取一行数据
    GetOne: (tableName, objectId) => {
        let query = Bmob.Query(tableName);
        return new Promise((resolve, reject) => {
            query.get(objectId).then(res => resolve({ code: 200, data: res })).catch(err => reject(err));
        });
    },
    // 添加一行数据
    AddOne: (tableName, params) => {
        let query = Bmob.Query(tableName);
        let p = GetParams(params);
        console.log(p);
        return new Promise((resolve, reject) => {
            // 添加数据，第一个入口参数是Json数据
            query.save(params, {
                success: res => resolve({ code: 200, data: res }),
                error: err => reject(err)
            });
        });
    },
    // 删除一行数据
    DelOne: (tableName, objectId) => {
        let query = Bmob.Query(tableName);
        // 获取对象并删除
        return new Promise((resolve, reject) => { 
            query.get(objectId, {
                success: obj => {
                    if(obj == undefined){
                        resolve({ code: 404, msg: '无该id数据可获取！' });
                        return false;
                    }
                    obj.destroy({
                        success: (res) => resolve({ code: 200, data: res }),
                        error: (res, err) => resolve(err)
                    });
                },
                error: () => console.log('无法通过该objectId获取数据')
            });
        });
    },
    // 修改一行数据
    EditOne: (tableName, objectId, params) => {
        let query = Bmob.Query(tableName);
        // 删除参数中的objectId值
        ObjOmit(params, ['objectId', 'createdAt', 'updatedAt']);
        // 获取对象并修改
        return new Promise((resolve, reject) => {
            query.get(objectId).then(res => {
                // 循环执行set操作
                for(let i in params){
                    res.set(i, params[i]);
                }
                res.save().then(() => resolve({ code: 200, msg: '操作成功！' })).catch(err => reject(err))
            }).catch(() => console.log('无法通过该objectId获取数据'))
        });
    },
    // 批量删除数据
    DelMore: (tableName, objectIds) => {
        let query = Bmob.Query(tableName);
        // 删除成功或失败的对象集合
        let failObj = [], succObj = [];
        // 是否删除失败
        let fail = false;
        return new Promise((resolve, reject) => {
            // 遍历删除
            for(var objectId of objectIds){
                query.get(objectId, {
                    success: obj => {
                        obj.destroy({
                            success: (res) => { succObj.push(res); },
                            error: (res, err) => { failObj.push(err); fail = true; }
                        });
                    },
                    error: () => console.log('获取对象失败')
                });
            }
            // 延迟判断
            setTimeout(() => {
                if(!fail) resolve({ code: 200, data: succObj })
                else resolve({ code: 0, data: failObj })
            }, 1000);
        });
    },
    // 批量修改数据
    EditMore: (tableName, objectIds, params) => {
        let query = Bmob.Query(tableName);
        // 删除成功或失败的对象集合
        let failObj = [], succObj = [];
        // 是否删除失败
        let fail = false;
        return new Promise((resolve, reject) => {
            // 遍历删除
            for(var objectId of objectIds){
                query.get(objectId, {
                    success: obj => {
                        // 设置并保存数据
                        obj.save(params, {
                            success: (res) => { succObj.push(res); },
                            error: (res, err) => { failObj.push(err); fail = true; }
                        });
                    },
                    error: () => console.log('获取对象失败')
                });
            }
            // 延迟判断
            setTimeout(() => {
                if(!fail) resolve({ code: 200, data: succObj })
                else resolve({ code: 0, data: failObj })
            }, 1000);
        });
    },
}