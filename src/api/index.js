import axios from "axios";

const blogArticlePath = "/api/blogArticle";
const tagPath = "/api/tag";
const commentPath = "/api/comment";
const leaveMessagePath = "/api/leaveMessage";
const info = "/api/info";
const api = {
  getArticlePage(params) {
    return axios.get(blogArticlePath, { params });
  },
  getArticleHot() {
    return axios.get(`${blogArticlePath}/info/hot`);
  },
  getArticle(pathname) {
    return axios.get(blogArticlePath + `/${pathname}`);
  },
  getTags() {
    return axios.get(tagPath);
  },
  getTagArticle(tagname, params) {
    return axios.get(tagPath + `/${tagname}`, { params });
  },
  getComment(id, params) {
    return axios.get(`${commentPath}/${id}/${params}`);
  },
  getLeaveMessage(params) {
    return axios.get(leaveMessagePath + "/" + params);
  },
  postLeaveMessage(params) {
    return axios.post(leaveMessagePath, params);
  },
  postComment(params) {
    return axios.post(commentPath, params);
  },
  getArticleSearch(params) {
    return axios.get(`${blogArticlePath}/page/search`, { params });
  },
  getInfo() {
    return axios.get(`${info}/getinfo`);
  }
};

export default api;
