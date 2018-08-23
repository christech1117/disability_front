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
        <th>{{ $t('company.phone') }}</th>
        <td>{{ companyBasic.phone }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('table.email') }}</th>
        <td colspan="3">{{ companyBasic.email }}</td>
      </tr>
      <tr colspan="4">
        <th>{{ $t('company.service_area') }}</th>
        <td colspan="3">
          <el-radio-group v-model="companyBasic.service_area">
            <el-radio disabled :label="'city'">都市</el-radio>
            <el-radio disabled :label="'suburb'">郊區</el-radio>
            <el-radio disabled :label="'complex'">綜合</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company.serviceUser_count') }}</th>
        <td>
          <span>{{ companyBasic.service_count }}</span>
          <span>人</span>
        </td>
        <th>{{ $t('company.user_count') }}</th>
        <td>
          <span>{{ companyBasic.user_count }}</span>
          <span>人</span>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company.service_people') }}</th>
        <td colspan="3">
          <el-checkbox-group v-model="companyBasic.service_people">
            <el-checkbox label="obstacles" disabled>智能/發展障礙</el-checkbox>
            <el-checkbox label="old" disabled>高齡</el-checkbox>
            <el-checkbox label="spirit" disabled>精神/行為健康</el-checkbox>
            <el-checkbox label="Special" disabled>特殊教育</el-checkbox>
            <el-checkbox label="other" disabled>
              <span>{{ $t('company.other') }}</span>
              <span class="bottom-line">{{ companyBasic.service_other }}</span>
            </el-checkbox>
          </el-checkbox-group>
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
          <vue-numeric read-only :min="0" :minus="false" :precision="0" :empty-value="0" currency="$" separator="," v-model="companyBasic.budget"></vue-numeric>
          <span>元/每月</span>
        </td>
      </tr>
      <tr>
        <th>{{ $t('company.service_content') }}</th>
        <td colspan="3">
          <ol>
            <li>
              <el-radio-group v-model="companyBasic.live">
                <span>居住 ➔</span>
                <el-radio disabled :label="'large'">大型機構(>200人)</el-radio>
                <el-radio disabled :label="'small'">小型機構(30人~200人)</el-radio>
                <el-radio disabled :label="'night'">夜間型住宿機構(&lt;29人)</el-radio>
                <el-radio disabled :label="'community'">社區居住(&lt;6人)</el-radio>
              </el-radio-group>
            </li>
            <el-checkbox-group v-model="companyBasic.service_content">
              <li>
                <el-checkbox label="daytime" disabled>日間活動</el-checkbox>
              </li>
              <li>
                <span>就業 ➔</span>
                <el-checkbox label="Sheltered" disabled>庇護性就業</el-checkbox>
                <el-checkbox label="Supportive" disabled>支持性就業</el-checkbox>
              </li>
              <li>
                <el-checkbox label="education" disabled>教育(學校)</el-checkbox>
              </li>
              <li>
                <el-checkbox label="other" disabled>
                  {{ $t('company.other') }}
                  <span class="bottom-line" maxlength="15">{{ companyBasic.other }}</span>
                </el-checkbox>
              </li>
            </el-checkbox-group>
          </ol>
        </td>
      </tr>
    </table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <table class="table">
          <tr>
            <th>{{ $t('company.company_name') }}</th>
            <td colspan="3">
              <el-form-item prop="company_name">
                <el-input maxlength="20" v-model="temp.company_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.user_name') }}</th>
            <td>
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.contact_person')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
            <th>{{ $t('company.phone') }}</th>
            <td>
              <el-form-item prop="phone">
                <el-input maxlength="15" v-model="temp.phone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td colspan="3">
              <el-form-item prop="email">
                <el-input maxlength="20" v-model="temp.email"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr colspan="4">
            <th>{{ $t('company.service_area') }}</th>
            <td colspan="3">
              <el-form-item prop="service_area">
                <el-radio-group v-model="temp.service_area">
                  <el-radio :label="'city'">都市</el-radio>
                  <el-radio :label="'suburb'">郊區</el-radio>
                  <el-radio :label="'complex'">綜合</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.serviceUser_count') }}</th>
            <td>
              <span>{{ companyBasic.service_count }}</span>
              <span>人</span>
            </td>
            <th>{{ $t('company.user_count') }}</th>
            <td>
              <span>{{ companyBasic.user_count }}</span>
              <span>人</span>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.service_people') }}</th>
            <td colspan="3">
              <el-form-item prop="service_people">
                <el-checkbox-group v-model="temp.service_people">
                  <el-checkbox label="obstacles">智能/發展障礙</el-checkbox>
                  <el-checkbox label="old">高齡</el-checkbox>
                  <el-checkbox label="spirit">精神/行為健康</el-checkbox>
                  <el-checkbox label="Special">特殊教育</el-checkbox>
                  <div>
                    <el-checkbox label="service_other">
                      {{ $t('company.other') }}
                      <el-input maxlength="15" v-model="temp.service_other" :disabled="temp.service_people.indexOf('service_other') == -1"></el-input>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-form-item>
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
              <el-form-item prop="budget">
                <vue-numeric class="c-input" :min="0" :minus="false" :precision="0" :empty-value="0" currency="$" separator="," v-model="temp.budget"></vue-numeric>
                <span>元/每月</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.service_content') }}</th>
            <td colspan="3">
              <ol>
                <li>
                  <span>居住 ➔</span>
                  <el-radio-group v-model="temp.live">
                    <el-radio :label="'large'">大型機構(>200人)</el-radio>
                    <el-radio :label="'small'">小型機構(30人~200人)</el-radio>
                    <el-radio :label="'night'">夜間型住宿機構(&lt;29人)</el-radio>
                    <el-radio :label="'community'">社區居住(&lt;6人)</el-radio>
                  </el-radio-group>
                </li>
                <el-form-item prop="service_content">
                  <el-checkbox-group v-model="temp.service_content">
                    <li>
                      <el-checkbox label="daytime">日間活動</el-checkbox>
                    </li>
                    <li>
                      <span>就業 ➔</span>
                      <el-checkbox label="Sheltered">庇護性就業</el-checkbox>
                      <el-checkbox label="Supportive">支持性就業</el-checkbox>
                    </li>
                    <li>
                      <el-checkbox label="education">教育(學校)</el-checkbox>
                    </li>
                    <li>
                      <el-checkbox label="other">
                        {{ $t('company.other') }}
                        <el-input maxlength="15" v-model="temp.other" :disabled="temp.service_content.indexOf('other') == -1"></el-input>
                      </el-checkbox>
                    </li>
                  </el-checkbox-group>
                </el-form-item>
              </ol>
            </td>
          </tr>
        </table>
        <el-form-item class="text-right">
          <el-button type="success" @click="updateData()" icon="el-icon-check" circle></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateCompanyBasic } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {
        service_people: [],
        service_content: []
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      rules: {
        company_name: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.company_name'),
            trigger: 'change'
          },
          { max: 15, message: '方案名稱最長為 15 個字', trigger: 'change' }
        ],
        user_name: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.user_name'),
            trigger: 'change'
          },
          { max: 15, message: '聯絡人姓名最長為 15 個字', trigger: 'change' }
        ],
        phone: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.phone'),
            trigger: 'change'
          },
          { max: 15, message: '電話最長為 15 個字', trigger: 'change' }
        ],
        email: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.email'),
            trigger: 'change'
          },
          {
            type: 'email',
            message: this.$t('table.input') + '正確的信箱',
            trigger: 'change'
          }
        ],
        service_area: [
          {
            required: true,
            message: this.$t('table.input') + this.$t('company.service_area'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['id', 'users', 'companyBasic'])
  },
  methods: {
    ...mapActions(['GetUserList', 'GetCompanyBasic']),
    fetchData() {
      this.listLoading = true
      this.GetCompanyBasic(this.id).then(response => {
        this.companyBasic.service_people = this.companyBasic.service_people.split(
          ','
        )
        this.companyBasic.service_content = this.companyBasic.service_content.split(
          ','
        )
        this.listLoading = false
        this.GetUserList(this.id)
      })
    },
    handleUpdate() {
      this.temp = Object.assign({}, this.companyBasic)
      this.dialogTitle =
        this.$t('table.edit') + ' ' + this.$t('route.company_basic')
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.service_people = this.temp.service_people.toString()
          this.temp.service_content = this.temp.service_content.toString()
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
      })
    }
  }
}
</script>
