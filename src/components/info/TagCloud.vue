<template>
  <div class="tagCloud">
    <div class="title">标签云</div>
    <ul class="content">
      <router-link
        v-for="item in tag"
        :key="item.id"
        class="item"
        :to="{ name: 'tagPage', params: { tagname: item.tagname } }"
        >{{ item.tagname }}</router-link
      >
    </ul>
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

<style></style>
