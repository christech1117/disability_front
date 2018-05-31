<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自評" name="first">
          <table class="table">
            <tr>
              <th>成功團隊要素</th>
              <th>成長需求</th>
              <th>成長策略</th>
              <th>成長目標</th>
              <th>執行條件</th>
              <th>監督條件</th>
              <th>目標結果</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="團隊評量" name="second">
          <table class="table">
            <tr>
              <th>團隊類別</th>
              <td>{{temp.company_name}}</td>
              <th>團隊名稱</th>
              <td>{{temp.company_name}}</td>
            </tr>
            <tr class="title">
              <th>施測者</th>
              <td>{{temp.company_name}}</td>
              <th>施測日期</th>
              <td>{{temp.company_name}}</td>
            </tr>
            <tr>
              <th>成員姓名</th>
              <td colspan="3"></td>
            </tr>
          </table>
          <table class="table">
            <tr class="bg-green">
              <th>要素</th>
              <th>面向</th>
              <th>題項</th>
            </tr>
            <tr>
              <th rowspan="10">專業能力</th>
              <th rowspan="3">專業標準</th>
              <td>認識自己與他人的能力範圍</td>
            </tr>
            <tr>
              <td>使用即時的資訊和客觀的判斷</td>
            </tr>
            <tr>
              <td>盡可能的減少利益衝突</td>
            </tr>
            <tr>
              <th rowspan="3">專業道德</th>
              <td>體現公義(公平的對待他人)</td>
            </tr>
            <tr>
              <td>體現良善(做好事)</td>
            </tr>
            <tr>
              <td>體現自主性(尊重每個人自我掌控及自我管理的權力)</td>
            </tr>
            <tr>
              <th rowspan="3">解決問題</th>
              <td>當問題發生時能呈現並描述問題</td>
            </tr>
            <tr>
              <td>面對問題時維持一個正向及冷靜的態度，能聚焦於思考解決辦法</td>
            </tr>
            <tr>
              <td>針對所描述的問題能發展及執行有效的解決辦法</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { getTraitChartDataType, getTraitChartDataSubtype, getTraitChartDataTitle } from '@/api/team'

export default {
  data() {
    return {
      type: null,
      subtype: null,
      title: null,
      listLoading: true,
      textMap: {
        update: '編輯',
        create: '新增'
      },
      temp: {
        type: this.list
        // subtype: this.list['subtype']
      },
      activeName: 'first',
      dialogFormVisible: false
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
      getTraitChartDataType(this.listQuery).then(response => {
        this.type = response.data.items
        this.listLoading = false
      })
      getTraitChartDataSubtype(this.listQuery).then(response => {
        this.subtype = response.data.items
        this.listLoading = false
      })
      getTraitChartDataTitle(this.listQuery).then(response => {
        this.title = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        type: '',
        subtype: []
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
