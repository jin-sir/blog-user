<template>
  <div class="blog-card" @click="handleClick">
    <div class="bc-head">
      <span class="bc-tag">{{ article.tag }}</span>
      <div class="bc-title">{{ article.title }}</div>
    </div>

    <div class="bc-content" v-html="article.summary"></div>

    <div class="bc-footer">
      <span>
        <i class="el-icon-star-off icon"></i>
        <i class="num">收藏</i>
      </span>
      <span>
        <i class="el-icon-view icon"></i>
        <i class="num">{{ article.views }}</i>
      </span>
      <div class="bc-ctime">{{ createdAt }}</div>
      <!-- <span>
        <i class="el-icon-thumb icon"></i>
        <i class="num"></i>
      </span> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["article"],
  computed: {
    createdAt() {
      return moment(this.article.createdAt).format("YYYY.MM.DD");
    },
  },
  methods: {
    handleClick() {
      this.$emit("change", this.article.pathName);
    },
  },
};
</script>
