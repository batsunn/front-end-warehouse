<template>
  <div class="home">
    <!-- 1.0 头部内容 -->
    <Header @open="show = true" />
    <!-- 2.0 主题内容 -->
    <Content />
    <!-- 3.0 底部内容 -->
    <Footer />
    <!-- 遮罩层 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <Shop @close="show = false" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
export default {
  components: {
    Header,
    Content,
    Footer,
    Shop,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
.wrapper {
  height: 100%;
}
.van-overlay {
  z-index: 5 !important;
}
</style>
