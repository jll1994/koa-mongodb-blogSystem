const mongoose = require("../db/connection");
let { Schema, model } = mongoose;

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

const UserModel = model("users", userSchema);

module.exports = UserModel;
