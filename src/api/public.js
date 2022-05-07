/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 公用数据api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 1.0
 */
import request from "utils/request.js";

export default {
  /**
   * 获取企业名称
   */
  GetCompanyNames: () => {
    return request({
      url: "/api/list/companyNames",
      method: "get",
    });
  },
  /**
   * 获取快递公司
   */
  GetExpressCompanys: () => {
    return request({
      url: "/api/list/expressCompanys",
      method: "get",
    });
  },
   /**
   * 获取职位列表
   */
    GetJobList: () => {
      return request({
        url: "/api/list/job",
        method: "get",
      });
    },
  /**
   * 获取省市列表
   */
   GetCityList: () => {
    return request({
      url: "/api/list/city",
      method: "get",
    });
  },
  /**
   * 获取专业领域列表
   */
  GetProfessionList: () => {
    return request({
      url: "/api/list/profession",
      method: "get",
    });
  },
};
