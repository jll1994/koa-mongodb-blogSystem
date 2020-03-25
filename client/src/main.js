import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
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
