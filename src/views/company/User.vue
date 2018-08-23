<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-table :data="users" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.username')" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          <img class="user-avatar" :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column label="單位" align="center">
        <template slot-scope="scope">
          {{scope.row.depart_name}}
        </template>
      </el-table-column>
      <el-table-column label="職稱" align="center">
        <template slot-scope="scope">
          {{scope.row.work_title}}
        </template>
      </el-table-column>
      <el-table-column label="團隊" align="center">
        <template slot-scope="scope">
          {{scope.row.team_name}}
        </template>
      </el-table-column>
      <el-table-column label="工作狀態" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | statusFilter">{{scope.row.active | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="就職日期" align="center">
        <template slot-scope="scope">
          {{scope.row.work_start_date}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <table class="table">
          <tr>
            <th>姓名</th>
            <td>
              <el-form-item prop="username">
                <el-input v-model="temp.username"></el-input>
              </el-form-item>
            </td>
            <th rowspan="2">照片</th>
            <td rowspan="2">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-change="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false">
                <img v-if="temp.avatar" :src="temp.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </td>
          </tr>
          <tr>
            <th>密碼</th>
            <td>
              <el-form-item prop="password">
                <el-input type="password" v-model="temp.password"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>就職日期</th>
            <td>
              <el-form-item prop="work_start_date">
                <el-date-picker value-format="yyyy-MM-dd" v-model="temp.work_start_date" type="date" placeholder="選擇日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>工作狀態</th>
            <td>
              <el-form-item prop="active">
                <el-radio-group v-model="temp.active">
                  <el-radio :label="'1'">就職</el-radio>
                  <el-radio :label="'0'">離職</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>電話</th>
            <td>
              <el-form-item prop="phone">
                <el-input v-model="temp.phone"></el-input>
              </el-form-item>
            </td>
            <th>E-mail</th>
            <td>
              <el-form-item prop="email">
                <el-input v-model="temp.email"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>聯絡住址</th>
            <td colspan="3">
              <el-form-item prop="address">
                <el-input v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>部門或單位</th>
            <td>
              <el-form-item prop="depart_id">
                <el-select v-model="temp.depart_id" :placeholder="$t('table.select') + $t('company.department')">
                  <el-option v-for="item in departs" :key="item.depart_id" :label="item.depart_name" :value="item.depart_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
            <th>職稱</th>
            <td>
              <el-form-item prop="work_title">
                <el-input v-model="temp.work_title"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>方案計畫名稱</th>
            <td colspan="3">
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>所屬團隊</th>
            <td colspan="3">
              <el-form-item prop="team_id">
                <el-select v-model="temp.team_id" :placeholder="$t('table.select') + $t('company.team')">
                  <!-- <el-option v-for="item in teams" :key="item.team_id" :label="item.team_name" :value="item.team_id"> -->
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="4" class="bg-gray">權限</th>
          </tr>
          <tr>
            <th>角色</th>
            <td colspan="3">
              <el-form-item prop="role_id">
                <el-radio-group v-model="temp.role_id">
                  <!-- <el-radio label="admin">組織管理員</el-radio>
                  <el-radio label="company_leader">組織主管</el-radio>
                  <el-radio label="department_leader">部門主管</el-radio>
                  <el-radio label="group_leader">組/科/室主管</el-radio>
                  <el-radio label="isp">ISP促進者</el-radio>
                  <el-radio label="supervisor">執行監督者</el-radio>
                  <el-radio label="supporter">支持者</el-radio>
                  <el-radio label="oees">OEES訪員</el-radio>
                  <el-radio label="sis">SIS訪員</el-radio>
                  <el-radio label="pos">POS訪員</el-radio>
                  <el-radio label="family">服務對象/家屬</el-radio> -->
                  <el-radio label="2">組織管理員</el-radio>
                  <el-radio label="3">組織主管</el-radio>
                  <el-radio label="4">部門主管</el-radio>
                  <el-radio label="5">組/科/室主管</el-radio>
                  <el-radio label="6">ISP促進者</el-radio>
                  <el-radio label="7">執行監督者</el-radio>
                  <el-radio label="8">支持者</el-radio>
                  <el-radio label="9">OEES訪員</el-radio>
                  <el-radio label="10">SIS訪員</el-radio>
                  <el-radio label="11">POS訪員</el-radio>
                  <el-radio label="12">服務對象/家屬</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>審核</th>
            <td>
              <el-form-item prop="approve_status">
                <el-checkbox-group v-model="temp.approve_status">
                  <el-checkbox label="sis">SIS</el-checkbox>
                  <el-checkbox label="pos">POS</el-checkbox>
                  <el-checkbox label="community">社區生活技能</el-checkbox>
                  <el-checkbox label="isp">ISP及會議紀錄</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
            <th>個人收入</th>
            <td>
              <el-form-item prop="income">
                <el-radio-group v-model="temp.income">
                  <el-radio :label="'no'">無</el-radio>
                  <el-radio :label="'look'">檢視</el-radio>
                  <el-radio :label="'edit'">編輯</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="success" @click="createData()" icon="el-icon-check" circle></el-button>
        <el-button v-else type="success" @click="updateData()" icon="el-icon-check" circle></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, updateUser, deleteUser } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {
        company_id: this.id,
        user_id: '',
        username: '',
        password: '',
        avatar: '',
        work_start_date: '',
        active: '',
        phone: '',
        email: '',
        address: '',
        work_title: '',
        role_id: '',
        approve_status: [],
        role_name: [],
        income: '',
        depart_id: '',
        depart_name: '',
        team_id: '',
        plan_id: '',
        plan_name: ''
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      rules: {
        username: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.username'),
            trigger: 'change'
          },
          { max: 20, message: '姓名最長為 20 個字', trigger: 'change' }
        ],
        password: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.password'),
            trigger: 'change'
          }
        ],
        work_start_date: [
          {
            required: true,
            message: this.$t('table.select') + '就職日期',
            trigger: 'change'
          }
        ],
        active: [
          {
            required: true,
            message: this.$t('table.select') + '工作狀態',
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('table.select') + '電話',
            trigger: 'change'
          }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: this.$t('table.input') + '正確的信箱',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: this.$t('table.input') + '聯絡住址',
            trigger: 'change'
          }
        ],
        work_title: [
          {
            required: true,
            message: this.$t('table.input') + '職稱',
            trigger: 'change'
          }
        ],
        role_id: [
          {
            required: true,
            message: this.$t('table.select') + '角色權限',
            trigger: 'change'
          }
        ],
        approve_status: [
          {
            required: true,
            message: this.$t('table.select') + '審核權限',
            trigger: 'change'
          }
        ],
        income: [
          {
            required: true,
            message: this.$t('table.select') + '個人收入權限',
            trigger: 'change'
          }
        ]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '0': 'danger'
      }
      return statusMap[status]
    },
    valueFilter(value) {
      const valueMap = {
        '1': '就職',
        '0': '離職'
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
    handleAvatarSuccess(res, file) {
      this.temp.avatar = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG || !isPNG) {
        this.$message.error('上傳照片只能是 JPG 或 PNG 格式')
      }
      if (!isLt2M) {
        this.$message.error('上傳照片大小不能超過 2MB')
      }
      return isJPG && isPNG && isLt2M
    },
    fetchData() {
      this.listLoading = true
      this.GetUserList(this.id).then(response => {
        this.listLoading = false
        this.GetCompanyPlanList(this.id)
        this.GetCompanyDepartmentList(this.id)
      })
    },
    resetTemp() {
      this.temp = {
        company_id: this.id,
        user_id: '',
        username: '',
        password: '',
        avatar: '',
        work_start_date: '',
        active: '',
        phone: '',
        email: '',
        address: '',
        work_title: '',
        role_id: '',
        approve_status: [],
        role_name: [],
        income: '',
        depart_id: '',
        depart_name: '',
        team_id: '',
        plan_id: '',
        plan_name: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.user')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.approve_status = this.temp.approve_status.toString()
          createUser(this.temp).then(response => {
            // this.$refs.upload.submit()
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
      this.temp.approve_status = this.temp.approve_status.split(',')
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.user')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.approve_status = this.temp.approve_status.toString()
          const filter_temp = {
            company_id: this.id,
            user_id: this.temp.user_id,
            username: this.temp.username,
            password: this.temp.password,
            avatar: this.temp.avatar,
            work_start_date: this.temp.work_start_date,
            phone: this.temp.phone,
            email: this.temp.email,
            address: this.temp.address,
            depart_id: this.temp.depart_id,
            depart_name: this.temp.depart_name,
            work_title: this.temp.work_title,
            plan_id: this.temp.plan_id,
            plan_name: this.temp.plan_name,
            team_id: this.temp.team_id,
            role_id: this.temp.role_id,
            approve_status: this.temp.approve_status,
            role_name: this.temp.role_name,
            income: this.temp.income,
            active: this.temp.active
          }
          const tempData = Object.assign({}, filter_temp)
          updateUser(tempData, this.temp.user_id).then(() => {
            // this.$refs.upload.submit()
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
        deleteUser(row.user_id).then(() => {
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