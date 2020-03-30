<template>
  <div>
    <my-header></my-header>
    <router-view/>
  </div>
</template>
<script>
import { getCurrentUserInfo } from "@/api/getData.js";
import myHeader from "@/components/Header";
export default {
  components: {
    myHeader
  },
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    getUserInfo() {
      getCurrentUserInfo().then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          this.userInfo = data;
        }
      });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
