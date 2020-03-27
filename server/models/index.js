const mongoose = require("../db/connect");
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
  }
});

exports.UserModel = model("users", userSchema);
