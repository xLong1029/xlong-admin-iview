import Api from 'api/api.js'
import LoginCheck from 'common/login_check.js'
import { GetCookie } from 'common/important'
const actions = {
    // Token验证
    CheckToken ({ commit , state }) {
        Api.GetUserInfo({ token: GetCookie('token') })
        .then(res => {
            // 登录认证成功
            if(res) LoginCheck.setAccount(commit, res);
            // 登录认证失败
            else LoginCheck.clearAccount(commit);
        })
        .catch(err => {
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