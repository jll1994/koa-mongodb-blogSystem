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
      <input type="text" maxlength="4" placeholder="验证码" v-model="regParams.code" @input="handleInput">
      <span v-html="svgData" @click="changeCaptcha"></span>
      <br>
      <button @click="handleRegister">注册</button>
    </template>
  </div>
</template>

<script>
import { login, register, getCaptcha, verifyCode } from "@/api/getData.js";
import { aesEncrypt } from "@/utils/crypto.js";
export default {
  name: "Login",
  data() {
    return {
      type: "register",
      loginParams: {
        username: "admin",
        password: "123456"
      },
      regParams: {
        username: "",
        nickname: "",
        password: "",
        code: ""
      },
      svgData: ""
    };
  },
  created() {
    this.changeCaptcha();
  },
  methods: {
    handleLogin() {
      let { username, password } = this.loginParams;
      login({
        username,
        password: aesEncrypt(password)
      }).then(res => {
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
      let { username, nickname, password } = this.regParams;
      register({
        username,
        nickname,
        password: aesEncrypt(password)
      }).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.type = "login";
        } else {
          window.alert(msg);
        }
      });
    },
    changeCaptcha() {
      getCaptcha().then(res => {
        if (res) {
          this.svgData = res;
        }
      });
    },
    handleInput(e) {
      let value = e.target.value;
      if (value.length === 4) {
        verifyCode(this.regParams.code).then(res => {
          let { code, data, msg } = res;
          if (code === 0) {
            
          } else {
            window.alert(msg);
          }
        });
      }
    }
  }
};
</script>
