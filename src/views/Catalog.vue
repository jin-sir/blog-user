<template>
  <div class="page-catalog">
    <div class="new-article">
      <div class="title">最新文章</div>
      <ul>
        <li v-for="item in catalog" :key="item.id">
          <router-link
            :title="item.title"
            :to="{ name: 'article', params: { pathName: item.pathName } }"
            >{{ item.title }}</router-link
          >
        </li>
      </ul>
    </div>
    <div class="footer">
      查看博客首页：<router-link to="/">Personal Blog</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios.get("/api/catalog").then(r => {
      console.log(r);
      this.catalog = r.data.data;
    });
  },
  data() {
    return {
      catalog: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/catalog.scss";
</style>
