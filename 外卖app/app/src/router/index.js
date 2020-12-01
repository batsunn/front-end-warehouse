import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../layout/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    redirect: "/goods",
    children: [
      {
        path: "/goods",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Goods.vue"),
      },
      {
        path: "/comments",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Comments.vue"),
      },
      {
        path: "/seller",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Seller.vue"),
      },
    ],
  },

  // component: () =>
  // import(/* webpackChunkName: "about" */ "../views/About.vue"),
];

const router = new VueRouter({
  routes,
});

export default router;
