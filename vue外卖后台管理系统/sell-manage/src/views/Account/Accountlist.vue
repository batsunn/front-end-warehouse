<template>
  <div>
    <Panel>
      <template #title>
        账号列表
      </template>
      <template #content>
        <!-- 列表数据的绑定以及列表选择事件的绑定 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          size="small"
        >
          <el-table-column type="selection" width="60"> </el-table-column>
          <!-- prop为列表数据的属性 -->
          <el-table-column prop="account" label="账号" width="220">
          </el-table-column>
          <el-table-column prop="userGroup" label="用户组" width="220">
          </el-table-column>
          <el-table-column label="创建时间" width="220" prop="ctime">
            <template v-slot="{ row }">
              {{ row.ctime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <!-- 使用插槽方式拿到每一行的id -->
            <template v-slot="{ row }">
              <el-button
                size="small"
                native-type="button"
                @click="handleEdit(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                native-type="button"
                @click="deluser(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码改变和每页条数改变的事件绑定 -->
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
        <!-- 批量删除和取消选择按钮 -->
        <el-row>
          <el-button
            type="primary"
            @click="delusers"
            :disabled="tableData.length === 0"
            >批量删除</el-button
          >
          <el-button
            type="danger"
            @click="toggleSelection()"
            :disabled="tableData.length === 0"
            >取消选择</el-button
          >
        </el-row>
        <!-- 模态框 -->
        <el-dialog
          title="编辑账号"
          :visible.sync="dialogFormVisible"
          width="450px"
          top="150px"
        >
          <!-- 用户名验证 -->
          <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="account" label-width="80px">
              <el-input
                type="text"
                v-model="form.account"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户组" label-width="80px">
              <el-select v-model="form.userGroup" placeholder="请选择">
                <el-option value="超级管理员"></el-option>
                <el-option value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit('form')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </template>
    </Panel>
  </div>
</template>

<script>
//引入moment
import moment from "moment";
import $validate from "../../utils/validate";
import $local from "../../utils/local";
//引入ajax请求方法
import { getuserlist, deluser, delusers, edituser } from "../../api/users";
export default {
  //页面创建完成后
  created() {
    //渲染表格数据
    this.getlist();
  },
  data() {
    return {
      //表格数据列表
      tableData: [],
      //选中的数据存放的数组
      multipleSelection: [],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: 5,
      //总条数
      total: 0,
      //用户选中的数据的id存放
      ids: [],
      //模态框显示隐藏
      dialogFormVisible: false,
      //模态框回填数据
      form: {
        account: "",
        userGroup: "",
      },
      //表单规则对象
      rules: {
        account: [{ validator: $validate.validateUser, trigger: "blur" }], //失焦事件触发
      },
    };
  },
  methods: {
    //用户选择数据触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.ids = this.multipleSelection.map((v) => {
        return v.id;
      });
    },
    //改变每页显示条数触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist();
    },
    //改变当前页触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    //取消选择触发
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //渲染列表
    async getlist() {
      const { data, total } = await getuserlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      //判断该页的数据是否存在
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.getlist();
      }
      this.tableData = data;
      this.total = total;
    },
    //删除该条数据
    deluser(id) {
      //不能删除用户本身
      const myid = JSON.parse($local.get("user")).id;
      if (myid === id) {
        this.$message({
          type: "error",
          message: "不能删除自己",
        });
        return;
      }
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { msg, code } = await deluser({
            id,
          });
          if (code === 0) {
            this.getlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //批量删除用户数据
    delusers() {
      const myid = JSON.parse($local.get("user")).id;
      //判断是否选择了数据
      if (this.ids.length === 0) {
        this.$message({
          type: "error",
          message: "当前没有选中数据",
        });
        return;
      } else if (this.ids.includes(myid)) {
        this.$message({
          type: "error",
          message: "不能删除自己",
        });
        return;
      }
      this.$confirm("此操作将这些账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { code, msg } = await delusers({
            ids: JSON.stringify(this.ids),
          });
          if (code === 0) {
            this.getlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑事件
    handleEdit(row) {
      //显示模态框
      this.dialogFormVisible = true;
      //模态框回填
      this.form = { ...row };
    },
    //保存编辑内容
    saveEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        //如果表单验证规则通过
        if (valid) {
          const { code, msg } = await edituser({
            id: this.form.id,
            account: this.form.account,
            userGroup: this.form.userGroup,
          });
          if (code === 0) {
            this.getlist();
            this.dialogFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table {
  letter-spacing: 1px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-row {
  margin-top: 20px;
  margin-left: 30px;
}
.el-form {
  width: 380px;
  .el-select {
    width: 300px;
  }
}
</style>
