<template>
  <div>
    <h1>{{type==='login'?'这是登录页面':'这是注册页面'}}</h1>
    <div>
      <a @click="type='login'">登录</a>&nbsp;&nbsp;
      <a @click="type='register'">注册</a>
    </div>
    <template v-if="type==='login'">
      <input type="text" placeholder="用户名" v-model="loginParams.username"><br>
      <input type="password" placeholder="密码" v-model="loginParams.password"><br>
      <button @click="handleLogin">登录</button>
    </template>
    <template v-if="type==='register'">
      <input type="text" placeholder="用户名" v-model="regParams.username"><br>
      <input type="text" placeholder="昵称" v-model="regParams.nickname"><br>
      <input type="password" placeholder="密码" v-model="regParams.password"><br>
      <button @click="handleRegister">注册</button>
    </template>
  </div>
</template>

<script>
import { login, register } from "../../api/getData.js";
export default {
  name: "Login",
  data() {
    return {
      type: "login",
      loginParams: {
        username: "admin",
        password: "123456"
      },
      regParams: {
        username: "",
        nickname: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      login(this.loginParams).then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          let { token_type, access_token } = data;
          localStorage.setItem("token", token_type + " " + access_token);
          this.$router.push("/home");
        } else {
          window.alert(msg);
        }
      });
    },
    handleRegister() {
      register(this.regParams).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
