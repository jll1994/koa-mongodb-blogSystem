<template>
  <div class="account-info">
    <div class="avatar">
      <a href="javascript:;">
        <img :src="userInfo.avatar" alt="">
      </a>
      <p>
        <input type="file" id='avater' accept="image/*" @change="handleFileUpload">
        <label for="avater">上传头像</label>
      </p>
    </div>
    <p class="info-item">
      <label>用户名</label>
      <span>{{userInfo.username}}</span>
    </p>
    <p class="info-item">
      <label>昵称</label>
      <span>{{userInfo.nickname}}</span>
      <a class="edit" @click="handleUpdateNickname(userInfo.nickname)">修改</a>
    </p>
  </div>
</template>

<script>
import { store, actions } from "@/store";
import { updateAvatar, updateNickname } from "@/api/getData.js";
export default {
  computed: {
    userInfo() {
      return store.userInfo;
    },
  },
  methods: {
    handleFileUpload(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = res => {
        updateAvatar({ avatar: res.target.result }).then(res => {
          let { code, data, msg } = res;
          if (code === 0) {
            this.$message.success("修改成功");
            actions.loadUserInfo();
          } else {
            this.$message.error(msg);
          }
        });
      };
      document.getElementById("avater").value = "";
    },
    handleUpdateNickname(nickname) {
      this.$msgBox
        .prompt("请输入昵称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue: nickname,
        })
        .then(({ value }) => {
          updateNickname({ nickname: value }).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.$message.success("修改成功");
              actions.loadUserInfo();
            } else {
              this.$message.error(msg);
            }
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.account-info {
  width: 400px;
  margin: 50px auto;
  .avatar {
    text-align: center;
    margin-bottom: 30px;
    a {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
      margin-top: 10px;
      line-height: 20px;
      input[type="file"] {
        display: none;
      }
      label {
        color: #ffafed;
      }
    }
  }
  .info-item {
    line-height: 50px;
    font-size: 18px;
    display: flex;
    label {
      color: #aaa;
      width: 65px;
      display: inline-block;
      text-align-last: justify;
      position: relative;
      padding-right: 6px;
      margin-right: 12px;
      &:after {
        position: absolute;
        content: ":";
        top: 0;
        right: 0;
      }
    }
    span {
      flex: 1;
      color: #333;
    }
    a.edit {
      flex: 80px 0 0;
      margin-left: 10px;
    }
  }
}
</style>


