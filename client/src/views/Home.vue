<template>
    <div>
        <h1>这是Home页面</h1>
        <p>用户名：{{userInfo.username}}</p>
        <p>昵称：{{userInfo.nickname}}</p>
    </div>
</template>
<script>
import { getCurrentUserInfo } from "../../api/getData.js";
export default {
    data(){
        return {
            userInfo: {}
        }
    },
  mounted() {
    getCurrentUserInfo().then(res => {
      let {code,data,msg} = res
      if(code===0){
          this.userInfo = data
      }
    });
  }
};
</script>