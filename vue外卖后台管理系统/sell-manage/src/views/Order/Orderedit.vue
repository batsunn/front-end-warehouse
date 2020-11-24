<template>
  <Panel>
    <template #title>
      订单编辑
    </template>
    <template #content>
      <!-- 表单 -->
      <el-form
        ref="orderform"
        :model="orderform"
        label-width="80px"
        size="small"
        :rules="rules"
      >
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="orderform.orderNo" class="number"></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="consignee">
          <el-input v-model="orderform.consignee" class="number"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="date">
          <el-date-picker
            v-model="orderform.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="orderform.phone" class="number"></el-input>
        </el-form-item>
        <el-form-item label="送货地址" prop="deliverAddress">
          <el-input v-model="orderform.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="orderAmount">
          <el-input v-model="orderform.orderAmount" class="number"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select
            v-model="orderform.orderState"
            placeholder="请选择活动区域"
            prop="orderState"
          >
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" class="textarea">
          <el-input type="textarea" v-model="orderform.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('orderform')"
            >确认</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Panel>
</template>

<script>
import { getorderdetail, editorder } from "../../api/order";
//引入vue
import Vue from "vue";

export default {
  //渲染列表
  created() {
    this.getorderdetail();
  },
  data() {
    //非空验证
    var validatenull = (rule, value, callback) => {
      if (value === "" || value === null) {
        return callback(new Error("此处为必填项"));
      } else {
        callback();
      }
    };
    return {
      //表单数据对象
      orderform: {
        // orderNo: "",
        // consignee: "",
        // date: [],
        // phone: "",
        // deliverAddress: "",
        // orderAmount: "",
        // remarks: "",
        // orderState: "",
      },
      //表单规则对象
      rules: {
        orderNo: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
        consignee: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
        date: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
        phone: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
        deliverAddress: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
        orderAmount: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
        remarks: [{ validator: validatenull, trigger: "blur" }], //失焦事件触发
      },
    };
  },
  methods: {
    //查询订单详情
    async getorderdetail() {
      const { data } = await getorderdetail({
        id: this.$route.query.id,
      });
      //数据回填
      this.orderform = data;
      this.$set(this.orderform, "date", [data.orderTime, data.deliveryTime]);
      //   Vue.set(this.orderform, "date", [data.orderTime, data.deliveryTime]);
      //   this.orderform.orderNo = data.orderNo;
      //   this.orderform.consignee = data.consignee;
      //   this.orderform.phone = data.phone;
      //   this.orderform.deliverAddress = data.deliverAddress;
      //   this.orderform.orderAmount = data.orderAmount;
      //   this.orderform.remarks = data.orderNo;
      //   this.orderform.orderState = data.orderState;
      //   console.log(this.orderform);
    },
    //修改订单
    onSubmit(formName) {
      this.$refs[formName].validate(async (vaild) => {
        if (vaild) {
          const { code, msg } = await editorder({
            id: this.orderform.id,
            orderNo: this.orderform.orderNo,
            orderTime: this.orderform.date[0],
            phone: this.orderform.phone,
            consignee: this.orderform.consignee,
            deliverAddress: this.orderform.deliverAddress,
            deliveryTime: this.orderform.date[1],
            remarks: this.orderform.remarks,
            orderAmount: this.orderform.orderAmount,
            orderState: this.orderform.orderState,
          });
          if (code === 0) {
            this.$router.push("/order/list");
          }
        } else {
          return false;
        }
      });
    },
    //重置
    reset() {
      this.$refs.orderform.resetFields();
      this.getorderdetail();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 400px;
}
.textarea {
  width: 450px;
}
/deep/.number {
  width: 190px;
}
</style>
