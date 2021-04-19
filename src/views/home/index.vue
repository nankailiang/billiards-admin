<template>
    <div class="home-container">
      <div class="box" v-for="(items,indexs) in zoneInfo" :key="indexs">
        <span class="title">第{{items.zone_id}}分区({{items.zone_name}})，价格每小时：{{items.zone_money}}元，会员价：{{items.member_money}}元</span>
        <div class="partition">
          <div class="poll-table" v-for="(item,index) in items.tableInfo" :key="index">
            <div class="first">{{ item.table_id }}号台<img src="./delete.png" alt="删除" @click="deleteTableInfo(item.table_id)"></div>
            <div>开始时间：</div>
            <div v-if="item.state == 0">00:00:00</div>
            <div v-if="item.state == 1">{{ item.start_time }}</div>
            <div>持续时间：</div>
            <div v-if="item.state == 0">00:00:00</div>
            <div v-if="item.state == 1">{{ Math.ceil((new Date() - new Date(item.start_time))/60000) }}分钟</div>
            <div>球桌状态：</div>
            <div v-if="item.state == 0">空闲</div>
            <div v-if="item.state == 1">有人</div>
            <el-button type="success" size="mini" round @click="start(item.table_id)" v-show="!item.state">开始</el-button>
            <el-button type="danger" size="mini" round @click="getMemberId(item,items)" v-show="item.state">停止</el-button>
          </div>
          <div class="poll-table">
            <img class="addTable" src="./add.png" alt="添加" @click="addTableInfo(items.zone_id)">
          </div>
        </div>
      </div>
      <el-dialog title="请输入会员卡号,没有直接确认即可"
        :visible.sync="memberIdFrom"
        :append-to-body="true"
        width="30%"
        center
      >
        <el-form :model="tableInfo">
          <el-form-item label="会员卡号">
            <el-input v-model="tableInfo.member_id"></el-input>
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
import { getTable, deleteTable, addTable, startTime, stopTime } from '@/api/table'
import { getZone } from '@/api/zone'
import { setConsume } from '@/api/consume'
import { memberConsume } from '@/api/member'
import { getUserInfo } from '@/api/user'
// import moment from 'dayjs'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      zoneInfo: [
        {
          zone_id: '1',
          zone_money: 10,
          zone_name: '休闲区',
          member_money: '8',
          tableInfo: []
        }
      ],
      tableInfo: {
        zone_id: 0,
        table_id: 0,
        member_id: 0,
        start_time: '',
        zone_money: 0,
        member_money: 0,
        state: 0
      },
      user_state: 0,
      memberIdFrom: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadZone()
    this.loadTable()
    this.loadUser()
  },
  mounted () {},
  destroyed () {},
  methods: {
    loadZone () {
      getZone()
    },
    loadTable () {
      getTable().then((res) => {
        this.zoneInfo = res.data.data
      })
    },
    loadUser () {
      getUserInfo().then((res) => {
        this.user_state = res.data.data.user_state
      })
    },
    start (tableId) {
      startTime({ table_id: tableId, state: 1 }).then(() => {
        this.loadZone()
        this.loadTable()
      }
      )
    },
    getMemberId (item, items) {
      this.tableInfo.zone_id = items.zone_id
      this.tableInfo.table_id = item.table_id
      this.tableInfo.start_time = item.start_time
      this.tableInfo.zone_money = items.zone_money
      this.tableInfo.state = item.state
      this.tableInfo.member_money = items.member_money
      this.memberIdFrom = !this.memberIdFrom
    },
    stop () {
      // this.tableInfo[this.currentIndex].state = !this.tableInfo[this.currentIndex].state
      const tableInfo = {
        member_id: this.tableInfo.member_id,
        start_time: this.tableInfo.start_time,
        table_id: this.tableInfo.table_id,
        zone_id: this.tableInfo.zone_id,
        state: !this.tableInfo.state,
        keep_time: Math.ceil((new Date() - new Date(this.tableInfo.start_time)) / 60000),
        consume_money: this.tableInfo.member_id === 0 ? Math.ceil(((new Date() - new Date(this.tableInfo.start_time)) / 60000) / 60) * this.tableInfo.zone_money : Math.ceil(((new Date() - new Date(this.tableInfo.start_time)) / 60000) / 60) * this.tableInfo.member_money
      }
      this.$notify({
        title: '消费结算',
        message: '您的消费金额为：' + tableInfo.consume_money,
        duration: 0,
        type: 'success'
      })
      setConsume(tableInfo)
      memberConsume(tableInfo)
      stopTime(tableInfo).then(() => {
        this.loadZone()
        this.loadTable()
      })
      this.tableInfo.member_id = 0
      this.memberIdFrom = false
    },
    deleteTableInfo (tableId) {
      if (this.user_state === 0) {
        this.$message({
          message: '该用户不具备此权限',
          type: 'warning'
        })
      } else {
        this.$confirm('是否删除此球桌?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          deleteTable({ table_id: tableId }).then(() => {
            this.loadTable()
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    addTableInfo (zoneId) {
      if (this.user_state === 0) {
        this.$message({
          message: '该用户不具备此权限',
          type: 'warning'
        })
      } else {
        this.$confirm('是否添加一个球桌?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'success',
          center: true
        }).then(() => {
          addTable({ zone_id: zoneId }).then(() => {
            this.loadTable()
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
      }
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
          cursor: pointer;
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
