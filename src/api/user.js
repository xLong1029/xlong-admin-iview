/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 用户信息操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-05
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
  /**
   * 登录
   *
   * @param {*} data 参数
   */
  Login: (data) => {
    return request({
      url: "/api/user/login",
      method: "post",
      data,
    });
  },
  /**
   * 获取用户信息
   */
  GetUser: () => {
    return request({
      url: `/api/user/info`,
      method: "get",
    });
  },
  /**
   * 修改个人资料
   *
   * @param {*} data 参数
   * @param {*} id 用户id
   */
  EditProfile: (data) => {
    return request({
      url: "/api/user/info/edit",
      method: "post",
      data,
    });
  },
  /**
   * 修改密码
   *
   * @param {*} data 参数
   */
  ChangePwd: (data) => {
    return request({
      url: "/api/user/password/edit",
      method: "post",
      data,
    });
  },
  /**
   * 退出登录
   */
  Logout: () => {
    return request({
      url: "/api/user/logout",
      method: "post"
    });
  },
};
