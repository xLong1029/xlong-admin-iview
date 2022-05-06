import Api from "api/user.js";
import { getToken, removeToken } from "utils/auth.js";

// 设置账户信息
function setAccount(_commit, info) {
  const { avatar, nickName, roles, userId } = info;
  let face = avatar ? avatar : null;

  _commit("SET_USER", {
    face,
    nickName,
    role: roles,
    id: userId,
  });
}

// 清空账户信息
function clearAccount(_commit) {
  removeToken();
  _commit("SET_USER_TOKEN", "");
  _commit("SET_USER", {});
}

// 用户信息
const user = {
  // 负责存储整个应用的状态数据
  state: {
    // 登录凭证
    token: getToken(),
    user: {
      face: "",
      nickName: "",
      role: "",
      id: 0,
    },
  },
  // 计算属性
  getters: {
    token: (state) => state.token,
    user: (state) => state.user,
  },
  // 用来处理数据的函数，只能同步操作
  mutations: {
    SET_USER_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
  // 异步操作
  actions: {
    // Token验证
    CheckToken({ commit }) {
      return new Promise((resolve, reject) => {
        Api.GetUser()
          .then((res) => {
            const { code, data } = res;
            // 登录成功
            if (code == 200) {
              setAccount(commit, data);
              resolve(res);
            }
            // 登录失败
            else {
              clearAccount(commit);
              reject(res);
            }
          })
          .catch((err) => {
            clearAccount(commit);
            reject(err);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        clearAccount(commit);
        resolve(true);
      });
    },
  },
};

export default user;
