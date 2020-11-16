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
            <el-button type="primary" icon="el-icon-search" @click="idSearch">搜索</el-button>
            <el-input
                class="input"
                placeholder="按手机号查询"
                prefix-icon="el-icon-phone"
                v-model="phone"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="phoneSearch">搜索</el-button>
            <el-input
                class="input"
                placeholder="按姓名查询"
                prefix-icon="el-icon-user"
                v-model="memberName"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="nameSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addMemberForm = true">添加会员</el-button>
        </div>
        <el-table
            :data="memberData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
            type="selection"
            width="40"
            />
            <el-table-column
            prop="member_id"
            label="卡号"
            width="80">
            </el-table-column>
            <el-table-column
            prop="member_name"
            label="姓名"
            width="130">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            width="160">
            </el-table-column>
            <el-table-column
            prop="balance"
            label="余额"
            width="110">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="办理时间"
            width="240">
            </el-table-column>
            <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-edit"
                  @click="recharge(scope.$index, scope.row)"
                >充值</el-button>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-edit"
                  @click="edit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteMemberInfo(scope.$index, scope.row)"
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
        <el-dialog title="添加会员"
          :visible.sync="addMemberForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="form">
            <el-form-item label="会员卡号" :label-width="formLabelWidth">
              <el-input v-model="form.member_id"></el-input>
            </el-form-item>
            <el-form-item label="会员名称" :label-width="formLabelWidth">
              <el-input v-model="form.member_name"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="会员余额" :label-width="formLabelWidth">
              <el-input v-model="form.balance"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addMemberInfo">确 定</el-button>
            <el-button @click="addMemberForm = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="信息编辑"
          :visible.sync="editMemberForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="editForm">
            <el-form-item label="会员卡号" :label-width="formLabelWidth">
              <el-input v-model="editForm.member_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="会员名称" :label-width="formLabelWidth">
              <el-input v-model="editForm.member_name"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editMemberInfo">确 定</el-button>
            <el-button @click="editMemberForm = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="充值"
          :visible.sync="rechargeMemberForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="rechargeForm">
            <el-form-item label="会员卡号" :label-width="formLabelWidth">
              <el-input v-model="rechargeForm.member_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="充值金额" :label-width="formLabelWidth">
              <el-input v-model="rechargeForm.recharge"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="memberRechargeInfo">确 定</el-button>
            <el-button @click="rechargeMemberForm = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { getMember, addMember, deleteMember, editMember, memberRecharge, batchDeleteMember } from '@/api/member'
import { setRecharge } from '@/api/recharge'
export default {
  name: 'MemberIndex',
  components: {},
  props: {},
  data () {
    return {
      memberId: '',
      memberName: '',
      phone: '',
      form: {
        member_id: '',
        member_name: '',
        phone: '',
        balance: ''
      },
      editForm: {
        member_id: '',
        member_name: '',
        phone: '',
        balance: ''
      },
      rechargeForm: {
        member_id: '',
        balance: '',
        recharge: ''
      },
      addMemberForm: false,
      editMemberForm: false,
      rechargeMemberForm: false,
      formLabelWidth: '80px',
      memberData: [
        {
          member_id: '001',
          member_name: '王小虎',
          phone: '12345678910',
          balance: '100',
          create_time: '2020-08-26 09:19:34'
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
    this.loadMember()
  },
  mounted () {},
  methods: {
    loadMember () {
      getMember().then(res => {
        this.memberData = res.data.data
        this.total = this.memberData.length
      })
    },
    addMemberInfo () {
      addMember(this.form)
      this.addMemberForm = false
      this.$message({
        message: '添加会员成功！',
        type: 'success'
      })
    },
    edit (index, row) {
      this.editForm = Object.assign({}, row)
      this.editMemberForm = true
    },
    editMemberInfo () {
      const data = this.editForm
      editMember(data).then((response) => {
        if (response.data.code === 201) {
          this.editMemberForm = false
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    recharge (index, row) {
      this.rechargeForm.member_id = row.member_id
      this.rechargeForm.balance = row.balance
      this.rechargeMemberForm = true
    },
    memberRechargeInfo () {
      const data = this.rechargeForm
      memberRecharge(data).then((response) => {
        if (response.data.code === 201) {
          this.rechargeMemberForm = false
        } else {
          this.$message.error(response.data.msg)
        }
      })
      setRecharge(data)
    },
    deleteMemberInfo (index, row) {
      console.log(index, row.member_id)
      this.$confirm('是否删除此学生?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        deleteMember({ member_id: row.member_id })
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
        arr.push(this.multipleSelection[i].member_id)
      }
      this.$confirm('是否删除这些学生?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        batchDeleteMember(arr).then((response) => {
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
      const newMemberDate = []
      this.memberData.forEach(item => {
        if (item.member_id.toString().indexOf(keywords) !== -1) {
          newMemberDate.push(item)
        }
      })
      this.memberData = newMemberDate
    },
    phoneSearch () {
      const keywords = this.phone
      const newMemberDate = []
      this.memberData.forEach(item => {
        if (item.phone.indexOf(keywords) !== -1) {
          newMemberDate.push(item)
        }
      })
      this.memberData = newMemberDate
    },
    nameSearch () {
      const keywords = this.memberName
      const newMemberDate = []
      this.memberData.forEach(item => {
        if (item.member_name.indexOf(keywords) !== -1) {
          newMemberDate.push(item)
        }
      })
      this.memberData = newMemberDate
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
