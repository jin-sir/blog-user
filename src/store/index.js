import Vue from "vue";
import Vuex from "vuex";
import Api from "@/api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: [],
    newInfo: [],
    search: [],
    wd: ""
  },
  getters: {
    tagAll: state => state.tags,
    newInfoFooter: state => state.newInfo,
    searchResult: state => state.search
  },
  mutations: {
    getTags(state, tags) {
      state.tags = tags;
    },
    addNewInfo(state, newInfo) {
      newInfo = newInfo.slice(0, 2);
      state.newInfo = newInfo.map(item => {
        item.summary = item.summary.replace(
          /(\s*<(\w|\s|\\=|\\"|\\')+>\s*|\s*<\/\w+>\s*)/g,
          ""
        );
        return item;
      });
    },
    putSearchResult(state, wd) {
      state.wd = wd;
    }
  },
  actions: {
    tagAction({ commit }) {
      Api.getTags().then(r => {
        commit("getTags", r.data.data);
      });
    }
  },
  modules: {}
});
