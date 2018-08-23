<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" @click="handleCreate()" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
      <el-input style="width: 200px;" class="filter-item" :placeholder="$t('table.search')+$t('table.title')" v-model="search" suffix-icon="el-icon-search"></el-input>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="filterData">{{$t('table.search')}}</el-button> -->
    </div>
    <el-table :data="filterData" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.plan_name')" align="center">
        <template slot-scope="scope">
          {{scope.row.plan_name}}
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
          <el-button type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <table class="table day" border="1">
          <tr>
            <th>方案計畫名稱</th>
            <td colspan="3">
              <el-form-item prop="plan_name">
                <el-input maxlength="15" v-model="temp.plan_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.department') }}</th>
            <td colspan="3">
              <el-form-item prop="depart_id">
                <el-select v-model="temp.depart_id" :placeholder="$t('table.select') + $t('company.depart')">
                  <el-option v-for="item in departs" :key="item.depart_id" :label="item.depart_name" :value="item.depart_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>服務據點名稱</th>
            <td colspan="3">
              <el-form-item prop="area_name">
                <el-input maxlength="15" v-model="temp.area_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>服務據點說明</th>
            <td colspan="3">
              <el-form-item prop="area_description">
                <el-input maxlength="50" type="textarea" :rows="4" resize="none" v-model="temp.area_description"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>計畫承辦人</th>
            <td colspan="3">
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.undertaker')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>電話</th>
            <td colspan="3" v-if="temp.phone">{{ temp.phone }}</td>
            <td colspan="3" class="warning" v-else>儲存後，自動帶入計畫承辦人電話</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td colspan="3" v-if="temp.email">{{ temp.email }}</td>
            <td colspan="3" class="warning" v-else>儲存後，自動帶入計畫承辦人信箱</td>
          </tr>
          <tr>
            <th>服務開辦日期</th>
            <td>
              <el-form-item prop="service_start_date">
                <el-date-picker value-format="yyyy-MM-dd" v-model="temp.service_start_date" type="date" placeholder="選擇日期" :picker-options="startDatePicker">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>服務結束日期</th>
            <td>
              <el-form-item prop="service_end_date">
                <el-date-picker value-format="yyyy-MM-dd" v-model="temp.service_end_date" type="date" placeholder="選擇日期" :picker-options="endDatePicker">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>服務時間</th>
            <td colspan="3">
              {{ service_date + '日' }}
            </td>
          </tr>
          <tr>
            <th>服務人數(最多)</th>
            <td colspan="3">
              {{ temp.service_count }}
            </td>
          </tr>
          <tr>
            <th>收費</th>
            <td colspan="3">
              <vue-numeric class="c-input" :min="0" :minus="false" :precision="0" :empty-value="0" currency="$" separator="," v-model="temp.price"></vue-numeric>
              <span>元/每月</span>
            </td>
          </tr>
          <tr>
            <th>說明</th>
            <td colspan="3">
              <el-form-item prop="description">
                <el-input maxlength="50" type="textarea" :rows="4" resize="none" v-model="temp.description"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item class="text-right">
          <el-button v-if="dialogStatus=='create'" type="warning" @click="createData()" icon="el-icon-check">{{ $t('table.add') }}</el-button>
          <el-button v-else type="warning" @click="updateData()" icon="el-icon-check">{{ $t('table.edit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  createCompanyPlan,
  updateCompanyPlan,
  deleteCompanyPlan
} from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {
        company_id: this.id,
        plan_id: '',
        plan_name: '',
        area_name: '',
        user_id: '',
        service_start_date: '',
        service_end_date: '',
        price: '',
        description: ''
      },
      search: '',
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      startDatePicker: {
        disabledDate: time => {
          return time.getTime() > new Date(this.temp.service_end_date).getTime()
        }
      },
      endDatePicker: {
        disabledDate: time => {
          return (
            time.getTime() < new Date(this.temp.service_start_date).getTime()
          )
        }
      },
      rules: {
        plan_name: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.plan_name'),
            trigger: 'change'
          },
          { max: 15, message: '方案名稱最長為 15 個字', trigger: 'change' }
        ],
        area_name: [
          { required: true, message: '請輸入服務據點名稱', trigger: 'change' },
          { max: 15, message: '服務據點名稱最長為 15 個字', trigger: 'change' }
        ],
        area_description: [
          { required: true, message: '請輸入服務據點說明', trigger: 'change' },
          { max: 50, message: '服務據點說明最長為 50 個字', trigger: 'change' }
        ],
        user_id: [
          { required: true, message: '請選擇計畫承辦人', trigger: 'change' }
        ],
        service_start_date: [
          { required: true, message: '請選擇日期', trigger: 'change' }
        ],
        service_end_date: [
          { required: true, message: '請選擇日期', trigger: 'change' }
        ],
        price: [
          { required: true, message: '請輸入每月收費', trigger: 'change' }
        ],
        description: [
          { required: true, message: '請輸入說明', trigger: 'change' },
          { max: 50, message: '說明最長為 50 個字', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['id', 'users', 'plans', 'departs']),
    filterData() {
      const filter_name = this.search.toLowerCase()

      if (filter_name.trim() !== '') {
        return this.plans.filter(plans => {
          return plans.plan_name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
      }
      return this.plans
    },
    service_date() {
      if (
        this.temp.service_start_date === '' ||
        this.temp.service_end_date === ''
      ) {
        return ''
      }
      return (
        (new Date(this.temp.service_end_date).getTime() / 1000 -
          new Date(this.temp.service_start_date).getTime() / 1000) /
        86400
      )
    }
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'GetCompanyPlanList',
      'GetCompanyDepartmentList'
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
        company_id: this.id,
        plan_id: '',
        plan_name: '',
        area_name: '',
        user_id: '',
        service_start_date: '',
        service_end_date: '',
        price: '',
        description: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.plan')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createCompanyPlan(this.temp).then(response => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: this.$t('table.add')
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.plan')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const filter_temp = {
            plan_id: this.temp.plan_id,
            plan_name: this.temp.plan_name,
            area_name: this.temp.area_name,
            area_description: this.temp.area_description,
            user_id: this.temp.user_id,
            service_start_date: this.temp.service_start_date,
            service_end_date: this.temp.service_end_date,
            price: this.temp.price,
            description: this.temp.description
          }
          const tempData = Object.assign({}, filter_temp)
          updateCompanyPlan(tempData, this.temp.plan_id).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: this.$t('table.save')
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm(this.$t('errorLog.whether_delete'), this.$t('table.info'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      }).then(() => {
        deleteCompanyPlan(row.plan_id).then(() => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: this.$t('table.delete')
          })
        })
      })
    }
  }
}
</script>
