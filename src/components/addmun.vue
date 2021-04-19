<template>
    <div class="addmun-container">
        <download-excel
          class = "out"
          :data = "allData"
          name = "近半年每月办理会员人数.xls">
          <el-button size="mini" @click="exportData">导出Excel</el-button>
        </download-excel>
        <div class="addmun-chart" ref="addmun_ref"></div>
    </div>
</template>

<script>
import { getAddmun } from '@/api/analyse'
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
      this.chartInstance = this.$echarts.init(this.$refs.addmun_ref)
    },
    // 获取服务器数据
    getData () {
      getAddmun().then((res) => {
        this.allData = res.data.data
        console.log(this.allData)
        this.updateChart()
      })
    },
    // 更新图表
    updateChart () {
      const month = this.allData.map((item) => {
        return item.month
      })
      const number = this.allData.map((item) => {
        return item.number
      })
      const option = {
        title: {
          text: '近半年每月办理会员人数'
        },
        color: ['#304156'],
        xAxis: {
          type: 'category',
          name: '月份',
          data: month
        },
        yAxis: {
          type: 'value',
          name: '人数'
        },
        series: [
          {
            type: 'line',
            data: number,
            barWidth: 30,
            label: {
              show: true,
              position: 'top'
            }
          }
        ],
        tooltip: {
          show: true,
          formatter: '{b0}: <br />{c0}人'
        }
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.addmun-container {
  .out {
    position: relative;
    top: 35px;
    left: 405px;
    z-index: 9;
  }
  .addmun-chart {
    width: 500px;
    height: 300px;
    box-shadow: 0 0 20px rgba(150, 150, 150, 0.3);
    border-radius: 10px;
    // margin-top: 20px;
  }
}
</style>
