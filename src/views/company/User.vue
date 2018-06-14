<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-table :data="item" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='編號' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          {{scope.row.avatar}}
        </template>
      </el-table-column>
      <el-table-column label="部門" align="center">
        <template slot-scope="scope">
          {{scope.row.depart_name}}
        </template>
      </el-table-column>
      <el-table-column label="職稱" align="center">
        <template slot-scope="scope">
          {{scope.row.work_title}}
        </template>
      </el-table-column>
      <el-table-column label="計畫" align="center">
        <template slot-scope="scope">
          {{scope.row.plan_name}}
        </template>
      </el-table-column>
      <el-table-column label="團隊" align="center">
        <template slot-scope="scope">
          {{scope.row.team_name}}
        </template>
      </el-table-column>
      <el-table-column label="工作狀態" align="center">
        <template slot-scope="scope">
          {{scope.row.work_status}}
        </template>
      </el-table-column>
      <el-table-column label="就職日期" align="center">
        <template slot-scope="scope">
          {{scope.row.work_start_date}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">編輯</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table border="1" class="table">
          <tr>
            <th>姓名</th>
            <td>
              <input type="text" class="form-control">
            </td>
            <th>照片</th>
            <td> </td>
          </tr>
          <tr>
            <th>就職日期</th>
            <td>
              <input type="text" class="form-control">
            </td>
            <th>工作狀態</th>
            <td>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">就職</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2">離職</label>
              </div>
            </td>
          </tr>
          <tr>
            <th>電話</th>
            <td>
                <input type="text" class="form-control">
            </td>
            <th>E-mail</th>
            <td>
              <input type="text" class="form-control">
            </td>
          </tr>
          <tr>
            <th>聯絡住址</th>
            <td colspan="3">
              <input type="text" class="form-control">
            </td>
          </tr>
          <tr>
            <th>部門或單位</th>
            <td>
              <input type="text" class="form-control">
            </td>
            <th>職稱</th>
            <td>
              <input type="text" class="form-control">
            </td>
          </tr>
          <tr>
            <th>方案計畫名稱</th>
            <td colspan="3">
              <input type="text" class="form-control">
            </td>
          </tr>
          <tr>
            <th>所屬團隊</th>
            <td colspan="3">
              <input type="text" class="form-control">
            </td>
          </tr>
          <tr>
            <th colspan="4" class="bg-grap">權限</th>
          </tr>
          <tr>
            <th>角色</th>
            <td colspan="3">
              <div class="d-inline-block">
                <vuestic-checkbox :label="'組織管理員' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'組織主管' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'部門主管' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'組/科/室主管' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'ISP促進者' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'執行監督者' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'支持者' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'OEES訪員' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'SIS訪員' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'POS訪員' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'服務對象/家屬' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>

              <!-- <div class="d-inline-block"> -->
                <!-- <vuestic-checkbox :label="'組織管理員' | translate" :id="'checkbox1'" v-model="checkboxOneModel"></vuestic-checkbox> -->
                  <!-- <div class="radio abc-radio abc-radio-primary">
                    <input type="radio" name="radio1" id="radio1" value="option1" checked>
                    <label for="radio1">
                          <span class="abc-label-text">Radio</span>
                    </label>
                </div> -->
              <!-- </div> -->
            </td>
          </tr>
          <tr>
            <th>審核</th>
            <td>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'SIS' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'POS' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'社區生活技能' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
              <div class="d-inline-block">
                <vuestic-checkbox :label="'ISP及會議紀錄' | translate" :id="'checkbox2'" v-model="checkboxTwoModel"></vuestic-checkbox>
              </div>
            </td>
            <th>個人收入</th>
            <td>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">無</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2">檢視</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                <label class="form-check-label" for="inlineRadio3">編輯</label>
              </div>
            </td>
          </tr>
        </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="updateData()">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/company'

export default {
  data() {
    return {
      item: null,
      listLoading: true,
      temp: {
        username: '',
        email: '',
        avatar: '',
        work_start_date: '',
        phone: '',
        adress: '',
        depart_id: '',
        work_title: '',
        plan_id: '',
        team_id: '',
        role_id: [],
        approve_status: '',
        income: '',
        active: ''
      },
      dialogFormVisible: false,
      dialogStatus: ''
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
      };
    },
    handleSelect(item) {
      this.temp.user_id = item.user_id
      this.temp.phone = item.phone
      this.temp.email = item.email
    },
    fetchData() {
      this.listLoading = true
      getUserList().then(response => {
        this.item = response.data
        this.listLoading = false
        console.log(this.item)
      })
    },
    resetTemp() {
      this.temp = {
        username: '',
        email: '',
        avatar: '',
        work_start_date: '',
        phone: '',
        adress: '',
        depart_id: '',
        work_title: '',
        plan_id: '',
        team_id: '',
        role_id: [],
        approve_status: '',
        income: '',
        active: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = '新增人員'
      this.dialogFormVisible = true
    },
    createData() {
      createCompanyPlan(this.temp).then(response => {
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
      this.dialogStatus = '編輯人員'
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
      updateCompanyPlan(tempData, this.temp.plan_id).then(() => {
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
