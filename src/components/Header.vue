<template>
  <div style="backgroundColor: #545c64">
    <div class="m_center">
      <el-menu :default-active="$route.path" router mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/article">文章</el-menu-item>
        <el-menu-item index="/category">分类</el-menu-item>
        <el-menu-item index="/profile">个人中心</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

