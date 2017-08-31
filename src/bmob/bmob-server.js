// 通用JS方法
import Common from 'common/common.js'

export default {
    // 初始化
    Init: () => {
        // Bmob.initialize("Application ID", "REST API Key");
        Bmob.initialize(Common.APPLICATION_ID, Common.REST_API_KEY);
    },
    // 添加一行数据
    Add: (DATABASE_TABLE) => {
        // 创建Bmob.Object子类
        let DataTable = Bmob.Object.extend(DATABASE_TABLE);
        // 创建该类的一个实例
        let obj = new DataTable();
        return obj;
    },
    // 删除一行数据
    Del: () =>{

    },
    // 修改一行数据
    Edit: () => {

    },
    // 获取一行数据
    Get: (DATABASE_TABLE, params) => {
        // 创建Bmob.Object子类
        let DataTable = Bmob.Object.extend(DATABASE_TABLE);
        // 创建查询对象，入口参数是对象类的实例
        let obj = new Bmob.Query(DataTable);

        return new Promise((resolve, reject) => {
            // 查询单条数据，第一个参数是这条数据的objectId值
			obj.get(params, {
                success: (object) => { resolve(object) },
                error: (error) => { reject(error) }
            })
		})
    }
}