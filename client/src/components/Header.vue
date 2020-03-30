<template>
    <ul class="header-container">
        <li>
            <router-link to='/home'>首页</router-link>
        </li>
        <li>
            <router-link to='/article'>文章</router-link>
        </li>
        <li>
            <router-link to='/message'>留言板</router-link>
        </li>
        <li>
            <router-link to='/profile'>个人中心</router-link>
        </li>
    </ul>
</template>
<style lang="less" scoped>
.header-container {
  display: flex;
  align-items: center;
  li {
    padding: 10px 10px;
  }
}
</style>

