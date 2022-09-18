<template>
  <el-carousel height="480px" class="carousel">
    <el-carousel-item v-for="item in swiper" :key="item">
      <img :src="item" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ["swiper"]
};
</script>
