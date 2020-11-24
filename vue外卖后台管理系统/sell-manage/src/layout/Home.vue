<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="head-title" @click="isCollapse = !isCollapse">
        <div class="logo"><i class="iconfont icon-ziyuan"></i></div>
        <p v-show="!isCollapse">外卖商家中心</p>
      </div>
      <!-- 左侧导航,引入子组件 -->
      <Nav :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <!-- 右侧头部 -->
      <el-header>
        <Header />
      </el-header>
      <!-- 右侧主要内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Nav from "./components/nav";
import Header from "./components/header";
export default {
  components: {
    Nav,
    Header,
  },
  data() {
    return {
      //是否收起导航标杆
      isCollapse: false,
    };
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .head-title {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    cursor: pointer;
    .logo {
      background-color: #00f;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      text-align: center;
      line-height: 35px;
      margin-right: 5px;
      i {
        font-size: 20px;
        color: #fff;
      }
    }
    p {
      color: #fff;
      font-size: 18px;
      line-height: 35px;
    }
  }

  .el-aside {
    background-color: #304156;
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
