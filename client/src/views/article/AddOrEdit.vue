<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="article-form">
      <el-form-item label="文章标题：" prop="title">
        <el-input type="text" v-model="ruleForm.title" autocomplete="off" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类：" prop="categoryId">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择文章分类">
          <el-option v-for="item in categoryList" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章描述：" prop="description">
        <el-input type="textarea" v-model="ruleForm.description" autocomplete="off" placeholder="请输入文章描述"></el-input>
      </el-form-item>
      <el-form-item label="文章正文：" prop="content">
        <el-input type="textarea" v-model="ruleForm.content" autocomplete="off" placeholder="请输入文章正文"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleArticleSubmit('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCategoryList, publishArticle, deleteArticle } from "@/api/getData";
export default {
  inject: ["app"],
  data() {
    return {
      categoryList: [],
      articleList: [],
      ruleForm: {
        uid: "",
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
    this.getCategoryList();
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
    handleDeleteArticle(id) {
      deleteArticle(id).then(res => {
        let { code, msg } = res;
        if (code === 0) {
          this.$message.success("删除成功！");
        }
      });
    },
    handleArticleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.uid = this.app.userInfo._id;
          publishArticle(this.ruleForm).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.ruleForm.title = "";
              this.ruleForm.categoryId = "";
              this.ruleForm.content = "";
              this.$message.success("文章发布成功！");
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