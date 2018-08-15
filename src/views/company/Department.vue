<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
    </div>
    <el-table :data="departs" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.depart_type')" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.depart_type | statusFilter">{{scope.row.depart_type | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.depart_name')" align="center">
        <template slot-scope="scope">
          {{scope.row.depart_name}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.principal')" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.tel')" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="depart_type">
          <el-select v-if="dialogStatus=='create'" class="filter-item" v-model="temp.depart_type" :placeholder="$t('table.select') + $t('company.service_type')">
            <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <table class="table day" border="1" v-if="temp.depart_type === 'day'">
          <tr>
            <th>{{ $t('company.service_type') }}</th>
            <td>
              <el-form-item prop="service_type">
                <el-checkbox-group v-model="temp.service_type">
                  <el-checkbox label="day_care">日間照顧</el-checkbox>
                  <el-checkbox label="day_active">日間活動(含休閒、工作)</el-checkbox>
                  <el-checkbox label="community">社區日間作業設施</el-checkbox>
                  <el-checkbox label="group_work">小組工作安置</el-checkbox>
                  <el-checkbox label="other">{{ $t('company.other') }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.depart_name') }}</th>
            <td>
              <el-form-item prop="depart_name">
                <el-input maxlength="20" v-model="temp.depart_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.plan') }}</th>
            <td>
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.principal') }}</th>
            <td>
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.service_type')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.address') }}</th>
            <td>
              <el-form-item prop="address">
                <el-input maxlength="20" v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.tel') }}</th>
            <td>
              <el-form-item prop="tel">
                <el-input maxlength="20" v-model="temp.tel"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="table day" border="1" v-else-if="temp.depart_type === 'live'">
          <tr>
            <th>{{ $t('company.service_type') }}</th>
            <td colspan="7">
              <el-form-item prop="service_type">
                <el-radio-group v-model="temp.service_type">
                  <el-radio :label="'large'">大型機構(>200人)</el-radio>
                  <el-radio :label="'small'">小型機構(30人~200人)</el-radio>
                  <el-radio :label="'night'">夜間型住宿機構(&lt;29人)</el-radio>
                  <el-radio :label="'community'">小組工作安置</el-radio>
                  <el-radio :label="'family'">與家人同住(&lt;6人)</el-radio>
                  <el-radio :label="'outside'">自己在外面居住</el-radio>
                  <el-radio :label="'other'">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>單位名稱</th>
            <td colspan="7">
              <el-form-item prop="depart_name">
                <el-input maxlength="20" v-model="temp.depart_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.plan') }}</th>
            <td colspan="7">
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.principal') }}</th>
            <td colspan="7">
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.principal')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>地址</th>
            <td colspan="7">
              <el-form-item prop="address">
                <el-input maxlength="20" v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>電話</th>
            <td colspan="7">
              <el-form-item prop="tel">
                <el-input maxlength="20" v-model="temp.tel"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>房舍類型</th>
            <td colspan="4">
              <el-form-item prop="house_type">
                <el-input maxlength="20" v-model="temp.house_type"></el-input>
              </el-form-item>
            </td>
            <th>電梯</th>
            <td colspan="2">
              <el-form-item prop="have_elevator">
                <el-radio-group v-model="temp.have_elevator">
                  <el-radio :label="'yes'">有</el-radio>
                  <el-radio :label="'no'">無</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>房舍性質</th>
            <td colspan="4">
              <el-form-item prop="house_nature">
                <el-input maxlength="20" v-model="temp.house_nature"></el-input>
              </el-form-item>
            </td>
            <th>每月租金</th>
            <td colspan="2">
              <el-form-item prop="rent">
                <el-input maxlength="20" v-model="temp.rent"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>樓層</th>
            <td colspan="4">
              <el-form-item prop="floor">
                <el-input maxlength="20" v-model="temp.floor"></el-input>
              </el-form-item>
            </td>
            <th>樓地板面積</th>
            <td colspan="2">
              <el-form-item prop="floor_area">
                <el-input maxlength="20" v-model="temp.floor_area"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>客廳數</th>
            <td>
              <el-form-item prop="parlor_count">
                <el-input maxlength="20" v-model="temp.parlor_count"></el-input>
              </el-form-item>
            </td>
            <th>衛浴數</th>
            <td>
              <el-form-item prop="bathroom_count">
                <el-input maxlength="20" v-model="temp.bathroom_count"></el-input>
              </el-form-item>
            </td>
            <th>房間數</th>
            <td>
              <el-form-item prop="room_count">
                <el-input maxlength="20" v-model="temp.room_count"></el-input>
              </el-form-item>
            </td>
            <th>床位數</th>
            <td>
              <el-form-item prop="bed_count">
                <el-input maxlength="20" v-model="temp.bed_count"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="table day" border="1" v-else-if="temp.depart_type === 'job'">
          <tr>
            <th>{{ $t('company.service_type') }}</th>
            <td>
              <el-form-item prop="service_type">
                <el-checkbox-group v-model="temp.service_type">
                  <el-checkbox label="sheltered">庇護性就業</el-checkbox>
                  <el-checkbox label="supportive">支持性就業</el-checkbox>
                  <el-checkbox label="general">一般性就業</el-checkbox>
                  <el-checkbox label="other">{{ $t('company.other') }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.depart_name') }}</th>
            <td>
              <el-form-item prop="depart_name">
                <el-input maxlength="20" v-model="temp.depart_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.plan') }}</th>
            <td>
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.principal') }}</th>
            <td>
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.principal')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.address') }}</th>
            <td>
              <el-form-item prop="address">
                <el-input maxlength="20" v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.tel') }}</th>
            <td>
              <el-form-item prop="tel">
                <el-input maxlength="20" v-model="temp.tel"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工作時間</th>
            <td>
              <el-form-item prop="work_time">
                <el-input maxlength="20" v-model="temp.work_time"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工作時數</th>
            <td>
              <el-form-item prop="work_hour">
                <el-input maxlength="20" v-model="temp.work_hour"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工資</th>
            <td>
              <el-form-item prop="salary">
                <el-input maxlength="20" v-model="temp.salary"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工作內容</th>
            <td>
              <el-form-item prop="content">
                <el-input maxlength="20" v-model="temp.content"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item class="text-right">
          <el-button v-if="dialogStatus=='create'" type="success" @click="createData()" icon="el-icon-check" circle></el-button>
          <el-button v-else type="success" @click="updateData()" icon="el-icon-check" circle></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  createCompanyDepartment,
  updateCompanyDepartment,
  deleteCompanyDepartment
} from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

const depart_type = [
  { key: 'day', display_name: '日間服務' },
  { key: 'live', display_name: '居住服務' },
  { key: 'job', display_name: '就業服務' }
]
export default {
  data() {
    return {
      temp: {
        company_id: this.id,
        service_type: '',
        depart_name: '',
        address: '',
        tel: '',
        house_type: '',
        have_elevator: '',
        house_nature: '',
        rent: '',
        floor: '',
        floor_area: '',
        parlor_count: '',
        bathroom_count: '',
        room_count: '',
        bed_count: '',
        work_time: '',
        work_hour: '',
        salary: '',
        depart_type: 'day'
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      depart_type,
      rules: {
        depart_type: [
          { required: true, message: '請輸入姓名', trigger: 'change' }
        ],
        service_type: [
          { required: true, message: '請輸入姓名', trigger: 'change' },
          { max: 20, message: '姓名最長為 20 個字', trigger: 'change' }
        ],
        depart_name: [
          { required: true, message: '請輸入身分證字號', trigger: 'change' },
          { min: 10, max: 10, message: '身分證長度為10個字', trigger: 'change' }
        ],
        address: [{ required: true, message: '請選擇日期', trigger: 'change' }],
        tel: [{ required: true, message: '請選擇日期', trigger: 'change' }],
        house_type: [
          { required: true, message: '請選擇日期', trigger: 'change' }
        ],
        have_elevator: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        house_nature: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        rent: [{ required: true, message: '請選擇性別', trigger: 'change' }],
        floor: [{ required: true, message: '請選擇性別', trigger: 'change' }],
        floor_area: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        parlor_count: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        bathroom_count: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        room_count: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        bed_count: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        work_time: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        work_hour: [
          { required: true, message: '請選擇性別', trigger: 'change' }
        ],
        salary: [{ required: true, message: '請選擇性別', trigger: 'change' }],
        content: [{ required: true, message: '請選擇性別', trigger: 'change' }]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        day: 'success',
        live: 'gray',
        job: 'danger'
      }
      return statusMap[status]
    },
    valueFilter(value) {
      const valueMap = {
        day: '日間',
        live: '居住',
        job: '就業'
      }
      return valueMap[value]
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['id', 'users', 'plans', 'departs'])
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'GetCompanyPlanList',
      'GetCompanyDepartmentList'
    ]),
    fetchData() {
      this.listLoading = true
      this.GetCompanyDepartmentList(this.id).then(response => {
        this.listLoading = false
        this.GetCompanyPlanList(this.id)
        this.GetUserList(this.id)
      })
    },
    resetTemp() {
      this.temp = {
        company_id: this.id,
        service_type: '',
        depart_name: '',
        address: '',
        tel: '',
        house_type: '',
        have_elevator: '',
        house_nature: '',
        rent: '',
        floor: '',
        floor_area: '',
        parlor_count: '',
        bathroom_count: '',
        room_count: '',
        bed_count: '',
        work_time: '',
        work_hour: '',
        salary: '',
        depart_type: 'day'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.depart')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createCompanyDepartment(this.temp).then(response => {
            this.departs.unshift(this.temp)
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
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.depart')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateCompanyDepartment(tempData, this.temp.depart_id).then(() => {
            for (const v of this.departs) {
              if (v.id === this.temp.id) {
                const index = this.departs.indexOf(v)
                this.departs.splice(index, 1, this.temp)
                break
              }
            }
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
        deleteCompanyDepartment(row.depart_id).then(() => {
          const index = this.departs.indexOf(row)
          this.departs.splice(index, 1)
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
