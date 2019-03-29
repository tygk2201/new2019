<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <div class="chart-box">
      <div id="mycharts" class="echart-item"></div>
      <div id="second" class="echart-item"></div>
      <div id="third" class="echart-item"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mycharts"));
      let mysecond = this.$echarts.init(document.getElementById("second"));
      let mythird = this.$echarts.init(document.getElementById("third"));
      // 绘制图表
      myChart.setOption({
        title: { text: "柱图" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });

      mysecond.setOption({
        title: {
          text: "预算 vs 开销",
          subtext: "二级小标题"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        },
        polar: [
          {
            indicator: [
              { text: "销售", max: 6000 },
              { text: "管理", max: 6000 },
              { text: "信息技术", max: 6000 },
              { text: "客服", max: 6000 },
              { text: "研发", max: 6000 },
              { text: "市场", max: 6000 }
            ]
          }
        ],
        calculable: true,
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: [4300, 1000, 2800, 3500, 5000, 1900],
                name: "预算分配（Allocated Budget）"
              },
              {
                value: [5000, 1400, 2800, 3100, 4200, 2100],
                name: "实际开销（Actual Spending）"
              }
            ]
          }
        ]
      });

      mythird.setOption({
        title: {
          text: "南丁格尔玫瑰图",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8"
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["50%", '50%'],
            roseType: "area",
            x: "50%", // for funnel
            max: 40, // for funnel
            sort: "ascending", // for funnel
            data: [
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 35, name: "rose6" },
              { value: 30, name: "rose7" },
              { value: 40, name: "rose8" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.echart-item {
  width: 450px;
  height: 450px;
  margin-right: 20px
}
.echart-item:nth-child(2){
  width: 550px;
  height: 550px;
}
.chart-box {
  width: 100%;
  display: flex;
}
</style>
