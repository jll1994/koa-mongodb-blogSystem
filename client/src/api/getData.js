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
export const updateNickname = params => {
  return axios({
    method: "put",
    url: "/user/updateNickname",
    data: params
  });
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
// 文章
export const getArticleList = () => {
  return axios.get(`/article`);
};
export const getArticleInfoById = params => {
  return axios.get(`/article/${params}`);
};
export const publishArticle = params => {
  return axios({
    method: "post",
    url: "/article",
    data: params
  });
};
export const deleteArticle = params => {
  return axios({
    method: "delete",
    url: "/article/" + params
  });
};
export const addComment = params => {
  return axios({
    method: "post",
    url: "/comment",
    data: params
  });
};
