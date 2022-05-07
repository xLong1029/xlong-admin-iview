/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 账户操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
  /**
   * 获取所有账户列表
   *
   * @param {*} params 查询参数对象
   * @param {*} pageNo 当前页码
   * @param {*} pageSize 每页显示几条数据
   */
  GetAccList: (params, pageNo, pageSize) => {
    return request({
      url: `/api/account/list`,
      method: "get",
      params: {
        params,
        pageNo,
        pageSize,
      },
    });
  },
  /**
   * 新增账户
   *
   * @param {*} data 新增的参数对象
   */
  AddAccount: (data) => {
    return request({
      url: `/api/account/add`,
      method: "post",
      data,
    });
  },
  /**
   * 修改账户信息
   *
   * @param {*} data 修改的参数对象
   */
  EditAccount: (data) => {
    return request({
      url: `/api/account/edit`,
      method: "post",
      data,
    });
  },
  /**
   * 删除账户
   *
   * @param {*} ids 需要删除的对象的Id
   */
  DeleteAcc: (ids) => {
    return request({
      url: `/api/account/delete`,
      method: "post",
      data: {
        ids,
      },
    });
  },
  /**
   * 启用或禁用账户
   *
   * @param {*} ids 需要更新的对象的Id
   */
  EnableAcc: (state, ids) => {
      console.log(state, ids);
    return request({
      url: `/api/account/enable?state=${state}`,
      method: "post",
      data: {
        ids,
      },
    });
  }
};
