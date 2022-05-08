/*
 * 功能 : 封装一些主要工具方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2022-05-07
 * 版本 : version 4.0
 */

const CryptoJS = require("crypto-js");

/**
 * 设置cookie
 *
 * @param {*} cname key名
 * @param {*} cvalue 值
 * @param {*} exdays 过期时间，以毫秒计
 */
export function SetCookie(cname, cvalue, exdays) {
  if (exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  } else {
    document.cookie = cname + "=" + cvalue + "; ";
  }
}

/**
 * 获取cookie
 *
 * @param {*} cname key名
 */
export function GetCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/**
 * 删除cookie
 *
 * @param {*} cname  key名
 */
export function DelCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * localstorage写入本地缓存
 *
 * @param {*} key key名
 * @param {*} value 值
 */
export function SetLocalS(key, value) {
  localStorage.setItem(key, value);
}

/**
 * localstorage获取本地缓存
 *
 * @param {*} key key名
 */
export function GetLocalS(key) {
  let res = localStorage.getItem(key);
  if (res && res != 'null') return res;
  else return false;
}

/**
 * localstorage删除本地储存
 *
 * @param {*} key key名
 */
export function DelLocalS(key) {
  localStorage.removeItem(key);
}

/**
 * localstorage清空所有本地储存
 */
export function ClearLocalS() {
  localStorage.clear();
}

/**
 * 获取url传值参数
 *
 * @param {*} name 参数名
 * @param {*} thisUrl url地址，若不传则获取当前地址
 */
export function GetUrlQuery(name, thisUrl) {
  let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
    url = thisUrl || location.href;
  if (reg.test(url)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
  else return false;
}

/**
 * 获取参数值
 *
 * @param {*} params 参数对象
 */
export function GetParams(params) {
  return {
    key: Object.keys(params),
    value: Object.values(params)
  };
}

/**
 * 删除对象指定属性
 *
 * @param {*} obj 对象
 * @param {*} uselessKeys 不需要的属性序列
 */
export function ObjOmit(obj, uselessKeys) {
  uselessKeys.forEach(key => delete obj[key]);
  return obj;
}

/**
 * AES加密
 *
 * @param {String} str 内容
 * @param {*} key 密钥
 * @param {*} iv
 */
export const AESEncrypt = (str, key = "xLong", iv = "") => {
  return CryptoJS.AES.encrypt(str, iv, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

/**
 * AES解密
 *
 * @param {String} str 内容
 * @param {*} key 密钥
 * @param {*} iv
 */
export const AESDecrypt = (str, key = "xLong", iv = "") => {
  return CryptoJS.AES.decrypt(str, iv, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};

/**
 * 判断指定节点是否包含某个class类名
 *
 * @param {*} node 节点
 * @param {*} className 类名
 */
export function HasClass(node, className) {
  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
  return node.className.match(reg);
}

/**
 * 给指定节点添加class类名
 *
 * @param {*} node 节点
 * @param {*} className 类名
 */
export function AddClass(node, className) {
  if (!HasClass(node, className)) {
    node.className += ' ' + className;
  }
}

/**
 * 给指定节点移除class类名
 *
 * @param {*} node 节点
 * @param {*} className 类名
 */
export function RemoveClass(node, className) {
  if (HasClass(node, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    node.className = node.className.replace(reg, ' ');
  }
}

/**
 * 给指定节点切换class类名，若存在则移除，若不存在则添加
 *
 * @param {*} node 节点
 * @param {*} className 类名
 */
export function ToggleClass(node, className) {
  if (HasClass(node, className)) {
    RemoveClass(node, className);
  } else {
    AddClass(node, className);
  }
}

/**
 * 返回某个节点的所有兄弟节点
 *
 * @param {*} node 节点
 */
export function SiblingsNode(node) {
  let a = [];
  let p = node.parentNode.children;
  for (let i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== node) a.push(p[i]);
  }
  return a;
}

/**
 * 让节点向上滑行
 *
 * @param {*} node 节点
 * @param {*} height 原始高度
 * @param {*} duration 持续时间，以毫秒计
 */
export function SlideUp(node, height, duration) {
  // 解决slideUp闪现问题
  node.setAttribute('style', `height: ${height}px`);
  setTimeout(() => {
    const time = duration / 1000;
    const style = `height: 0; transition: height ${time}s; -o-transition: height ${time}s; -webkit-transition: height ${time}s; -ms-transition: height ${time}s; -moz-transition: height ${time}s;`;
    node.setAttribute('style', style);
  }, 0);
}

/**
 * 让节点向下滑行
 *
 * @param {*} node 节点
 * @param {*} height 高度
 * @param {*} duration 持续时间，以毫秒计
 */
export function SlideDown(node, height, duration) {
  const time = duration / 1000;
  const style = `height: ${height}px; transition: height ${time}s; -o-transition: height ${time}s; -webkit-transition: height ${time}s; -ms-transition: height ${time}s; -moz-transition: height ${time}s;`;
  node.setAttribute('style', style);
}

/**
 * 深克隆
 *
 * @param {*} obj 操作对象
 */
export function DeepClone(obj) {
  let copy = JSON.stringify(obj);
  return JSON.parse(copy);
}

/**
 * 数组转字符串
 *
 * @param {*} arr 数组
 * @param {*} l 拼接符
 */
export function ArrToStr(arr, l) {
  return arr.join(l);
}

/**
 * 字符串转数组
 *
 * @param {*} string 字符串
 * @param {*} s 分隔符
 */
export function StrToArr(string, s) {
  return string.split(s);
}

/**
 * 比较日期大小
 *
 * @param {*} dateOne 第一个日期
 * @param {*} dateTwo 第二个日期
 */
export function CompareDate(dateOne, dateTwo) {
  // console.log(dateOne, typeof(dateOne), dateTwo, console.log(typeof(dateTwo)))
  const CompareDateOne = typeof (dateOne) == 'string' ? new Date(dateOne.replace(/-/g, "\/")) : dateOne;
  const CompareDateTwo = typeof (dateTwo) == 'string' ? new Date(dateTwo.replace(/-/g, "\/")) : dateTwo;

  return CompareDateOne <= CompareDateTwo;
}
/**
 * 日期设置--用于iView的DatePicker的daterange类型数据配置，和Vue版本冲突，Vue2.4版本以上不可用
 *
 * @param {*} type 1 最近一周，2 最近一个月，3 最近三个月
 */
export function SetDate(type) {
  const end = new Date();
  const start = new Date();
  switch (type) {
    case 1: {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
    case 2: {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
    case 3: {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }
    default: console.log('get pic error'); return false;
  }
}

/**
 * 日期格式化
 *
 * @param {*} date 日期
 */
export function FormatDate(date) {
  if (!date) return;
  if (typeof date == 'string' && date.indexOf('-') != -1) return date;
  else {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return year + "-" + month + "-" + day + ' ' + hour + ':' + minute + ':' + second;
  }
}

/**
 * 设置默认图片
 *
 * @param {*} event 当前对象
 * @param {*} type 1 显示默认头像，2 显示暂无图片
 */
export function SetDefaultPic(event, type) {
  switch (type) {
    case 1: event.currentTarget.src = require('assets/images/default-face.jpg'); break;
    case 2: event.currentTarget.src = require('assets/images/no-found-pic.jpg'); break;
    default: console.log('get pic error'); return false;
  }
  //控制不要一直跳动
  event.currentTarget.onerror = null;
}

/**
 * 参数转对象格式
 *
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * 数字转成汉字
 *
 * @param {string} url
 * @returns {Object}
 */
export function ConvertToChinaNum(num) {
  var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
  var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿');

  if (!num || isNaN(num)) {
    return "零";
  }

  let english = num.toString().split("")
  let result = "";
  for (let i = 0; i < english.length; i++) {
    let des_i = english.length - 1 - i; // 倒序排列设值        
    result = arr2[i] + result;
    let arr1_index = english[des_i];
    result = arr1[arr1_index] + result;
  }

  // 将【零千、零百】换成【零】 【十零】换成【十】    
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');

  // 合并中间多个零为一个零  
  result = result.replace(/零+/g, '零');

  // 将【零亿】换成【亿】【零万】换成【万】    
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');

  //将【亿万】换成【亿】    
  result = result.replace(/亿万/g, '亿');

  //移除末尾的零
  result = result.replace(/零+$/, '')


  //将【一十】换成【十】
  result = result.replace(/^一十/g, '十');

  return result;
}

// 删除数组指定某个元素
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

