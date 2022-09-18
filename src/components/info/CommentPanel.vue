<template>
  <div class="vpanel">
    <div class="vwrap">
      <p
        v-if="!isArticle || isComment"
        class="cancel-reply text-right"
        title="取消回复"
      >
        <svg
          @click="close"
          class="vicon cancel-reply-btn"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4220"
          width="22"
          height="22"
        >
          <path
            d="M796.454 985H227.545c-50.183 0-97.481-19.662-133.183-55.363-35.7-35.701-55.362-83-55.362-133.183V227.545c0-50.183 19.662-97.481 55.363-133.183 35.701-35.7 83-55.362 133.182-55.362h568.909c50.183 0 97.481 19.662 133.183 55.363 35.701 35.702 55.363 83 55.363 133.183v568.909c0 50.183-19.662 97.481-55.363 133.183S846.637 985 796.454 985zM227.545 91C152.254 91 91 152.254 91 227.545v568.909C91 871.746 152.254 933 227.545 933h568.909C871.746 933 933 871.746 933 796.454V227.545C933 152.254 871.746 91 796.454 91H227.545z"
            p-id="4221"
          ></path>
          <path
            d="M568.569 512l170.267-170.267c15.556-15.556 15.556-41.012 0-56.569s-41.012-15.556-56.569 0L512 455.431 341.733 285.165c-15.556-15.556-41.012-15.556-56.569 0s-15.556 41.012 0 56.569L455.431 512 285.165 682.267c-15.556 15.556-15.556 41.012 0 56.569 15.556 15.556 41.012 15.556 56.569 0L512 568.569l170.267 170.267c15.556 15.556 41.012 15.556 56.569 0 15.556-15.556 15.556-41.012 0-56.569L568.569 512z"
            p-id="4222"
          ></path>
        </svg>
      </p>
      <div class="vheader item3">
        <input
          name="nick"
          placeholder="昵称"
          class="vnick vinput"
          type="text"
          v-model="user"
        /><input
          name="mail"
          placeholder="邮箱"
          class="vmail vinput"
          type="email"
          v-model="emall"
        />
      </div>
      <div class="vedit">
        <textarea
          id="veditor"
          class="veditor vinput"
          :placeholder="vatNick"
          v-model="content"
        ></textarea>
      </div>
      <div class="vrow">
        <div class="vcol vcol-30"></div>
        <div class="vcol vcol-70 text-right">
          <button type="button" @click="onSubmit" class="vsubmit vbtn">
            提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/index.js";
export default {
  props: ["nick", "parent", "isArticle", "articleId", "isComment"],
  data() {
    return {
      content: "",
      user: "",
      emall: "",
      flag: true
    };
  },

  computed: {
    vatNick() {
      return this.parent === -1 ? this.nick : "@" + this.nick;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmit() {
      if (this.flag) {
        if (!this.user) {
          this.$message({
            message: "没有写游客名呀~~",
            type: "error"
          });
          return;
        }
        if (!this.emall) {
          this.$message({
            message: "没有写邮箱哦~~",
            type: "error"
          });
          return;
        }
        if (!this.content) {
          this.$message({
            message: "您还没有输入任何内容呢~~",
            type: "error"
          });
          return;
        }
        this.flag = false;
        const params = {
          user: this.user,
          content:
            this.parent === -1
              ? this.content
              : this.vatNick + " " + this.content,
          emall: this.emall,
          parent: this.parent
        };
        if (this.isArticle) {
          params.BlogArticleId = this.articleId;
          Api.postComment(params)
            .then(r => {
              if (r.data.code === 0) {
                this.$message({
                  message: "留言成功~~",
                  type: "success"
                });
                this.$emit("afresh", { parent: this.parent });
              }
              setTimeout(() => {
                this.flag = true;
              }, 3000);
              console.log(r);
            })
            .catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "error"
              });
            });
        } else {
          Api.postLeaveMessage(params)
            .then(r => {
              if (r.data.code === 0) {
                this.$message({
                  message: "留言成功~~",
                  type: "success"
                });
                this.$emit("afresh", { parent: this.parent });
              }
              setTimeout(() => {
                this.flag = true;
              }, 3000);
              console.log(r);
            })
            .catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "error"
              });
            });
        }
      } else {
        this.$message({
          message: "你的操作过于频繁等会在试试吧~~",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/info/commentPanel.scss";
</style>
