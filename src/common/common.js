/*
 * 功能 : 封装通用常量与公共方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */

/* 通用常量 */
export default {
    // bmob 应用密钥
    APPLICATION_ID: '07ffab130cdf11f91381f18779fcf697',
    REST_API_KEY: '653887187daf660941971acf257cccc1',
    // 七牛云上传Token，因无服务端所以目前是手动设置，可选时效为12小时
    // 七牛云存储在线上传凭证地址：http://jsfiddle.net/gh/get/extjs/4.2/icattlecoder/jsfiddle/tree/master/uptoken?ref=developer.qiniu.com
    UPLOAD_TOKEN: 'd4N11KEZxF2QFo9is4DFKGXRFfdyhFuAbNRYqzP0:HidZJLKp_gWsHsNw0r_0oPbINAw=:eyJzY29wZSI6ImltYWdlc3RvcmUiLCJkZWFkbGluZSI6MTUwNTE0ODY1Mn0=',
    // 上传文件显示的测试地址
    UPLOAD_URL: 'http://ovw49042e.bkt.clouddn.com/',
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

    /* 公共方法 */
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
    // 时间格式化
    FormatDate: (date) => {
        if(!date) return;
        if(typeof date =='string' && date.indexOf('-') != -1) return date;
        else{
            let year = date.getFullYear(); 
            let month = date.getMonth() + 1; 
            let day = date.getDate(); 
            let hour = date.getHours(); 
            let minute = date.getMinutes(); 
            let second = date.getSeconds(); 
            return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
        }        
    },
    // 设置默认图片
    // type：1 显示默认头像，2 显示暂无图片
    SetDefaultPic: (event, type) => {
        switch(type){
            case 1: event.currentTarget.src = require('assets/images/default-face.jpg'); break;
            case 2: event.currentTarget.src = require('assets/images/no-found-pic.jpg'); break;
            default: console.log('get pic error'); return false;
        }
        //控制不要一直跳动
        event.currentTarget.onerror = null;
    }
}
