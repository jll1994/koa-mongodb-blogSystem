// 引入路由中间件
const Router = require("koa-router");
const { apiPrefix } = require("../config");

// 实例化路由
let router = new Router({
  prefix: apiPrefix
});

/*
    接口开发
*/
const controller = require("../controllers");
router.post("/login", controller.user.login); // 登录

// 导出路由
module.exports = router;
