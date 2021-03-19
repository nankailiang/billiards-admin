<template>
    <div class="inmoney-container">
        <div class="inmoney-chart" ref="inmoney_ref"></div>
    </div>
</template>

<script>
import { getInmoney } from '@/api/analyse'
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
      this.chartInstance = this.$echarts.init(this.$refs.inmoney_ref)
    },
    // 获取服务器数据
    getData () {
      getInmoney().then((res) => {
        this.allData = res.data.data
        this.updateChart()
      })
    },
    // 更新图表
    updateChart () {
      const month = this.allData.map((item) => {
        return item.month
      })
      const sumMoney = this.allData.map((item) => {
        return item.sum_money
      })
      const option = {
        title: {
          text: '近半年每月会员充值总和'
        },
        color: ['#304156'],
        xAxis: {
          type: 'category',
          name: '月份',
          data: month
        },
        yAxis: {
          type: 'value',
          name: '充值总和'
        },
        series: [
          {
            type: 'line',
            data: sumMoney,
            barWidth: 30,
            label: {
              show: true,
              position: 'top'
            }
          }
        ],
        tooltip: {
          show: true,
          formatter: '{b0}月份: <br />{c0}元'
        }
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.inmoney-container {
  .inmoney-chart {
    width: 500px;
    height: 300px;
    box-shadow: 0 0 20px rgba(150, 150, 150, 0.3);
    border-radius: 10px;
    margin-top: 20px;
  }
}
</style>
