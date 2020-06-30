import Vue from "vue";
import { getCurrentUserInfo } from "@/api/getData";
const TOKENKEY = "token.key";
const USERKEY = "userInfo";
const storage = {
  set(key, value) {
    // 对象必须序列化才能存入缓存
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    // 反序列化
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
const store = Vue.observable({
  token: storage.get(TOKENKEY),
  userInfo: storage.get(USERKEY) || {},
});
const mutations = {
  setToken(token) {
    store.token = token;
    storage.set(TOKENKEY, token);
  },
  removeToken() {
    store.token = "";
    store.userInfo = {};
    storage.remove(TOKENKEY);
    storage.remove(USERKEY);
  },
  setUserInfo(userInfo) {
    store.userInfo = userInfo;
  },
};
const actions = {
  loadUserInfo() {
    getCurrentUserInfo().then((res) => {
      let { code, data } = res;
      if (code === 0) {
        storage.set(USERKEY, data);
        mutations.setUserInfo(data);
      }
    });
  },
};
export { store, mutations, actions };
