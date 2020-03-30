<template>
    <div>
        <h3>{{info.title}}</h3>
        <div>{{info.content}}</div>
    </div>
</template>
<script>
import { getArticleInfoById } from "@/api/getData";
export default {
  data() {
    return {
      info: {}
    };
  },
  mounted() {
    getArticleInfoById(this.$route.query.id).then(res => {
      let { code, data, msg } = res;
      if (code === 0) {
        this.info = data;
      }
    });
  }
};
</script>

