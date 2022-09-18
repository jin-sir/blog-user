import Vue from "vue";
import VueRouter from "vue-router";
import Base from "@/components/Base.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Base,
    redirect: "/",
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("@/views/Index.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/catalog",
        name: "catalog",
        component: () => import("@/views/Catalog.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/tag",
        name: "tag",
        component: () => import("@/views/MyTag.vue"),
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/tag/:tagname",
        name: "tagPage",
        component: () => import("@/components/tag/tagPage.vue"),
        meta: {
          keepAlive: false
        }
      },
      {
        path: "/info",
        name: "info",
        component: () => import("@/views/Info.vue"),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/page",
    component: () => import("@/components/Base2.vue"),
    children: [
      {
        path: "article/:pathName",
        name: "article",
        component: () => import("@/views/Article.vue")
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/views/Search.vue")
      }
    ]
  },
  {
    path: "/notpc",
    name: "notpc",
    component: () => import("@/views/NotPc.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
