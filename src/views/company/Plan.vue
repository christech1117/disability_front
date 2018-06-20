<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table :data="item" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="方案計畫名稱" align="center">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
      <el-table-column label="服務據點名稱" align="center">
        <template slot-scope="scope">
          {{scope.row.area_name}}
        </template>
      </el-table-column>
      <el-table-column label="計畫承辦人" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="服務開辦日期" align="center">
        <template slot-scope="scope">
          {{scope.row.service_start_date}}
        </template>
      </el-table-column>
      <el-table-column label="服務結束日期" align="center">
        <template slot-scope="scope">
          {{scope.row.service_end_date}}
        </template>
      </el-table-column>
      <el-table-column label="服務人數" align="center">
        <template slot-scope="scope">
          {{scope.row.service_count}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table day" border="1">
        <tr>
          <th>方案計畫名稱</th>
          <td colspan="3">
            <el-input v-model="temp.value"></el-input>
          </td>
        </tr>
        <tr>
          <th>服務據點名稱</th>
          <td colspan="3">
            <el-input v-model="temp.area_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>計畫承辦人</th>
          <td colspan="3">
            <el-autocomplete
              class="inline-input"
              v-model="temp.username"
              :fetch-suggestions="querySearch"
              placeholder="請選擇承辦人"
              @select="handleSelect"
            ></el-autocomplete>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td colspan="3">{{ temp.phone }}</td>
        </tr>
        <tr>
          <th>E-mail</th>
          <td colspan="3">{{ temp.email }}</td>
        </tr>
        <tr>
          <th>服務開辦日期</th>
          <td>
            <div class="block">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="temp.service_start_date"
                type="date"
                placeholder="選擇日期">
              </el-date-picker>
            </div>
          </td>
          <th>服務結束日期</th>
          <td>
            <div class="block">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="temp.service_end_date"
                type="date"
                placeholder="選擇日期">
              </el-date-picker>
            </div>
          </td>
        </tr>
        <tr>
          <th>服務時間</th>
          <td colspan="3">{{temp.service_date}}</td>
        </tr>
        <tr>
          <th>服務人數(最多)</th>
          <td colspan="3"> {{temp.service_count}} </td>
        </tr>
        <tr>
          <th>收費(每月)</th>
          <td colspan="3">
            <el-input v-model="temp.price"></el-input>
          </td>
        </tr>
        <tr>
          <th>說明</th>
          <td colspan="3">
            <el-input v-model="temp.description"></el-input>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="warning" @click="createData()">儲存</el-button>
        <el-button v-else type="warning" @click="updateData()">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyPlanList, createCompanyPlan, updateCompanyPlan, deleteCompanyPlan, getUserList } from '@/api/company'

export default {
  data() {
    return {
      item: null,
      users: [],
      listLoading: true,
      temp: {
        value: '', // 方案計畫名稱
        area_name: '',
        username: '',
        user_id: '',
        phone: '',
        service_start_date: '',
        service_end_date: '',
        serviece_date: '',
        service_count: '',
        price: '',
        description: '',
        company_id: '1'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '新增方案計畫',
        update: '編輯方案計畫'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    querySearch(queryString, cb) {
      var users = this.users
      var results = queryString ? users.filter(this.createFilter(queryString)) : users
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
      getCompanyPlanList(1).then(response => {
        this.item = response.data
        this.listLoading = false
      })
      getUserList().then(response => {
        this.users = response.data
      })
    },
    resetTemp() {
      this.temp = {
        value: '', // 方案計畫名稱
        area_name: '',
        username: '',
        user_id: '',
        phone: '',
        service_start_date: '',
        service_end_date: '',
        serviece_date: '',
        service_count: '',
        price: '',
        description: '',
        company_id: '1'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      const filter_temp = {
        company_id: this.temp.company_id,
        plan_name: this.temp.value,
        area_name: this.temp.area_name,
        service_start_date: this.temp.service_start_date,
        service_end_date: this.temp.service_end_date,
        price: this.temp.price,
        description: this.temp.description
      }
      const tempData = Object.assign({}, filter_temp)
      createCompanyPlan(tempData).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '新增成功'
        })
        this.fetchData()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const filter_temp = {
        plan_id: this.temp.plan_id,
        plan_name: this.temp.value,
        area_name: this.temp.area_name,
        user_id: this.temp.user_id,
        service_start_date: this.temp.service_start_date,
        service_end_date: this.temp.service_end_date,
        price: this.temp.price,
        description: this.temp.description
      }
      const tempData = Object.assign({}, filter_temp)
      console.log(tempData)
      updateCompanyPlan(tempData, this.temp.plan_id).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      })
    },
    handleDelete(row) {
      this.$confirm('是否刪除?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCompanyPlan(row.plan_id).then(() => {
          this.fetchData()
        })
        this.$message({
          type: 'success',
          message: '刪除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
      })
    }
  }
}
</script>
