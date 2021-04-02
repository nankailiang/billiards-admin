<template>
    <div class="zone-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">球桌管理</el-breadcrumb-item>
            <el-breadcrumb-item>分区管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="demo-input-prefix">
            <el-input
                class="input"
                placeholder="按分区ID查询"
                prefix-icon="el-icon-zone-solid"
                v-model="zoneId"
                clearable
                @clear="loadZone">
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="idSearch" />
            <el-input
                class="input"
                placeholder="按分区名查询"
                prefix-icon="el-icon-zone"
                v-model="zoneName"
                clearable
                @clear="loadZone">
            </el-input>
            <el-button slot="append" icon="el-icon-search" @click="nameSearch" />
            <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="addZoneForm = true">添加分区</el-button>
        </div>
        <el-table
            :data="zoneData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
            prop="zone_id"
            label="分区ID"
            width="240">
            </el-table-column>
            <el-table-column
            prop="zone_name"
            label="分区名称"
            width="260">
            </el-table-column>
            <el-table-column
            prop="zone_money"
            label="分区价格(/h)"
            width="240">
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
                  @click="deleteZoneInfo(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="block">
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
        <el-dialog title="添加分区"
          :visible.sync="addZoneForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="addForm">
            <el-form-item label="分区名称" :label-width="formLabelWidth">
              <el-input v-model="addForm.zone_name"></el-input>
            </el-form-item>
            <el-form-item label="分区价格(/h)" :label-width="formLabelWidth">
              <el-input v-model="addForm.zone_money"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addZoneInfo">确 定</el-button>
            <el-button @click="addZoneForm = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="分区信息编辑"
          :visible.sync="editZoneForm"
          :append-to-body="true"
          width="30%"
          center
        >
          <el-form :model="editForm">
            <el-form-item label="分区ID" :label-width="formLabelWidth">
              <el-input v-model="editForm.zone_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="分区名称" :label-width="formLabelWidth">
              <el-input v-model="editForm.zone_name"></el-input>
            </el-form-item>
            <el-form-item label="分区价格(/h)" :label-width="formLabelWidth">
              <el-input v-model="editForm.zone_money"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editZoneInfo">确 定</el-button>
            <el-button @click="editZoneForm = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { getZone, addZone, editZone, deleteZone } from '@/api/zone'
export default {
  name: 'ZoneIndex',
  components: {},
  props: {},
  data () {
    return {
      zoneId: '',
      zoneName: '',
      zoneData: [
      ],
      addZoneForm: false,
      editZoneForm: false,
      formLabelWidth: '80px',
      addForm: {
        zone_name: '',
        zone_money: ''
      },
      editForm: {
        zone_id: '',
        zone_name: '',
        zone_money: ''
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
    this.loadZone()
  },
  mounted () {},
  methods: {
    loadZone () {
      getZone().then(res => {
        this.zoneData = res.data.data
        this.total = this.zoneData.length
        console.log(this.zoneData)
      })
    },
    addZoneInfo () {
      addZone(this.addForm).then((response) => {
        this.loadZone()
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
      this.addZoneForm = false
    },
    edit (index, row) {
      this.editZoneForm = true
      this.editForm = Object.assign({}, row)
    },
    editZoneInfo () {
      const data = this.editForm
      editZone(data).then((response) => {
        this.loadZone()
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
      this.editZoneForm = false
    },
    deleteZoneInfo (index, row) {
      console.log(index, row.zone_id)
      this.$confirm('是否删除此分区?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        deleteZone({ zone_id: row.zone_id }).then((response) => {
          this.loadZone()
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
      const keywords = this.zoneId
      const newZoneDate = []
      this.zoneData.forEach(item => {
        if (item.zone_id.toString().indexOf(keywords) !== -1) {
          newZoneDate.push(item)
        }
      })
      this.zoneData = newZoneDate
    },
    nameSearch () {
      const keywords = this.zoneName
      const newZoneDate = []
      this.zoneData.forEach(item => {
        if (item.zone_name.indexOf(keywords) !== -1) {
          newZoneDate.push(item)
        }
      })
      this.zoneData = newZoneDate
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
.zone-container {
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
      .fenye {
        float: left;
        margin-left: 200px;
      }
    }
}
</style>
