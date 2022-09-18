<template>
  <div class="footer">
    <el-col :span="18" :offset="3" class="f-container">
      <div class="concern">
        <h4 class="title">关于本站</h4>
        <div class="f-block">
          <div class="fc-content">
            博客主要分享工作中的技术问题及提升技术的一些文章。
          </div>
          <div class="fc-rectangle">
            <span>Blog</span>
          </div>
        </div>
      </div>
      <div class="news">
        <div class="title">最新动态</div>
        <div class="f-block">
          <ul>
            <li class="f-b-h" v-for="item in newInfoFooter" :key="item.id">
              <div class="f-b-h-t">
                <span class="f-icon"
                  ><i class="el-icon-s-opportunity"></i
                ></span>
                <span class="f-tag">{{ item.title }}</span>
              </div>
              <div class="f-text">
                {{ item.summary }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="comment">
        <div class="title">最新留言</div>
        <div class="f-block">
          <ul>
            <li
              :class="{ 'c-item': true, last: index === 1 }"
              v-for="(item, index) in newLeaveMessage"
              :key="item.id"
            >
              <h4 class="c-i-person">{{ item.user }}：</h4>
              <div class="f-text">{{ item.content }}</div>
            </li>
          </ul>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Api from "@/api/index.js";
export default {
  created() {
    this.getNewLeaveMessage();
    if (!this.newInfoFooter.length) {
      Api.getArticlePage(this.tag, { page: 1 }).then(r => {
        this.addNewInfo(r.data.data.datas);
      });
    }
  },
  data() {
    return {
      newLeaveMessage: []
    };
  },
  computed: {
    ...mapGetters(["newInfoFooter"])
  },
  methods: {
    async getNewLeaveMessage() {
      const r = await Api.getLeaveMessage(1);
      const newLeaveMessage = r.data.data.stairComment.rows.slice(0, 2);
      console.log(newLeaveMessage);
      this.newLeaveMessage = newLeaveMessage;
    },
    ...mapMutations(["addNewInfo"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/footer.scss";
</style>
