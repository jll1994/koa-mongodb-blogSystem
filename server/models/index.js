const mongoose = require("../db/connection");
let { Schema, model } = mongoose;

// 用户
const userSchema = Schema({
  username: {
    type: String,
    default: ""
  },
  nickname: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  token: {
    type: String,
    default: ""
  }
});

// 验证码
const checkcodeSchema = Schema({
  token: String,
  code: String
});

exports.UserModel = model("users", userSchema);
exports.Checkcode = model("checkcode", checkcodeSchema);
