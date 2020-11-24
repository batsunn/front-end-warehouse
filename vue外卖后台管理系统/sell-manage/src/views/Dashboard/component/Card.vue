<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="v in cardlist" :key="v.id">
      <div class="grid-content bg-purple">
        <!-- 动态绑定style可以为一个对象数据 -->
        <i class="iconfont" :class="v.icon" :style="{ color: v.color }"></i>
        <div>
          <p>{{ v.text }}</p>
          <h3>{{ v.total }}</h3>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  //接受父组件传入列表
  props: {
    cardlist: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.bg-purple {
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  i {
    font-size: 60px;
  }
  p {
    color: #ccc;
    font-size: 17px;
    text-align: center;
    margin-bottom: 5px;
  }
  h3 {
    font-weight: bold;
    font-size: 18px;
  }
}

.grid-content {
  border-radius: 4px;
}
</style>
