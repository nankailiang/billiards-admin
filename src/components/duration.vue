<template>
    <div class="duration-container">
        <div class="duration-chart" ref="duration_ref"></div>
    </div>
</template>

<script>
import { getDuration } from '@/api/analyse'
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
      this.chartInstance = this.$echarts.init(this.$refs.duration_ref)
    },
    // 获取服务器数据
    getData () {
      getDuration().then((res) => {
        this.allData = res.data.data
        this.updateChart()
      })
    },
    // 更新图表
    updateChart () {
      const tableId = this.allData.map((item) => {
        return item.table_id
      })
      const sumTime = this.allData.map((item) => {
        return item.sum_time
      })
      const option = {
        title: {
          text: '每个球桌使用总时长'
        },
        color: ['#304156'],
        xAxis: {
          type: 'category',
          name: '编号',
          data: tableId
        },
        yAxis: {
          type: 'value',
          name: '总时长'
        },
        series: [
          {
            type: 'bar',
            data: sumTime,
            barWidth: 30,
            label: {
              show: true,
              position: 'top'
            }
          }
        ],
        tooltip: {
          show: true,
          formatter: '{b0}号球桌: <br />{c0}分钟'
        }
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.duration-container {
  .duration-chart {
    width: 500px;
    height: 300px;
    box-shadow: 0 0 20px rgba(150, 150, 150, 0.3);
    border-radius: 10px;
    margin-top: 20px;
  }
}
</style>
