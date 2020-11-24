<template>
  <div class="loginbox">
    <div class="box">
      <h2>系统登录</h2>
      <!-- 绑定数据对象:model和规则对象:rules,ref用来操作dom -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="demo-loginForm"
      >
        <!--prop绑定规则对象  -->
        <el-form-item prop="user">
          <el-input
            v-model.number="loginForm.user"
            prefix-icon="iconfont icon-zhanghu"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <!-- 键盘登录事件的绑定native -->
          <el-input
            :type="flag ? 'text' : 'password'"
            v-model="loginForm.pwd"
            autocomplete="off"
            prefix-icon="iconfont icon-mima"
            @keyup.native.enter="isenter ? submitForm('loginForm') : ''"
          >
            <!-- v-slot:简写成# -->
            <template #suffix>
              <i
                class="iconfont"
                :class="flag ? 'icon-yanjing' : 'icon-yanjing-bi'"
                @click="flag = !flag"
              ></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            :loading="isclick"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//引入表单验证规则
import $validate from "../utils/validate";
//引入登录ajax请求方法
import { login } from "../api/users";
//引入本地数据操作方法
import $local from "../utils/local";

import { createrouter } from "../router/index";

export default {
  data() {
    return {
      //小眼睛切换标杆
      flag: false,
      //表单数据对象
      loginForm: {
        user: "",
        pwd: "",
      },
      //表单规则对象
      rules: {
        //validator校验器，trigger为事件触发
        user: [{ validator: $validate.validateUser, trigger: "blur" }],
        pwd: [{ validator: $validate.validatePwd, trigger: "blur" }],
      },
      //鼠标是否点击郭登录标杆
      isclick: false,
      //键盘是否enter标杆
      isenter: true,
    };
  },
  methods: {
    //表单登录规则验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await login({
            account: this.loginForm.user,
            password: this.loginForm.pwd,
          });
          if (data.code === 0) {
            //登录成功,不能再点击登录按钮
            this.isclick = true;
            //不能再进行回车操作
            this.isenter = false;
            //将用户的token存入本地
            $local.set("token", data.token);
            //把用户的角色存入本地
            $local.set("role", data.role);
            //调用生产新路由的函数，判断用户角色，筛选权限
            createrouter();
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginbox {
  height: 100%;
  background-image: url("../assets/imgs/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    text-align: center;
    color: #fff;
    font-size: 20px;
    margin-bottom: 30px;
    letter-spacing: 10px;
  }
  .box {
    width: 350px;
    .el-button {
      width: 100%;
      letter-spacing: 5px;
    }
    /deep/.el-input__suffix-inner {
      float: right;
    }
  }
}
</style>
