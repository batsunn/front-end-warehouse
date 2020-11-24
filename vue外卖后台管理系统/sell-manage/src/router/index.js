import Vue from "vue";
//引入路由
import VueRouter from "vue-router";
//引入home
import Home from "../layout/Home.vue";
//引入操作本地数据的方法
import $local from "../utils/local";
import lodash from "lodash";
Vue.use(VueRouter); //注册

//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

//直接展示的路由
const routes = [
  //配置路由
  {
    path: "/",
    //重定向
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        //面包屑导航配置
        meta: { path: "/dashboard", text: "" },
        //懒加载
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../views/Dashboard/Index.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    //懒加载
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/404",
    name: 404,
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue"),
  },
  // component: () =>
  //    import(/* webpackChunkName: "login" */ "../views/login.vue"),
];
//要先挂载
const router = new VueRouter({
  routes, //挂载到vue实例对象上
});
//需要动态加载的路由
//把要筛选的异步路由提取出来,给,meta添加role属性
const syncrouter = {
  path: "/home",
  name: "Home",
  component: Home,
  redirect: "/dashboard",
  children: [
    {
      path: "/dashboard",
      name: "Dashboard",
      visible: true,
      //面包屑导航配置
      meta: { path: "/dashboard", name: "首页", icon: "icon-shouye" },
      //懒加载
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Dashboard/Index.vue"),
    },
    {
      path: "/order",
      name: "Order",
      visible: true,
      meta: {
        name: "订单管理",
        role: ["super", "normal"],
        icon: "icon-dingdanguanli",
      },
      redirect: "/order/list",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Order/Index.vue"),
      children: [
        {
          path: "/order/list",
          name: "Orderlist",
          visible: true,
          meta: { name: "订单列表" },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Order/Orderlist.vue"
            ),
        },
        {
          path: "/order/edit",
          name: "Orderedit",
          meta: { name: "订单编辑", role: ["super"] },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Order/Orderedit.vue"
            ),
        },
      ],
    },
    {
      path: "/product",
      name: "Product",
      meta: { name: "商品管理", icon: "icon-shangpinguanli" },
      visible: true,
      redirect: "/product/list",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Product/Index.vue"),
      children: [
        {
          path: "/product/add",
          name: "Productadd",
          meta: { name: "商品添加" },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Product/Productadd.vue"
            ),
        },
        {
          path: "/product/list",
          name: "Productlist",
          meta: { name: "商品列表" },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Product/Productlist.vue"
            ),
        },
        {
          path: "/product/cate",
          name: "Productcate",
          meta: { name: "商品分类" },
          visible: true,
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Product/Productcate.vue"
            ),
        },
        {
          path: "/product/edit",
          name: "Productedit",
          meta: { name: "商品编辑" },
          visible: false,
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Product/Proedit.vue"
            ),
        },
      ],
    },
    {
      path: "/shop",
      name: "Shop",
      meta: { name: "店铺管理", role: ["super"], icon: "icon-dianpuguanli" },
      visible: true,
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Shop/Index.vue"),
    },
    {
      path: "/account",
      name: "Account",
      visible: true,
      redirect: "/account/resetpwd",
      meta: {
        name: "账号管理",
        role: ["super", "normal"],
        icon: "icon-zhanghaoguanli",
      },
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Account/Index.vue"),
      children: [
        {
          path: "/account/add",
          name: "Accountadd",
          visible: true,
          meta: { name: "添加账号", role: ["super"] },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Account/Accountadd.vue"
            ),
        },
        {
          path: "/account/list",
          name: "Accountlist",
          visible: true,
          meta: { name: "账号列表", role: ["super"] },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Account/Accountlist.vue"
            ),
        },
        {
          path: "/account/resetpwd",
          name: "Resetpwd",
          visible: true,
          meta: { name: "修改密码" },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Account/Resetpwd.vue"
            ),
        },
        {
          path: "/account/personal",
          name: "personal",
          visible: false,
          meta: { name: "个人中心" },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Account/personal.vue"
            ),
        },
      ],
    },
    {
      path: "/sell",
      name: "Sell",
      visible: true,
      meta: { name: "销售统计", role: ["super"], icon: "icon-tongji" },
      redirect: "/sell/goods",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Sell/Index.vue"),
      children: [
        {
          path: "/sell/goods",
          name: "Goodscount",
          visible: true,
          meta: { name: "商品统计" },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Sell/Goodscount.vue"
            ),
        },
        {
          path: "/sell/order",
          name: "Ordercount",
          visible: true,
          meta: { name: "订单统计" },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/Sell/Ordercount.vue"
            ),
        },
      ],
    },
  ],
};

//路由守卫
router.beforeEach((to, from, next) => {
  //判断是否是存在token，是否是登陆状态
  const token = $local.get("token");
  if (token) {
    next();
  } else if (to.path === "/login") {
    next();
  } else {
    next("/login");
  }
});

//登录之后刷新保留路由
createrouter();

//声明新路由的函数
export function createrouter() {
  //取出登陆角色
  let role = $local.get("role");
  //还没取到role，不计算
  if (!role) return false;
  //对路由进行计算,得到新路由
  let finalarr = calctouter(syncrouter.children, role);
  //把计算出来的数组，赋值给syncrouter.children
  syncrouter.children = lodash.cloneDeep(finalarr);

  // console.log(finalarr);
  //计算要显示菜单
  let finalmenu = calcmenu(finalarr);
  //将计算好的菜单存入本地.
  $local.set("menu", JSON.stringify(finalmenu));
  //将新的路由添加上去，必须是数组
  router.addRoutes([syncrouter]);
}

//声明一个过滤菜单的函数
function calcmenu(arr) {
  return arr.filter((v) => {
    if (v.visible) {
      if (v.children && v.children.length > 0) {
        v.children = calcmenu(v.children);
      }
      return true;
    } else {
      return false;
    }
  });
}

//筛选路由的函数
function calctouter(arr, role) {
  //返回过滤后的新路由数组
  return arr.filter((v) => {
    //true,有权限，一级路由保留
    if (haspermission(v, role)) {
      //如果存在二级路由,对二级路由进行递归鉴权
      if (v.children && v.children.length > 0) {
        //对二级路由进行计算，筛选有权限的路由并且保留
        v.children = calctouter(v.children, role);
      }
      return true;
    } else {
      //否则过滤掉，不能看
      return false;
    }
  });
}

//声明一个鉴权的函数
function haspermission(o, r) {
  //如果一级路由存在争议,进行判断
  if (o.meta && o.meta.role) {
    //判断是否含有当前登陆角色的权限，只判断一级路由
    return o.meta.role.includes(r);
  } else {
    //没有meta和meta中的role,都可以看
    return true;
  }
}

export default router; //暴露
