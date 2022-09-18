<template>
  <div class="base">
    <el-container>
      <el-header height="530px">
        <Header />
        <!-- <myNav /> -->
        <el-row class="swiper">
          <el-col :span="18" :offset="3" class="hd-sw-container">
            <swiper :swiper="swiperArray"></swiper>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive" />
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" />
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
import Swiper from "@/components/swiper/index.vue";
export default {
  data() {
    return {
      swiperArray: [
        require("@/assets/img/swiper_1.jpeg"),
        require("@/assets/img/swiper_2.jpeg"),
        require("@/assets/img/swiper_3.jpeg"),
        require("@/assets/img/swiper_4.jpeg"),
      ],
    };
  },
  computed: {
    nowYear() {
      return new Date().getFullYear();
    },
  },
  components: { Header, myFooter, Swiper },
};
</script>

<style lang="scss">
@import "@/assets/css/default.scss";
</style>
