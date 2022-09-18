<template>
  <div class="article">
    <article class="post detail">
      <div class="meta">
        <div class="date">{{ createdAt }}</div>
      </div>
      <h1 class="title">{{ article.title }}</h1>
      <div class="markdown-preview" v-html="content"></div>
      <p>
        本文链接：<a :href="siteURL + '/page/article/' + pathname"
          >{{ siteURL }}/page/article/{{ pathname }}</a
        >
      </p>
      <p>-- <acronym title="End of File">EOF</acronym> --</p>
      <div class="post-info">
        <p>
          发表于 <i>{{ createdAt }}</i> 被添加「
          <router-link
            v-for="tag in article.tag"
            :to="{ name: 'tagPage', params: { tagname: tag } }"
            :key="tag"
            :data-tag="tag"
          >
            <code class="notebook">{{ tag }}</code>
          </router-link>
          」标签 ，最后修改于 <i>{{ updatedAt }}</i>
        </p>
      </div>
    </article>
    <div v-if="article.allowComment" class="article-comment">
      <commentPanel
        :parent="-1"
        nick="Just GO GO."
        @afresh="handleAfresh"
        :isArticle="true"
        :articleId="article.id"
      />
      <comment :increase="increase" :isArticle="true" :articleId="article.id" />
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
import moment from "moment";
import comment from "@/components/info/Comment.vue";
import commentPanel from "@/components/info/CommentPanel.vue";
export default {
  created() {
    const pathname = this.$route.params.pathName;
    this.pathname = pathname;
    Api.getArticle(pathname).then(r => {
      console.log(r);
      this.article = r.data.data;
    });
  },
  data() {
    return {
      html: "",
      article: {},
      drawer: true,
      pathname: "",
      increase: 0,
      total: 0
    };
  },
  components: { comment, commentPanel },
  computed: {
    content() {
      const article = this.article;
      return article.toc
        ? `<div id="toc" class="toc">${article.toc}</div>${article.summary}${article.content}`
        : article.content;
    },
    createdAt() {
      const time = moment(this.article.createdAt)
        .local()
        .format("YYYY:MM:DD HH:mm:ss");
      return time;
    },
    updatedAt() {
      const time = moment(this.article.updatedAt)
        .local()
        .format("YYYY:MM:DD HH:mm:ss");
      return time;
    },
    siteURL() {
      return window.location.origin || "localhost";
    }
  },
  methods: {
    handleAfresh() {
      this.increase = this.increase + 1;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/article/index.scss";
</style>
