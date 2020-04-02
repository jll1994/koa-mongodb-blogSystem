<template>
    <div>
        <el-menu :default-active="$route.path" router mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/article">文章</el-menu-item>
            <el-menu-item index="/message">留言板</el-menu-item>
            <el-menu-item index="/profile">个人中心</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

