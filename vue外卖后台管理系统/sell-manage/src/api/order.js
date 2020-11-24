//axios的第二层封装
import req from "../utils/request";

//22.获取订单列表
export function getorderlist(params) {
  return req.get("/order/list", params);
}

//24.获取订单详情
export function getorderdetail(params) {
  return req.get("/order/detail", params);
}
//25.修改订单
export function editorder(params) {
  return req.post("/order/edit", params);
}
