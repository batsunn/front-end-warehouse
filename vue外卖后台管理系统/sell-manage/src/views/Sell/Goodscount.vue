<template>
  <el-card>
    <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
};
</script>

<style lang="less" scoped>
.el-card {
  height: 380px;
  margin-top: 30px;
}
</style>
