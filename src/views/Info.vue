<template>
  <div class="page-info">
    <div class="info-content-l">
      <div class="my-description">
        <div class="info-avatar">
          <img src="@/assets/img/avator.jpeg" alt="" />
        </div>
        <template v-if="info.title">
          <h2 class="info-title">{{ info.title }}</h2>
          <div class="info-name">姓名：{{ info.username }}</div>
          <div class="info-profession">职业：{{ info.profession }}</div>
          <div class="info-indroduce">
            <em>个人简介：</em>
            {{ info.description }}
          </div>
        </template>
      </div>
      <div class="message-board">
        <div class="info-avatar">
          <img src="@/assets/img/liuyan.jpeg" alt="" />
        </div>
        <div class="info-mb-box">
          <h2 class="info-title">留言板</h2>
          <div class="info-quote">
            “相遇是很奇妙的事，请一定做好准备，人生旅途中你可能会突然遇见这么一个人，他扰乱你心湖、打破你平淡的生活，让你的世界从此变得不同。”
          </div>
        </div>
        <div class="info-master-saying">
          主人寄语：每一缕柔风，都是一次温馨的问候；每一条留言，都是一份真情的写照！
        </div>
        <div class="info-comment">
          <ul>
            <li>
              <em>巴金</em>人类的希望像是一颗永恒的星，乌云掩不住它的光芒。特别是在今天，和平不是一个理想，一个梦，它是万人的愿望。
            </li>
            <li><em>萧峰</em>为世界进文明，为人类造幸福，以青年之我，创建青春之家庭，青春之国家，青春之民族，青春之人类，青春之地球，青春之宇宙，资以乐其无涯之生。</li>
          </ul>
          <div class="send-comment">
            <div class="s-input">
              <input disabled type="text" class="inp" />
            </div>
            <div class="s-functional">
              <div class="s-c-content">
                <span>留言（{{ total }}）</span>
                <div class="btn obviouslyAll" @click="handleComment">全部</div>
              </div>
              <div class="send btn" @click="openCommentPanel">发送</div>
            </div>
          </div>
        </div>
      </div>
      <commentPanel
        v-if="isCommentPanel"
        :parent="-1"
        nick="Just GO GO."
        @close="closeCommentPanel"
        @afresh="handleAfresh"
      />
      <comment :increase="increase" v-if="isComment" />
    </div>
    <div class="info-content-r">
      <div class="hot-article">
        <hotPanel />
      </div>
      <div class="tag-cloud">
        <tagCloud />
      </div>
    </div>
  </div>
</template>

<script>
import hotPanel from "@/components/info/HotPanel.vue";
import tagCloud from "@/components/info/TagCloud.vue";
import comment from "@/components/info/Comment.vue";
import commentPanel from "@/components/info/CommentPanel.vue";
import Api from "@/api/index.js";
export default {
  created() {
    this.getComment(1);
    this.getInfo();
  },
  data() {
    return {
      isCommentPanel: false,
      isComment: false,
      increase: 0,
      total: 0,
      info: {},
    };
  },
  components: { hotPanel, tagCloud, comment, commentPanel },
  methods: {
    async getComment(page) {
      const r = await Api.getLeaveMessage(page);
      this.total = r.data.data.stairComment.count;
    },
    async getInfo() {
      const r = await Api.getInfo();
      this.info = r.data.data;
    },
    closeCommentPanel() {
      this.isCommentPanel = false;
    },
    openCommentPanel() {
      this.isCommentPanel = true;
    },
    handleComment() {
      if (this.isComment) {
        this.isComment = false;
      } else {
        this.isComment = true;
      }
    },
    handleAfresh() {
      this.increase = this.increase + 1;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/info/index.scss";
</style>
