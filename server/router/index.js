const Router = require("koa-router");
const { apiPrefix } = require("../config");
let router = new Router({
  prefix: apiPrefix
});
/*
    接口开发
*/
const controller = require("../controllers");
router
  .post("/user/login", controller.user.login) // 登录
  .post("/user/register", controller.user.register) // 注册
  .get("/user", controller.user.getUserInfo) // 用户信息
  .get("/captcha", controller.captcha.createCaptcha) // 验证码
  .get("/verifyCode", controller.captcha.verifyCaptcha) // 验证 验证码
  .post("/storage", controller.storage.fileUpload) // 上传资源
  .delete("/storage/:id", controller.storage.fileDelete); // 删除资源
// 导出路由
module.exports = router;
