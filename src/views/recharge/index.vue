<template>
    <div class="recharge-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">球桌管理</el-breadcrumb-item>
            <el-breadcrumb-item>充值记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="demo-input-prefix">
            <el-input
                class="input"
                placeholder="按会员号查询"
                prefix-icon="el-icon-user-solid"
                v-model="memberId"
                clearable
                @clear="loadRecharge">
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="idSearch" />
        </div>
        <el-table
            :data="rechargeData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
            type="selection"
            width="40"
            />
            <el-table-column
            prop="recharge_id"
            label="充值编号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="member_id"
            label="会员号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="recharge_money"
            label="充值金额"
            width="200">
            </el-table-column>
            <el-table-column
            prop="recharge_time"
            label="充值时间"
            width="350">
            </el-table-column>
            <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteRechargeInfo(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-button type="danger" size="mini" class="piliang" @click="batchDelete">批量删除</el-button>
            <el-pagination
            class="fenye"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getRecharge, deleteRecharge, batchDeleteRecharge } from '@/api/recharge'
export default {
  name: 'RechargeIndex',
  components: {},
  props: {},
  data () {
    return {
      memberId: '',
      rechargeData: [
        {
          recharge_id: '1',
          member_id: '1',
          recharge_money: 100,
          recharge_time: '2020-09-26 09:19:34'
        }
      ],
      total: 100,
      currentPage: 1,
      pagesize: 5,
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadRecharge()
  },
  mounted () {},
  methods: {
    loadRecharge () {
      getRecharge().then(res => {
        this.rechargeData = res.data.data
        this.total = this.rechargeData.length
      })
    },
    deleteRechargeInfo (index, row) {
      console.log(index, row.recharge_id)
      this.$confirm('是否删除此记录?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        deleteRecharge({ recharge_id: row.recharge_id }).then((response) => {
          this.loadRecharge()
          if (response.data.code === 201) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    batchDelete (multipleSelection) {
      const arr = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].recharge_id)
      }
      this.$confirm('是否删除这些记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        batchDeleteRecharge(arr).then((response) => {
          this.loadRecharge()
          if (response.data.code === 201) {
            this.$message({
              type: 'success',
              message: response.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    idSearch () {
      const keywords = this.memberId
      const newRechargeDate = []
      this.rechargeData.forEach(item => {
        if (item.member_id.toString().indexOf(keywords) !== -1) {
          newRechargeDate.push(item)
        }
      })
      this.rechargeData = newRechargeDate
      this.total = this.rechargeData.length
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge-container {
    .demo-input-prefix {
        margin: 20px 0;
        .input {
            width: 200px;
        }
        button {
          margin-left: 1px;
          margin-right: 12px;
        }
    }
    .block {
      margin-top: 20px;
      .piliang{
        float: left;
      }
      .fenye {
        float: left;
        margin-left: 200px;
      }
    }
}
</style>
