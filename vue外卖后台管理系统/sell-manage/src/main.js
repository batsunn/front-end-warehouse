import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //引入路由
import "./assets/css/reset.css"; //引入样式重制表
import ElementUI from "element-ui"; // 引入element-ui
import "element-ui/lib/theme-chalk/index.css"; // 引入element-ui样式
import "./assets/fonts/iconfont.css"; //引入字体图标样式
import "./assets/css/index.less"; //引入编译之后的样式
import "./utils/conmonents";
import "./utils/filters";

Vue.use(ElementUI); //注册element-ui
Vue.config.productionTip = false;

import CKEditor from "ckeditor4-vue";
Vue.use(CKEditor);

new Vue({
  router, //挂载路由
  render: (h) => h(App),
}).$mount("#app");
