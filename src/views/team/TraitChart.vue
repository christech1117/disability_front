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
              <th colspan="2">姓名(自評)</th>
              <td>{{temp.company_name}}</td>
              <th>施測日期</th>
              <td>{{temp.company_name}}</td>
            </tr>
            <tr class="title">
              <th>要素</th>
              <th>面向</th>
              <th style="width: 700px;">題項</th>
              <th>分數</th>
              <th>小計</th>
            </tr>
            <tr>
              <th rowspan="10">專業能力</th>
              <th rowspan="3">專業標準</th>
              <td>認識自己與他人的能力範圍</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>使用即時的資訊和客觀的判斷</td>
              <td></td>
            </tr>
            <tr>
              <td>盡可能的減少利益衝突</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">專業道德</th>
              <td>體現公義(公平的對待他人)</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>體現良善(做好事)</td>
              <td></td>
            </tr>
            <tr>
              <td>體現自主性(尊重每個人自我掌控及自我管理的權力)</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">解決問題</th>
              <td>當問題發生時能呈現並描述問題</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>面對問題時維持一個正向及冷靜的態度，能聚焦於思考解決辦法</td>
              <td></td>
            </tr>
            <tr>
              <td>針對所描述的問題能發展及執行有效的解決辦法</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">合計</th>
              <td colspan="2"></td>
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
            <tr>
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
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      temp: {
        compony_id: undefined,
        company_name: '',
        member_name: '',
        tel: '',
        email: '',
        service_area: '',
        user_count: '',
        member_count: '',
        service_people: '',
        people_age: '',
        budget: '',
        service_content: '',
        created_at: new Date(),
        updated_at: new Date()
      },
      activeName: 'first'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  background-color: #c8f9c5;
}
</style>
