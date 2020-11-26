<template>
  <div class="box">
    <h1>请您搜索您想要的歌曲</h1>
    <p>
      <input
        type="text"
        placeholder="请输入音乐"
        @blur="fn"
        v-model="music"
        @keyup.enter="fn"
      />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      music: "",
    };
  },
  methods: {
    //歌曲搜索事件
    fn() {
      this.$router.push({
        path: "/musiclist",
        query: { music: this.music },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 255px;
  padding-top: 60px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  h1 {
    color: skyblue;
    font-size: 22px;
    letter-spacing: 2px;
    text-align: center;
  }
  p {
    margin-top: 20px;
    text-align: center;
    input {
      width: 250px;
      height: 25px;
      border: 0;
      padding: 5px;
      padding-left: 15px;
      outline: 0;
      color: blue;
      letter-spacing: 1px;
    }
  }
}
</style>
