<template>
  <div class="login-wrapper">
    <div class="login-area">
      <div class="login-logo">
        登陆
      </div>
      <div class="login-form">
        <div class="login-form-header">
          <div class="pd10 font-weight">Login to our site </div>
          <div class="pdb10">Enter your username and password to log on:</div>
        </div>
        <div class="login-form-body">
          <el-form ref="loginForm" :model="loginForm" label-width="80px" class="form-container" :rules="loginRules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input placeholder="验证码" v-model="loginForm.code" prefix-icon="el-icon-key" class="code_input" :maxlength="4"></el-input>
              <div class="code">
                <span v-html="svgData" @click="changeCaptcha"></span>
              </div>
            </el-form-item>
            <el-button type="danger" class="w100" @click="handleLogin('loginForm')" :loading="loginStatus">登 陆</el-button>
            <p class="toRegister">
              <el-link type="info" @click="$router.push('/register')">没有账号,去注册</el-link>
            </p>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getCaptcha, verifyCode } from "@/api/getData.js";
export default {
  name: "Login",
  data() {
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      }
      verifyCode(value).then(res => {
        let { code, msg } = res;
        if (res.data) {
          callback();
        } else {
          callback(new Error("验证码不正确"));
        }
      });
    };
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
      loginStatus: false,
      svgData: "",
    };
  },
  created() {
    this.changeCaptcha();
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginStatus = true;
          let { username, password } = this.loginForm;
          login({
            username,
            password,
          }).then(res => {
            this.loginStatus = false;
            let { code, data, msg } = res;
            if (code === 0) {
              localStorage.setItem("token", data.token);
              this.$router.push("/home");
            } else {
              this.changeCaptcha();
              this.$message.error(msg);
            }
          });
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
  },
};
</script>
<style lang="less">
.login-wrapper {
  height: 100%;
  background: url("../assets/bg3_4.jpg");
  background-size: 100% 100%;
  position: relative;
  .login-area {
    width: 555px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-logo {
      text-align: center;
      font-size: 25px;
      color: #000;
      font-family: cursive;
      font-weight: bold;
      padding: 20px 0;
    }
    .login-form {
      background: rgba(0, 0, 0, 0.3);
      padding: 0 20px;
      .font-weight {
        font-size: 18px;
        font-weight: bold;
      }
      .pd10 {
        padding: 20px 0;
      }
      .pdb10 {
        padding-bottom: 10px;
      }
      .login-form-body {
        padding: 30px 0 10px 0;
        .form-container {
          .el-input {
            margin-bottom: 5px;
          }
          .el-form-item__content {
            margin-left: 0 !important;
            line-height: 20px !important;
          }
          .w100 {
            width: 100%;
          }
          .code_input {
            width: 400px;
          }
          .code {
            width: 100px;
            cursor: pointer;
            float: right;
          }
          .toRegister {
            margin: 10px 0;
            text-align: center;
          }
          .toRegister .el-link--info {
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

