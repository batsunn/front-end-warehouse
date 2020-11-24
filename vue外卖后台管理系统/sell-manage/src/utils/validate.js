/*
  自定义校验用户名和密码
  created by 陈伦迪
*/

//注册验证用户名
const exg = /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4E00-\u9FA5]{2,7}$/;
var validateUser = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!exg.test(value)) {
    callback(new Error("用户名包含3~8位由字母、数字、下划线组成"));
  } else {
    callback();
  }
};

//注册验证验证密码
const reg = /^[a-zA-Z\d_]{3,12}$/;
var validatePwd = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!reg.test(value)) {
    callback(new Error("密码包含3~12位由字母、数字组成"));
  } else {
    callback();
  }
};

//修改验证原密码非空以及，原密码与新密码啊不相同
// function validateoldPass(o) {
//   return function(rule, value, callback) {
//     if (value === "") {
//       callback(new Error("请输入原密码"));
//     } else {
//       if (o.passForm.newpass !== "") {
//         o.$refs.passForm.validateField("newpass");
//       }
//       callback();
//     }
//   };
// }
//封装
function validateoldPass(o, formName, n) {
  return function(rule, value, callback) {
    if (value === "") {
      callback(new Error("请输入原密码"));
    } else {
      if (o[formName][n] !== "") {
        o.$refs[formName].validateField(n);
      }
      callback();
    }
  };
}
//每走一步必须callback
//验证新密码非空，新密码正则，以及新密码与原密码不同，新密码与确认新密码相同
const reg1 = /^[a-zA-Z\d_]{3,12}$/;
// function validatenewPass(o) {
//   return function(rule, value, callback) {
//     if (value === "") {
//       callback(new Error("请输入密码"));
//     } else if (!reg1.test(value)) {
//       callback(new Error("密码包含6~12位由字母、数字组成"));
//     } else if (value == o.passForm.oldpass) {
//       callback(new Error("新密码和原密码不能相同"));
//     } else {
//       if (o.passForm.checkpass !== "") {
//         o.$refs.passForm.validateField("checkpass");
//       }
//       callback();
//     }
//   };
// }
//封装
function validatenewPass(o, formName, old, check) {
  return function(rule, value, callback) {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else if (!reg1.test(value)) {
      callback(new Error("密码包含3~12位由字母、数字组成"));
    } else if (value == o[formName][old]) {
      callback(new Error("新密码和原密码不能相同"));
    } else {
      if (o[formName][check] !== "") {
        o.$refs[formName].validateField(check);
      }
      callback();
    }
  };
}
//验证确认密码非空，确认密码与新密码相同
// function validatechessPass(o) {
//   return function(rule, value, callback) {
//     if (value === "") {
//       callback(new Error("请再次输入密码"));
//     } else if (value !== o.passForm.newpass) {
//       callback(new Error("两次输入密码不一致!"));
//     } else {
//       callback();
//     }
//   };
// }
function validatechessPass(o, formName, n) {
  return function(rule, value, callback) {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== o[formName][n]) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
}
//验证确认密码

//导出校验方法
export default {
  validatePwd,
  validateUser,
  validateoldPass,
  validatenewPass,
  validatechessPass,
};
