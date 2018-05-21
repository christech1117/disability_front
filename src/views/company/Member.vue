<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          {{scope.row.avatar}}
        </template>
      </el-table-column>
      <el-table-column label="單位" align="center">
        <template slot-scope="scope">
          {{scope.row.depart_name}}
        </template>
      </el-table-column>
      <el-table-column label="職稱" align="center">
        <template slot-scope="scope">
          {{scope.row.work_title}}
        </template>
      </el-table-column>
      <el-table-column label="計畫" align="center">
        <template slot-scope="scope">
          {{scope.row.plan_name}}
        </template>
      </el-table-column>
      <el-table-column label="團隊" align="center">
        <template slot-scope="scope">
          {{scope.row.team_name}}
        </template>
      </el-table-column>
      <el-table-column label="工作狀態" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.work_status | statusFilter">{{scope.row.work_status | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleUpdate(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <table class="table day" border="1">
        <tr>
          <th>姓名</th>
          <td>
            <el-input v-model="temp.name"></el-input>
          </td>
          <th>照片</th>
          <td></td>
        </tr>
        <tr>
          <th>就職日期</th>
          <td>
            <el-input v-model="temp.work_start_date"></el-input>
          </td>
          <th>工作狀態</th>
          <td>
              <el-radio v-for="item in work_status" :key="item.key" :label="item" v-model="temp.work_status">{{item}}</el-radio>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
          <th>E-mail</th>
          <td>
            <el-input v-model="temp.email"></el-input>
          </td>
        </tr>
        <tr>
          <th>聯絡住址</th>
          <td colspan="3">
            <el-input v-model="temp.adress"></el-input>
          </td>
        </tr>
        <tr>
          <th>部門或單位</th>
          <td>
            <el-input v-model="temp.depart_name"></el-input>
          </td>
          <th>職稱</th>
          <td>
            <el-input v-model="temp.work_title"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案計畫名稱</th>
          <td colspan="3">
            <el-input v-model="temp.plan_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>所屬團隊</th>
          <td colspan="3">
            <el-input v-model="temp.team_name"></el-input>
          </td>
        </tr>
        <tr>
          <th colspan="4" class="bg-grap">權限</th>
        </tr>
        <tr>
          <th>角色</th>
          <td colspan="3">
            <el-checkbox-group v-model="temp.role">
              <el-checkbox v-for="item in role" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <th>審核</th>
          <td>
            <el-checkbox-group v-model="temp.approve_status">
              <el-checkbox v-for="item in approve_status" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
            
          </td>
          <th>個人收入</th>
          <td>
            <el-radio v-for="item in income" :key="item.key" :label="item" v-model="temp.income">{{item}}</el-radio>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyMemberList } from '@/api/company'

const work_status = ['就職', '離職']
const role = ['組織管理員', '組織主管', '部門主管', '組/科/室主管', 'ISP促進者', '執行監督者', '支持者', 'OEES訪員', 'SIS訪員', 'POS訪員', '服務對象/家屬']
const approve_status = ['SIS', 'POS', '社區生活技能', 'ISP及會議紀錄']
const income = ['無', '檢視', '編輯']

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      work_status,
      role,
      approve_status,
      income,
      temp: {
        member_id: undefined,
        name: '',
        avatar: '',
        work_start_date: '',
        work_end_date: '',
        work_status: '',
        tel: '',
        email: '',
        adress: '',
        depart_name: '',
        work_title: '',
        plan_name: '',
        team_name: '',
        role: [],
        approve_status: [],
        income: [],
        is_del: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '編輯',
        create: '新增'
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '就職': 'success',
        '離職': 'danger'
      }
      return statusMap[status]
    }
    // valueFilter(value) {
    //   const valueMap = {
    //     1: '就職',
    //     0: '離職',
    //   }
    //   return valueMap[value]
    // }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCompanyMemberList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        member_id: undefined,
        name: '',
        avatar: '',
        work_start_date: '',
        work_end_date: '',
        work_status: '',
        tel: '',
        email: '',
        adress: '',
        depart_name: '',
        work_title: '',
        plan_name: '',
        team_name: '',
        role: [],
        approve_status: [],
        income: [],
        is_del: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
