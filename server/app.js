const Koa = require("koa");
const bodyParse = require("koa-bodyparser");
const cors = require("koa-cors");
const { port } = require("./config");
const { verifyToken } = require("./utils/token");
// 实例化koa
const app = new Koa();

app.use(bodyParse());
app.use(cors());
// 添加token 验证中间件
app.use(verifyToken);

// routes
const Routes = require("./router/index");
app.use(Routes.routes()).use(Routes.allowedMethods());

app.on("error", (err, ctx) => {
  console.log("server error", err);
});

// 设置端口监听
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
