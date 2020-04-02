import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Index from "../views/Index.vue";
import Home from "../views/Home.vue";
import Profile from "../views/profile/Index.vue";
import Article from "../views/article/Index.vue";
import AddOrEditArticle from "../views/article/AddOrEdit.vue";
import ArticleDetail from "../views/article/Detail.vue";
import Message from "../views/message/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
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
        path: "/AddOrEditArticle",
        name: "AddOrEditArticle",
        component: AddOrEditArticle
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
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
