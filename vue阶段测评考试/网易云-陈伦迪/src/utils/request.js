//引入axios和qs
import axios from "axios";
import qs from "qs";
// import $local from "../utils/local";
// import { Message } from "element-ui";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

//设置baseurl
axios.defaults.baseURL = "http://172.16.4.254:3000";

//设置超时时间
axios.defaults.timeout = 6000;

// 2.2 请求拦截器
// axios.interceptors.request.use((config) => {
//   NProgress.start();
//   // 所有发的请求，都会先执行这个函数
//   // 那如果是登录之后的操作，一定要把token带到headers中
//   const token = $local.get("token");
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// });

// 2.3 响应拦截器
// axios.interceptors.response.use((res) => {
//   const { msg, code } = res.data;
//   if (code != undefined && msg != undefined) {
//     if (code === 0 || code === "00") {
//       Message({
//         type: "success",
//         message: msg,
//       });
//     } else {
//       Message({
//         type: "error",
//         message: msg,
//       });
//     }
//   }
//   NProgress.done();
//   return res;
// });

//导出post和get方法
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        //将数据处理为form-data格式
        .post(url, qs.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};
