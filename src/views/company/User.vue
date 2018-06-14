<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-table :data="item" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.avatar}} -->
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
      <el-table-column label="團隊" align="center">
        <template slot-scope="scope">
          {{scope.row.team_name}}
        </template>
      </el-table-column>
      <el-table-column label="工作狀態" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | statusFilter">{{scope.row.active | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="就職日期" align="center">
        <template slot-scope="scope">
          {{scope.row.work_start_date}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table">
          <tr>
            <th>姓名</th>
            <td>
              <el-input v-model="temp.value"></el-input>
            </td>
            <th>照片</th>
            <td> </td>
          </tr>
          <tr>
            <th>就職日期</th>
            <td>
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="temp.work_start_date"
                  type="date"
                  placeholder="選擇日期">
                </el-date-picker>
              </div>
            </td>
            <th>工作狀態</th>
            <td>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="1" v-model="temp.active">就職</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="0" v-model="temp.active">離職</p-radio>
            </td>
          </tr>
          <tr>
            <th>電話</th>
            <td>
              <el-input v-model="temp.phone"></el-input>
            </td>
            <th>E-mail</th>
            <td>
              <el-input v-model="temp.email"></el-input>
            </td>
          </tr>
          <tr>
            <th>聯絡住址</th>
            <td colspan="3">
              <el-input v-model="temp.address"></el-input>
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
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="company_admin" v-model="temp.role">組織管理員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="company_leader" v-model="temp.role">組織主管</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="department_leader" v-model="temp.role">部門主管</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="group_leader" v-model="temp.role">組/科/室主管</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="isp" v-model="temp.role">ISP促進者</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="supervisor" v-model="temp.role">執行監督者</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="supporter" v-model="temp.role">支持者</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="oees" v-model="temp.role">OEES訪員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="sis" v-model="temp.role">SIS訪員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="pos" v-model="temp.role">POS訪員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="family" v-model="temp.role">服務對象/家屬</p-radio>
            </td>
          </tr>
          <tr>
            <th>審核</th>
            <td>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.income">SIS</p-check>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.income">POS</p-check>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.income">社區生活技能</p-check>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.income">ISP及會議紀錄</p-check>
            </td>
            <th>個人收入</th>
            <td>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.approve_status">無</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="look" v-model="temp.approve_status">檢視</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="edit" v-model="temp.approve_status">編輯</p-radio>
            </td>
          </tr>
        </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="updateData()">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/company'

export default {
  data() {
    return {
      item: null,
      listLoading: true,
      temp: {
        username: '',
        email: '',
        avatar: '',
        work_start_date: '',
        phone: '',
        adress: '',
        depart_id: '',
        work_title: '',
        plan_id: '',
        team_id: '',
        role_id: [],
        role: '',
        income: '',
        approve_status: '',
        active: ''
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '0': 'danger'
      }
      return statusMap[status]
    },
    valueFilter(value) {
      const valueMap = {
        '1': '就職',
        '0': '離職'
      }
      return valueMap[value]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    querySearch(queryString, cb) {
      var users = this.users
      var results = queryString ? users.filter(this.createFilter(queryString)) : users
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (users) => {
        return (users.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.temp.user_id = item.user_id
      this.temp.phone = item.phone
      this.temp.email = item.email
    },
    fetchData() {
      this.listLoading = true
      getUserList().then(response => {
        this.item = response.data
        this.listLoading = false
        console.log(this.item)
      })
    },
    resetTemp() {
      this.temp = {
        username: '',
        email: '',
        avatar: '',
        work_start_date: '',
        phone: '',
        adress: '',
        depart_id: '',
        work_title: '',
        plan_id: '',
        team_id: '',
        role_id: [],
        role: '',
        income: '',
        approve_status: '',
        active: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = '新增人員'
      this.dialogFormVisible = true
    },
    createData() {
      // createCompanyPlan(this.temp).then(response => {
      //   this.dialogFormVisible = false
      //   this.$notify({
      //     title: '成功',
      //     message: '新增成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   this.fetchData()
      // })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = '編輯人員'
      this.dialogFormVisible = true
    },
    updateData() {
      // const filter_temp = {
        // plan_id: this.temp.plan_id,
        // plan_name: this.temp.plan_name,
        // area_name: this.temp.area_name,
        // user_id: this.temp.user_id,
        // service_start_date: this.temp.service_start_date,
        // service_end_date: this.temp.service_end_date,
        // price: this.temp.price,
        // description: this.temp.description
      // }
      // const tempData = Object.assign({}, filter_temp)
      // updateCompanyPlan(tempData, this.temp.plan_id).then(() => {
      //   this.fetchData()
      //   this.dialogFormVisible = false
      //   this.$notify({
      //     title: '成功',
      //     message: '更新成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      // })
    },
    handleDelete(row) {

    }
  }
}
</script>
