<template>
  <div>
    <Panel>
      <!-- v-slot:的简写 -->
      <template #title>
        账号添加
      </template>
      <template #content>
        <!-- 规则对象和数据对象的绑定 -->
        <el-form
          :model="regitserForm"
          status-icon
          :rules="rules"
          ref="regitserForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="user">
            <el-input
              type="text"
              v-model="regitserForm.user"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              :type="flag ? 'text' : 'password'"
              v-model="regitserForm.pwd"
              autocomplete="off"
            >
              <template #suffix>
                <i
                  class="iconfont"
                  :class="flag ? 'icon-yanjing' : 'icon-yanjing-bi'"
                  @click="flag = !flag"
                ></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="role">
            <el-select placeholder="请选择" v-model="regitserForm.role">
              <el-option value="普通管理员">普通管理员 </el-option>
              <el-option value="超级管理员">超级管理员 </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('regitserForm')"
              >添加</el-button
            >
            <el-button @click="resetForm('regitserForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
//引入表单验证规则
import $validate from "../../utils/validate";
//引入ajxj请求方法
import { adduser, edituser } from "../../api/users";
export default {
  data() {
    //用户组的非空验证
    var validaterole = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择用户组"));
      } else {
        callback();
      }
    };
    return {
      //表单数据对象
      regitserForm: {
        user: "",
        pwd: "",
        role: "",
      },
      //表单规则对象
      rules: {
        user: [{ validator: $validate.validateUser, trigger: "blur" }], //失焦事件触发
        pwd: [{ validator: $validate.validatePwd, trigger: "blur" }],
        role: [{ validator: validaterole, trigger: "change" }], //改变数据事件触发
      },
      //小眼睛切换标杆
      flag: false,
    };
  },
  methods: {
    //确认添加用户
    submitForm(formName) {
      //触发表单验证
      this.$refs[formName].validate(async (valid) => {
        //如果表单验证规则通过
        if (valid) {
          //发送ajax请求添加账号
          const { code, msg } = await adduser({
            account: this.regitserForm.user,
            password: this.regitserForm.pwd,
            userGroup: this.regitserForm.role,
          });
          if (code === 0) {
            // this.$refs[formName].resetFields();清空表单数据
            this.$router.push("/account/list");
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  margin: 20px;
  width: 500px;
  /deep/.el-form-item__label {
    padding-right: 30px;
  }
  /deep/.el-input__suffix-inner {
    float: right;
  }
  .el-select {
    width: 400px;
  }
}
</style>
