const { ArticleModel, CategoryModel, CommentModel } = require("../models");
const { callbackModel } = require("../utils/index");
const { getUserIdByToken } = require("../middleware/token");
const { codeConfig } = require("../config");
const formatTime = require("../utils/formatTime");
// 分类
let createCategory = async (ctx) => {
  let { title } = ctx.request.body;
  if (title === "") {
    callbackModel(ctx, codeConfig.error, null, "分类标题不能为空");
    return;
  }
  let result = await CategoryModel.find({ title });
  if (result.length !== 0) {
    callbackModel(
      ctx,
      codeConfig.error,
      null,
      "该分类已经存在了，请再换一个试试吧"
    );
    return;
  }
  let category = new CategoryModel({ title });
  let res = category.save();
  if (res) {
    callbackModel(ctx, codeConfig.success, null, "创建成功");
  } else {
    ctx.status = 500;
  }
};

let getCategoryList = async (ctx) => {
  let res = await CategoryModel.find(null, "_id title");
  let result = [];
  // 计算分类id对应的文章数量
  for (let i = 0; i < res.length; i++) {
    let item = res[i];
    let articles = await ArticleModel.find({
      cid: item._id,
    });
    let map = {
      _id: item._id,
      title: item.title,
      artCount: articles.length,
    };
    result.push(map);
  }
  if (result) {
    callbackModel(ctx, codeConfig.success, result, "数据获取成功");
  } else {
    ctx.status = 500;
  }
};

let updateCategory = async (ctx) => {
  let { id, title } = ctx.request.body;
  if (title === "") {
    callbackModel(ctx, codeConfig.error, null, "分类标题不能为空");
    return;
  }
  let result = await CategoryModel.find({ title });
  if (result.length !== 0) {
    callbackModel(
      ctx,
      codeConfig.error,
      null,
      "该分类已经存在了，请再换一个试试吧"
    );
    return;
  }
  let res = await CategoryModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { title },
    },
    { new: true }
  );
  if (res) {
    callbackModel(ctx, codeConfig.success, null, "修改成功");
  } else {
    ctx.status = 500;
  }
};

let deleteCategory = async (ctx) => {
  let _id = ctx.params.id;
  let getArticlesByCid = await ArticleModel.find({ cid: _id });
  if (getArticlesByCid.length > 0) {
    callbackModel(ctx, codeConfig.error, null, "该分类下还有文章");
  } else {
    let res = await CategoryModel.findByIdAndRemove(_id);
    if (res) {
      callbackModel(ctx, codeConfig.success, null, "删除成功");
    } else {
      ctx.status = 500;
      callbackModel(ctx, codeConfig.error, null, "删除失败，服务器异常");
    }
  }
};

// 文章
let getArticleList = async (ctx) => {
  let pageSize = ctx.query.pageSize || 10; // 每页数量
  let pageNum = ctx.query.pageNum || 1; // 当前页码
  let options = {
    skip: Number((pageNum - 1) * pageSize),
    limit: Number(pageSize),
  };
  let res = await ArticleModel.find({}, null, options).populate(
    "cid",
    "-_id title"
  );
  if (res) {
    let newArr = res.map((item) => {
      return {
        id: item._id,
        title: item.title,
        content: item.content,
        category: item.cid ? item.cid.title : "",
        description: item.description,
        created: formatTime(item.createTime),
      };
    });
    let total = await ArticleModel.countDocuments();
    callbackModel(
      ctx,
      codeConfig.success,
      {
        totalSize: total,
        data: newArr,
      },
      ""
    );
  } else {
    ctx.status = 500;
  }
};

let getArticleInfoById = async (ctx) => {
  let _id = ctx.params.id;
  let res = await ArticleModel.findById(_id).populate("cid", "title");
  if (res) {
    callbackModel(
      ctx,
      codeConfig.success,
      {
        id: res._id,
        uid: res.uid,
        title: res.title,
        description: res.description,
        content: res.content,
        cid: res.cid ? res.cid._id : null,
        category: res.cid ? res.cid.title : "",
        createTime: formatTime(res.createTime),
      },
      "查询成功"
    );
  } else {
    ctx.status = 500;
  }
};

let createArticle = async (ctx) => {
  let token = ctx.get("Authorization").split(" ")[1];
  let _id = await getUserIdByToken(token); //解析用户
  const { title, categoryId, description, content } = ctx.request.body;
  if (title === "") {
    callbackModel(ctx, codeConfig.error, null, "文章标题不能为空");
    return;
  }
  if (categoryId === "") {
    callbackModel(ctx, codeConfig.error, null, "请选择一个文章分类");
    return;
  }
  if (description === "") {
    callbackModel(ctx, codeConfig.error, null, "文章描述不能为空");
    return;
  }
  if (content === "") {
    callbackModel(ctx, codeConfig.error, null, "文章内容不能为空");
    return;
  }
  let article = new ArticleModel({
    uid: _id,
    title,
    cid: categoryId,
    description,
    content,
  });
  let res = await article.save();
  if (res) {
    callbackModel(ctx, codeConfig.success, null, "文章创建成功");
  } else {
    ctx.status = 500;
  }
};

let updateArticle = async (ctx) => {
  let { id, title, categoryId, description, content } = ctx.request.body;
  let res = await ArticleModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { title, cid: categoryId, description, content },
    },
    { new: true }
  );
  if (res) {
    callbackModel(ctx, codeConfig.success, null, "修改成功");
  } else {
    ctx.status = 500;
  }
};

let deleteArticle = async (ctx) => {
  let _id = ctx.params.id;
  let res = await ArticleModel.findByIdAndRemove(_id);
  if (res) {
    callbackModel(ctx, codeConfig.success, null, "删除成功");
  } else {
    ctx.status = 500;
  }
};

// 评论
let getCommentList = async (ctx) => {
  let { aid } = ctx.query;
  // 连表查询
  let res = await CommentModel.find({ aid }).populate("uid", "nickname avatar");
  if (res) {
    let tempArr = res.map((item) => {
      let map = {};
      map["avatar"] = item.uid.avatar;
      map["nickname"] = item.uid.nickname;
      map["uid"] = item.uid._id;
      map["_id"] = item._id;
      map["content"] = item.content;
      map["thumbup"] = item.thumbup;
      map["createTime"] = formatTime(item.createTime);
      return map;
    });
    callbackModel(ctx, codeConfig.success, tempArr, "查询成功");
  } else {
    ctx.status = 500;
  }
};

let addComment = async (ctx) => {
  let token = ctx.get("Authorization").split(" ")[1];
  let _id = await getUserIdByToken(token); //解析用户
  let { aid, content } = ctx.request.body;
  if (content === "") {
    callbackModel(ctx, codeConfig.error, null, "评论内容不能为空");
    return;
  }
  let comment = new CommentModel({
    uid: _id,
    aid,
    content,
  });
  let res = await comment.save();
  if (res) {
    callbackModel(ctx, codeConfig.success, null, "添加评论成功");
  } else {
    ctx.status = 500;
  }
};

let likeComment = async (ctx) => {
  let token = ctx.get("Authorization").split(" ")[1];
  let uid = await getUserIdByToken(token); //解析用户
  let id = ctx.request.body.id;
  let result = await CommentModel.findOne(
    { _id: id },
    { uid: true, thumbup: true, isLike: true }
  );
  if (result) {
    if (uid.toString() === result.uid.toString()) {
      // 表示是自己的评论
      callbackModel(ctx, codeConfig.error, null, "不能给自己的评论点赞哟");
    } else {
      if (result.isLike) {
        // 已点赞
        let res = await CommentModel.findOneAndUpdate(
          { _id: id },
          { $set: { thumbup: --result.thumbup, isLike: false } },
          { new: true }
        );
        if (res) {
          callbackModel(ctx, codeConfig.success, null, "取消点赞");
        } else {
          ctx.status = 500;
        }
      } else {
        let res = await CommentModel.findOneAndUpdate(
          { _id: id },
          { $set: { thumbup: ++result.thumbup, isLike: true } },
          { new: true }
        );
        if (res) {
          callbackModel(ctx, codeConfig.success, null, "点赞成功");
        } else {
          ctx.status = 500;
        }
      }
    }
  }
};

module.exports = {
  createCategory,
  getCategoryList,
  updateCategory,
  deleteCategory,
  createArticle,
  updateArticle,
  getArticleList,
  getArticleInfoById,
  deleteArticle,
  getCommentList,
  addComment,
  likeComment,
};
