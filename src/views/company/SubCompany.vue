<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
    </div>
    <el-table :data="item" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="子公司名稱" align="center">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table day" border="1">
        <tr>
          <th>子公司名稱</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.value" v-validate="'required'" name="plan" type="text">
            <span class="error-message" v-show="errors.has('plan')"  >{{ errors.first('plan') }}</span>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="warning" @click="createData()">{{ $t('table.save') }}</el-button>
        <el-button v-else type="warning" @click="updateData()">{{ $t('table.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyPlanList, createCompanyPlan, updateCompanyPlan, deleteCompanyPlan, getUserList } from '@/api/company'
import { mapGetters } from 'vuex'

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
        create: this.$t('table.add') + ' ' + this.$t('company_plan.plan_name'),
        update: this.$t('table.edit') + ' ' + this.$t('company_plan.plan_name')
      }
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
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
      getCompanyPlanList(this.id).then(response => {
        this.item = response.data
        this.listLoading = false
      })
      getUserList(this.id).then(response => {
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
      const errors = this.errors.items
      if (errors.length === 0) {
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
            message: this.$t('table.add')
          })
          this.fetchData()
        })
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const errors = this.errors.items
      if (errors.length === 0) {
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
            message: this.$t('table.save')
          })
        })
      }
    },
    handleDelete(row) {
      this.$confirm(this.$t('errorLog.whether_delete'), this.$t('table.info'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      }).then(() => {
        deleteCompanyPlan(row.plan_id).then(() => {
          this.fetchData()
        })
        this.$message({
          type: 'success',
          message: this.$t('table.delete')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('table.cancel')
        })
      })
    }
  }
}
</script>
