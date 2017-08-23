export default {
    /* 通用常量 */
    // 邮政编码正则表达式
    regPostCode: '/^[1-9]\d{5}$/',
    // 邮箱正则表达式
    regEmail: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    // 手机号正则表达式
    regMobile: /^1(3|4|5|7|8)\d{9}$/,
    // 手机号正则表达式
    regPassword: /^[\w]{6,12}$/,
    // 网站地址正则表达式
    regWebsite: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
    // 普通电话(包含手机和座机)正则表达式
    regPhone: /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
    
    /* 通用方法 */
    // 下载文件
    DownFile: (blob, fileName) => {
        // 判断是否有msSaveOrOpenBlob，在客户端上以本地方式保存文件（任意大小），方法如同从 Internet 下载文件
        if (window.navigator.msSaveOrOpenBlob) {
            // msSaveBlob只能保存，不能在线打开
            navigator.msSaveBlob(blob, fileName);
        }
        else {
            // 创建a标签
            let link = document.createElement('a');
            // 创建URL
            link.href = window.URL.createObjectURL(blob);
            // 设置下载名称
            link.download = fileName;
            // 触发标签点击事件
            link.click();
            // 释放URL
            window.URL.revokeObjectURL(link.href);
        }
    },
    // 比较日期大小
    CompareDate: (dateOne, dateTwo) => {
        return ((new Date(dateOne.replace(/-/g,"\/"))) <= (new Date(dateTwo.replace(/-/g,"\/"))));
    },
    // 设置时间
    // type：1 最近一周，2 最近一个月，3 最近三个月
    SetDate: (type) => {
        const end = new Date();
        const start = new Date();        
        switch(type){
            case 1: {
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
            }
            case 2:{
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
            }
            case 3:{
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
            }
            default: console.log('get pic error'); return false;
        }
    },
    // 设置默认图片
    // type：1 显示默认头像，2 显示暂无图片
    SetDefaultPic: (event, type) => {
        switch(type){
            case 1: event.currentTarget.src = require('@/assets/images/default-face.jpg'); break;
            case 2: event.currentTarget.src = require('@/assets/images/no-found-pic.jpg'); break;
            default: console.log('get pic error'); return false;
        }
        //控制不要一直跳动
        event.currentTarget.onerror = null;
    },
}