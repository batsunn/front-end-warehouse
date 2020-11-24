<template>
  <div>
    <el-card>
      <!-- 查询 -->
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
        ref="formInline"
      >
        <el-form-item label="订单号" prop="orderNo">
          <el-input
            v-model="formInline.orderNo"
            placeholder="订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="consignee">
          <el-input
            v-model="formInline.consignee"
            placeholder="收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="orderState">
          <el-select v-model="formInline.orderState" placeholder="订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间" prop="date">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="plain" @click="resetSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格:请求数据回来后渲染的 -->
      <el-table :data="tableData" border style="width: 100%" size="small">
        <el-table-column fixed prop="orderNo" label="订单号" width="80">
        </el-table-column>
        <el-table-column label="下单时间" width="180">
          <template v-slot="{ row }">
            {{ row.orderTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="140">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="110">
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300">
        </el-table-column>
        <el-table-column label="送达时间" width="180">
          <template v-slot="{ row }">
            {{ row.deliveryTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="150">
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="110">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="{ row }">
            <el-button @click="handleClick(row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="orderedit(row)"
              >编辑</el-button
            >
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
      <!-- 查看订单信息 -->
      <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%">
        <el-steps :space="200" :active="flag" finish-status="success">
          <el-step title="已受理"></el-step>
          <el-step title="派送中"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >关闭</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getorderlist } from "../../api/order";
import $local from "../../utils/local";
export default {
  data() {
    return {
      //绑定表格的数据
      tableData: [],
      //分页
      currentPage: 1,
      pageSize: 5,
      total: 0,
      //绑定表单的数据,也是发送axios的数据
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: "",
      },
      //查看框是否可见
      dialogVisible: false,
      //配送进度
      flag: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getorderlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderlist();
    },
    //获取订单列表
    async getorderlist() {
      const { data, total } = await getorderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formInline.orderNo,
        consignee: this.formInline.consignee,
        phone: this.formInline.phone,
        orderState: this.formInline.orderState,
        //发送请求时日期如果存在就用字符串格式
        date: JSON.stringify(this.formInline.date),
      });
      this.total = total;
      this.tableData = data;
    },
    //查询
    onSubmit() {
      //从数据库的第一页开始查看
      this.currentPage = 1;
      this.getorderlist();
    },
    //重置
    resetSubmit() {
      this.$refs.formInline.resetFields();
      this.getorderlist();
    },
    //点击查看信息
    handleClick(row) {
      switch (row.orderState) {
        case "已受理":
          this.flag = 1;
          break;
        case "派送中":
          this.flag = 2;
          break;
        case "已完成":
          this.flag = 3;
          break;
      }
      this.dialogVisible = true;
    },
    //编辑订单
    orderedit(row) {
      //查看是否有访问权限
      const role = $local.get("role");
      if (role === "normal") {
        this.$message({
          type: "error",
          message: "你没有权限访问",
        });
        return;
      }
      this.$router.push({ path: "/order/edit", query: { id: row.id } });
    },
  },
  created() {
    this.getorderlist();
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 20px;
}
/deep/.el-dialog__body {
  margin-left: 50px;
  margin-top: 5px;
}
</style>
