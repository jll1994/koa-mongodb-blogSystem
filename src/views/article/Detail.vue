<template>
  <div>
    <div class="article-detail">
      <div class="title">{{info.title}}</div>
      <div class="body">
        <div class="flexjbac">
          <div>分类：{{info.category}}</div>
          <div>{{info.createTime}}</div>
        </div>
        <blockquote>
          <p>{{info.description}}</p>
        </blockquote>
        <div class="content" v-html="info.content"></div>
      </div>
    </div>
    <div class="comment-input">
      <el-avatar :src="app.userInfo.avatar"></el-avatar>
      <el-input class="input" v-model="commentParams.content" placeholder="请输入评论内容"></el-input>
      <el-button type="primary" @click="handleCommentSubmit">评论</el-button>
    </div>
    <div class="comment-wrapper">
      <div class="comment-list" v-for="(item,index) in comments" :key="item._id">
        <el-avatar class="avatar" :src="item.avatar"></el-avatar>
        <div class="body">
          <div class="like flexjbac">
            <span>{{info.uid===item.uid?"作者":item.nickname}}</span>
            <span @click="handleLike(item._id)">点赞{{item.thumbup}}</span>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="border-bottom">
            <div class="flexjbac">
              <span class="time">两月前</span>
              <span class="reply" @click="replyClick(index)">回复</span>
            </div>
            <div class="reply-box flexjbac" v-if="replyIndex===index">
              <el-input class="input" v-model="replyParams.content" :placeholder="'回复'+item.nickname"></el-input>
              <el-button type="primary" @click="handleReplySubmit">评论</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getArticleInfoById,
  getCommentList,
  addComment,
  likeComment,
} from "@/api/getData";
import marked from "marked";
export default {
  inject: ["app"],
  data() {
    return {
      aid: null,
      info: {},
      commentParams: {
        aid: "",
        content: "",
      },
      comments: [],
      replyIndex: -1,
      replyParams: {
        content: "",
      },
    };
  },
  mounted() {
    this.aid = this.$route.query.id;
    this.getArticleDetailById();
    this.getCommentPaged();
  },
  methods: {
    getArticleDetailById() {
      getArticleInfoById(this.aid).then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          // 将markdown转HTML
          data.content = marked(data.content);
          this.info = data;
        }
      });
    },
    handleCommentSubmit() {
      this.commentParams.aid = this.aid;
      addComment(this.commentParams).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.commentParams.content = "";
          this.getCommentPaged();
        } else {
          this.$message.error(msg);
        }
      });
    },
    getCommentPaged() {
      getCommentList(this.aid).then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          this.comments = data;
        }
      });
    },
    handleLike(id) {
      likeComment({
        id,
      }).then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          this.getCommentPaged();
        } else {
          this.$message.error(msg);
        }
      });
    },
    replyClick(index) {
      this.replyIndex = index;
    },
    handleReplySubmit() {},
  },
};
</script>
<style lang="less" scoped>
.article-detail {
  background: #f6f6f6;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
  box-shadow: 0 0 5px 0 #aaa;
  .title {
    color: #607e79;
    font-size: 25px;
    text-align: center;
    line-height: 54px;
    height: 54px;
    padding: 0 25px;
    box-shadow: 0 5px 5px -5px #aaa;
  }
  blockquote {
    position: relative;
    padding-left: 10px;
    border-left: 3px solid rgba(96, 126, 121, 0.4);
    background: #f1f1f1;
    box-shadow: 0 0 5px 0 #ddd;
    p {
      line-height: 2;
      color: #5a5a5a;
      margin: 10px 0;
    }
  }
  .body {
    padding: 0 25px;
    .flexjbac {
      padding: 10px 0;
      color: #777;
    }
    .content {
      padding: 20px 0;
    }
  }
}
.comment-input {
  display: flex;
  margin: 20px 0;
  .input {
    flex: 1;
    margin: 0 10px;
  }
}
.comment-wrapper {
  padding: 0 20px 0 50px;
  .comment-list {
    display: flex;
    margin-bottom: 20px;
    .body {
      flex: 1;
      margin-left: 12px;
      .like,
      .reply {
        cursor: default;
      }
      .content {
        margin: 10px 0;
      }
      .time,
      .reply {
        font-size: 12px;
        color: #999;
      }
      .border-bottom {
        padding: 12px 0;
        border-bottom: 1px solid #eee;
      }
      .reply-box {
        background: #f2f2f2;
        padding: 10px;
        margin-top: 10px;
        .input {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>


