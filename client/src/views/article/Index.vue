<template>
  <div>
    <div>
      <el-button type="primary" @click="$router.push('/addOrEditArticle')">添加文章</el-button>
      <el-button type="primary" @click="handleAddCategory">添加文章类型</el-button>
      <div class="tags">
        <el-tag :key="item._id" v-for="item in categoryList" closable :disable-transitions="false" @close="handleDeleteCategory(item._id)">
          {{item.title}}
        </el-tag>
      </div>
    </div>
    <div class="article-list" v-for="item in articleList" :key="item.id" @click="goArticleDetail(item.id)">
      <div class="head flexjbac">
        <div class="title">{{item.title}}</div>
        <div class="date">{{item.created}}</div>
      </div>
      <div class="body">
        <div class="category">分类：{{item.category}}</div>
        <div class="description">文章描述内容</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCategoryList,
  addCategory,
  deleteCategory,
  getArticleList,
  deleteArticle
} from "@/api/getData";
export default {
  inject: ["app"],
  data() {
    return {
      categoryList: [],
      articleList: []
    };
  },
  mounted() {
    this.getCategoryList();
    this.getArticlePaged();
  },
  methods: {
    getCategoryList() {
      getCategoryList().then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          this.categoryList = data;
        } else {
          this.$message.error(msg);
        }
      });
    },
    handleAddCategory() {
      this.$msgBox
        .prompt("请输入分类标题", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(({ value }) => {
          addCategory({
            title: value
          }).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.getCategoryList();
              this.$message.success("创建成功");
            } else {
              this.$message.error(msg);
            }
          });
        });
    },
    handleDeleteCategory(id) {
      deleteCategory(id).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.getCategoryList();
        } else {
          this.$message.error(msg);
        }
      });
    },
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
          this.$message.success("删除成功！");
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
.tags {
  margin-top: 20px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
.article-list {
  margin-top: 25px;
  background: #f6f6f6;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #aaa;
  width: 100%;
  &:hover {
    background: rgba(96, 126, 121, 0.18);
  }
  cursor: pointer;
  .head {
    height: 50px;
    padding: 0 25px;
    box-shadow: 0 5px 5px -5px #aaa;
    .title {
      flex: 1;
      font-size: 25px;
      letter-spacing: 5px;
      color: #607e79;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .date {
      color: #7b7b7b;
      margin-left: 10px;
      font-size: 12px;
    }
  }
  .body {
    padding: 0 25px;
    .category {
      font-size: 14px;
      color: #7b7b7b;
      margin-top: 10px;
    }
    .description {
      padding: 12px 0 20px;
    }
  }
}
</style>

