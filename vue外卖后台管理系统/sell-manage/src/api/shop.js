//axios的第二层封装
import req from "../utils/request";

//26.获取店铺详情
export function getshopinfo(params) {
  return req.get("/shop/info", params);
}
//27.店铺图片上传接口
export function shopupload(params) {
  return req.post("/shop/upload", params);
}
//28.店铺内容修改
export function editshop(params) {
  return req.post("/shop/edit", params);
}
