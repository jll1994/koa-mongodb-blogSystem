import axios from "axios";
import qs from "qs";
// 登陆
export const login = params => {
  return axios({
    method: "post",
    url: "/api/login",
    data: params
  });
};
