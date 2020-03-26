const Router = require("koa-router");
const { apiPrefix } = require("../config");
let router = new Router({
  prefix: apiPrefix
});

/*
    接口开发
*/
const controller = require("../controllers");
router.post("/user/login", controller.user.login); // 登录
router.post("/user/register", controller.user.register); // 注册
router.get("/user", controller.user.getUserInfo); // 用户信息

router.get("/captcha", controller.captcha.createCaptcha); // 验证码
router.get("/verifyCode", controller.captcha.verifyCaptcha); // 验证 验证码

// 导出路由
module.exports = router;
