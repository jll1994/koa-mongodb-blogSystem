<template>
  <div>
    <h1>这是登录页面</h1>
    <input type="text" placeholder="用户名" v-model="params.username"><br>
    <input type="text" placeholder="密码" v-model="params.password"><br>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
import { login } from "../../api/getData.js";
export default {
  name: "Login",
  data() {
    return {
      params: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    handleLogin() {
      login(this.params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
