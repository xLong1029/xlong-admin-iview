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
    // 添加一行数据
    Add: (tableName) => {
    },
    // 删除一行数据
    Del: () =>{

    },
    // 修改一行数据
    Edit: () => {

    },
    // 查询数据
    Query: (tableName) => {
        // 创建Bmob.Object子类
        let DataTable = Bmob.Object.extend(tableName);
        // 创建查询对象，入口参数是对象类的实例
        let obj = new Bmob.Query(DataTable);
        return obj;
    },
}