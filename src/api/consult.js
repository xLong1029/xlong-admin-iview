/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 消息列表api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 1.0
 */
import request from "utils/request.js";

export default {
  /**
   * 获取消息列表
   */
   GetConsultList: () => {
    return request({
      url: "/api/consult/list",
      method: "get",
    });
  }
};
