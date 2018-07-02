<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table :data="item" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="單位種類" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.depart_type | statusFilter">{{scope.row.depart_type | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="單位名稱" align="center">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
      <el-table-column label="主責人" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="電話" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-select v-if="dialogStatus=='create'" class="filter-item" v-model="temp.depart_type" placeholder="請選擇服務類型">
        <el-option
          v-for="item in depart_type"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        ></el-option>
      </el-select>
      <table class="table day" border="1" v-if="temp.depart_type === 'day'">
        <tr>
          <th>服務類型</th>
          <td>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="day_care" v-model="temp.service_type">日間照顧</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="day_active" v-model="temp.service_type">日間活動(含休閒、工作)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="temp.service_type">社區日間作業設施</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="group_work" v-model="temp.service_type">小組工作安置</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="other" v-model="temp.service_type">其他</p-radio>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td>
            <el-input v-model="temp.value"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案</th>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="temp.plan_name"
              :fetch-suggestions="querySearchPlan"
              placeholder="請選擇方案"
              @select="handleSelectPlan"
            ></el-autocomplete>
          </td>
        </tr>
        <tr>
          <th>主責人</th>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="temp.username"
              :fetch-suggestions="querySearch"
              placeholder="請選擇主責人"
              @select="handleSelectUser"
            ></el-autocomplete>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td>
            <el-input v-model="temp.address"></el-input>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
      </table>
      <table class="table day" border="1" v-else-if="temp.depart_type === 'live'">
        <tr>
          <th>服務類型</th>
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
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="night" v-model="temp.service_type">夜間型住宿機構(<29人)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="temp.service_type">小組工作安置</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="family" v-model="temp.service_type">與家人同住(<6人)</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="outside" v-model="temp.service_type">自己在外面居住</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="other" v-model="temp.service_type">其他(</p-radio>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td colspan="7">
            <el-input v-model="temp.value"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案</th>
          <td colspan="7">
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>主責人</th>
          <td colspan="7">
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td colspan="7">
            <el-input v-model="temp.address"></el-input>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td colspan="7">
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
        <tr>
          <th>房舍類型</th>
          <td colspan="4">
            <el-input v-model="temp.house_type"></el-input>
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
            <el-input v-model="temp.house_nature"></el-input>
          </td>
          <th>每月租金</th>
          <td colspan="2">
            <el-input v-model="temp.rent"></el-input>
          </td>
        </tr>
        <tr>
          <th>樓層</th>
          <td colspan="4">
            <el-input v-model="temp.floor"></el-input>
          </td>
          <th>樓地板面積</th>
          <td colspan="2">
            <el-input v-model="temp.floor_area"></el-input>
          </td>
        </tr>
        <tr>
          <th>客廳數</th>
          <td>
            <el-input v-model="temp.parlor_count"></el-input>
          </td>
          <th>衛浴數</th>
          <td>
            <el-input v-model="temp.bathroom_count"></el-input>
          </td>
          <th>房間數</th>
          <td>
            <el-input v-model="temp.room_count"></el-input>
          </td>
          <th>床位數</th>
          <td>
            <el-input v-model="temp.bed_count"></el-input>
          </td>
        </tr>
      </table>
      <table class="table day" border="1" v-else-if="temp.depart_type === 'job'">
        <tr>
          <th>服務類型</th>
          <td>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="sheltered" v-model="temp.service_type">庇護性就業</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="supportive" v-model="temp.service_type">支持性就業</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="general" v-model="temp.service_type">一般性就業</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="other" v-model="temp.service_type">其他</p-radio>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td>
            <el-input v-model="temp.value"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案</th>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="temp.plan_name"
              :fetch-suggestions="querySearchPlan"
              placeholder="請選擇方案"
              @select="handleSelectPlan"
            ></el-autocomplete>
          </td>
        </tr>
        <tr>
          <th>主責人</th>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="temp.username"
              :fetch-suggestions="querySearch"
              placeholder="請選擇主責人"
              @select="handleSelectUser"
            ></el-autocomplete>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td>
            <el-input v-model="temp.address"></el-input>
          </td>
        </tr>
        <tr>
          <th>電話</th>
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
        <el-button v-if="dialogStatus=='create'" type="warning" @click="createData()">儲存</el-button>
        <el-button v-else type="warning" @click="updateData()">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyDepartmentList, createCompanyDepartment, updateCompanyDepartment, deleteCompanyDepartment } from '@/api/company'
import { getCompanyPlanList, getUserList } from '@/api/company'
import { mapGetters } from 'vuex'

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
      item: null,
      listLoading: true,
      users: [],
      plans: [],
      depart_type,
      day_service_type,
      live_service_type,
      job_service_type,
      temp: {
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
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '新增單位',
        update: '編輯單位'
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

      // 调用 callback 返回建议列表的数据
      cb(results)
      // cb(plan_results)
    },
    createFilter(queryString) {
      return (users) => {
        return (users.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearchPlan(queryString, cb) {
      var plans = this.plans
      var results = queryString ? plans.filter(this.createFilter(queryString)) : plans

      // 调用 callback 返回建议列表的数据
      cb(results)
      // cb(plan_results)
    },
    handleSelectUser(item) {
      this.temp.user_id = item.user_id
      this.temp.phone = item.phone
      this.temp.email = item.email
    },
    createFilterPlan(queryString) {
      return (plans) => {
        return (plans.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectPlan(item) {
      this.temp.plan_id = item.plan_id
      this.temp.phone = item.phone
      this.temp.email = item.email
    },
    fetchData() {
      this.listLoading = true
      getCompanyDepartmentList(this.id).then(response => {
        this.item = response.data
        this.listLoading = false
      })
      getCompanyPlanList(this.id).then(response => {
        this.plans = response.data
      })
      getUserList(this.id).then(response => {
        this.users = response.data
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
        deleteCompanyDepartment(row.depart_id).then(() => {
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
