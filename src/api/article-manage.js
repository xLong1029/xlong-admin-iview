/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 文章操作相关api
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
  GetArtcList: (params, pageNo, pageSize) => {
    return request({
      url: `/api/article/list`,
      method: "get",
      params: {
        params,
        pageNo,
        pageSize,
      },
    });
  },
  /**
   * 获取文章详情
   *
   * @param {*} id 对象的Id
   */
  GetArtcDetail: (id) => {
    return request({
      url: `/api/article/detail`,
      method: "get",
      params: {
        id,
      },
    });
  },
  /**
   * 删除账户
   *
   * @param {*} ids 需要删除的对象的Id
   */
  DeleteArtc: (ids) => {
    return request({
      url: `/api/article/delete`,
      method: "post",
      data: {
        ids,
      },
    });
  },
  /**
   * 新增文章
   *
   * @param {*} data 新增的参数对象
   */
   AddArticle: (data) => {
    return request({
      url: `/api/article/add`,
      method: "post",
      data,
    });
  },
  /**
   * 编辑文章
   *
   * @param {*} data 修改的参数对象
   */
  EditArticle: (data) => {
    return request({
      url: `/api/article/edit`,
      method: "post",
      data,
    });
  },
};
