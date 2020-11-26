import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui"; // 组件
import "../src/assets/css/reset.css"; //引入样式重置表
import "element-ui/lib/theme-chalk/index.css"; // element-ui样式
import "../src/assets/css/index.less";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
