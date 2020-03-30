<template>
  <div>
    <p>用户名：{{app.userInfo.username}}</p>
    <p>昵称：{{app.userInfo.nickname}}</p>
    <img :src="imgUrl" />
    <label for="file">
      <input id="file" type="file" style="display:none;" @change="handleFileUpload"> 文件上传
    </label>
    <br>
    <button @click="isShowUpdateNickname=true">修改昵称</button>
    <div v-if="isShowUpdateNickname">
      <input type="text" placeholder="请输入昵称" v-model="nickname">
      <button @click="handleUpdateNickname">确定</button>
    </div>
  </div>
</template>

<script>
import { fileUpload, updateNickname } from "@/api/getData.js";
export default {
  inject: ["app"],
  data() {
    return {
      imgUrl: "",
      isShowUpdateNickname: false,
      nickname: ""
    };
  },
  methods: {
    handleFileUpload(e) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      fileUpload(formData).then(res => {
        let { code, data, msg } = res;
        if (code == 0) {
          this.imgUrl = data;
        } else {
          window.alert(msg);
        }
      });
      document.getElementById("file").value = "";
    },
    handleUpdateNickname() {
      updateNickname({ nickname: this.nickname }).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.nickname = "";
          this.getCurrentUserInfo();
        } else {
          window.alert(msg);
        }
      });
    }
  }
};
</script>

