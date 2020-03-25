import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
axios.defaults.baseURL = "/api";
// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    console.log(config.url);
    if (token && config.url != "/user/login") {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//响应拦截器器
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
