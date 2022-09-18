<template>
  <div class="page-index">
    <div class="blog-article">
      <div v-for="item in article" :key="item.id" class="item">
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
import blogcard from "@/components/main/Blogcard.vue";
import Api from "@/api/index.js";
import { mapMutations } from "vuex";
import "@/assets/css/main/blogcard.scss";
export default {
  created() {
    this.getArticlePage(1);
  },
  data() {
    return {
      article: [],
      total: 0,
    };
  },
  components: { blogcard },
  methods: {
    currentChange(cur) {
      this.getArticlePage(cur);
    },
    getArticlePage(page) {
      Api.getArticlePage({ page }).then(r => {
        console.log(r);
        this.article = r.data.data.datas.map(it => {
          it.tag = JSON.parse(it.tag).join();
          return it;
        });
        this.total = r.data.data.total;
        if (page === 1) {
          this.addNewInfo(this.article);
        }
        console.log(this.article);
      });
    },
    toArticle(path) {
      console.log(path)
      this.$router.push(`/page/article/${path}`);
    },
    ...mapMutations(["addNewInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.blog-article {
  padding: 40px 0;
}
.el-pagination::v-deep .el-pager li,
.el-pagination::v-deep button {
  background-color: rgb(240, 240, 240);
}
.el-pagination {
  padding: 20px 0;
}
</style>
