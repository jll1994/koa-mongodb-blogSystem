const mongoose = require("../db/connect");
let { Schema, model } = mongoose;
// 用户
const userSchema = new Schema({
  username: String,
  nickname: String,
  password: String,
  avatar: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
});

// 文章
const articleSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  cid: { type: Schema.Types.ObjectId, ref: "category", require: true },
  title: String,
  description: String,
  content: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
});

// 分类
const categorySchema = new Schema({
  title: String,
  articleCount: Number,
});

// 评论
const commentSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: "user", require: true },
  aid: { type: Schema.Types.ObjectId, ref: "article", require: true },
  content: String,
  // 点赞数
  thumbup: {
    type: Number,
    default: 0,
  },
  isLike: {
    type: Boolean,
    default: false,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

exports.UserModel = model("user", userSchema);
exports.ArticleModel = model("article", articleSchema);
exports.CategoryModel = model("category", categorySchema);
exports.CommentModel = model("comment", commentSchema);
