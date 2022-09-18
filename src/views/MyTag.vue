<template>
  <div class="page-mytag">
    <h1 class="title">标签</h1>
    <div class="entry-content">
      <section>
        <router-link
          v-for="item in tag"
          :key="item.id"
          class="item"
          :to="{ name: 'tagPage', params: { tagname: item.tagname } }"
          >{{ item.tagname }}</router-link
        >
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    if (!this.tag.length) {
      this.tagAction();
    }
  },
  computed: {
    ...mapGetters({
      tag: "tagAll"
    })
  },
  methods: {
    ...mapActions(["tagAction"])
  }
};
</script>

<style lang="scss">
@import "@/assets/css/myTag.scss";
</style>
