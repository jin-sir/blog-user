<template>
  <div
    :class="{ 'icon-btn': true, right: right || false, left: left || false }"
    @click="handleClick"
  >
    <i :class="name"></i>
  </div>
</template>

<script>
export default {
  props: ["name", "left", "right"],
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
