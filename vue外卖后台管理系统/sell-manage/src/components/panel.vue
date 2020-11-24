<template>
  <el-card class="box-card">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0;
}
.box-card {
  width: 100%;
  .title {
    border-bottom: 1px solid #ccc;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .content {
    padding: 20px;
  }
}
</style>
