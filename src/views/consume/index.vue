<template>
    <div class="consume-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">球桌管理</el-breadcrumb-item>
            <el-breadcrumb-item>消费记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="demo-input-prefix">
            <el-input
                class="input"
                placeholder="按会员号查询"
                prefix-icon="el-icon-user-solid"
                v-model="memberId"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="idSearch">搜索</el-button>
        </div>
        <el-table
            :data="consumeData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
            type="selection"
            width="40"
            />
            <el-table-column
            prop="consume_id"
            label="消费编号"
            width="80">
            </el-table-column>
            <el-table-column
            prop="member_id"
            label="会员号"
            width="80">
            </el-table-column>
            <el-table-column
            prop="consume_money"
            label="消费金额"
            width="100">
            </el-table-column>
            <el-table-column
            prop="start_time"
            label="开始时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="stop_time"
            label="结束时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="keep_time"
            label="持续时间"
            width="100">
            </el-table-column>
            <el-table-column
            prop="table_id"
            label="分区"
            width="70">
            </el-table-column>
            <el-table-column
            prop="zone_id"
            label="球桌"
            width="70">
            </el-table-column>
            <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteConsumeInfo(scope.$index, scope.row)"
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
import { getConsume, deleteConsume, batchDeleteConsume } from '@/api/consume'
export default {
  name: 'ConsumeIndex',
  components: {},
  props: {},
  data () {
    return {
      memberId: '',
      consumeData: [
        {
          consume_id: 1,
          member_id: 1,
          consume_money: 20,
          start_time: '2020-09-26 09:19:34',
          stop_time: '2020-09-26 11:19:34',
          keep_time: 120,
          table_id: 1,
          zone_id: 1
        }
      ],
      total: 20,
      currentPage: 1,
      pagesize: 5,
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadConsume()
  },
  mounted () {},
  methods: {
    loadConsume () {
      getConsume().then(res => {
        this.consumeData = res.data.data
        this.total = this.consumeData.length
      })
    },
    deleteConsumeInfo (index, row) {
      console.log(index, row.consume_id)
      this.$confirm('是否删除此记录?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        deleteConsume({ consume_id: row.consume_id })
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
        arr.push(this.multipleSelection[i].consume_id)
      }
      this.$confirm('是否删除这些记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        batchDeleteConsume(arr).then((response) => {
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
      const newConsumeDate = []
      this.consumeData.forEach(item => {
        if (item.member_id.toString().indexOf(keywords) !== -1) {
          newConsumeDate.push(item)
        }
      })
      this.consumeData = newConsumeDate
      this.total = this.consumeData.length
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
.consume-container {
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
