<template>
  <div>
    <div class="operate-bar flexjbac">
      <span>{{total}} categorys</span>
      <el-button type="primary" @click="handleAddCategory">New Category</el-button>
    </div>
    <div class="categorys">
      <div class="category-item flexjbac" v-for="item in categoryList" :key="item._id">
        <div>{{item.title}}</div>
        <div class="flexjbac">
          <div class="total">{{item.artCount}} articles</div>
          <div class="edit" @click="handleUpdateCategory(item)">
            <i class="el-icon-edit-outline"></i>
            <span>Edit</span>
          </div>
          <div class="delete" @click="handleDeleteCategory(item._id)">
            <i class="el-icon-delete"></i>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/api/getData";
export default {
  data() {
    return {
      total: 0,
      categoryList: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      getCategoryList().then(res => {
        let { code, data, msg } = res;
        if (code === 0) {
          this.categoryList = data;
          this.total = data.length;
        } else {
          this.$message.error(msg);
        }
      });
    },
    handleAddCategory() {
      this.$msgBox
        .prompt("请输入分类标题", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
        .then(({ value }) => {
          addCategory({
            title: value,
          }).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.getCategories();
              this.$message.success("创建成功");
            } else {
              this.$message.error(msg);
            }
          });
        });
    },
    handleUpdateCategory(item) {
      this.$msgBox
        .prompt("请输入分类标题", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue: item.title,
        })
        .then(({ value }) => {
          updateCategory({
            id: item._id,
            title: value,
          }).then(res => {
            let { code, msg } = res;
            if (code === 0) {
              this.getCategories();
              this.$message.success("修改成功");
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
          this.getCategories();
        } else {
          this.$message.error(msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.operate-bar {
  height: 70px;
  background: #f2f2f2;
  padding: 0 20px;
  border: 1px solid #e2e2e2;
  border-radius: 5px 5px 0 0;
}
.categorys {
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  border-radius: 0 0 5px 5px;
  .category-item {
    height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #e7e7e7;
    .total {
      margin-right: 100px;
    }
    .edit,
    .delete {
      margin-left: 30px;
      cursor: default;
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>


