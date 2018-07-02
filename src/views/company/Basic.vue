<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleUpdate()" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
    <table class="table">
      <tr>
        <th>組織\單位名稱</th>
        <td colspan="3">{{ item.company_name }}</td>
      </tr>
      <tr>
        <th>聯絡人姓名</th>
        <td>{{ item.username }}</td>
        <th>電話</th>
        <td>{{ item.tel }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td colspan="3">{{ item.email }}</td>
      </tr>
      <tr colspan="4">
        <th>服務地區類別</th>
        <td colspan="3">
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="city" v-model="item.service_area">都市</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="suburb" v-model="item.service_area">郊區</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="complex" v-model="item.service_area">綜合</p-radio>
        </td>
      </tr>
      <tr>
        <th>服務人數</th>
        <td>{{ item.service_count }}</td>
        <th>全職人員數量</th>
        <td>{{ item.user_count }}</td>
      </tr>
      <tr>
        <th>服務對象類型</th>
        <td colspan="3">
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="obstacles" v-model="item.service_people">智能/發展障礙</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="old" v-model="item.service_people">高齡</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="spirit" v-model="item.service_people">精神/行為健康</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Special" v-model="item.service_people">特殊教育</p-radio>
          其他<input class="v-form-group" required/>
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
        <td colspan="3">{{ item.budget }}</td>
      </tr>
      <tr>
        <th>組織服務內容</th>
        <td colspan="3">
          <ol>
            <li>
              <span>居住 ➔</span>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="large" v-model="item.live">大型機構(>200人)</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="small" v-model="item.live">小型機構(30人~200人)</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="night" v-model="item.live">夜間型住宿機構(&lt;29人)</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="community" v-model="item.live">社區居住(&lt;6人)</p-radio>
            </li>
            <li>
              <p-check class="p-default p-smooth p-bigger p-locked" color="warning" value="daytime" v-model="item.daytime">日間活動</p-check>
            </li>
            <li>
              <span>就業 ➔</span>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Sheltered" v-model="item.job">庇護性就業</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Supportive" v-model="item.job">支持性就業</p-radio>
            </li>
            <li>
              <p-check class="p-default p-smooth p-bigger p-locked" color="warning" value="education" v-model="item.education">教育(學校)</p-check>
            </li>
            <li>
              <span>其他</span>
            </li>
          </ol>
        </td>
      </tr>
    </table>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table">
        <tr>
          <th>組織\單位名稱</th>
          <td colspan="3">
            <el-input v-model="temp.company_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>聯絡人姓名</th>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="temp.username"
              :fetch-suggestions="querySearch"
              placeholder="請選擇聯絡人"
              @select="handleSelect"
            ></el-autocomplete>
          </td>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td colspan="3">
            <el-input v-model="temp.email"></el-input>
          </td>
        </tr>
        <tr colspan="4">
          <th>服務地區類別</th>
          <td colspan="3">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="city" v-model="temp.service_area">都市</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="suburb" v-model="temp.service_area">郊區</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="complex" v-model="temp.service_area">綜合</p-radio>

          </td>
        </tr>
        <tr>
          <th>服務人數</th>
          <td>{{ item.service_count }}</td>
          <th>全職人員數量</th>
          <td>{{ item.user_count }}</td>
        </tr>
        <tr>
          <th>服務對象類型</th>
          <td colspan="3">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="obstacles" v-model="temp.service_people">智能/發展障礙</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="old" v-model="temp.service_people">高齡</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="spirit" v-model="temp.service_people">精神/行為健康</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="Special" v-model="temp.service_people">特殊教育</p-radio>
            其他<input class="v-form-group" required/>
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
          <td colspan="3">
            <el-input v-model="temp.budget"></el-input>
          </td>
        </tr>
        <tr>
          <th>組織服務內容</th>
          <td colspan="3">
            <ol>
              <li>
                <span>居住 ➔</span>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="large" v-model="temp.live">大型機構(>200人)</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="small" v-model="temp.live">小型機構(30人~200人)</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="night" v-model="temp.live">夜間型住宿機構(&lt;29人)</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="community" v-model="temp.live">社區居住(&lt;6人)</p-radio>
              </li>
              <li>
                <p-check class="p-default p-smooth p-bigger" color="warning" value="daytime" v-model="temp.daytime">日間活動</p-check>
              </li>
              <li>
                <span>就業 ➔</span>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="Sheltered" v-model="temp.job">庇護性就業</p-radio>
                <p-radio class="p-default p-smooth p-bigger" color="warning" value="Supportive" v-model="temp.job">支持性就業</p-radio>
              </li>
              <li>
                <p-check class="p-default p-smooth p-bigger" color="warning" value="education" v-model="temp.education">教育(學校)</p-check>
              </li>
              <li>
                <span>其他</span>
              </li>
            </ol>
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
import { getCompanyBasic, updateCompanyBasic, getUserList } from '@/api/company'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      item: [],
      listLoading: true,
      temp: {
        company_name: '',
        tel: '',
        email: '',
        service_area: '',
        service_people: '',
        budget: '',
        daytime: [],
        live: '',
        job: '',
        education: '',
        other: ''
      },
      dialogFormVisible: false,
      dialogStatus: ''
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
      getCompanyBasic(this.id).then(response => {
        this.item = response.data
        this.listLoading = false
      })
      getUserList(this.id).then(response => {
        this.users = response.data
      })
    },
    handleUpdate() {
      this.temp = Object.assign({}, this.item) // copy obj
      this.dialogStatus = '編輯組織基本資料'
      this.dialogFormVisible = true
    },
    updateData(item) {
      const tempData = Object.assign({}, this.temp)
      updateCompanyBasic(tempData, this.id).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      })
    }
  }
}
</script>
