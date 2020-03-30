const { ArticleModel, CommentModel } = require("../models");
const { callbackModel } = require("../utils/index");
const formatTime = require("../utils/formatTime");

let getArticleList = async ctx => {
  let pageSize = ctx.query.pageSize || 10; // 每页数量
  let pageNum = ctx.query.paageNum || 1; // 当前页码
  let options = {
    skip: Number((pageNum - 1) * pageSize),
    limit: Number(pageSize)
  };
  let res = await ArticleModel.find({}, null, options);
  if (res) {
    let newArr = res.map(item => {
      return {
        id: item._id,
        title: item.title,
        content: item.content,
        created: item.date
      };
    });
    let total = await ArticleModel.countDocuments();
    callbackModel(
      ctx,
      0,
      {
        totalSize: total,
        data: newArr
      },
      ""
    );
  } else {
    ctx.status = 500;
  }
};

let getArticleInfoById = async ctx => {
  let _id = ctx.params.id;
  let res = await ArticleModel.findById(_id);
  if (res) {
    callbackModel(
      ctx,
      0,
      {
        id: res._id,
        userid: res.userid,
        title: res.title,
        content: res.content,
        created: res.date
      },
      "查询成功"
    );
  } else {
    ctx.status = 500;
  }
};

let createArticle = async ctx => {
  const { userid, title, content } = ctx.request.body;
  if (title === "") {
    callbackModel(ctx, 1, null, "文章标题不能为空");
    return;
  }
  if (content === "") {
    callbackModel(ctx, 1, null, "文章内容不能为空");
    return;
  }
  let article = new ArticleModel({
    userid,
    title,
    content,
    date: formatTime(new Date())
  });
  let res = await article.save();
  if (res) {
    callbackModel(ctx, 0, null, "文章创建成功");
  } else {
    ctx.status = 500;
  }
};

let deleteArticle = async ctx => {
  let _id = ctx.params.id;
  let res = await ArticleModel.findByIdAndRemove(_id);
  if (res) {
    callbackModel(ctx, 0, null, "删除成功");
  } else {
    ctx.status = 500;
  }
};

let addComment = async ctx => {
  let { content } = ctx.request.body;
  if (content === "") {
    callbackModel(ctx, 1, null, "评论内容不能为空");
    return;
  }
  ctx.body = "添加评论成功";
};

module.exports = {
  createArticle,
  getArticleList,
  getArticleInfoById,
  deleteArticle,
  addComment
};
