<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本資料" name="first">
        <h5>一、基本資料</h5>
        <table class="table">
          <tr>
            <th>姓名</th>
            <td colspan="2"></td>
            <th>出生日期</th>
            <td colspan="2"></td>
            <td rowspan="3"></td>
          </tr>
          <tr>
            <th>性別</th>
            <td colspan="2"></td>
            <th>身分證字號</th>
            <td colspan="2"></td>
          </tr>
          <tr>
            <th>手冊核發日期</th>
            <td colspan="2"></td>
            <th>後續鑑定日期</th>
            <td colspan="2"></td>
          </tr>
          <tr>
            <th rowspan="10">障礙類別</th>
          </tr>
          <tr>
            <th>第一大類</th>
            <td colspan="6">
              <p-check class="p-default p-smooth p-bigger" color="warning" value="obstacles" v-model="service_people">智能/發展障礙</p-check>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="old" v-model="service_people">高齡</p-check>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="spirit" v-model="service_people">精神/行為健康</p-check>
              <p-check class="p-default p-smooth p-bigger" color="warning" value="Special" v-model="service_people">特殊教育</p-check>
              其他<input class="v-form-group" required/>
            </td>
          </tr>
          <tr>
            <th>第二大類</th>
            <td colspan="6"></td>
          </tr>
          <tr>
            <th>第三大類</th>
            <td colspan="6"></td>
          </tr>
          <tr>
            <th>第四大類</th>
            <td colspan="6"></td>
          </tr>
          <tr>
            <th>第五大類</th>
            <td colspan="6"></td>
          </tr>
          <tr>
            <th>第六大類</th>
            <td colspan="6"></td>
          </tr>
          <tr>
            <th>第七大類</th>
            <td colspan="6"></td>
          </tr>
          <tr>
            <th>第八大類</th>
            <td colspan="6"></td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="支持強度量表(SIS)" name="second">
        <table class="table">
          <tr>
            <th colspan="6" class="bg-gray">服務對象資訊</th>
          </tr>
          <tr>
            <th>姓名</th>
            <td></td>
            <th>性別</th>
            <td></td>
            <th>出生日期</th>
            <td></td>
          </tr>
          <tr>
            <th>地址</th>
            <td colspan="3"></td>
            <th>電話</th>
            <td></td>
          </tr>
          <tr>
            <th>服務提供單位</th>
            <td colspan="5"></td>
          </tr>
          <tr>
            <th>服務提供單位地址</th>
            <td colspan="5"></td>
          </tr>
          <tr>
            <th>機構連絡人</th>
            <td colspan="3"></td>
            <th>電話</th>
            <td></td>
          </tr>
          <tr>
            <th colspan="6" class="bg-gray">受訪者資訊</th>
          </tr>
          <tr>
            <th colspan="3">受訪者姓名</th>
            <th colspan="3">關係</th>
          </tr>
          <tr>
            <th colspan="6" class="bg-gray">訪員資訊</th>
          </tr>
          <tr>
            <th>訪員姓名</th>
            <td colspan="3"></td>
            <th>聯絡電話</th>
            <td colspan="3"></td>
          </tr>
          <tr>
            <th>郵件信箱</th>
            <td colspan="5"></td>
          </tr>
          <tr>
            <th>訪談日期</th>
            <td colspan="3"></td>
            <th>報告填寫日期</th>
            <td colspan="3"></td>
          </tr>
        </table>
        <h5>● 訪談表</h5>
        <table class="table">
          <tr class="bg-gray">
            <th colspan="4">第一(A)部分:特殊醫療及行為支持需求</th>
            <th colspan="4">第一(B)部分: 特殊行為支持需求</th>
          </tr>
          <tr>
            <th width="200px">需要的特殊醫療支持</th>
            <th>不需要支持</th>
            <th>需要部分支持</th>
            <th>需要廣泛與多元支持</th>
            <th>需要的特殊行為支持</th>
            <th>不需要支持</th>
            <th>需要部分支持</th>
            <th>需要廣泛與多元支持</th>
          </tr>
          <tr>
            <td colspan="4">呼吸道照顧</td>
            <td colspan="4">外在導向的行為</td>
          </tr>
          <tr>
            <td>1.吸入性治療或氧氣治療</td>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>1.避免情緒失控</td>
            <td>0</td>
            <td>1</td>
            <td>2</td>
          </tr>
          
        </table>
      </el-tab-pane>
      <el-tab-pane label="我的支持計畫" name="three">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column align="center" label='第一(A)部分:特殊醫療及行為支持需求' width="95">
            <el-table-column label="需要的特殊醫療支持" width="250px">
              <template slot-scope="scope">
                {{scope.row.title}}
              </template>
            </el-table-column>
            <el-table-column label="不需要支持">
            </el-table-column>
            <el-table-column label="需要部分支持">
            </el-table-column>
            <el-table-column label="需要廣泛與多元支持">
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label='第一(B)部分: 特殊行為支持需求' width="95">
            <el-table-column label="需要的特殊行為支持" width="250px">
            </el-table-column>
            <el-table-column label="不需要支持">
            </el-table-column>
            <el-table-column label="需要部分支持">
            </el-table-column>
            <el-table-column label="需要廣泛與多元支持">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="個別化支持服務計畫" name="four">
      </el-tab-pane>
      <el-tab-pane label="ISP會議記錄" name="five">
      </el-tab-pane>
      <el-tab-pane label="個人成果量表(POS)" name="six">
      </el-tab-pane>
      <el-tab-pane label="社區生活技能評量表" name="seven">
      </el-tab-pane>
      <el-tab-pane label="統計分析" name="eight">
      </el-tab-pane>
      <el-tab-pane label="個案管理" name="night">
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <table class="table day" border="1">
        <tr>
          <th>姓名</th>
          <td>
            <el-input v-model="temp.name"></el-input>
          </td>
          <th>照片</th>
          <td></td>
        </tr>
        <tr>
          <th>就職日期</th>
          <td>
            <el-input v-model="temp.work_start_date"></el-input>
          </td>
          <th>工作狀態</th>
          <td>
              <el-radio v-for="item in work_status" :key="item.key" :label="item" v-model="temp.work_status">{{item}}</el-radio>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
          <th>E-mail</th>
          <td>
            <el-input v-model="temp.email"></el-input>
          </td>
        </tr>
        <tr>
          <th>聯絡住址</th>
          <td colspan="3">
            <el-input v-model="temp.adress"></el-input>
          </td>
        </tr>
        <tr>
          <th>部門或單位</th>
          <td>
            <el-input v-model="temp.depart_name"></el-input>
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
          <th colspan="4" class="bg-grap">權限</th>
        </tr>
        <tr>
          <th>角色</th>
          <td colspan="3">
            <el-checkbox-group v-model="temp.role">
              <el-checkbox v-for="item in role" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <th>審核</th>
          <td>
            <el-checkbox-group v-model="temp.approve_status">
              <el-checkbox v-for="item in approve_status" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
            
          </td>
          <th>個人收入</th>
          <td>
            <el-radio v-for="item in income" :key="item.key" :label="item" v-model="temp.income">{{item}}</el-radio>
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
import { getSisData } from '@/api/person'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      textMap: {
        update: '編輯',
        create: '新增'
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      activeName: 'first'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        服務中: 'success',
        暫停: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getSisData(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        member_id: undefined,
        name: '',
        avatar: '',
        work_start_date: '',
        work_end_date: '',
        work_status: '',
        tel: '',
        email: '',
        adress: '',
        depart_name: '',
        work_title: '',
        plan_name: '',
        team_name: '',
        role: [],
        approve_status: [],
        income: [],
        is_del: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
