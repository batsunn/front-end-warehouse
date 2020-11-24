//axios的第二层封装
import req from "../utils/request";

//12.添加分类
export function addcate(params) {
  return req.post("/goods/addcate", params);
}
//13.获取分类
export function catelist(params) {
  return req.get("/goods/catelist", params);
}
//14.删除分类
export function delcate(params) {
  return req.get("/goods/delcate", params);
}

//15.修改分类
export function editcate(params) {
  return req.post("/goods/editcate", params);
}
//16.查询所有分类名称
export function getcatename(params) {
  return req.get("/goods/categories", params);
}
//17.商品图片上传接口
export function imgupload(params) {
  return req.post("/goods/goods_img_upload", params);
}
//18.添加商品
export function addpro(params) {
  return req.post("/goods/add", params);
}
//19.获取商品列表
export function getprolist(params) {
  return req.get("/goods/list", params);
}
//20.删除商品
export function delpro(params) {
  return req.get("/goods/del", params);
}
//21.修改商品
export function editpro(params) {
  return req.post("/goods/edit", params);
}

//22.获取商品信息
export function getproitem(params) {
  return req.get("/goods/item", params);
}
