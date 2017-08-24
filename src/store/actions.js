import LoginCheck from 'common/login_check.js'
import Common from 'common/common.js'
const actions = {
    // Token验证
    CheckToken ({ commit , state }) {
        Login.GetUserInfo(Common.GetCookie('token'))
        .then((res)=>{
            const result = res.data.data;
            // 登录认证成功
            if(res.data.code == 200)
                LoginCheck.setAccount(commit, result);
            // 登录认证失败
            else LoginCheck.clearAccount(commit);
        })
        .catch((err)=>{
            console.log(err);
            LoginCheck.clearAccount(commit);
        })
    },
    // 登出
    LogOut ({ commit, state }) {
        LoginCheck.clearAccount(commit);           
    },
}

export default actions