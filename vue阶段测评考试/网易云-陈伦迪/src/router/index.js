import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../layout/home.vue";

Vue.use(VueRouter);
//在router.js中设置
//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/search",
    //计算面包屑
    meta: { name: "首页" },
    children: [
      {
        path: "/search",
        name: "Search",
        component: () =>
          import(/* webpackChunkName: "seach" */ "../views/search.vue"),
      },
      {
        path: "/musiclist",
        name: "Musiclist",
        component: () =>
          import(/* webpackChunkName: "seach" */ "../views/musiclist.vue"),
      },
      {
        path: "/musicdetails",
        name: "Musicdetails",
        component: () =>
          import(/* webpackChunkName: "seach" */ "../views/musicdetails.vue"),
      },
    ],
  },
  // 懒加载
  // component: () =>
  //     import(/* webpackChunkName: "seach" */ './Router/Search.vue')
];

const router = new VueRouter({
  routes,
});

export default router;
