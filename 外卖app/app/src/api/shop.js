//axios的第二层封装
import req from "../utils/request";

//26.获取商家详情
export function getseller(params) {
  return req.get("/shop/seller", params);
}

//26.获取商品数据
export function getgoods(params) {
  return req.get("/goods/goods_list", params);
}

//26.获取评价
export function getcomments(params) {
  return req.get("/shop/ratings", params);
}
