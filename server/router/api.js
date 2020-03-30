const router = require("koa-router")();
const controller = require("../controllers");

const routers = router
  .post("/user/login", controller.user.login) // 登录
  .post("/user/register", controller.user.register) // 注册
  .get("/user", controller.user.getUserInfo) // 用户信息
  .put("/user/updateNickname", controller.user.updateNickname) // 用户信息
  .get("/captcha", controller.captcha.createCaptcha) // 验证码
  .get("/verifyCode", controller.captcha.verifyCaptcha) // 验证 验证码
  .post("/storage", controller.storage.fileUpload) // 上传资源
  .delete("/storage/:id", controller.storage.fileDelete) // 删除资源
  .get("/article", controller.article.getArticleList) // 文章列表
  .get("/article/:id", controller.article.getArticleInfoById) // 文章详情
  .post("/article", controller.article.createArticle) // 创建文章
  .delete("/article/:id", controller.article.deleteArticle) // 删除文章
  .post("/comment", controller.article.addComment);
// 导出路由
module.exports = routers;
