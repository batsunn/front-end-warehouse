<template>
  <div class="error">
    <p>
      <span> {{ time }}</span>
      s后返回首页
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5,
      timer: "",
    };
  },
  //页面创建成功后
  created() {
    this.timer = setInterval(() => {
      if (this.time === 0) {
        this.$router.push("./");
      }
      this.time--;
    }, 1000);
  },
  //页面销毁以后，清楚定时器
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.error {
  height: 100%;
  background-image: url("../assets/imgs/404.png");
  background-size: 100% 100%;
  p {
    font-size: 36px;
    color: #fff;
    letter-spacing: 5px;
    position: absolute;
    margin-top: 530px;
    margin-left: 400px;
    letter-spacing: 15px;
    span {
      color: #f00;
      margin-right: -10px;
    }
  }
}
</style>
