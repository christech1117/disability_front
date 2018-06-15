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
          {{scope.row.depart_name}}
        </template>
      </el-table-column>
      <el-table-column label="主責人" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="電話" align="center">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleUpdate(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
        <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <table class="table day" border="1" v-if="temp.depart_type === 'day'">
        <tr>
          <th>服務類型</th>
          <td>
            <el-checkbox-group v-model="temp.service_type">
              <el-checkbox v-for="item in day_service_type" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td>
            <el-input v-model="temp.depart_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案</th>
          <td>
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>主責人</th>
          <td>
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td>
            <el-input v-model="temp.adress"></el-input>
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
          <td>
            <el-radio v-for="item in live_service_type" :key="item.key" :label="item" v-model="temp.service_type">{{item}}</el-radio>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td>
            <el-input v-model="temp.depart_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案</th>
          <td>
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>主責人</th>
          <td>
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td>
            <el-input v-model="temp.adress"></el-input>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
      </table>
      <table class="table day" border="1" v-else-if="temp.depart_type === 'job'">
        <tr>
          <th>服務類型</th>
          <td>
            <el-radio v-for="item in job_service_type" :key="item.key" :label="item" v-model="temp.service_type">{{item}}</el-radio>
          </td>
        </tr>
        <tr>
          <th>單位名稱</th>
          <td>
            <el-input v-model="temp.depart_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案</th>
          <td>
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>主責人</th>
          <td>
            <el-select class="filter-item" v-model="temp.depart_type" placeholder="Please select">
              <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td>
            <el-input v-model="temp.adress"></el-input>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyDepartmentList, createCompanyDepartment, updateCompanyDepartment } from '@/api/company'

const depart_type = [
  { key: 'day', display_name: '日間' },
  { key: 'live', display_name: '居住' },
  { key: 'job', display_name: '就業' }
]
const day_service_type = ['日間照顧', '日間活動(含休閒、工作)', '社區日間作業設施', '小組工作安置', '其他']
const live_service_type = ['大型機構(>200人)', '小型機構(30人~200人)', '夜間型住宿機構(<29人)', '社區居住(<6人)', '與家人同住', '自己在外面居住', '其他']
const job_service_type = ['庇護性就業', '支持性就業', '一般性就業', '其他']

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      depart_type,
      day_service_type,
      live_service_type,
      job_service_type,
      temp: {
        depart_id: undefined,
        depart_type: 'day',
        service_type: null,
        depart_name: '',
        plan_name: '',
        member_name: '',
        adress: '',
        tel: '',
        created_at: new Date(),
        updated_at: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '編輯',
        create: '新增'
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
      getCompanyDepartmentList().then(response => {
        this.item = response.data
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        plan_name: '',
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
      console.log(this.temp)
      // const filter_temp = {
      //   company_id: this.temp.company_id,
      //   user_id: this.temp.user_id,
      //   plan_name: this.temp.plan_name,
      //   area_name: this.temp.area_name,
      //   service_start_date: this.temp.service_start_date,
      //   service_end_date: this.temp.service_end_date,
      //   price: this.temp.price,
      //   description: this.temp.description
      // }
      const tempData = Object.assign({}, this.temp)
      createCompanyDepartment(tempData).then(response => {
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const filter_temp = {
        plan_id: this.temp.plan_id,
        plan_name: this.temp.plan_name,
        area_name: this.temp.area_name,
        user_id: this.temp.user_id,
        service_start_date: this.temp.service_start_date,
        service_end_date: this.temp.service_end_date,
        price: this.temp.price,
        description: this.temp.description
      }
      const tempData = Object.assign({}, filter_temp)
      updateCompanyDepartment(tempData, this.temp.plan_id).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDelete(row) {

    }
  }
}
</script>
