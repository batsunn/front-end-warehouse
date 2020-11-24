<template>
  <Panel>
    <template v-slot:title>
      商品列表
    </template>
    <template v-slot:content>
      <!-- 商品列表 -->
      <el-table :data="tableData" style="width: 100%" size="mini">
        <!-- 下拉展示type="expand" -->
        <el-table-column type="expand" class="expand">
          <template v-slot="{ row }">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img :src="baseUrl + row.imgUrl" alt="" />
                </span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ row.ctime | formatDate }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ row.price }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" width="230px">
        </el-table-column>
        <el-table-column label="所属分类" prop="category" width="130px">
        </el-table-column>
        <el-table-column label="商品价格" prop="price" width="100px">
        </el-table-column>
        <el-table-column label="商品图片" width="130px">
          <!-- 拼接图片地址 -->
          <template v-slot="{ row }">
            <img :src="baseUrl + row.imgUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc" width="300px">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-row>
              <el-button
                type="primary"
                size="mini"
                @click="
                  $router.push({ path: '/product/edit', query: { id: row.id } })
                "
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="delpro(row.id)"
                >删除</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </template>
  </Panel>
</template>

<script>
import { getprolist, delpro } from "../../api/pro";
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
    };
  },
  created() {
    // 渲染商品列表
    this.getprolist();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getprolist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getprolist();
    },
    // 获取商品列表
    async getprolist() {
      const { data, total } = await getprolist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      // 当前页没有数据
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.getprolist();
      }
      this.tableData = data;
      this.total = total;
    },
    // 删除商品
    async delpro(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { msg, code } = await delpro({
            id,
          });
          if (code === 0) {
            this.getprolist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table {
  margin: 25px 0;
}
img {
  width: 50px;
  height: 50px;
}
</style>
