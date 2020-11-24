<template>
  <div>
    <el-card>
      <!-- 第二步：echats盒子 -->
      <div id="main" ref="box" style="width:95%;height:350px;"></div>
    </el-card>
  </div>
</template>

<script>
// 第一步引入eachrts
import Echarts from "echarts";
export default {
  //等页面挂在成功后调用
  mounted() {
    this.render();
  },
  methods: {
    render() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = Echarts.init(this.$refs.box);
      // 指定图表的配置项和数据
      const option = {
        //标题
        title: {
          text: "数据统计",
        },
        //鼠标指上去的提示
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单数据", "销量数据"],
        },
        //布局
        grid: {
          left: "8%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        //工具盒子
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        //x轴
        xAxis: {
          type: "category",
          boundaryGap: false, //坐标轴两边留白
          data: [],
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            // margin: 15,
            textStyle: {
              color: "#1B253A",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12,
            },
            formatter: function(params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 10; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
            // rotate: 50,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLine: {
            show: true,
            //坐标轴轴线相关设置
            lineStyle: {
              color: "#E5E9ED",
              // opacity:0.2
            },
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: "#E5E9ED",
              // 	opacity:0.1
            },
          },
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#E5E9ED",
                // 	opacity:0.1
              },
            },
          },
        ],
        series: [
          {
            name: "订单数据",
            type: "line",
            itemStyle: {
              normal: {
                color: "#3A84FF",
                lineStyle: {
                  color: "#3A84FF",
                  width: 1,
                },
                areaStyle: {
                  color: new Echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(58,132,255,0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(58,132,255,0.35)",
                    },
                  ]),
                },
              },
            },
            data: [],
          },
          {
            name: "销量数据",
            type: "line",
            itemStyle: {
              normal: {
                color: "rgba(255,80,124,1)",
                lineStyle: {
                  color: "rgba(255,80,124,1)",
                  width: 1,
                },
                areaStyle: {
                  color: new Echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(255,80,124,0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,80,124,0.35)",
                    },
                  ]),
                },
              },
            },
            data: [],
          },
        ],
      };
      //将赋值的两个数据传给父组件
      this.$emit("accept", { myChart, option });
      // 使用刚指定的配置项和数据显示图表。
      //通过这个方法渲染页面
      // myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 40px;
}
</style>
