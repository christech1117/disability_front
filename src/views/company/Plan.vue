<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
    </div>
    <el-table :data="plans" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.plan_name')" align="center">
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
      <el-table-column :label="$t('table.actions')" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table day" border="1">
        <tr>
          <th>方案計畫名稱</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.value" v-validate="'required'" name="plan" type="text">
            <span class="error-message" v-show="errors.has('plan')"  >{{ errors.first('plan') }}</span>
          </td>
        </tr>
        <tr>
          <th>服務據點名稱</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.area_name" v-validate="'required'" name="area_name" type="text">
            <span class="error-message" v-show="errors.has('area_name')"  >{{ errors.first('area_name') }}</span>
          </td>
        </tr>
        <tr>
          <th>計畫承辦人</th>
          <td colspan="3">
            <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.undertaker')">
              <el-option
                v-for="item in users"
                :key="item.value"
                :label="item.value"
                :value="item.user_id">
              </el-option>
            </el-select>
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
                placeholder="選擇日期"
                :picker-options="startDatePicker">
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
                placeholder="選擇日期"
                :picker-options="endDatePicker">
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
            <input class="c-input" v-model="temp.price" v-validate="'required|numeric'" name="price" type="text">
            <span class="error-message" v-show="errors.has('price')"  >{{ errors.first('price') }}</span>
          </td>
        </tr>
        <tr>
          <th>說明</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.description" v-validate="'required'" name="description" type="text">
            <span class="error-message" v-show="errors.has('description')"  >{{ errors.first('description') }}</span>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="success" @click="createData()" icon="el-icon-check" circle></el-button>
        <el-button v-else type="success" @click="updateData()" icon="el-icon-check" circle></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createCompanyPlan, updateCompanyPlan, deleteCompanyPlan } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      startDatePicker: {
        disabledDate: (time) => {
          return time.getTime() > new Date(this.temp.service_end_date).getTime()
        }
      },
      endDatePicker: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.temp.service_start_date).getTime()
        }
      },
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
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'id',
      'users',
      'plans'
    ])
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'GetCompanyPlanList'
    ]),
    fetchData() {
      this.listLoading = true
      this.GetCompanyPlanList(this.id).then(response => {
        this.listLoading = false
        this.GetUserList(this.id)
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
        company_id: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.plan')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      const errors = this.errors.items
      if (errors.length === 0) {
        const filter_temp = {
          company_id: this.id,
          user_id: this.temp.user_id,
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
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.plan')
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
