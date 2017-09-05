/*
 * 功能 : 封装bmob的增删改查数据方法。
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import Common from 'common/common.js'

export default {
    // 初始化
    Init: () => {
        // Bmob.initialize("Application ID", "REST API Key");
        Bmob.initialize(Common.APPLICATION_ID, Common.REST_API_KEY);
    },
    // 添加数据
    Add: (tableName) => {
        // 创建Bmob.Object子类
        let DataTable = Bmob.Object.extend(tableName);
        // 创建类
        let obj = new DataTable;
        return obj;
    },
    // 查询数据
    Query: (tableName) => {
        // 创建Bmob.Object子类
        let DataTable = Bmob.Object.extend(tableName);
        // 创建查询对象，入口参数是对象类的实例
        let obj = new Bmob.Query(DataTable);
        return obj;
    },
    // 删除一行数据
    DelOne: (tableName, objectId) => {
        let DataTable = Bmob.Object.extend(tableName);
        let query = new Bmob.Query(DataTable);
        // 获取对象并删除
        return new Promise((resolve, reject) => { 
            query.get(objectId, {
                success: (obj) => {
                    obj.destroy({
                        success: (res) => resolve({ code: 200, data: res }),
                        error: (res, err) => resolve(err)
                    });
                },
                error: (obj, err) => console.log('获取对象失败')
            });
        });
    },
    // 修改一行数据
    EditOne: (tableName, objectId, params) => {
        let DataTable = Bmob.Object.extend(tableName);
        let query = new Bmob.Query(DataTable);
        // 获取对象并修改
        return new Promise((resolve, reject) => { 
            query.get(objectId, {
                success: (obj) => {
                    // 设置并保存数据
                    obj.save(params, {
                        success: res => {
                            resolve({ code: 200, data: res });
                            console.log(res);
                        },
                        err: err => {
                            reject(err);
                            console.log(err);
                        }
                    });
                },
                error: (obj, err) => console.log('获取对象失败')
            });
        });
    }
}