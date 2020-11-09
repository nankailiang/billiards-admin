<template>
    <div class="member-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">球桌管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="demo-input-prefix">
            <el-input
                class="input"
                placeholder="按会员号查询"
                prefix-icon="el-icon-user-solid"
                v-model="memberId"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-input
                class="input"
                placeholder="按手机号查询"
                prefix-icon="el-icon-phone"
                v-model="memberName"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-input
                class="input"
                placeholder="按姓名查询"
                prefix-icon="el-icon-user"
                v-model="phone"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline">添加会员</el-button>
        </div>
        <el-table
            :data="memberData"
            border
            style="width: 100%">
            <el-table-column
            prop="memberId"
            label="卡号"
            width="160">
            </el-table-column>
            <el-table-column
            prop="memberName"
            label="姓名"
            width="160">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            width="160">
            </el-table-column>
            <el-table-column
            prop="balance"
            label="余额"
            width="160">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="办理时间"
            width="180">
            </el-table-column>
            <el-table-column
            label="操作">
                <el-button type="warning" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MemberIndex',
  components: {},
  props: {},
  data () {
    return {
      memberId: '',
      memberName: '',
      phone: '',
      memberData: [
        {
          memberId: '001',
          memberName: '王小虎',
          phone: '12345678910',
          balance: '100',
          create_time: '2020-08-26 09:19:34'
        },
        {
          memberId: '001',
          memberName: '王小虎',
          phone: '12345678910',
          balance: '100',
          create_time: '2020-08-26 09:19:34'
        }
      ],
      currentPage: 1
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.member-container {
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
      text-align: center;
    }
}
</style>
