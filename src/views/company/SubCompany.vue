<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
    </div>
    <el-collapse v-model="activeName" accordion v-for="subCompany in subCompanys">
      <el-collapse-item :title="subCompany.sub_companpy_name" :name="subCompany.id">
        {{ subCompany.id }}
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { createCompanyPlan, updateCompanyPlan, deleteCompanyPlan } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {
      },
      textMap: {
        create: this.$t('table.add') + ' ' + this.$t('company_plan.plan_name'),
        update: this.$t('table.edit') + ' ' + this.$t('company_plan.plan_name')
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      activeName: '1'
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'id',
      'subCompanys'
    ])
  },
  methods: {
    ...mapActions([
      'GetCompanySubCompanyList'
    ]),
    fetchData() {
      this.listLoading = true,
      this.GetCompanySubCompanyList(this.id).then(response => {
        this.listLoading = false
        // this.GetUserList(this.id)
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
