<template>
  <div class="search">
    <div class="blog-article">
      <div v-for="item in article" :key="item.id" class="item">
        <blogcard :article="item" @change="toArticle"></blogcard>
      </div>
    </div>

    <el-pagination
      :page-size="8"
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
import { mapState } from "vuex";
import "@/assets/css/main/blogcard.scss";
export default {
  created() {
    this.currentChange(1);
  },
  data() {
    return {
      article: [],
      total: 0,
      limit: 8,
    };
  },
  components: { blogcard },
  computed: {
    ...mapState(["wd"]),
  },
  watch: {
    wd: function() {
      this.currentChange(1);
    },
  },
  methods: {
    currentChange(cur) {
      this.requestSearch({ wd: this.wd, page: cur, limit: 8 });
    },
    toArticle(path) {
      console.log(path);
      this.$router.push(`/page/article/${path}`);
    },
    async requestSearch({ wd, page, limit }) {
      const r = await Api.getArticleSearch({
        wd,
        page,
        limit,
      });
      this.article = r.data.data.datas.map(it => {
        it.tag = JSON.parse(it.tag).join();
        return it;
      });
      this.total = r.data.data.total;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-pagination::v-deep .el-pager li,
.el-pagination::v-deep button {
  background-color: rgb(240, 240, 240);
}
.el-pagination {
  padding: 20px 0;
}
.search {
  margin-top: 40px;
}
</style>
