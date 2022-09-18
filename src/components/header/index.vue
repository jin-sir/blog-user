<template>
  <div class="header">
    <el-row class="hd">
      <el-col :span="2" :offset="3">
        <!-- <div class="hd-logo">Flight</div> -->
        <router-link class="hd-logo" tag="div" :to="{ name: 'index' }"
          >Personal Blog</router-link
        >
      </el-col>
      <el-col :span="12">
        <nav class="nav">
          <router-link class="n-item" tag="div" :to="{ name: 'index' }"
            >博客首页</router-link
          >
          <router-link class="n-item" tag="div" :to="{ name: 'catalog' }"
            >博文目录</router-link
          >
          <router-link class="n-item" tag="div" :to="{ name: 'tag' }"
            >我的标签</router-link
          >
          <router-link class="n-item" tag="div" :to="{ name: 'info' }"
            >我的信息</router-link
          >
        </nav>
      </el-col>
      <el-col :span="4" class="hd-function">
        <div class="hd-icon">
          <iconButton
            @click="handleShare"
            name="el-icon-share"
            left="true"
            right="true"
          ></iconButton>
          <iconButton
            @click="handleSearch"
            name="el-icon-search"
            right="true"
          ></iconButton>
        </div>
        <div class="hd-search">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iconButton from "./IconButton";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      input: "",
    };
  },
  components: {
    iconButton,
  },
  methods: {
    handleSearch() {
      this.postSearch(this.input);
    },
    handleShare() {
      const cpDiv = document.createElement("textarea");
      cpDiv.innerText = window.location.href;
      document.body.appendChild(cpDiv);
      cpDiv.select();
      try {
        const successful = document.execCommand("copy");
        const msg = successful
          ? "成功复制到剪贴板"
          : "该浏览器不支持复制到剪贴板";
        this.$message({
          message: msg,
          type: "success",
        });
      } catch (e) {
        this.$message({
          message: "该浏览器不支持复制到剪贴板",
          type: "error",
        });
      }

      document.body.removeChild(cpDiv);
    },
    postSearch(wd) {
      if (this.$route.name === "search") {
        this.putSearchResult(wd);
      } else {
        this.putSearchResult(wd);
        this.$router.push({
          name: "search",
        });
      }
    },
    ...mapMutations(["putSearchResult"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/header/index.scss";
</style>
