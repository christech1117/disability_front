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
          {{scope.row.value}}
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
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-select v-if="dialogStatus=='create'" class="filter-item" v-model="temp.depart_type" :placeholder="$t('table.select') + $t('company.service_type')">
        <el-option
          v-for="item in depart_type"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        ></el-option>
      </el-select>
      <table class="table day" border="1" v-if="temp.depart_type === 'day'">
        <tr>
          <th>{{ $t('company.service_type') }}</th>
          <td>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="day_care" v-model="temp.service_type">日間照顧</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="day_active" v-model="temp.service_type">日間活動(含休閒、工作)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="temp.service_type">社區日間作業設施</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="group_work" v-model="temp.service_type">小組工作安置</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="other" v-model="temp.service_type">其他</p-radio>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.depart_name') }}</th>
          <td>
            <input class="c-input" v-model="temp.value" v-validate="'required'" maxlength="20" name="depart_name" type="text">
            <span class="error-message" v-show="errors.has('depart_name')"  >{{ errors.first('depart_name') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.plan') }}</th>
          <td>
            <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
              <el-option
                v-for="item in plans"
                :key="item.value"
                :label="item.value"
                :value="item.plan_id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.principal') }}</th>
          <td>
            <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.service_type')">
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
          <th>{{ $t('company.address') }}</th>
          <td>
            <input class="c-input" v-model="temp.address" v-validate="'required'" maxlength="20" name="address" type="text">
            <span class="error-message" v-show="errors.has('address')"  >{{ errors.first('address') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.tel') }}</th>
          <td>
            <input class="c-input" v-model="temp.tel" v-validate="'required|numeric|tel'" maxlength="10" name="tel" type="text">
            <span class="error-message" v-show="errors.has('tel')"  >{{ errors.first('tel') }}</span>
          </td>
        </tr>
      </table>
      <table class="table day" border="1" v-else-if="temp.depart_type === 'live'">
        <tr>
          <th>{{ $t('company.service_type') }}</th>
          <td colspan="7">
            <!-- <p-radio class="p-default p-smooth p-bigger" color="warning" value="city" v-model="temp.job">庇護性就業</p-radio> -->
            <!-- <p-radio
              class="p-default p-smooth p-bigger"
              color="warning"
              v-for="item in live_service_type"
              :key="item.key"
              v-model="temp.service_type"
              value=""
            >{{item}}</p-radio> -->
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="large" v-model="temp.service_type">大型機構(>200人)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="small" v-model="temp.service_type">小型機構(30人~200人)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="night" v-model="temp.service_type">夜間型住宿機構(&lt;29人)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="temp.service_type">小組工作安置</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="family" v-model="temp.service_type">與家人同住(&lt;6人)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="outside" v-model="temp.service_type">自己在外面居住</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="other" v-model="temp.service_type">其他(</p-radio>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td colspan="7">
            <input class="c-input" v-model="temp.value" v-validate="'required'" maxlength="10" name="depart_name" type="text">
            <span class="error-message" v-show="errors.has('depart_name')"  >{{ errors.first('depart_name') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.plan') }}</th>
          <td colspan="7">
            <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
              <el-option
                v-for="item in plans"
                :key="item.value"
                :label="item.value"
                :value="item.plan_id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.principal') }}</th>
          <td colspan="7">
            <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.principal')">
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
          <th>地址</th>
          <td colspan="7">
            <input class="c-input" v-model="temp.address" v-validate="'required'" maxlength="10" name="address" type="text">
            <span class="error-message" v-show="errors.has('address')"  >{{ errors.first('address') }}</span>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td colspan="7">
            <input class="c-input" v-model="temp.tel" v-validate="'required|numeric|tel'" maxlength="10" name="tel" type="text">
            <span class="error-message" v-show="errors.has('tel')"  >{{ errors.first('tel') }}</span>
            
          </td>
        </tr>
        <tr>
          <th>房舍類型</th>
          <td colspan="4">
            <input class="c-input" v-model="temp.house_type" v-validate="'required'" maxlength="10" name="house_type" type="text">
            <span class="error-message" v-show="errors.has('house_type')"  >{{ errors.first('house_type') }}</span>
          </td>
          <th>電梯</th>
          <td colspan="2">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="yes" v-model="temp.have_elevator">有</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.have_elevator">無</p-radio>
          </td>
        </tr>
        <tr>
          <th>房舍性質</th>
          <td colspan="4">
            <input class="c-input" v-model="temp.house_nature" v-validate="'required'" maxlength="10" name="house_nature" type="text">
            <span class="error-message" v-show="errors.has('house_nature')"  >{{ errors.first('house_nature') }}</span>
          </td>
          <th>每月租金</th>
          <td colspan="2">
            <input class="c-input" v-model="temp.rent" v-validate="'required|numeric'" maxlength="10" name="rent" type="text">
            <span class="error-message" v-show="errors.has('rent')"  >{{ errors.first('rent') }}</span>
          </td>
        </tr>
        <tr>
          <th>樓層</th>
          <td colspan="4">
            <input class="c-input" v-model="temp.floor" v-validate="'required'" maxlength="10" name="floor" type="text">
            <span class="error-message" v-show="errors.has('floor')"  >{{ errors.first('floor') }}</span>
          </td>
          <th>樓地板面積</th>
          <td colspan="2">
            <input class="c-input" v-model="temp.floor_area" v-validate="'required'" maxlength="10" name="floor_area" type="text">
            <span class="error-message" v-show="errors.has('floor_area')"  >{{ errors.first('floor_area') }}</span>
          </td>
        </tr>
        <tr>
          <th>客廳數</th>
          <td>
            <input class="c-input" v-model="temp.parlor_count" v-validate="'required'" maxlength="10" name="parlor_count" type="text">
            <span class="error-message" v-show="errors.has('parlor_count')"  >{{ errors.first('parlor_count') }}</span>
          </td>
          <th>衛浴數</th>
          <td>
            <input class="c-input" v-model="temp.bathroom_count" v-validate="'required'" maxlength="10" name="bathroom_count" type="text">
            <span class="error-message" v-show="errors.has('bathroom_count')"  >{{ errors.first('bathroom_count') }}</span>
          </td>
          <th>房間數</th>
          <td>
            <input class="c-input" v-model="temp.room_count" v-validate="'required'" maxlength="10" name="room_count" type="text">
            <span class="error-message" v-show="errors.has('room_count')"  >{{ errors.first('room_count') }}</span>
          </td>
          <th>床位數</th>
          <td>
            <input class="c-input" v-model="temp.bed_count" v-validate="'required'" maxlength="10" name="bed_count" type="text">
            <span class="error-message" v-show="errors.has('bed_count')"  >{{ errors.first('bed_count') }}</span>
          </td>
        </tr>
      </table>
      <table class="table day" border="1" v-else-if="temp.depart_type === 'job'">
        <tr>
          <th>{{ $t('company.service_type') }}</th>
          <td>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="sheltered" v-model="temp.service_type">庇護性就業</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="supportive" v-model="temp.service_type">支持性就業</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="general" v-model="temp.service_type">一般性就業</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="other" v-model="temp.service_type">其他</p-radio>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.depart_name') }}</th>
          <td>
            <el-input v-model="temp.value"></el-input>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.plan') }}</th>
          <td>
            <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
              <el-option
                v-for="item in plans"
                :key="item.value"
                :label="item.value"
                :value="item.plan_id">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.principal') }}</th>
          <td>
            <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.principal')">
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
          <th>{{ $t('company.address') }}</th>
          <td>
            <el-input v-model="temp.address"></el-input>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.tel') }}</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
        <tr>
          <th>工作時間</th>
          <td>
            <el-input v-model="temp.work_time"></el-input>
          </td>
        </tr>
        <tr>
          <th>工作時數</th>
          <td>
            <el-input v-model="temp.work_hour"></el-input>
          </td>
        </tr>
        <tr>
          <th>工資</th>
          <td>
            <el-input v-model="temp.salary"></el-input>
          </td>
        </tr>
        <tr>
          <th>工作內容</th>
          <td>
            <el-input v-model="temp.content"></el-input>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="warning" @click="createData()">{{ $t('table.add') }}</el-button>
        <el-button v-else type="warning" @click="updateData()">{{ $t('table.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createCompanyDepartment, updateCompanyDepartment, deleteCompanyDepartment } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

const depart_type = [
  { key: 'day', display_name: '日間服務' },
  { key: 'live', display_name: '居住服務' },
  { key: 'job', display_name: '就業服務' }
]
const day_service_type = ['日間照顧', '日間活動(含休閒、工作)', '社區日間作業設施', '小組工作安置', '其他']
const live_service_type = ['大型機構(>200人)', '小型機構(30人~200人)', '夜間型住宿機構(<29人)', '社區居住(<6人)', '與家人同住', '自己在外面居住', '其他']
const job_service_type = ['庇護性就業', '支持性就業', '一般性就業', '其他']

export default {
  data() {
    return {
      temp: {},
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      depart_type,
      day_service_type,
      live_service_type,
      job_service_type
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
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'id',
      'users',
      'plans',
      'departs'
    ])
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'GetCompanyPlanList',
      'GetCompanyDepartmentList'
    ]),
    fetchData() {
      this.GetCompanyDepartmentList(this.id).then(response => {
        this.listLoading = false
        this.GetCompanyPlanList(this.id)
        this.GetUserList(this.id)
      })
    },
    resetTemp() {
      this.temp = {
        depart_id: undefined,
        depart_type: 'day',
        depart_name: '',
        plan_name: '',
        username: '',
        adress: '',
        tel: '',
        work_time: '',
        work_hour: '',
        salary: '',
        content: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.depart')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      const filter_temp = {
        depart_id: this.temp.depart_id,
        sub_company_id: this.temp.sub_company_id,
        service_type: this.temp.service_type,
        depart_name: this.temp.value,
        plan_id: this.temp.plan_id,
        plan_name: this.temp.plan_name,
        user_id: this.temp.user_id,
        address: this.temp.address,
        tel: this.temp.tel,
        live_id: this.temp.live_id,
        job_id: this.temp.job_id
      }
      const tempData = Object.assign({}, filter_temp)
      createCompanyDepartment(tempData).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: this.$t('table.add')
        })
        this.fetchData()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.depart')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const filter_temp = {
        depart_id: this.temp.depart_id,
        sub_company_id: this.temp.sub_company_id,
        service_type: this.temp.service_type,
        depart_name: this.temp.value,
        plan_id: this.temp.plan_id,
        plan_name: this.temp.plan_name,
        user_id: this.temp.user_id,
        address: this.temp.address,
        tel: this.temp.tel,
        live_id: this.temp.live_id,
        job_id: this.temp.job_id
      }
      const tempData = Object.assign({}, filter_temp)
      updateCompanyDepartment(tempData, this.temp.depart_id).then(() => {
        console.log(filter_temp)
        this.fetchData()
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: this.$t('table.save')
        })
      })
    },
    handleDelete(row) {
      this.$confirm(this.$t('errorLog.whether_delete'), this.$t('table.info'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      }).then(() => {
        deleteCompanyDepartment(row.depart_id).then(() => {
          this.fetchData()
        })
        this.$message({
          type: 'success',
          message: this.$t('table.delete')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('errorLog.cancel_delete')
        })
      })
    }
  }
}
</script>
