<template>
  <div class="c-box">
    <!-- 导航 -->
    <van-row>
      <van-col span="8"><router-link to="/goods">商品</router-link></van-col>
      <van-col span="8"><router-link to="/comments">评价</router-link></van-col>
      <van-col span="8"><router-link to="/seller">商家</router-link></van-col>
    </van-row>
    <!-- 路由页面 -->
    <div class="tab">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.c-box {
  flex: 1;
  overflow: hidden;
  background-color: #f4f5f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-row {
    text-align: center;
    line-height: 50px;
    font-size: 17px;
    font-weight: 549;
    background-color: #fff;
    a {
      color: #000;
      text-decoration: none;
    }
    .router-link-active {
      color: #f20;
    }
  }
  .tab {
    height: 100%;
    overflow: hidden;
  }
}
</style>
