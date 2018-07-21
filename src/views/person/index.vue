<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="基本資料"><basic></basic></el-tab-pane>
      <el-tab-pane label="支持強度量表(SIS)"><sis></sis></el-tab-pane>
      <el-tab-pane label="我的支持計畫"><support-plan></support-plan></el-tab-pane>
      <el-tab-pane label="個別化支持服務計畫"><support-service></support-service></el-tab-pane>
      <el-tab-pane label="ISP會議記錄"><isp></isp></el-tab-pane>
      <el-tab-pane label="個人成果量表(POS)"><pos></pos></el-tab-pane>
      <el-tab-pane label="社區生活技能評量表"><community></community></el-tab-pane>
      <el-tab-pane label="統計分析"><statistic></statistic></el-tab-pane>
      <el-tab-pane label="個案管理"><case></case></el-tab-pane>
    </el-tabs>
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
  </div>
</template>

<script>
// import { getSisData } from '@/api/person'
import Basic from './Basic'
import Sis from './Sis'
import SupportPlan from './SupportPlan'
import SupportService from './SupportService'
import Isp from './Isp'
import Pos from './Pos'
import Community from './Community'
import Statistic from './Statistic'
import Case from './Case'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      tabPosition: 'right',
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
  components: { Basic, Sis, SupportPlan, SupportService, Isp, Pos, Community, Statistic, Case },
  props: {
    isEdit: {
      type: Boolean,
      default: false
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
    console.log()
    // if (this.isEdit) {
    //   const id = this.$route.params && this.$route.params.id
    //   this.fetchData(id)
    // } else {
    //   this.postForm = Object.assign({}, defaultForm)
    // }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getSisData(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   this.listLoading = false
      // })
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
