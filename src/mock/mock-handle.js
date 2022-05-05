/**
 * 处理token
 * 
 * @param {*} config 请求配置
 * @returns 
 */
export const handleToken = (config) => {
    const {
        authorization
    } = config.headers

    return authorization.replace("bearer ", "");
}

/**
 * 处理响应
 * 
 * @param {*} code 状态码
 * @param {*} message 提示语
 * @param {*} data 返回数据
 * @returns 
 */
export const handleResponse = (code, message = null, data = null) => {
    if (!message) {
        switch (code) {
            case 200:
                message = "请求成功";
            case 400:
                message = '请求无效';
            case 401:
                message = '用户未授权';
                break;
            case 403:
                message = '拒绝请求';
                break;
            case 404:
                message = "找不到该资源";
                break;
            case 500:
                message = "程序内部错误";
        }
    }

    return {
        code,
        message,
        data,
    }
}

/**
 * 处理Mock请求
 * 
 * @param {Object} config 请求配置
 * @param {Function} handleData 处理数据方法
 * @returns 
 */
export const handleMock = (config, handleData) => {
    try {
        const token = handleToken(config);

        const { url } = config;

        if (!token && url.indexOf("/api/user/login") < 0) {
            return {
                code: 401,
                message: '未授权',
                data: null,
            }
        }

        return handleData({ config, token });
    }
    catch (err) {
        return handleResponse(500);
    }
}
