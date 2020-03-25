const { UserModel } = require("../models");
const { TOKEN_ENCODE_STR, TOKEN_TYPE } = require("../utils/config");
const { generateToken } = require("../utils/token");
const { callbackModel } = require("../utils/index");

let register = async ctx => {
  let { username = "", nickname = "", password = "" } = ctx.request.body;
  try {
    if (username === "") {
      callbackModel(ctx, 1, null, "用户名不能为空");
      return;
    }
    if (nickname === "") {
      callbackModel(ctx, 1, null, "昵称不能为空");
      return;
    }
    if (password === "") {
      callbackModel(ctx, 1, null, "密码不能为空");
      return;
    }
    let res = await UserModel.find({ username });
    if (res.length !== 0) {
      callbackModel(ctx, 1, "该用户名已存在");
      return;
    }
    let user = new UserModel({ username, nickname, password });
    res = await user.save();
    if (res._id != null) {
      callbackModel(ctx, 0, {}, "注册成功");
    } else {
      callbackModel(ctx, 1, null, "注册失败，服务器异常");
    }
  } catch (e) {
    callbackModel(ctx, 1, null, "注册失败，服务器异常");
  }
};

let login = async ctx => {
  let { username, password } = ctx.request.body;
  let user = await UserModel.findOne({ username, password });
  if (user) {
    const user_id = user._id;
    callbackModel(
      ctx,
      0,
      {
        token_type: TOKEN_TYPE,
        access_token: generateToken({ _id: user_id })
      },
      "登录成功"
    );
  } else {
    callbackModel(ctx, 1, null, "登录失败，用户名或者密码错误");
  }
};
const jwt = require("jsonwebtoken");
let getUserInfo = async ctx => {
  // ctx.get("Authorization") 获取请求中的数据
  let token = ctx.get("Authorization").split(" ")[1];
  let { _id } = await jwt.verify(token, TOKEN_ENCODE_STR);
  try {
    let res = await UserModel.findOne(
      { _id },
      {
        username: true,
        nickname: true
      }
    );
    callbackModel(ctx, 0, res, "查询成功");
  } catch (e) {
    callbackModel(ctx, 1, null, "查询失败，服务器异常，请稍后再试");
  }
};

module.exports = {
  register,
  login,
  getUserInfo
};
