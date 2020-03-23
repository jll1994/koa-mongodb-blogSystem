const Koa = require("koa");
// 引入ctx.body解析中间件
const bodyParse = require("koa-bodyparser");
// 引入跨域中间件
const cors = require("koa-cors");
// 引入路由文件
const Routes = require("./router/index");

// 实例化koa
const app = new Koa();

// 使用ctx.body解析中间件
app.use(bodyParse());
// 使用跨域中间件，解决跨域问题
app.use(cors());

// 初始化路由中间件
app.use(Routes.routes()).use(Routes.allowedMethods());
app.on("error", (err, ctx) => {
  console.log("server error", err);
});
// 页面输出
app.use(async ctx => {
  ctx.body = "hello world!";
});
// 设置端口监听
app.listen(3000, () => {
  console.log("server is listing on port 3000");
});
