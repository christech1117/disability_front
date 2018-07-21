<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleUpdate()" type="warning" icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
    </div>
    <table class="table">
      <tr>
        <th>{{ $t('company_basic.company_name') }}</th>
        <td colspan="3">{{ item.company_name }}</td>
      </tr>
      <tr>
        <th>{{ $t('company_basic.user_name') }}</th>
        <td>{{ item.username }}</td>
        <th>{{ $t('company_basic.tel') }}</th>
        <td>{{ item.tel }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td colspan="3">{{ item.email }}</td>
      </tr>
      <tr colspan="4">
        <th>{{ $t('company_basic.service_area') }}</th>
        <td colspan="3">
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="city" v-model="item.service_area">都市</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="suburb" v-model="item.service_area">郊區</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="complex" v-model="item.service_area">綜合</p-radio>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company_basic.serviceUser_count') }}</th>
        <td>{{ item.service_count }}</td>
        <th>{{ $t('company_basic.user_count') }}</th>
        <td>{{ item.user_count }}</td>
      </tr>
      <tr>
        <th>{{ $t('company_basic.service_people') }}</th>
        <td colspan="3">
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="obstacles" v-model="item.service_people">智能/發展障礙</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="old" v-model="item.service_people">高齡</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="spirit" v-model="item.service_people">精神/行為健康</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Special" v-model="item.service_people">特殊教育</p-radio>
          <span>{{ $t('company_basic.other') }}<span class="bottom-line">{{ item.service_other }}</span></span>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company_basic.age_percentage') }}</th>
        <td colspan="3">
          <p>兒童 0 ~ 12 歲：</p>
          <p>青少年 13 ~ 18 歲：</p>
          <p>高齡 65+ 歲：</p>
          <p>成人 19 ~ 65 歲：</p>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company_basic.budget') }}</th>
        <td colspan="3">{{ item.budget }}</td>
      </tr>
      <tr>
        <th>{{ $t('company_basic.service_content') }}</th>
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
              <span>{{ $t('company_basic.other') }}<span class="bottom-line">{{ item.other }}</span></span>
            </li>
          </ol>
        </td>
      </tr>
    </table>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table">
        <tr>
          <th>{{ $t('company_basic.company_name') }}</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.company_name" v-validate="'required'" maxlength="20" name="company_name" type="text">
            <span class="error-message" v-show="errors.has('company_name')"  >{{ errors.first('company_name') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company_basic.user_name') }}</th>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="temp.username"
              :fetch-suggestions="querySearch"
              placeholder="請選擇聯絡人"
              @select="handleSelect"
            ></el-autocomplete>
          </td>
          <th>{{ $t('company_basic.tel') }}</th>
          <td>
            <input class="c-input" v-model="temp.tel" v-validate="'required|phone'" maxlength="10" name="phone" type="text">
            <span class="error-message" v-show="errors.has('phone')"  >{{ errors.first('phone') }}</span>
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.email" v-validate="'required|email'" name="email" type="text">
            <span class="error-message" v-show="errors.has('email')"  >{{ errors.first('email') }}</span>
          </td>
        </tr>
        <tr colspan="4">
          <th>{{ $t('company_basic.service_area') }}</th>
          <td colspan="3">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="city" v-model="temp.service_area">都市</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="suburb" v-model="temp.service_area">郊區</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="complex" v-model="temp.service_area">綜合</p-radio>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company_basic.serviceUser_count') }}</th>
          <td>{{ item.service_count }}</td>
          <th>{{ $t('company_basic.user_count') }}</th>
          <td>{{ item.user_count }}</td>
        </tr>
        <tr>
          <th>{{ $t('company_basic.service_people') }}</th>
          <td colspan="3">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="obstacles" v-model="temp.service_people">智能/發展障礙</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="old" v-model="temp.service_people">高齡</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="spirit" v-model="temp.service_people">精神/行為健康</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="Special" v-model="temp.service_people">特殊教育</p-radio>
            <label for="service_other">{{ $t('company_basic.other') }}</label>
            <input id="service_other" class="c-other-input" v-model="temp.service_other" v-validate="'required'" maxlength="100" name="service_other" type="text">
            <div class="error-message" v-show="errors.has('service_other')"  >{{ errors.first('service_other') }}</div>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company_basic.age_percentage') }}</th>
          <td colspan="3">
            <p>兒童 0 ~ 12 歲：</p>
            <p>青少年 13 ~ 18 歲：</p>
            <p>高齡 65+ 歲：</p>
            <p>成人 19 ~ 65 歲：</p>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company_basic.budget') }}</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.budget" v-validate="'required|numeric'" name="budget" type="text">
            <span class="error-message" v-show="errors.has('budget')"  >{{ errors.first('budget') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company_basic.service_content') }}</th>
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
                <label for="other">{{ $t('company_basic.other') }}</label>
                <input id="other" class="c-other-input" v-model="temp.other" v-validate="'required'" maxlength="100" name="other" type="text">
                <span class="error-message" v-show="errors.has('other')"  >{{ errors.first('other') }}</span>
              </li>
            </ol>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="updateData()">{{ $t('table.save') }}</el-button>
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
        service_other: '',
        budget: '',
        daytime: '',
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
      this.dialogStatus = this.$t('table.edit') + ' ' + this.$t('route.company_basic')
      this.dialogFormVisible = true
    },
    updateData() {
      const errors = this.errors.items
      if (errors.length === 0) {
        const tempData = Object.assign({}, this.temp)
        updateCompanyBasic(tempData, this.id).then(() => {
          this.fetchData()
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: this.$t('table.save')
          })
        })
      }
    }
  }
}
</script>
