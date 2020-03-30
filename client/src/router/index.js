import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Article from "../views/article/Index.vue";
import ArticleDetail from "../views/article/Detail.vue";
import Message from "../views/message/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/article",
    name: "Article",
    component: Article
  },
  {
    path: "/articleDetail",
    name: "ArticleDetail",
    component: ArticleDetail
  },
  {
    path: "/message",
    name: "Message",
    component: Message
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
