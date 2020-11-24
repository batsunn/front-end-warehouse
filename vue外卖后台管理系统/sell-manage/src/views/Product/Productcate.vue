<template>
  <Panel>
    <template v-slot:title>
      商品分类
      <el-button
        type="primary"
        size="small"
        style="margin-left:30px"
        @click="addcate"
        >添加分类</el-button
      >
    </template>
    <template v-slot:content>
      <!-- 列表 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          label="序号"
          width="200"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column label="分类名称" width="300">
          <template v-slot="{ row }">
            <el-input v-model="row.cateName" v-if="row.flag"></el-input>
            <p v-else>{{ row.cateName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="300">
          <template v-slot="{ row }">
            <el-switch
              :disabled="row.flag ? false : true"
              :active-value="1"
              :inactive-value="0"
              v-model="row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-row>
              <el-button
                :type="row.flag ? 'success' : 'plain'"
                size="small"
                @click="editcate(row)"
                >{{ row.flag ? "完成" : "编辑" }}</el-button
              >
              <el-button type="danger" size="small" @click="delcate(row)"
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
      <!-- 添加分类 -->
      <el-dialog
        title="编辑账号"
        :visible.sync="dialogFormVisible"
        width="450px"
        top="150px"
      >
        <!-- 用户名验证 -->
        <el-form
          :model="cateform"
          status-icon
          :rules="rules"
          ref="cateform"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="cateName" label-width="80px">
            <el-input
              type="text"
              v-model="cateform.cateName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" label-width="80px">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="cateform.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit('cateform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </template>
  </Panel>
</template>

<script>
import { catelist, addcate, delcate, editcate } from "../../api/pro";
import validate from "../../utils/validate";
export default {
  created() {
    //获取列表数据并渲染
    this.catelist();
  },
  data() {
    //自定义验证分类必填
    var validatecate = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("分类名称必填"));
      } else {
        callback();
      }
    };
    return {
      //渲染表格的数据
      tableData: [],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: 5,
      //总条数
      total: 0,
      //模态框是否开启
      dialogFormVisible: false,
      //模态框数据对象
      cateform: {
        cateName: "",
        state: 1,
      },
      //模态框规则对象
      rules: {
        cateName: [{ validator: validatecate, trigger: "blur" }], //失焦事件触发
      },
    };
  },
  methods: {
    //表格序号自增
    indexMethod(index) {
      return index + 1;
    },
    //改变每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      //重新渲染列表
      this.catelist();
    },
    //改变当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      //重新渲染列表
      this.catelist();
    },
    //请求列表数据
    async catelist() {
      const { total, data } = await catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      //如果当前页没有数据并且不是第一页
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.catelist();
      }
      this.total = total;
      //给每条数据增加一个标杆
      data.forEach((v) => {
        v.flag = false;
      });
      this.tableData = data;
    },
    //添加分类
    addcate() {
      this.dialogFormVisible = true;
    },
    //保存添加
    saveEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await addcate({
            cateName: this.cateform.cateName,
            state: Boolean(this.cateform.state),
          });
          if (code === 0) {
            //获取列表数据并渲染
            this.catelist();
            this.cateform.cateName = "";
            this.cateform.state = 1;
            this.dialogFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    //删除分类
    delcate(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //发送axios
          const { code, msg } = await delcate({
            id: row.id,
          });
          if (code === 0) {
            //获取列表数据并渲染
            this.catelist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    async editcate(row) {
      if (row.flag) {
        const { code, msg } = await editcate({
          id: row.id,
          state: Boolean(row.state),
          cateName: row.cateName,
        });
        if (code === 0) {
          this.catelist();
          row.flag = false;
        }
      } else {
        row.flag = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin: 20px 0;
}
.el-form {
  width: 380px;
}
</style>
