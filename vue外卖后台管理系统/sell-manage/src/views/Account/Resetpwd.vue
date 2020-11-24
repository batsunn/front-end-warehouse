<template>
  <div>
    <Panel>
      <template #title>
        修改密码
      </template>
      <template #content>
        <el-form
          :model="passForm"
          status-icon
          :rules="rules"
          ref="passForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpass">
            <el-input
              v-model.number="passForm.oldpass"
              :type="flag ? 'text' : 'password'"
              @blur="checkoldpass"
            >
              <!-- 输入框插入图标方式 -->
              <template #suffix>
                <i
                  class="iconfont"
                  :class="flag ? 'icon-yanjing' : 'icon-yanjing-bi'"
                  @click="flag = !flag"
                ></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input
              type="password"
              v-model="passForm.newpass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input
              type="password"
              v-model="passForm.checkpass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('passForm')"
              >确定</el-button
            >
            <el-button @click="resetForm('passForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
//引入表单验证规则
import $validate from "../../utils/validate";
//引入本地数据操作方法
import $local from "../../utils/local";
//引入ajax请求方法
import { checkoldpwd, editpwd } from "../../api/users";

export default {
  data() {
    return {
      //表单数据对象
      passForm: { oldpass: "", newpass: "", checkpass: "" },
      //表单规则对象
      rules: {
        oldpass: [
          {
            validator: $validate.validateoldPass(this, "passForm", "newpass"), //传入参数this,新密码，表单数据
            trigger: "blur",
          },
        ],
        newpass: [
          {
            validator: $validate.validatenewPass(
              this,
              "passForm",
              "oldpass",
              "checkpass"
            ), //传入参数this,表单数据，旧密码，确认密码
            trigger: "blur",
          },
        ],
        checkpass: [
          {
            validator: $validate.validatechessPass(this, "passForm", "newpass"), //传入参数this,表单数据，新密码
            trigger: "blur",
          },
        ],
      },
      //小眼睛切换标杆
      flag: false,
      //旧密码是是否输入正确标杆
      oldpassstatus: false,
    };
  },
  methods: {
    //重置密码触发表单验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //表单规则验证通过
        if (valid) {
          //旧密码输入正确验证通过
          if (this.oldpassstatus) {
            //发送修改密码请求
            const { code, msg } = await editpwd({
              newPwd: this.passForm.newpass,
            });
            if (code === 0) {
              $local.clear();
              setTimeout(() => {
                this.$router.push("/login");
              }, 2000);
            }
          } else {
            this.$message({
              message: "原密码错误",
              type: "error",
            });
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
    //旧密码是否正确验证
    async checkoldpass() {
      const { code, msg } = await checkoldpwd({
        oldPwd: this.passForm.oldpass,
      });
      if (code === "00") {
        this.oldpassstatus = true;
      }
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
  .el-input {
    i {
      float: right;
    }
  }
}
</style>
