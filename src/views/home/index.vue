<template>
    <div class="home-container">
      <span class="title">第一分区，价格每小时：20元</span>
      <div class="partition">
        <div class="poll-table" v-for="(item,index) in arr" :key="index">
          <div>{{ item }}号台</div>
          <div>开始时间：</div>
          <div>00:00:00</div>
          <div>持续时间：</div>
          <div>00:00:00</div>
          <div>球桌状态：空闲</div>
          <el-button type="success" size="mini" round>开始</el-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      state: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadTable()
  },
  mounted () {},
  methods: {
    loadTable () {
      console.log('获取球桌数据')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  .title {
    font-size: 20px;
  }
  .partition {
    width: 95%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    padding: 20px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    .poll-table {
      width: 150px;
      height: 200px;
      background-color: #304156;
      opacity: 0.8;
      border-radius: 10%;
      margin-left: 10px;
      margin-bottom: 10px;
      color: #fff;
      text-align: center;
      div {
        margin-top: 5px;
      }
      button {
        margin-top: 10px;
      }
    }
  }
}

</style>
