//引入axios和qs
import axios from "axios";
import qs from "qs";

//设置baseurl
axios.defaults.baseURL = "http://127.0.0.1:5000";

//设置超时时间
axios.defaults.timeout = 6000;

// 2.3 响应拦截器
axios.interceptors.response.use((res) => {
  return res;
});

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
