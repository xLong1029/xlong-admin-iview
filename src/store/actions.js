import Api from 'api/api.js'
import LoginCheck from 'common/login_check.js'
import { GetCookie } from 'common/important'
const actions = {
    // Token验证
    CheckToken ({ commit , state }) {
        Api.GetUserInfo({ token: GetCookie('token') })
        .then(res => {
            // 登录成功
            if(res.code == 200) LoginCheck.setAccount(commit, res.data);
            // 登录失败
            else LoginCheck.clearAccount(commit);
        })
        .catch(err => LoginCheck.clearAccount(commit))
    },
    // 登出
    LogOut ({ commit, state }) {
        LoginCheck.clearAccount(commit);           
    },
}

export default actions