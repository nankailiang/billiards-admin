<template>
    <div class="user-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">球桌管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="demo-input-prefix">
            <el-input
                class="input"
                placeholder="按用户ID查询"
                prefix-icon="el-icon-user-solid"
                v-model="userId"
                clearable
                @clear="loadUser">
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="idSearch" />
            <el-input
                class="input"
                placeholder="按手机号查询"
                prefix-icon="el-icon-phone"
                v-model="phone"
                clearable>
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="phoneSearch" />
            <el-input
                class="input"
                placeholder="按用户名查询"
                prefix-icon="el-icon-user"
                v-model="userName"
                clearable>
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="nameSearch" />
            <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="addUserForm = true">添加用户</el-button>
        </div>
        <el-table
            :data="userData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
            type="selection"
            width="40"
            />
            <el-table-column
            prop="user_id"
            label="用户ID"
            width="80">
            </el-table-column>
            <el-table-column
            prop="user_name"
            label="用户名"
            width="130">
            </el-table-column>
            <el-table-column
            prop="user_password"
            label="密码"
            width="160">
            </el-table-column>
            <el-table-column
            prop="user_phone"
            label="电话"
            width="110">
            </el-table-column>
            <el-table-column
            prop="user_call"
            label="昵称"
            width="140">
            </el-table-column>
            <el-table-column
            prop="user_state"
            label="用户状态"
            width="140">
              <template slot-scope="scope">
                <el-switch
                v-model="scope.row.user_state"
                @change="changeUserState(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
            label="操作">
              <template slot-scope="scope">
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
                  @click="deleteUserInfo(scope.$index, scope.row)"
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
        <el-dialog title="添加用户"
          :visible.sync="addUserForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="addForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="addForm.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="addForm.user_password"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="addForm.user_phone"></el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="addForm.user_call"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addUserInfo">确 定</el-button>
            <el-button @click="addUserForm = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="用户信息编辑"
          :visible.sync="editUserForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="editForm">
            <el-form-item label="用户ID" :label-width="formLabelWidth">
              <el-input v-model="editForm.user_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="editForm.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="editForm.user_password"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="editForm.user_phone"></el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="editForm.user_call"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
            <el-button @click="editUserForm = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { getUser, addUser, deleteUser, editUser, batchDeleteUser, changeState } from '@/api/user'
export default {
  name: 'UserIndex',
  components: {},
  props: {},
  data () {
    return {
      userId: '',
      userName: '',
      phone: '',
      userData: [
        {
          user_id: 1,
          user_name: 'admin',
          user_password: 'admin',
          user_phone: '12345678910',
          user_call: 'boss',
          user_state: true
        }
      ],
      addUserForm: false,
      editUserForm: false,
      formLabelWidth: '80px',
      addForm: {
        user_name: '',
        user_password: '',
        user_phone: '',
        user_call: ''
      },
      editForm: {
        user_id: '',
        user_name: '',
        user_password: '',
        user_phone: '',
        user_call: ''
      },
      total: 20,
      currentPage: 1,
      pagesize: 5,
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    loadUser () {
      getUser().then(res => {
        this.userData = res.data.data
        this.total = this.userData.length
        for (let i = 0; i < this.total; i++) {
          this.userData[i].user_state = !!this.userData[i].user_state
        }
        console.log(this.userData)
      })
    },
    addUserInfo () {
      addUser(this.addForm).then((response) => {
        this.loadUser()
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
      this.addUserForm = false
    },
    changeUserState (user) {
      changeState(user)
    },
    edit (index, row) {
      this.editUserForm = true
      this.editForm = Object.assign({}, row)
    },
    editUserInfo () {
      const data = this.editForm
      editUser(data).then((response) => {
        this.loadUser()
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
      this.editUserForm = false
    },
    deleteUserInfo (index, row) {
      console.log(index, row.user_id)
      this.$confirm('是否删除此会员?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        deleteUser({ user_id: row.user_id }).then((response) => {
          this.loadUser()
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
        arr.push(this.multipleSelection[i].user_id)
      }
      this.$confirm('是否删除这些会员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        batchDeleteUser(arr).then((response) => {
          this.loadUser()
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
      const keywords = this.userId
      const newUserDate = []
      this.userData.forEach(item => {
        if (item.user_id.toString().indexOf(keywords) !== -1) {
          newUserDate.push(item)
        }
      })
      this.userData = newUserDate
    },
    phoneSearch () {
      const keywords = this.phone
      const newUserDate = []
      this.userData.forEach(item => {
        if (item.user_phone.indexOf(keywords) !== -1) {
          newUserDate.push(item)
        }
      })
      this.userData = newUserDate
    },
    nameSearch () {
      const keywords = this.userName
      const newUserDate = []
      this.userData.forEach(item => {
        if (item.user_name.indexOf(keywords) !== -1) {
          newUserDate.push(item)
        }
      })
      this.userData = newUserDate
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
.user-container {
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
