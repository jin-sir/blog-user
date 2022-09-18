<template>
  <div class="tag=page">
    <h1 class="title">{{ tag }}</h1>
    <div class="blog-article">
      <div class="item" v-for="item in article" :key="item.id">
        <blogcard :article="item" @change="toArticle"></blogcard>
      </div>
    </div>
    <el-pagination
      :page-size="12"
      :pager-count="5"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import blogcard from "../main/Blogcard";
import Api from "@/api/index.js";
import "@/assets/css/main/blogcard.scss";
export default {
  created() {
    console.log(this.$route.params);
    this.getTagArticle(1);
  },
  data() {
    return {
      isMyTag: false,
      tag: "",
      article: [],
      total: 0,
    };
  },
  components: {
    blogcard,
  },
  methods: {
    currentChange(cur) {
      this.getTagArticle(cur);
    },
    getTagArticle(page) {
      this.tag = this.$route.params.tagname;
      Api.getTagArticle(this.tag, { page }).then(r => {
        // console.log(this);
        this.article = r.data.data.datas;
        this.total = r.data.data.count;
        console.log(this.article);
      });
    },
    toArticle(path) {
      console.log(path);
      this.$router.push(`/page/article/${path}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: left;
  font-size: 40px;
}
.el-pagination::v-deep .el-pager li,
.el-pagination::v-deep button {
  background-color: rgb(240, 240, 240);
}
.el-pagination {
  padding: 20px 0;
}
.blog-article {
  padding: 40px 0;
}
</style>
