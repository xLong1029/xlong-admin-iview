/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 登录验证操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-05
 * 版本 : version 3.0
 */

import request from "utils/request";

export default {
    /**
     * 登录
     *
     * @param {*} data 参数
     */
     Login: (data) => {
         console.log(data);
        return request({
            url: '/api/user/login',
            method: 'post',
            data
        })
    }
}