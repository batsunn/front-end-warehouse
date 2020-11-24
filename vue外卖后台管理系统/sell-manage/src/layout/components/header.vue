<template>
  <div class="header">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: v.path }"
        v-for="v in arrbread"
        :key="v.path"
        >{{ v.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 个人中心 -->
    <div class="personal">
      <!-- 点击触发下拉菜单 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link"> 欢迎你，{{ userInfo.account }} </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/account/personal"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item command="/logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像 -->
      <el-avatar :src="userInfo.imgUrl"> </el-avatar>
    </div>
  </div>
</template>

<script>
//引入操作本地数据的方法
import $local from "../../utils/local";
import { getaccountinfo } from "../../api/users";
export default {
  data() {
    return {
      //存放面包屑的数组
      arrbread: [],
      userInfo: {},
    };
  },
  // 页面创建以后
  created() {
    //获取用户信息
    this.getUsers();
    this.calcbread();
  },
  methods: {
    //下拉菜单渲染
    handleCommand(command) {
      switch (command) {
        case "/logout":
          $local.clear();
          location.reload();
          break;
        case "/account/personal":
          this.$router.push("/account/personal");
          break;
      }
    },
    //计算面包屑导航
    calcbread() {
      const arr = [{ path: "/", name: "首页" }];
      //循环matched数组
      this.$route.matched.forEach((v) => {
        // 如果存在meta且meta里面有name
        if (v.meta && v.meta.name) {
          arr.push({
            path: v.path,
            name: v.meta.name,
          });
        }
      });
      this.arrbread = arr;
    },
    //获取用户信息
    async getUsers() {
      const { accountInfo } = await getaccountinfo();
      this.userInfo = accountInfo;
      //将用户信息存入本地
      $local.set("user", JSON.stringify(accountInfo));
    },
  },
  //观察地址栏是否发送变化
  watch: {
    "$route.path"() {
      //如果变化，重新计算面包屑
      this.calcbread();
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .personal {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-left: 10px;
    }
    span {
      cursor: pointer;
      letter-spacing: 1px;
      font-weight: 550;
      outline: 0;
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }
  }
}
</style>
