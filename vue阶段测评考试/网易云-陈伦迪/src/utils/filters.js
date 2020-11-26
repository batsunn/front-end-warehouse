/*
  注册了全局过滤器
*/

import Vue from "vue";

import moment from "moment";

Vue.filter("formatDate", (val) => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
});
