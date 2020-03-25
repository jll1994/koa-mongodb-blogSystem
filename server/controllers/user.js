const UserModel = require("../models/user");

let register = async ctx => {
  let {
    username = "",
    nickname = "",
    password = "",
    avatar = "",
    token = ""
  } = ctx.request.body;
  try {
    if (username === "") {
      ctx.body = {
        code: 1,
        msg: "用户名不能为空"
      };
      return;
    }
    if (nickname === "") {
      ctx.body = {
        code: 1,
        msg: "昵称不能为空"
      };
      return;
    }
    if (avatar === "") {
      ctx.body = {
        code: 1,
        msg: "请上传头像"
      };
      return;
    }
  } catch (e) {
    ctx.body = {
      code: 1,
      msg: "注册失败，服务器异常"
    };
  }
};

let login = async ctx => {
  let { body } = ctx.request;
  let { username, password } = body;
  await UserModel.find({ username, password }, (err, res) => {
    if (!err && res.length) {
      ctx.body = {
        code: 0,
        message: "登录成功"
      };
    } else {
      ctx.body = {
        code: 1,
        message: "登录失败，用户名或者密码错误"
      };
    }
  });
};
module.exports = {
  register,
  login
};
