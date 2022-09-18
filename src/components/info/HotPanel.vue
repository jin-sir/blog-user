<template>
  <div class="panel">
    <h2 class="title">热门排行</h2>
    <ul class="content">
      <li v-for="(item, index) in hotArticle" :key="item.id" class="item">
        <i :class="{ orange: index < 3, gray: true }">{{ index + 1 }}</i>
        <router-link
          class="link"
          :to="{ name: 'article', params: { pathName: item.pathName } }"
          tag="span"
          >{{ item.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Api from "@/api/index.js";
export default {
  created() {
    Api.getArticleHot().then(r => {
      console.log(r);
      this.hotArticle = r.data.data.datas;
    });
  },
  data() {
    return {
      hotArticle: []
    };
  }
};
</script>

<style></style>
