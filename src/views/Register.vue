<template>
  <div class="register-wrapper">
    <div class="register-area">
      <div class="register-logo">
        注册
      </div>
      <div class="register-form">
        <div class="register-form-header">
          <div class="pd10 font-weight">register to our site</div>
          <div class="pdb10">register to have a nice day:</div>
          <div class="upload-avatar">
            <div class="upload-button">
              <label class="upload-img-btn" for="upload-img">
                <i class="el-icon-plus" style='color:#fff;'></i>
              </label>
              <input id="upload-img" type="file" @change="uploadImage">
            </div>
            <el-avatar :src="registerForm.avatar" :size="70" shape="square" v-show="registerForm.avatar" style="margin-left: 10px;"></el-avatar>
          </div>
        </div>
        <div class="register-form-body">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" class="form-container">
            <el-form-item prop="nickname">
              <el-input v-model="registerForm.nickname" placeholder="昵称" prefix-icon="el-icon-star-off" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input v-model="registerForm.confirmPassword" placeholder="确认密码" prefix-icon="el-icon-lock" show-password></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input placeholder="验证码" v-model="registerForm.code" prefix-icon="el-icon-key" class="code_input" :maxlength="4"></el-input>
              <div class="code">
                <span v-html="svgData" @click="changeCaptcha"></span>
              </div>
            </el-form-item>
            <el-button type="danger" class="w100" @click="submit('registerForm')" :loading="registerStatus">注 册</el-button>
            <p class="toLogin">
              <el-link type="info" @click="$router.push('/login')">已有账号,去登陆</el-link>
            </p>
          </el-form>
        </div>
      </div>
    </div>
    <div class="cropper-img-box" v-if="cropper_box_mark == true">
      <vueCropper ref="cropper" :img="cropperData.img" :autoCrop="cropperData.autoCrop" :autoCropWidth="cropperData.autoCropWidth" :autoCropHeight="cropperData.autoCropHeight" :fixedBox="cropperData.fixedBox"></vueCropper>
      <div class="cropper-img-tool">
        <el-button type="warning" icon="el-icon-refresh-left" circle size="medium" @click="rotateRight"></el-button>
        <el-button type="priminfoary" icon="el-icon-close" circle size="medium" @click="cropper_box_mark = false"></el-button>
        <el-button type="success" icon="el-icon-check" circle size="medium" @click="finish"></el-button>
        <el-button type="warning" icon="el-icon-refresh-right" circle size="medium" @click="rotateLeft"></el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getCaptcha, verifyCode, register } from "@/api/getData";
import { mutations, actions } from "@/store";
import { VueCropper } from "vue-cropper";
export default {
  name: "register",
  components: {
    VueCropper,
  },
  data() {
    const validatePwd = (rule, value, callback) => {
      let reg = /^[\w_-]{6,10}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码长度应为6-10位、支持字母、数字、下划线、减号"));
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validateRepwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
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
      registerForm: {
        nickname: "",
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        avatar: "",
      },
      registerRules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }],
        confirmPassword: [{ validator: validateRepwd, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
      registerStatus: false,
      cropper_box_mark: false,
      cropperData: {
        img: "",
        autoCrop: true,
        autoCropWidth: 400,
        autoCropHeight: 400,
        fixedBox: true,
      },
      svgData: "",
    };
  },
  created() {
    this.changeCaptcha();
  },
  methods: {
    changeCaptcha() {
      getCaptcha().then(res => {
        if (res) {
          this.svgData = res;
        }
      });
    },
    uploadImage(e) {
      let file = e.target.files[0];
      let temArr = file.name.split(".");
      let file_suffix = temArr[temArr.length - 1];
      if (
        file_suffix !== "jpg" &&
        file_suffix !== "png" &&
        file_suffix !== "jpeg"
      ) {
        alert("上传图片失败，目前只支持jpg,png,jpeg的图片!");
        return;
      }
      let reader = new FileReader();
      reader.onload = res => {
        this.cropperData.img = res.target.result;
        this.cropper_box_mark = true;
      };
      reader.readAsDataURL(file);
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    finish() {
      this.$refs.cropper.getCropData(data => {
        this.registerForm.avatar = data;
        this.cropper_box_mark = false;
      });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.registerForm.avatar) {
            this.$message.error("别忘记上传头像");
            this.changeCaptcha();
            this.registerForm.code = "";
            return false;
          }
          this.handleRegister();
        } else {
          return false;
        }
      });
    },
    async handleRegister() {
      if (this.registerStatus) {
        return false;
      }
      this.registerStatus = true;
      let { avatar, username, nickname, password } = this.registerForm;
      let res = await register({
        avatar,
        username,
        nickname,
        password,
      });
      let { code, data, msg } = res;
      if (code === 0) {
        mutations.setToken(data.token);
        // 用户信息
        actions.loadUserInfo();
        this.$router.push("/home");
      } else {
        this.$message.error(msg);
      }
    },
  },
};
</script>

<style lang="less">
.register-wrapper {
  height: 100%;
  background: url("../assets/bg3_4.jpg");
  background-size: 100% 100%;
  position: relative;
  .register-area {
    width: 555px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .register-logo {
      text-align: center;
      font-size: 25px;
      color: #000;
      font-family: cursive;
      font-weight: bold;
      padding: 20px 0;
    }
    .register-form {
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
      .register-form-header {
        position: relative;
        .upload-avatar {
          position: absolute;
          top: 20px;
          right: 0;
          .upload-button {
            display: inline-block;
            .upload-img-btn {
              border: 2px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              height: 70px;
              display: inline-block;
              width: 70px;
              line-height: 70px;
              text-align: center;
            }
            #upload-img {
              display: none;
              opacity: 0;
            }
          }
        }
      }
      .register-form-body {
        padding: 30px 0 10px 0;
        .form-container {
          .el-input {
            margin-bottom: 5px;
          }
          .el-form-item__content {
            margin-left: 0 !important;
            line-height: 20px !important;
          }
          .code_input {
            width: 400px;
          }
          .code {
            width: 100px;
            cursor: pointer;
            float: right;
          }
        }
      }
      .code_input {
        width: 400px;
      }
      .w100 {
        width: 100%;
      }
      .toLogin {
        margin: 10px 0;
        text-align: center;
        .el-link--info {
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
.cropper-img-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .cropper-img-tool {
    position: absolute;
    z-index: 2;
    bottom: 50px;
    left: 0;
    text-align: center;
    width: 100%;
  }
}
</style>

