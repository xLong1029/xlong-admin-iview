//import Login from '@/api/login.js'

const actions = {
    // Token验证
    CheckToken ({ commit , state }) {
        // Login.CheckToken(state.user.token)
        // .then(res => {
        //     const result = res.data;
        //     // 登录认证成功
        //     if(res.code == 200)
        //     {
        //         // 设置用户信息
        //         commit('SET_USER_ACCOUNT', result.account);
        //         commit('SET_USER_FACE', result.face);
        //         commit('SET_USER_NICKNAME', result.nickname);
        //         commit('SET_USER_ID', result.userId);
        //         commit('SET_USER_TYPE', result.userType);
        //         // 本地存储token值
        //         localStorage.userType = result.userType;
        //     }
        //     // 登录认证失败
        //     else{
        //         // 清除token
        //         localStorage.removeItem('token');
        //         // 清除userType
        //         localStorage.removeItem('userType');
        //         commit('SET_USER_TOKEN', '');
        //         commit('SET_USER_ACCOUNT', '');
        //         commit('SET_USER_FACE', '');
        //         commit('SET_USER_NICKNAME', '');
        //         commit('SET_USER_ID', '');
        //         commit('SET_USER_TYPE', ''); 
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        //     // 清除token
        //     localStorage.removeItem('token');
        //     // 清除userType
        //     localStorage.removeItem('userType');
        //     commit('SET_USER_TOKEN', '');
        //     commit('SET_USER_ACCOUNT', '');
        //     commit('SET_USER_FACE', '');
        //     commit('SET_USER_NICKNAME', '');
        //     commit('SET_USER_ID', '');
        //     commit('SET_USER_TYPE', '');
        // })
    },
    // 登出
    LogOut ({ commit, state }) {
        // // 清除token
        // localStorage.removeItem('token');
        // // 清除userType
        // localStorage.removeItem('userType');
        // commit('SET_USER_TOKEN', '');
        // commit('SET_USER_ACCOUNT', '');
        // commit('SET_USER_FACE', '');
        // commit('SET_USER_NICKNAME', '');
        // commit('SET_USER_ID', '');
        // commit('SET_USER_TYPE', '');             
    },
}

export default actions