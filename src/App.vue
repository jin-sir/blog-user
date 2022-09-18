<template>
  <div id="app">
    <router-view v-if="isPC" />
    <div class="not-pc" v-else>本网站暂不支持手机端展示。</div>
  </div>
</template>

<script>
export default {
  mounted() {
    const isPC = navigator.userAgent.toLowerCase().indexOf("window");
    this.isPC = isPC === -1 ? false : true;
  },
  data() {
    return {
      isPC: true
    };
  }
};
</script>

<style>
.not-pc {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 14px;
}
</style>
