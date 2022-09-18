<template>
  <div class="comment">
    <div class="vcards">
      <div class="vcard" v-for="parent in stairComment" :key="parent.id">
        <img
          class="vimg"
          src="https://gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?d=mp&amp;v=1.4.14"
        />
        <div class="vh">
          <div class="vhead">
            <span class="vnick">{{ parent.user }}</span>
            <span class="vsys">Chrome 87.0.4280.88</span>
            <span class="vsys">Windows 10.0</span>
          </div>
          <div class="vmeta">
            <span class="vtime">{{ createdAtToNow(parent.createdAt) }}</span
            ><span class="vat" @click="handleVat(parent)">回复</span>
          </div>
          <div class="vcontent">{{ parent.content }}</div>
          <div class="vreply-wrapper">
            <commentPanel
              @afresh="handleAfresh"
              @close="closePanel(parent)"
              :parent="parent.id"
              :nick="parent.user"
              v-if="parent.vat"
              :articleId="articleId"
              :isArticle="isArticle"
              :isComment="true"
            />
          </div>
          <div class="vquote">
            <template v-for="secondTtem in secondaryComment">
              <template v-for="item in secondTtem">
                <div
                  v-if="item.parent === parent.id"
                  class="vcard"
                  :key="item.id"
                >
                  <img
                    class="vimg"
                    src="https://gravatar.loli.net/avatar/d41d8cd98f00b204e9800998ecf8427e?d=mp&amp;v=1.4.14"
                  />
                  <div class="vh">
                    <div class="vhead">
                      <span class="vnick">{{ item.user }}</span>
                      <span class="vsys">Chrome 87.0.4280.88</span>
                      <span class="vsys">Windows 10.0</span>
                    </div>
                    <div class="vmeta">
                      <span class="vtime">{{
                        createdAtToNow(item.createdAt)
                      }}</span
                      ><span class="vat" @click="handleVat(item)">回复</span>
                    </div>
                    <div class="vcontent">{{ item.content }}</div>
                    <div class="vreply-wrapper">
                      <commentPanel
                        @close="closePanel(item)"
                        @afresh="handleAfresh"
                        v-if="item.vat"
                        :parent="parent.id"
                        :nick="item.user"
                        :articleId="articleId"
                        :isArticle="isArticle"
                        :isComment="true"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isHasComment" class="vpage txt-center" style="display: block;">
      <button @click="getOtherComment" type="button" class="vmore vbtn">
        加载更多...
      </button>
    </div>
  </div>
</template>

<script>
import commentPanel from "@/components/info/CommentPanel";
import Api from "@/api/index.js";
import moment from "moment";
export default {
  props: ["increase", "isArticle", "articleId"],
  created() {
    this.__afreshGetComment(this.page);
  },
  data() {
    return {
      stairComment: [],
      secondaryComment: [],
      page: 1,
      total: 0
    };
  },
  components: { commentPanel },
  computed: {
    isHasComment() {
      return this.page * 5 < this.total;
    }
  },
  watch: {
    increase: function() {
      this.handleAfresh({ parent: -1 });
    }
  },
  methods: {
    async getComment(page) {
      if (this.isArticle) {
        return await Api.getComment(this.articleId, page);
      } else {
        return await Api.getLeaveMessage(page);
      }
    },
    async getOtherComment() {
      this.page = this.page + 1;
      const r = await this.getComment(this.page);
      this.stairComment = this.stairComment.concat(
        r.data.data.stairComment.rows.map(item => {
          item.vat = false;
          return item;
        })
      );
      this.secondaryComment = this.secondaryComment.concat(
        r.data.data.secondaryComment.map(item => {
          return item.map(r => {
            r.vat = false;
            return r;
          });
        })
      );
    },
    handleVat(data) {
      data.vat = true;
    },
    closePanel(data) {
      data.vat = false;
      console.log(data);
    },
    createdAtToNow(createdAt) {
      console.log(createdAt);
      return moment(createdAt)
        .locale("zh-cn")
        .fromNow();
    },
    async handleAfresh({ parent }) {
      console.log(parent);
      if (parent === -1) {
        if (this.isHasComment) {
          const page = this.page + 1;
          this.__afreshGetComment(page);
        } else {
          if (this.page * 5 === this.total) {
            const page = this.page + 1;
            this.__afreshGetComment(page);
          } else {
            const page = this.page;
            this.__afreshGetComment(page);
          }
        }
      } else {
        this.__afreshGetComment(this.page);
      }
    },
    async __afreshGetComment(page) {
      let stairComment = [],
        secondaryComment = [];
      for (let i = 1; i <= page; i++) {
        const r = await this.getComment(i);
        if (page === 1 && i === 1) {
          this.total = r.data.data.stairComment.count;
        }
        stairComment = stairComment.concat(
          r.data.data.stairComment.rows.map(item => {
            item.vat = false;
            return item;
          })
        );
        secondaryComment = secondaryComment.concat(
          r.data.data.secondaryComment.map(item => {
            return item.map(r => {
              r.vat = false;
              return r;
            });
          })
        );
      }

      this.stairComment = stairComment;
      this.secondaryComment = secondaryComment;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/info/comment.scss";
</style>
