<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="article-form">
      <el-form-item label="文章标题：" prop="title">
        <el-input type="text" v-model="ruleForm.title" autocomplete="off" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类：" prop="categoryId">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择文章分类" style="width: 100%;">
          <el-option v-for="item in categoryList" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章描述：" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" autocomplete="off" placeholder="请输入文章描述"></el-input>
      </el-form-item>
      <el-form-item label="文章正文：" prop="content">
        <mavon-editor v-model="ruleForm.content" @change="change" style="min-height: 500px" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="!articleId" type="primary" @click="handleAddArticle('ruleForm')">提交</el-button>
        <el-button v-if="articleId" type="primary" @click="handleUpdateArticle('ruleForm')">编辑</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  getArticleInfoById,
  getCategoryList,
  publishArticle,
  updateArticle,
  deleteArticle
} from "@/api/getData";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      articleId: null,
      categoryList: [],
      articleList: [],
      ruleForm: {
        title: "",
        categoryId: "",
        description: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择文章分类", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入文章描述", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章正文", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.articleId = this.$route.params.id;
    if (this.articleId) {
      this.getArticleDetailById();
    }
    this.getCategoryList();
  },
  methods: {
    getArticleDetailById() {
      getArticleInfoById(this.articleId).then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          this.ruleForm.title = data.title;
          this.ruleForm.categoryId = data.cid;
          this.ruleForm.description = data.description;
          this.ruleForm.content = data.content;
        } else {
          this.$message.error(msg);
        }
      });
    },
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
    handleDeleteArticle(id) {
      deleteArticle(id).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.$message.success("删除成功！");
        }
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.ruleForm.content = render;
    },
    handleAddArticle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          publishArticle(this.ruleForm).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.$message.success("文章发布成功！");
              this.$router.push("/article");
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },
    handleUpdateArticle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateArticle({
            id: this.articleId,
            title: this.ruleForm.title,
            categoryId: this.ruleForm.categoryId,
            description: this.ruleForm.description,
            content: this.ruleForm.content
          }).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.$message.success("文章修改成功！");
              this.$router.push("/article");
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goArticleDetail(id) {
      this.$router.push("/articleDetail?id=" + id);
    }
  }
};
</script>