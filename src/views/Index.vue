<template>
  <div>
    <my-header></my-header>
    <div class="m_center" style="padding: 20px 0;">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import myHeader from "@/components/Header";
export default {
  components: {
    myHeader,
  },
};
</script>

