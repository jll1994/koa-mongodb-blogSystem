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
export const getCurrentUserInfo = () => {
  return axios.get(`/user`);
};
// 验证码
export const getCaptcha = () => {
  return axios.get(`/captcha`);
};
export const verifyCode = params => {
  return axios.get(`/verifyCode?code=${params}`);
};
// 文件资源
export const fileUpload = params => {
  return axios({
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: "/storage",
    data: params
  });
};
export const fileDelete = params => {
  return axios({
    method: "delete",
    url: "/storage?fileName=" + params
  });
};
