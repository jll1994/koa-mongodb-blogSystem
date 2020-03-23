// 引入路由中间件
const Router = require("koa-router");
// 实例化路由
let router = new Router();
/*
    接口开发
*/
// 登录
const loginApiConfig = require("../controls/login");
router.post("/api/login", loginApiConfig.loginSignIn);

// 导出路由
module.exports = router;
