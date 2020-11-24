//axios的第二层封装
import req from "../utils/request";

//29.首页报表接口
export function totaldata(params) {
  return req.get("/order/totaldata", params);
}
//30.订单报表接口
export function ordertotal(params) {
  return req.get("/order/ordertotal", params);
}
