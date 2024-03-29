import axios from "axios";
// import { Message } from "view-design";
// import { getToken } from "utils/auth.js";

export function handelRequestError(error) {
    switch (error.response.status) {
        case 401:
            // Message({
            //     content: "未授权！请重新登录",
            //     type: "error",
            //     duration: 5 * 1000
            // });
            break;
        case 403:
            // Message({
            //     content: error.response.content,
            //     type: "error",
            //     duration: 5 * 1000
            // });
            break;
        case 500:
            // Message({
            //     content: "服务器繁忙，请稍后重试",
            //     type: "error",
            //     duration: 5 * 1000
            // });
            break;
        default:
            break;
    }
}

export function configSetting(config) {
    // config.headers["authorization"] = "bearer " + getToken();
    return config;
}

const service = axios.create({
    baseURL: "", // url = base url + request url
    timeout: 200000
});

service.interceptors.request.use(
    config => {
        return configSetting(config);
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
        if (error && error.response) {
            handelRequestError(error);
        }

        return Promise.reject(error);
    }
);

export default service;