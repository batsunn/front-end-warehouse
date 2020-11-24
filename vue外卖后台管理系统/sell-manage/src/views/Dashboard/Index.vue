<template>
  <div>
    <Card :cardlist="cardlist" />
    <Cardline @accept="accept" />
  </div>
</template>

<script>
import Card from "./component/Card";
import Cardline from "./component/Cardline";
import { totaldata } from "../../api/echarts";
export default {
  components: {
    Card,
    Cardline,
  },
  data() {
    return {
      cardlist: [
        {
          id: 1,
          name: "totalOrder",
          icon: "icon-dingdanguanli",
          color: "#1296db",
          text: "总订单",
          total: "102,400",
        },
        {
          id: 2,
          name: "totalAmount",
          icon: "icon-money",
          color: "#d4237a",
          text: "总销售额",
          total: "102,400",
        },
        {
          id: 3,
          name: "todayOrder",
          icon: "icon-dingdanshuju",
          color: "#1296db",
          text: "今日订单数",
          total: "102,400",
        },
        {
          id: 4,
          name: "totayAmount",
          icon: "icon-jinqian",
          color: "#1afa29",
          text: "今日销售额",
          total: "102,400",
        },
      ],
      option: {},
      myChart: {},
      // xdata: [],
      // amountData: [],
      // orderData: [],
    };
  },
  created() {
    this.totaldata();
  },
  methods: {
    //渲染卡片
    async totaldata() {
      const data = await totaldata();
      this.cardlist.forEach((v) => {
        v.total = data[v.name];
      });
      //将请求回来的数据复制到Option中，用于渲染echarts表
      this.option.xAxis.data = data.xData;
      this.option.series[0].data = data.orderData;
      this.option.series[1].data = data.amountData;
      // 使用刚指定的配置项和数据显示图表。
      //通过这个方法渲染页面
      this.myChart.setOption(this.option);
    },
    //接受子组件发来的信息,此函数为自定义事件，由子组件中传值直接触发
    accept(obj) {
      const { myChart, option } = obj;
      //储存传过来的数据，等待异步请求的数据回来再渲染echarts
      this.option = option;
      this.myChart = myChart;
    },
  },
};
</script>

<style lang="less" scoped></style>
