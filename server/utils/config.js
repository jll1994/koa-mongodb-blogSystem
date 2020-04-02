module.exports = {
  // 用户密码加密字符串
  PWD_ENCODE_STR: "user_encode_str",
  // token 加密字符串 秘钥,
  TOKEN_ENCODE_STR: "token_encode_str",
  // 添加非get请求通过的连接
  URL_YES_PASS: [
    "/api/user/register",
    "/api/user/login",
    "/api/captcha",
    "/api/verifyCode"
  ]
};
