<template>
  <div class="app-container">
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
  </div>
</template>

<script>
import { getServuceUser } from '@/api/person'
import { mapGetters } from 'vuex'
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
      item: null,
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
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    this.fetchData()
    // console.log(this.id)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getServuceUser(19).then(response => {
        this.item = response.data
        console.log(this.item)
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
