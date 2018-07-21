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
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
          <el-tag :type="scope.row.sex | statusFilter">{{scope.row.sex | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.avatar}} -->
        </template>
      </el-table-column>
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          {{scope.row.birthday}}
        </template>
      </el-table-column>
      <el-table-column label="手冊核發日期" align="center">
        <template slot-scope="scope">
          {{scope.row.publish_date}}
        </template>
      </el-table-column>
      <el-table-column label="後續鑑定日期" align="center">
        <template slot-scope="scope">
          {{scope.row.identify_date}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230px">
        <template slot-scope="scope">
          <router-link :to="'/person/serviceUser/'+scope.row.id">
            <el-button type="success" size="mini">選擇</el-button>
          </router-link>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table">
          <tr>
            <th>姓名</th>
            <td>
              <el-input v-model="temp.value"></el-input>
            </td>
            <th>照片</th>
            <td> </td>
          </tr>
          <tr>
            <th>就職日期</th>
            <td>
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="temp.work_start_date"
                  type="date"
                  placeholder="選擇日期">
                </el-date-picker>
              </div>
            </td>
            <th>工作狀態</th>
            <td>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="1" v-model="temp.active">就職</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="0" v-model="temp.active">離職</p-radio>
            </td>
          </tr>
          <tr>
            <th>電話</th>
            <td>
              <el-input v-model="temp.phone"></el-input>
            </td>
            <th>E-mail</th>
            <td>
              <el-input v-model="temp.email"></el-input>
            </td>
          </tr>
          <tr>
            <th>聯絡住址</th>
            <td colspan="3">
              <el-input v-model="temp.address"></el-input>
            </td>
          </tr>
          <tr>
            <th>部門或單位</th>
            <td>
              <el-autocomplete
                class="inline-input"
                v-model="temp.depart_name"
                :fetch-suggestions="querySearch"
                placeholder="請選擇部門或單位"
                @select="handleSelect"
              ></el-autocomplete>
            </td>
            <th>職稱</th>
            <td>
              <el-input v-model="temp.work_title"></el-input>
            </td>
          </tr>
          <tr>
            <th>方案計畫名稱</th>
            <td colspan="3">
              <el-input v-model="temp.plan_name"></el-input>
            </td>
          </tr>
          <tr>
            <th>所屬團隊</th>
            <td colspan="3">
              <el-input v-model="temp.team_name"></el-input>
            </td>
          </tr>
          <tr>
            <th colspan="4" class="bg-gray">權限</th>
          </tr>
          <tr>
            <th>角色</th>
            <td colspan="3">
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="2" v-model="temp.role_id">組織管理員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="3" v-model="temp.role_id">組織主管</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="4" v-model="temp.role_id">部門主管</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="5" v-model="temp.role_id">組/科/室主管</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="6" v-model="temp.role_id">ISP促進者</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="7" v-model="temp.role_id">執行監督者</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="8" v-model="temp.role_id">支持者</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="9" v-model="temp.role_id">OEES訪員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="10" v-model="temp.role_id">SIS訪員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="11" v-model="temp.role_id">POS訪員</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="12" v-model="temp.role_id">服務對象/家屬</p-radio>
            </td>
          </tr>
          <tr>
            <th>審核</th>
            <td>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="sis" v-model="temp.approve_status">SIS</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="pos" v-model="temp.approve_status">POS</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="temp.approve_status">社區生活技能</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="isp" v-model="temp.approve_status">ISP及會議紀錄</p-radio>
            </td>
            <th>個人收入</th>
            <td>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="no" v-model="temp.income">無</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="look" v-model="temp.income">檢視</p-radio>
              <p-radio class="p-default p-smooth p-bigger" color="warning" value="edit" v-model="temp.income">編輯</p-radio>
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
import { getServiceUserList, createServiceUser, updateServiceUser, deleteServiceUser, getServuceUser } from '@/api/person'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      item: null,
      listLoading: true,
      temp: {
        user_id: '',
        value: '', // avatar
        email: '',
        avatar: '',
        work_start_date: '',
        phone: '',
        adress: '',
        depart_id: '',
        depart_name: '',
        work_title: '',
        team_id: '',
        role_id: '',
        income: '',
        approve_status: '',
        active: '',
        company_id: '1',
        password: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '新增人員',
        update: '編輯人員'
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'male': 'success',
        'female': 'danger'
      }
      return statusMap[status]
    },
    valueFilter(value) {
      const valueMap = {
        'male': '男',
        'female': '女'
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
      getServiceUserList(this.id).then(response => {
        this.item = response.data
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        user_id: '',
        value: '', // username
        email: '',
        avatar: '',
        work_start_date: '',
        phone: '',
        adress: '',
        depart_id: '',
        depart_name: '',
        work_title: '',
        team_id: '',
        role_id: '',
        income: '',
        approve_status: '',
        active: '',
        company_id: '1',
        password: ''
      }
    },
    handleSelectUser(row) {
      getServuceUser(row.id).then(response => {
        console.log(response.data)
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      const filter_temp = {
        user_id: this.temp.user_id,
        username: this.temp.value,
        avatar: this.temp.avatar,
        work_start_date: this.temp.work_start_date,
        phone: this.temp.phone,
        email: this.temp.email,
        address: this.temp.address,
        depart_id: this.temp.depart_id,
        work_title: this.temp.work_title,
        plan_name: this.temp.plan_name,
        team_id: this.temp.team_id,
        role_id: this.temp.role_id,
        approve_status: this.temp.approve_status,
        income: this.temp.income,
        active: this.temp.active
      }
      const tempData = Object.assign({}, filter_temp)
      createServiceUser(tempData).then(response => {
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const filter_temp = {
        user_id: this.temp.user_id,
        username: this.temp.value,
        avatar: this.temp.avatar,
        work_start_date: this.temp.work_start_date,
        phone: this.temp.phone,
        email: this.temp.email,
        address: this.temp.address,
        depart_id: this.temp.depart_id,
        work_title: this.temp.work_title,
        plan_name: this.temp.plan_name,
        team_id: this.temp.team_id,
        role_id: this.temp.role_id,
        approve_status: this.temp.approve_status,
        income: this.temp.income,
        active: this.temp.active
      }
      const tempData = Object.assign({}, filter_temp)
      updateServiceUser(tempData, this.temp.user_id).then(() => {
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
        console.log(row.user_id)
        deleteServiceUser(row.user_id).then(() => {
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
