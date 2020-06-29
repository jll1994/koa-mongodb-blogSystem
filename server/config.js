module.exports = {
  // 启动端口
  port: 8191,
  // 数据库配置
  database: {
    dbName: "myBlog",
    host: "127.0.0.1",
    port: 27017,
    user: "jianglulu",
    password: "jianglulu",
  },
  // 表示成功和失败的状态码
  codeConfig: {
    success: 0,
    error: 1,
  },
  // token 加密字符串 秘钥,
  TOKEN_ENCODE_STR: "token_encode_str",
  // 添加非get请求通过的连接
  URL_YES_PASS: [
    "/api/user/register",
    "/api/user/login",
    "/api/captcha",
    "/api/verifyCode",
  ],
};
