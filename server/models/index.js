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

// 文章
const articleSchema = Schema({
  userid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  }
});

// 评论
const commentSchema = Schema({
  // 评论人id
  userid: {
    type: String,
    required: true
  },
  // 评论人父id
  parentid: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    required: true
  },
  // 点赞数
  thumbup: {
    type: Number,
    default: 0
  }
});

exports.UserModel = model("users", userSchema);
exports.ArticleModel = model("articles", articleSchema);
exports.CommentModel = model("comments", commentSchema);
