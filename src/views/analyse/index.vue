<template>
    <div class="analyse-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">球桌管理</el-breadcrumb-item>
          <el-breadcrumb-item>数据分析</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="charts-container">
         <turnover></turnover>
         <duration></duration>
         <addmun></addmun>
         <inmoney></inmoney>
      </div>
    </div>
</template>

<script>
import Turnover from '@/components/turnover'
import Duration from '@/components/duration'
import Addmun from '@/components/addmun'
import Inmoney from '@/components/inmoney'

export default {
  name: 'AnalyseIndex',
  components: {
    turnover: Turnover,
    duration: Duration,
    addmun: Addmun,
    inmoney: Inmoney
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.analyse-container {
  .charts-container {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
  }
}
</style>
