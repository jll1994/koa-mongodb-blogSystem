import axios from "axios";
import qs from "qs";
// 登陆
export const login = params => {
  return axios({
    method: "post",
    url: "/user/login",
    data: params
  });
};
// 注册
export const register = params => {
  return axios({
    method: "post",
    url: "/user/register",
    data: params
  });
};

// 用户信息
export const getCurrentUserInfo = params => {
  return axios.get(`/user`);
};
