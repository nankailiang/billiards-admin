<template>
    <div class="home-container">
      <span class="title">第{{zoneInfo[0].zone_id}}分区({{zoneInfo[0].zone_name}})，价格每小时：{{zoneInfo[0].zone_money}}元</span>
      <div class="partition">
        <div class="poll-table" v-for="(item,index) in tableInfo" :key="index">
          <div class="first">{{ item.table_id }}号台<img src="./delete.png" alt="删除" @click="deleteTable(index)"></div>
          <div>开始时间：</div>
          <div v-if="item.state == 0">00:00:00</div>
          <div v-if="item.state == 1">{{ item.start_time }}</div>
          <div>持续时间：</div>
          <div v-if="item.state == 0">00:00:00</div>
          <div v-if="item.state == 1">{{ Math.ceil((new Date() - new Date(item.start_time))/60000) }}分钟</div>
          <div>球桌状态：</div>
          <div v-if="item.state == 0">空闲</div>
          <div v-if="item.state == 1">有人</div>
          <el-button type="success" size="mini" round @click="start(index)" v-show="!item.state">开始</el-button>
          <el-button type="danger" size="mini" round @click="getMemberId(index)" v-show="item.state">停止</el-button>
        </div>
        <div class="poll-table">
          <img class="addTable" src="./add.png" alt="添加" @click="addTable()">
        </div>
      </div>
      <el-dialog title="请输入会员卡号,没有直接确认即可"
        :visible.sync="memberIdFrom"
        :append-to-body="true"
        width="30%"
        center
      >
        <el-form :model="memberId">
          <el-form-item label="会员卡号">
            <el-input v-model="memberId.id"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="stop">确 定</el-button>
          <el-button @click="memberIdFrom = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { getTable, startTime, stopTime } from '@/api/table'
import { getZone } from '@/api/zone'
import { setConsume } from '@/api/consume'
import { memberConsume } from '@/api/member'
import moment from 'dayjs'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      tableInfo: [
        {
          zone_id: '1',
          table_id: '1',
          start_time: '00:00:00',
          state: '0'
        }
      ],
      currentIndex: '',
      zoneInfo: [
        {
          zone_id: '1',
          zone_money: 10,
          zone_name: '休闲区'
        }
      ],
      memberId: {
        id: ''
      },
      memberIdFrom: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadTable()
    this.loadZone()
  },
  mounted () {},
  destroyed () {},
  methods: {
    loadTable () {
      getTable().then((res) => {
        this.tableInfo = res.data.data
      })
    },
    loadZone () {
      getZone().then((res) => {
        this.zoneInfo = res.data.data
      })
    },
    start (index) {
      const { table_id: tableId } = this.tableInfo[index]
      startTime({ table_id: tableId, state: 1 }).then(() => {
        const table = {
          ...this.tableInfo[index],
          state: 1,
          start_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        this.tableInfo = this.tableInfo.slice(0, index)
          .concat(table)
          .concat(this.tableInfo.slice(index + 1))
      }
      )
    },
    getMemberId (index) {
      this.currentIndex = index
      this.memberIdFrom = true
    },
    stop () {
      this.tableInfo[this.currentIndex].state = !this.tableInfo[this.currentIndex].state
      if (this.memberId.id === '') {
        this.memberId.id = 0
      }
      this.tableInfo[this.currentIndex].member_id = this.memberId.id
      this.tableInfo[this.currentIndex].keep_time = Math.ceil((new Date() - new Date(this.tableInfo[this.currentIndex].start_time)) / 60000)
      this.tableInfo[this.currentIndex].consume_money = Math.ceil(this.tableInfo[this.currentIndex].keep_time / 60) * this.zoneInfo[0].zone_money
      this.$notify({
        title: '消费结算',
        message: '您的消费金额为：' + this.tableInfo[this.currentIndex].consume_money,
        duration: 0,
        type: 'success'
      })
      setConsume(this.tableInfo[this.currentIndex])
      memberConsume(this.tableInfo[this.currentIndex])
      stopTime(this.tableInfo[this.currentIndex])
      this.memberIdFrom = false
    },
    deleteTable (index) {
      alert('这是：' + index)
    },
    addTable () {
      alert('添加一个球桌')
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
      height: 225px;
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
      .first {
        margin-left: 45px;
          img {
          width: 18px;
          height: 18px;
          margin-left: 35px;
        }
      }
      .addTable {
        width: 100px;
        height: 100px;
        margin-top: 50px;
        cursor: pointer;
      }
    }
  }
}

</style>
