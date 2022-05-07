/*
 * 功能 : 封装数据交互api接口(mock.js请求)。
 * 用处 : 板块操作相关api
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 3.0
 */
import request from "utils/request.js";

export default {
    /**
     * 获取板块列表
     *
     * @param {*} params 查询参数对象
     * @param {*} pageNo 当前页码
     * @param {*} pageSize 每页显示几条数据
     */
    GetSecList: (params, pageNo, pageSize) => {
        return request({
            url: `/api/section/list`,
            method: "get",
            params: {
                params,
                pageNo,
                pageSize,
            },
        });
    },
    /**
     * 新增版块
     *
     * @param {*} data 新增的参数对象
     */
    AddSection: (data) => {
        return request({
            url: `/api/section/add`,
            method: "post",
            data,
        });
    },
    /**
     * 编辑版块
     *
     * @param {*} data 修改的参数对象
     */
    EditSection: (data) => {
        return request({
            url: `/api/section/edit`,
            method: "post",
            data,
        });
    },
    /**
     * 删除版块
     *
     * @param {*} ids 需要删除的对象的Id
     */
    DeleteSec: (ids) => {
        return request({
            url: `/api/section/delete`,
            method: "post",
            data: {
                ids,
            },
        });
    },
    /**
    * 获取内容列表
    *
    * @param {*} sectionId 父级板块id
    * @param {*} pageNo 当前页码
    * @param {*} pageSize 每页显示几条数据
    */
    GetContList: (sectionId, pageNo, pageSize) => {
        return request({
            url: `/api/content/list`,
            method: "get",
            params: {
                sectionId,
                pageNo,
                pageSize,
            },
        });
    },
    /**
     * 新增内容
     *
     * @param {*} data 新增的参数对象
     */
    AddCont: (data) => {
        return request({
            url: `/api/content/add`,
            method: "post",
            data,
        });
    },
    /**
     * 编辑内容
     *
     * @param {*} data 编辑的参数对象
     */
    EditCont: (data) => {
        return request({
            url: `/api/content/edit`,
            method: "post",
            data,
        });
    },
    /**
     * 删除内容
     *
     * @param {*} ids 需要删除的对象的Id
     */
    DeleteCont: (ids) => {
        return request({
            url: `/api/content/delete`,
            method: "post",
            data: {
                ids,
            },
        });
    }
}
