<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <table class="table">
        <tr>
          <th>組織\單位名稱</th>
          <td colspan="3">{{temp.company_name}}</td>
        </tr>
        <tr>
          <th>聯絡人姓名</th>
          <td></td>
          <th>電話</th>
          <td></td>
        </tr>
        <tr>
          <th>Email</th>
          <td colspan="3"></td>
        </tr>
        <tr colspan="4">
          <th>服務地區類別</th>
          <td colspan="3">
            <!-- <p-radio class="p-default p-smooth p-bigger" color="warning" value="city" v-model="service_area">都市</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="suburbs" v-model="service_area">郊區</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="complex" v-model="service_area">綜合</p-radio>
            {{ service_area }} -->
          </td>
        </tr>
                <tr>
          <th>服務人數</th>
          <td></td>
          <th>全職人員數量</th>
          <td></td>
        </tr>
        <tr>
          <th>服務對象類型</th>
          <td colspan="3">
            <!-- <p-check class="p-default p-smooth p-bigger" color="warning" value="obstacles" v-model="service_people">智能/發展障礙</p-check>
            <p-check class="p-default p-smooth p-bigger" color="warning" value="old" v-model="service_people">高齡</p-check>
            <p-check class="p-default p-smooth p-bigger" color="warning" value="spirit" v-model="service_people">精神/行為健康</p-check>
            <p-check class="p-default p-smooth p-bigger" color="warning" value="Special" v-model="service_people">特殊教育</p-check>
              其他<input class="v-form-group" required/>
              {{ service_people }} -->
          </td>
        </tr>
        <tr>
          <th>服務對象年齡層百分比</th>
          <td colspan="3">
            <p>兒童 0 ~ 12 歲：</p>
            <p>青少年 13 ~ 18 歲：</p>
            <p>高齡 65+ 歲：</p>
            <p>成人 19 ~ 65 歲：</p>
          </td>
        </tr>
        <tr>
          <th>年度預算</th>
          <td colspan="3"></td>
        </tr>
        <tr>
          <th>組織服務內容</th>
          <td colspan="3">
            <ol>
              <li>
                <span>居住 ➔</span>
                <!-- <p-check class="p-default p-smooth p-bigger" color="warning" value="a" v-model="service_content">居住 ➔</p-check> -->
                <!-- <p-radio class="p-default p-smooth p-bigger" color="warning" value="large" v-model="live">大型機構(>200人)</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="small" v-model="live">小型機構(30人~200人)</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="night" v-model="live">夜間型住宿機構(&lt;29人)</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="live">社區居住(&lt;6人)</p-radio>
                {{ service_content_live }} -->
              </li>
              <li>
                <p-check class="p-default p-smooth p-bigger" color="warning" value="daytime" v-model="daytime">日間活動</p-check>
              </li>
              <li>
                <span>就業 ➔</span>
                <!-- <p-check class="p-default p-smooth p-bigger" color="warning" value="c" v-model="service_content">就業 ➔</p-check> -->
                <!-- <p-radio class="p-default p-smooth p-bigger" color="warning" value="Sheltered" v-model="job">庇護性就業</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="Supportive" v-model="job">支持性就業</p-radio>
                {{ service_content_job }} -->
              </li>
              <li>
                <p-check class="p-default p-smooth p-bigger" color="warning" value="education" v-model="education">教育(學校)</p-check>
              </li>
              <li>
                <span>其他</span>
              </li>
            </ol>
          </td>
        </tr>
    </table>
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
      }
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
