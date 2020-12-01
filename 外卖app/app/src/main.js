import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//初始化css和index.less
import "./assets/css/reset.css";
import "./assets/css/index.less";
//引入字体图标样式
import "./assets/fonts/iconfont.css";
//引入vant
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
