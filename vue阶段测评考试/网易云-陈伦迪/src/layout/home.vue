<template>
  <div id="box">
    <header>
      <div class="container">
        <img src="../assets/image/logo.png" alt="" />
        <span @click="fn">发现音乐</span>
      </div>
    </header>
    <main>
      <div class="top"></div>
      <div class="bottom">
        <img src="../assets/image/banner.png" alt="" />
      </div>
    </main>
    <!-- 路由出口 -->
    <router-view />
    <footer></footer>
  </div>
</template>

<script>
export default {
  methods: {
    fn() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  width: 100%;
  height: 100%;
  header {
    background-color: #000;
    .container {
      display: flex;
      align-items: center;
      background-color: #000;
      height: 60px;
      img {
        height: 40px;
        margin-right: 50px;
      }
      span {
        display: inline-block;
        height: 100%;
        line-height: 60px;
        padding: 0 10px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        &:hover {
          color: skyblue;
          background-color: #242424;
        }
      }
    }
  }
  main {
    .top {
      height: 30px;
      // background-color: #c30c0e;
      background-image: linear-gradient(to right, #ec008c, #fc6767);
    }
    .bottom {
      background-image: linear-gradient(to right, #ed4264, #ffedbc);
      display: flex;
      justify-content: center;
      img {
        height: 290px;
        width: 720px;
      }
    }
  }
  footer {
    background-color: #242424;
    height: 40px;
  }
}
</style>
