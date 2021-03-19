<template>
    <div class="turnover-container">
        <div class="turnover-chart" ref="turnover_ref"></div>
    </div>
</template>

<script>
import { getTurnover } from '@/api/analyse'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null // 服务器返回的数据
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    // 初始化echartsInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.turnover_ref)
    },
    // 获取服务器数据
    getData () {
      getTurnover().then((res) => {
        this.allData = res.data.data
        this.updateChart()
      })
    },
    // 更新图表
    updateChart () {
      const month = this.allData.map((item) => {
        return item.month
      })
      const turnover = this.allData.map((item) => {
        return item.turnover
      })
      const option = {
        title: {
          text: '近半年每个月销售额'
        },
        color: ['#304156'],
        xAxis: {
          type: 'category',
          name: '月份',
          data: month
        },
        yAxis: {
          type: 'value',
          name: '营业额'
        },
        series: [
          {
            type: 'bar',
            data: turnover,
            barWidth: 30,
            label: {
              show: true,
              position: 'top'
            }
          }
        ],
        tooltip: {
          show: true,
          formatter: '{b0}: <br />{c0}元'
        }
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.turnover-container {
  .turnover-chart {
    width: 500px;
    height: 300px;
    box-shadow: 0 0 20px rgba(150, 150, 150, 0.3);
    border-radius: 10px;
    margin-top: 20px;
  }
}
</style>
