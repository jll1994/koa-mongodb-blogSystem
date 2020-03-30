<template>
  <div>
    <h1>这是文章列表页面</h1>
    <div class="article-container">
      <div class="article-list">
        <div class="item" v-for="item in articleList" :key="item.id" @click="goArticleDetail(item.id)">
          <div class="date">{{item.created}}</div>
          <div class="title">{{item.title}}</div>
          <span class="del" @click="handleDeleteArticle(item.id)">删除</span>
        </div>
      </div>
      <form class="article-form">
        <div class="form-item">
          <label>文章标题：</label>
          <input v-model="params.title" type="text" placeholder="请输入文章标题">
        </div>
        <div class="form-item">
          <label>文章正文：</label>
          <textarea v-model="params.content" cols="30" rows="10" placeholder="请输入文章文正"></textarea>
        </div>
        <div class="form-item">
          <button @click="handleArticleSubmit">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { getArticleList, publishArticle, deleteArticle } from "@/api/getData";
export default {
  inject: ["app"],
  data() {
    return {
      articleList: [],
      params: {
        userid: "",
        title: "",
        content: ""
      }
    };
  },
  mounted() {
    this.getArticlePaged();
  },
  methods: {
    getArticlePaged() {
      getArticleList().then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          let tempArr = data.data.map(item => {
            item["created"] = item.created.split(" ")[0];
            return item;
          });
          this.articleList = tempArr;
        }
      });
    },
    handleDeleteArticle(id) {
      deleteArticle(id).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.getArticlePaged();
          window.alert("删除成功！");
        }
      });
    },
    handleArticleSubmit(e) {
      e.preventDefault();
      this.params.userid = this.app.userInfo._id;
      publishArticle(this.params).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.params.title = "";
          this.params.content = "";
          this.getArticlePaged();
          window.alert("文章发布成功！");
        } else {
          window.alert(msg);
        }
      });
    },
    goArticleDetail(id) {
      this.$router.push("/articleDetail?id=" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.article-container {
  width: 1120px;
  margin: 20px auto;
  display: flex;
  align-items: flex-start;
  .article-list,
  .article-form {
    padding: 20px;
    border: 1px solid #ccc;
  }
  .article-list {
    flex: 2;
    margin-right: 30px;
    .item {
      display: flex;
      align-items: center;
      height: 45px;
      .date {
        width: 100px;
      }
      .title {
        flex: 1;
      }
      .del {
        color: red;
        cursor: default;
      }
    }
  }
  .article-form {
    flex: 1;
    .form-item {
      margin-bottom: 20px;
      label {
        display: inline-block;
        vertical-align: top;
      }
    }
  }
}
</style>

