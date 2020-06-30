import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "../src/assets/css/reset.css";
import "../src/plugins/element-ui.js";

import axios from "axios";
axios.defaults.baseURL = "/api";
import { store, mutations } from "./store";
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    let token = store.token;
    if (token && config.url != "/user/login") {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
//响应拦截器器
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        router.replace({
          path: "/login",
        });
        mutations.removeToken();
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
