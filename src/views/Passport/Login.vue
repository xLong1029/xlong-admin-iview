<template>
  <div id="login" class="m-login">
    <Form
      ref="loginForm"
      :model="loginForm"
      :rules="validate"
      class="login-form"
    >
      <h3 class="form-title">
        <img :src="logo" />
      </h3>
      <Form-item prop="username">
        <Input
          prefix="md-person"
          v-model="loginForm.username"
          placeholder="请输入手机号码"
          @keyup.enter.native="submit('loginForm')"
        />
      </Form-item>
      <Form-item prop="password">
        <Input
          prefix="md-key"
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          @keyup.enter.native="submit('loginForm')"
        />
      </Form-item>
      <Form-item>
        <Checkbox v-model="remeberPwd">记住密码</Checkbox>
      </Form-item>
      <Form-item>
        <Button
          type="primary"
          long
          @click="submit('loginForm')"
          :loading="loading"
          >登录</Button
        >
      </Form-item>
      <div style="text-align: center">
        普通用户登录账号: 18888888888 密码: 666666
      </div>
      <div style="text-align: center">
        管理员登录账号: 17777075292 密码: 123456
      </div>
      <div style="text-align: center">
        超级管理员登录账号: 18376686974 密码: 123456
      </div>
    </Form>
  </div>
</template>

<script>
import { SetLocalS, DelLocalS, GetLocalS, AESEncrypt, AESDecrypt } from "utils";
import { setToken } from "utils/auth.js";
// Api方法
import Api from "api/user.js";

export default {
  data() {
    return {
      // 加载状态
      loading: false,
      // logo
      logo: require("assets/images/logo-green.png"),
      // 表单信息
      loginForm: {
        // 用户名
        username: "",
        // 密码
        password: "",
      },
      // 记住密码
      remeberPwd: false,
      // 验证规则
      validate: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "登录密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    remeberPwd(val) {
      if (!val) {
        if (GetLocalS("username")) {
          DelLocalS("username");
          DelLocalS("password");
        }
      }
    },
  },
  created() {
    // 判断本地存储用户名是否存在
    if (GetLocalS("username")) {
      // 获取本地存储的用户名和密码
      this.loginForm.username = GetLocalS("username");
      this.loginForm.password = AESDecrypt(GetLocalS("password"));
      this.remeberPwd = true;
    }
  },
  mounted() {
    // const loginBg = document.getElementById("login");
    // // 设置背景颜色高度
    // loginBg.style.height = document.body.scrollHeight + "px";
    // // 监听窗口变化
    // window.onresize = () => {
    //   loginBg.style.height = document.body.scrollHeight + "px";
    // };
  },
  methods: {
    // 提交表单
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          Api.Login(this.loginForm)
            .then((res) => {
              const { code, data } = res;
              if (code == 200) {
                // token存cookie
                setToken(data.token);
                this.$store.commit("SET_USER_TOKEN", data.token);
                // 判断是否记住密码
                if (this.remeberPwd) {
                  // 本地存储用户名和密码
                  const { username, password } = this.loginForm;
                  SetLocalS("username", username);
                  SetLocalS("password", AESEncrypt(password));
                }
                this.$Message.success("登录成功!");
                // 跳转到后台主页
                this.$router.push({ name: "Main" });
              } else this.$Message.error("登录失败!用户名或密码不正确！");
            })
            .catch((err) => console.log(err))
            .finally(() => (this.loading = false));
        } else this.$Message.error("登录失败!填写有误！");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.m-login {
  position: relative;
  width: 100%;
  height: 100%;
  height: 100vh;
  // min-height: 900px;
  background-color: #4d5256;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  padding: 35px 35px 15px;
  margin: auto;
  margin-top: -250px;
  margin-left: -200px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  box-shadow: 0 0 25px #555;
}

.form-title {
  font-size: 24px;
  font-weight: 400;
  color: #555;
  margin: 0 auto 20px;
  text-align: center;
  font-weight: 700;

  img {
    display: inline-block;
  }
}
</style>
