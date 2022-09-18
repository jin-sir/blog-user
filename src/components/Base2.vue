<template>
  <div class="base">
    <el-container>
      <el-header height="40px">
        <Header />
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3">
            <router-view />
          </el-col>
        </el-row>
      </el-main>
      <el-footer height="260px"><myFooter /></el-footer>
      <div class="web-info">
        Copyright © 2022-{{ nowYear }} XX的独立博客. 浙ICP备XXXX
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/header/index";
import myFooter from "@/components/footer/index";
export default {
  components: { Header, myFooter },
  data() {
    return { wd: "" };
  },
  computed: {
    nowYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/default.scss";
</style>
