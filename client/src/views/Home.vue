<template>
  <div>
    <h1>这是Home页面</h1>
    <p>用户名：{{userInfo.username}}</p>
    <p>昵称：{{userInfo.nickname}}</p>
    <img :src="imgUrl"/>
    <label for="file">
      <input id="file" type="file" style="display:none;" @change="handleFileUpload"> 文件上传
    </label>
  </div>
</template>
<script>
import { getCurrentUserInfo, fileUpload } from "@/api/getData.js";
export default {
  data() {
    return {
      userInfo: {},
      imgUrl:''
    };
  },
  mounted() {
    getCurrentUserInfo().then(res => {
      let { code, data, msg } = res;
      if (code === 0) {
        this.userInfo = data;
      }
    });
  },
  methods: {
    handleFileUpload(e) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      fileUpload(formData).then(res => {
        let { code, data, msg } = res;
        if (code == 0) {
          this.imgUrl = data
        } else {
          window.alert(msg);
        }
      });
      document.getElementById("file").value = "";
    }
  }
};
</script>