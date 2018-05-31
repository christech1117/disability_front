<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="服務據點名稱" align="center">
        <template slot-scope="scope">
          {{scope.row.area_name}}
        </template>
      </el-table-column>
      <el-table-column label="計畫承辦人" align="center">
        <template slot-scope="scope">
          {{scope.row.member_name}}
        </template>
      </el-table-column>
      <el-table-column label="電話" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="Email" align="center">
        <template slot-scope="scope">
          {{scope.row.email}}
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <table class="table day" border="1">
        <tr>
          <th>方案計畫名稱</th>
          <td colspan="3">
            <el-input v-model="temp.name"></el-input>
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
            <el-input v-model="temp.member_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td colspan="3">
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
        <tr>
          <th>E-mail</th>
          <td colspan="3">
            <el-input v-model="temp.email"></el-input>
          </td>
        </tr>
        <tr>
          <th>服務開辦日期</th>
          <td>
            <el-input v-model="temp.service_start_date"></el-input>
          </td>
          <th>服務結束日期</th>
          <td>
            <el-input v-model="temp.service_end_date"></el-input>
          </td>
        </tr>
        <tr>
          <th>服務時間</th>
          <td colspan="3">
            <el-input v-model="temp.service_time"></el-input>
          </td>
        </tr>
        <tr>
          <th>服務人數(最多)</th>
          <td colspan="3">
            <el-input v-model="temp.service_count"></el-input>
          </td>
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
        <el-button type="primary" @click="create()">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyPlanList, createCompanyPlan } from '@/api/company'

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
        area_name: '',
        member_name: '',
        tel: '',
        email: '',
        service_start_date: '',
        service_end_date: '',
        service_count: '',
        price: '',
        description: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '編輯',
        create: '新增'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCompanyPlanList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        member_id: undefined,
        name: '',
        area_name: '',
        member_name: '',
        tel: '',
        email: '',
        service_start_date: '',
        service_end_date: '',
        service_count: '',
        price: '',
        description: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    create() {
      console.log(this.temp)
      createCompanyPlan(this.temp).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
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
    },
    handleDelete(row) {

    }
  }
}
</script>
