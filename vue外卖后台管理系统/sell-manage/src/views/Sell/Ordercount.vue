<template>
  <div>
    <!-- 查询表单 -->
    <el-form>
      <el-form-item>
        时间范围
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- echarts图表 -->
    <el-card>
      <!-- 第二步：echats盒子 -->
      <div id="main" ref="box" style="width:95%;height:430px;"></div>
    </el-card>
  </div>
</template>

<script>
// 第一步引入echarts
import Echarts from "echarts";
import moment from "moment";
import { ordertotal } from "../../api/echarts";
export default {
  data() {
    return {
      value1: "",
      date: [],
    };
  },
  created() {
    this.ordertotal();
  },
  methods: {
    render(obj) {
      // console.log(obj);
      // 基于准备好的dom，初始化echarts实例
      const myChart = Echarts.init(this.$refs.box);
      let data = {
        //x轴的数据
        xData: [],
        //y轴的数据
        yData: [],
      };

      obj.forEach((v) => {
        data.xData.push(v.orderTime);
      });
      obj.forEach((v) => {
        data.yData.push(v.orderAmount);
      });
      // 指定图表的配置项和数据
      const option = {
        //标题
        title: {
          text: "订单统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: [
          {
            top: 70,
            bottom: 30,
          },
          {
            height: 60,
            bottom: 30,
          },
        ],
        xAxis: [
          {
            // name: "订单时间", //横轴标bai题
            type: "category",
            data: data.xData,
            gridIndex: 0,
            axisLabel: {
              color: "#333",
            },
            axisLine: {
              lineStyle: {
                color: "#e7e7e7",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#e7e7e7",
              },
            },
            zlevel: 2,
          },
          {
            name: "订单时间", //横轴标bai题
            type: "category",
            gridIndex: 1,
            axisLine: {
              show: false,
            },
            zlevel: 1,
          },
        ],
        yAxis: [
          {
            name: "订单数量", //横轴标bai题
            type: "value",
            gridIndex: 0,
            axisLabel: {
              color: "#333",
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#000",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#ccc",
              },
            },
          },
          {
            type: "value",
            gridIndex: 1,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            data: data.yData,
            type: "bar",
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#555",
              },
            },
            itemStyle: {
              normal: {
                color: (params) => {
                  let colors = [
                    "#4150d8",
                    "#28bf7e",
                    "#ed7c2f",
                    "#f2a93b",
                    "#f9cf36",
                    "#4a5bdc",
                    "#4cd698",
                    "#f4914e",
                    "#fcb75b",
                    "#ffe180",
                    "#b6c2ff",
                    "#96edc1",
                    "#f9cf36",
                    "#4a5bdc",
                    "#4cd698",
                    "#f4914e",
                    "#fcb75b",
                    "#ffe180",
                    "#b6c2ff",
                    "#96edc1",
                    "#f9cf36",
                  ];
                  return colors[params.dataIndex];
                },
              },
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
          },
          {
            // data: [
            //   {
            //     name: "贵阳市",
            //     value: 1,
            //   },
            // ],
            label: {
              show: true,
              position: "inside",
              formatter: "{b}",
              offset: [0, 10],
              textStyle: {
                color: "#777",
              },
            },
            type: "bar",
            barGap: 0,
            barWidth: "27.2727%",
            itemStyle: {
              normal: {
                color: "rgba(134,176,237, .5)",
              },
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            // data: [
            //   {
            //     name: "六盘水市",
            //     value: 1,
            //   },
            // ],
            label: {
              show: true,
              position: "inside",
              formatter: "{b}",
              offset: [0, 10],
              textStyle: {
                color: "#777",
              },
            },
            type: "bar",
            barGap: 0,
            barWidth: "18.1818%",
            itemStyle: {
              normal: {
                color: "rgba(40,191,126, .5)",
              },
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            // data: [
            //   {
            //     name: "遵义市",
            //     value: 1,
            //   },
            // ],
            label: {
              show: true,
              position: "inside",
              formatter: "{b}",
              offset: [0, 10],
              textStyle: {
                color: "#777",
              },
            },
            type: "bar",
            barGap: 0,
            barWidth: "27.2727%",
            itemStyle: {
              normal: {
                color: "rgba(237,124,47, .5)",
              },
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            // data: [
            //   {
            //     name: "安顺市",
            //     value: 1,
            //   },
            // ],
            label: {
              show: true,
              position: "inside",
              formatter: "{b}",
              offset: [0, 10],
              textStyle: {
                color: "#777",
              },
            },
            type: "bar",
            barGap: 0,
            barWidth: "18.1818%",
            itemStyle: {
              normal: {
                color: "rgba(242,169,59, .5)",
              },
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            // data: [
            //   {
            //     name: "铜仁市",
            //     value: 1,
            //   },
            // ],
            label: {
              show: true,
              position: "inside",
              formatter: "{b}",
              offset: [0, 10],
              textStyle: {
                color: "#777",
              },
            },
            type: "bar",
            barCategoryGap: 0,
            barGap: 0,
            barWidth: "9.0909%",
            itemStyle: {
              normal: {
                color: "rgba(249,207,54, .5)",
              },
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
        ],
      };
      //通过这个方法渲染页面
      myChart.setOption(option);
    },
    //获取订单数据
    async ordertotal() {
      const { data } = await ordertotal({
        date: JSON.stringify(this.date),
      });
      // 格式化时间
      data.forEach((v) => {
        v.orderTime = moment(v.orderTime).format("HH:mm");
      });
      //调用生产echarts表格函数
      this.render(data);
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  .el-form-item {
    margin: 0 10px;
  }
}
.el-card {
  margin-top: 30px;
}
</style>
