<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleUpdate()" type="warning" icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
    </div>
    <table class="table" v-loading.body="listLoading" element-loading-text="Loading">
      <tr>
        <th>{{ $t('company.company_name') }}</th>
        <td colspan="3">{{ companyBasic.company_name }}</td>
      </tr>
      <tr>
        <th>{{ $t('company.user_name') }}</th>
        <td>{{ companyBasic.username }}</td>
        <th>{{ $t('company.tel') }}</th>
        <td>{{ companyBasic.tel }}</td>
      </tr>
      <tr>
        <th>{{ $t('table.email') }}</th>
        <td colspan="3">{{ companyBasic.email }}</td>
      </tr>
      <tr colspan="4">
        <th>{{ $t('company.service_area') }}</th>
        <td colspan="3">
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="city" v-model="companyBasic.service_area">都市</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="suburb" v-model="companyBasic.service_area">郊區</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="complex" v-model="companyBasic.service_area">綜合</p-radio>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company.serviceUser_count') }}</th>
        <td>{{ companyBasic.service_count }}</td>
        <th>{{ $t('company.user_count') }}</th>
        <td>{{ companyBasic.user_count }}</td>
      </tr>
      <tr>
        <th>{{ $t('company.service_people') }}</th>
        <td colspan="3">
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="obstacles" v-model="companyBasic.service_people">智能/發展障礙</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="old" v-model="companyBasic.service_people">高齡</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="spirit" v-model="companyBasic.service_people">精神/行為健康</p-radio>
          <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Special" v-model="companyBasic.service_people">特殊教育</p-radio>
          <span>{{ $t('company.other') }}<span class="bottom-line">{{ companyBasic.service_other }}</span></span>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company.age_percentage') }}</th>
        <td colspan="3">
          <p>兒童 0 ~ 12 歲：</p>
          <p>青少年 13 ~ 18 歲：</p>
          <p>高齡 65+ 歲：</p>
          <p>成人 19 ~ 65 歲：</p>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company.budget') }}</th>
        <td colspan="3">{{ companyBasic.budget }}</td>
      </tr>
      <tr>
        <th>{{ $t('company.service_content') }}</th>
        <td colspan="3">
          <ol>
            <li>
              <span>居住 ➔</span>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="large" v-model="companyBasic.live">大型機構(>200人)</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="small" v-model="companyBasic.live">小型機構(30人~200人)</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="night" v-model="companyBasic.live">夜間型住宿機構(&lt;29人)</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="community" v-model="companyBasic.live">社區居住(&lt;6人)</p-radio>
            </li>
            <li>
              <p-check class="p-default p-smooth p-bigger p-locked" color="warning" value="daytime" v-model="companyBasic.daytime">日間活動</p-check>
            </li>
            <li>
              <span>就業 ➔</span>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Sheltered" v-model="companyBasic.job">庇護性就業</p-radio>
              <p-radio class="p-default p-smooth p-bigger p-locked" color="warning" value="Supportive" v-model="companyBasic.job">支持性就業</p-radio>
            </li>
            <li>
              <p-check class="p-default p-smooth p-bigger p-locked" color="warning" value="education" v-model="companyBasic.education">教育(學校)</p-check>
            </li>
            <li>
              <span>{{ $t('company.other') }}<span class="bottom-line">{{ companyBasic.other }}</span></span>
            </li>
          </ol>
        </td>
      </tr>
    </table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <table class="table">
        <tr>
          <th>{{ $t('company.company_name') }}</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.company_name" v-validate="'required'" maxlength="20" name="required" type="text">
            <span class="error-message" v-show="errors.has('required')"  >{{ errors.first('required') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.user_name') }}</th>
          <td>
            <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.contact_person')">
              <el-option
                v-for="item in users"
                :key="item.value"
                :label="item.value"
                :value="item.user_id">
              </el-option>
            </el-select>
          </td>
          <th>{{ $t('company.tel') }}</th>
          <td>
            <input class="c-input" v-model="temp.tel" v-validate="'required|numeric|tel'" maxlength="10" name="tel" type="text">
            <span class="error-message" v-show="errors.has('tel')"  >{{ errors.first('tel') }}</span>
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
          <th>{{ $t('company.service_area') }}</th>
          <td colspan="3">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="city" v-model="temp.service_area">都市</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="suburb" v-model="temp.service_area">郊區</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="complex" v-model="temp.service_area">綜合</p-radio>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.serviceUser_count') }}</th>
          <td>{{ companyBasic.service_count }}</td>
          <th>{{ $t('company.user_count') }}</th>
          <td>{{ companyBasic.user_count }}</td>
        </tr>
        <tr>
          <th>{{ $t('company.service_people') }}</th>
          <td colspan="3">
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="obstacles" v-model="temp.service_people">智能/發展障礙</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="old" v-model="temp.service_people">高齡</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="spirit" v-model="temp.service_people">精神/行為健康</p-radio>
            <p-radio class="p-default p-smooth p-bigger" color="warning" value="Special" v-model="temp.service_people">特殊教育</p-radio>
            <label for="service_other">{{ $t('company.other') }}</label>
            <input id="service_other" class="c-other-input" v-model="temp.service_other" v-validate="'required'" maxlength="100" name="service_other" type="text">
            <div class="error-message" v-show="errors.has('service_other')"  >{{ errors.first('service_other') }}</div>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.age_percentage') }}</th>
          <td colspan="3">
            <p>兒童 0 ~ 12 歲：</p>
            <p>青少年 13 ~ 18 歲：</p>
            <p>高齡 65+ 歲：</p>
            <p>成人 19 ~ 65 歲：</p>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.budget') }}</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.budget" v-validate="'required|numeric'" name="budget" type="text">
            <span class="error-message" v-show="errors.has('budget')"  >{{ errors.first('budget') }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('company.service_content') }}</th>
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
                <label for="other">{{ $t('company.other') }}</label>
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
import { updateCompanyBasic } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {},
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'id',
      'users',
      'companyBasic'
    ])
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'GetCompanyBasic'
    ]),
    fetchData() {
      this.GetCompanyBasic(this.id).then(response => {
        this.listLoading = false
        this.GetUserList(this.id)
      })
    },
    handleUpdate() {
      this.temp = Object.assign({}, this.companyBasic) // copy obj
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('route.company_basic')
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
