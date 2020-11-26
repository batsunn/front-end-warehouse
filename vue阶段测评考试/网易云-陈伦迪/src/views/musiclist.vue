<template>
  <div class="container">
    <h1>搜索的歌曲</h1>
    <!-- 列表 -->
    <el-table :data="tableData" stripe @row-click="handdle">
      <el-table-column
        type="index"
        :index="indexMethod"
        width="200"
        label="序号"
      >
      </el-table-column>
      <el-table-column label="歌曲名" width="500">
        <template v-slot="{ row }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template v-slot="{ row }">
          {{ row.artists[0].name }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </div>
</template>

<script>
import { searchmusic } from "../api/music";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.searchmusic();
  },
  methods: {
    //每一行索引加一
    indexMethod(index) {
      return (index + 1) * 1;
    },
    //点击表格每一行事件
    handdle(row) {
      this.$router.push({
        path: "/musicdetails",
        query: { id: row.id },
      });
    },
    // 查询歌曲列表
    async searchmusic() {
      const { code, result } = await searchmusic({
        keywords: this.$route.query.music,
      });
      if (code === 200) {
        this.tableData = result.songs;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  h1 {
    font-size: 16px;
    margin: 10px 0;
  }
}
</style>
