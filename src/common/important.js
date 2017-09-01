/*
 * 功能 : 封装一些重要函数
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
// 设置cookie
export function SetCookie(cname, cvalue, exdays){
    if(exdays){
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }else{
        document.cookie = cname + "=" + cvalue + "; ";
    }
}
// 获取cookie
export function GetCookie(cname){
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i ++) {
            let c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
}
// 删除cookie
export function DelCookie(cname){
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
// localstorage写入本地缓存
export function SetLocalS(key,value){
    localStorage.setItem(key, value);
}
// localstorage获取本地缓存
export function GetLocalS(key,value){
    let res = localStorage.getItem(key);
    if(res && res!='null') return res;
    else return false;
}
// localstorage删除本地储存
export function DelLocalS(key){
    localStorage.removeItem(key);
}
// localstorage清空本地储存
export function ClearLocalS(){
    localStorage.clear();
}
// 获取参数值
export function GetParams(params){
    let obj = { key : [], value: [] };
    for(let i in params){
        obj.key.push(i);
        obj.value.push(params[i]);
    }
    return obj;
}
// 密码加密（简单模拟）
export function Encrypt(pwd){
    let value = '';
    for (let i = 0; i < pwd.length; i++) {
        let r = pwd.charCodeAt(i);
        value += String.fromCharCode(r + 2);
    }
    return value;
}
// 密码解密（简单模拟）
export function Decrypt(value){
    let pwd = '';
    for (let i = 0; i < value.length; i++) {
        let r = value.charCodeAt(i);
        pwd += String.fromCharCode(r - 2);
    }
    return pwd;
}