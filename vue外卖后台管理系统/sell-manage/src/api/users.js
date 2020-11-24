//axios的第二层封装
import req from "../utils/request";

//1.登录
export function login(params) {
  return req.post("/users/checkLogin", params);
}

//2.添加账号
export function adduser(params) {
  return req.post("/users/add", params);
}

//3.获取账号列表
export function getuserlist(params) {
  return req.get("/users/list", params);
}

//4.删除账号
export function deluser(params) {
  return req.get("/users/del", params);
}

//5.批量删除账号
export function delusers(params) {
  return req.get("/users/batchdel", params);
}

//6.修改账号
export function edituser(params) {
  return req.post("/users/edit", params);
}

//7.检查旧密码是否正确
export function checkoldpwd(params) {
  return req.get("/users/checkoldpwd", params);
}

//修改密码
export function editpwd(params) {
  return req.post("/users/editpwd", params);
}

//获取账号（个人中心）信息
export function getaccountinfo(params) {
  return req.get("/users/info", params);
}

// //10.头像上传接口在html中做
// export function setavatar(params) {
//   return req.post("/users/avatar_upload", params);
// }

//11.修改用户头像
export function editavatar(params) {
  return req.get("/users/avataredit", params);
}
