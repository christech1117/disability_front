<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
    </div>
    <el-table :data="departs" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.sub_company_name')" align="center">
        <template slot-scope="scope">
          {{ scope.row.sub_company_name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.depart_name')" align="center">
        <template slot-scope="scope">
          {{ scope.row.depart_name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.depart_type')" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.depart_type | statusFilter">{{ scope.row.depart_type | valueFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.principal')" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.phone')" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="depart_type">
          <el-select v-if="dialogStatus=='create'" class="filter-item" v-model="temp.depart_type" :placeholder="$t('table.select') + $t('company.service_type')">
            <el-option v-for="item in depart_type" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <table class="table day" border="1" v-if="temp.depart_type === 'day'">
          <tr>
            <th>{{ $t('company.service_type') }}</th>
            <td>
              <el-form-item prop="service_type">
                <el-checkbox-group v-model="temp.service_type">
                  <el-checkbox label="day_care">日間照顧</el-checkbox>
                  <el-checkbox label="day_active">日間活動(含休閒、工作)</el-checkbox>
                  <el-checkbox label="community">社區日間作業設施</el-checkbox>
                  <el-checkbox label="group_work">小組工作安置</el-checkbox>
                  <el-checkbox label="other">{{ $t('company.other') }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.depart_name') }}</th>
            <td>
              <el-form-item prop="depart_name">
                <el-input maxlength="15" v-model="temp.depart_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.sub_company') }}</th>
            <td>
              <el-form-item prop="sub_company_id">
                <el-select v-model="temp.sub_company_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in subCompanys" :key="item.id" :label="item.sub_company_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.plan') }}</th>
            <td>
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.principal') }}</th>
            <td>
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.service_type')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.address') }}</th>
            <td>
              <el-form-item prop="address">
                <el-input maxlength="20" v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.phone') }}</th>
            <td>
              <el-form-item prop="phone">
                <el-input maxlength="20" v-model="temp.phone"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="table day" border="1" v-else-if="temp.depart_type==='live'">
          <tr>
            <th>{{ $t('company.service_type') }}</th>
            <td colspan="7">
              <el-form-item prop="service_type">
                <el-checkbox-group v-model="temp.service_type" :max="1">
                  <el-checkbox label="large">大型機構(>200人)</el-checkbox>
                  <el-checkbox label="small">小型機構(30人~200人)</el-checkbox>
                  <el-checkbox label="night">夜間型住宿機構(&lt;29人)</el-checkbox>
                  <el-checkbox label="community">小組工作安置</el-checkbox>
                  <el-checkbox label="family">與家人同住(&lt;6人)</el-checkbox>
                  <el-checkbox label="outside">自己在外面居住</el-checkbox>
                  <el-checkbox label="other">其他</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.sub_company') }}</th>
            <td colspan="7">
              <el-form-item prop="sub_company_id">
                <el-select v-model="temp.sub_company_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in subCompanys" :key="item.id" :label="item.sub_company_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.depart_name') }}</th>
            <td colspan="7">
              <el-form-item prop="depart_name">
                <el-input maxlength="15" v-model="temp.depart_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.plan') }}</th>
            <td colspan="7">
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan') ">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.principal') }}</th>
            <td colspan="7">
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.principal')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.address') }}</th>
            <td colspan="7">
              <el-form-item prop="address">
                <el-input maxlength="20" v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.phone') }}</th>
            <td colspan="7">
              <el-form-item prop="phone">
                <el-input v-model="temp.phone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>房舍類型</th>
            <td colspan="4">
              <el-form-item prop="house_type">
                <el-radio-group v-model="temp.house_type">
                  <el-radio :label="'single'">透天</el-radio>
                  <el-radio :label="'apartment'">公寓</el-radio>
                  <el-radio :label="'building'">大厦</el-radio>
                  <el-radio :label="'other'">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
            <th>電梯</th>
            <td colspan="2">
              <el-form-item prop="have_elevator">
                <el-radio-group v-model="temp.have_elevator">
                  <el-radio :label="'1'">有</el-radio>
                  <el-radio :label="'0'">無</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>房舍性質</th>
            <td colspan="4">
              <el-form-item prop="house_nature">
                <el-radio-group v-model="temp.house_nature">
                  <el-radio :label="'self'">自用</el-radio>
                  <el-radio :label="'rent'">租用</el-radio>
                  <el-radio :label="'depart'">公部門提供</el-radio>
                  <el-radio :label="'financial'">財團法人</el-radio>
                  <el-radio :label="'society'">社團法人</el-radio>
                  <el-radio :label="'other'">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
            <th>每月租金</th>
            <td colspan="2">
              <el-form-item prop="rent">
                <vue-numeric class="c-input" :min="0" :minus="false" :precision="0" :empty-value="0" currency="$" separator="," v-model="temp.rent"></vue-numeric>
                <span>元/每月</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>樓層</th>
            <td colspan="4">
              <el-form-item prop="floor">
                <vue-numeric class="c-input" :min="0" :minus="false" :precision="0" :empty-value="0" currency="" separator="," v-model="temp.floor"></vue-numeric>
                <span>樓</span>
              </el-form-item>
            </td>
            <th>樓地板面積</th>
            <td colspan="2">
              <el-form-item prop="floor_area">
                <el-input maxlength="20" v-model="temp.floor_area"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>客廳數</th>
            <td>
              <el-form-item prop="parlor_count">
                <vue-numeric class="c-input-short" :min="0" :minus="false" :precision="0" :empty-value="0" currency="" separator="," v-model="temp.parlor_count"></vue-numeric>
                <span>間</span>
              </el-form-item>
            </td>
            <th>衛浴數</th>
            <td>
              <el-form-item prop="bathroom_count">
                <vue-numeric class="c-input-short" :min="0" :minus="false" :precision="0" :empty-value="0" currency="" separator="," v-model="temp.bathroom_count"></vue-numeric>
                <span>間</span>
              </el-form-item>
            </td>
            <th>房間數</th>
            <td>
              <el-form-item prop="room_count">
                <vue-numeric class="c-input-short" :min="0" :minus="false" :precision="0" :empty-value="0" currency="" separator="," v-model="temp.room_count"></vue-numeric>
                <span>間</span>
              </el-form-item>
            </td>
            <th>床位數</th>
            <td>
              <el-form-item prop="bed_count">
                <vue-numeric class="c-input-short" :min="0" :minus="false" :precision="0" :empty-value="0" currency="" separator="," v-model="temp.bed_count"></vue-numeric>
                <span>間</span>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="table day" border="1" v-else-if="temp.depart_type==='job'">
          <tr>
            <th>{{ $t('company.service_type') }}</th>
            <td>
              <el-form-item prop="service_type">
                <el-checkbox-group v-model="temp.service_type">
                  <el-checkbox label="sheltered">庇護性就業</el-checkbox>
                  <el-checkbox label="supportive">支持性就業</el-checkbox>
                  <el-checkbox label="general">一般性就業</el-checkbox>
                  <el-checkbox label="other">{{ $t('company.other') }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.sub_company') }}</th>
            <td>
              <el-form-item prop="sub_company_id">
                <el-select v-model="temp.sub_company_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in subCompanys" :key="item.id" :label="item.sub_company_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.depart_name') }}</th>
            <td>
              <el-form-item prop="depart_name">
                <el-input maxlength="15" v-model="temp.depart_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.plan') }}</th>
            <td>
              <el-form-item prop="plan_id">
                <el-select v-model="temp.plan_id" :placeholder="$t('table.select') + $t('company.plan')">
                  <el-option v-for="item in plans" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.principal') }}</th>
            <td>
              <el-form-item prop="user_id">
                <el-select v-model="temp.user_id" :placeholder="$t('table.select') + $t('company.principal')">
                  <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.address') }}</th>
            <td>
              <el-form-item prop="address">
                <el-input maxlength="20" v-model="temp.address"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.phone') }}</th>
            <td>
              <el-form-item prop="phone">
                <el-input v-model="temp.phone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工作時間</th>
            <td>
              <el-form-item prop="work_time">
                <input class="c-input-short" maxlength="2" v-model="temp.work_start_time"> 點～
                <input class="c-input-short" maxlength="2" v-model="temp.work_end_time"> 點
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工作時數</th>
            <td v-if="work_hour">{{ work_hour }}</td>
            <td class="warning" v-else>時間範圍有誤</td>
          </tr>
          <tr>
            <th>工資</th>
            <td>
              <el-form-item prop="salary">
                <el-radio-group v-model="temp.salary">
                  <el-radio :label="'item'">按件計酬</el-radio>
                  <el-radio :label="'hour'">按時計酬</el-radio>
                  <el-radio :label="'month'">按月計酬</el-radio>
                  <el-radio :label="'other'">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工作內容</th>
            <td>
              <el-form-item prop="content">
                <el-checkbox-group v-model="temp.content">
                  <el-checkbox label="foundry">代工</el-checkbox>
                  <el-checkbox label="package">包裝</el-checkbox>
                  <el-checkbox label="clean">清潔工作</el-checkbox>
                  <el-checkbox label="document">行政文書</el-checkbox>
                  <el-checkbox label="bread">麵包烘焙</el-checkbox>
                  <el-checkbox label="pastry">西點烘焙</el-checkbox>
                  <el-checkbox label="food">餐飲服務</el-checkbox>
                  <el-checkbox label="operator">作業員</el-checkbox>
                  <el-checkbox label="shop">商店販售</el-checkbox>
                  <el-checkbox label="warehouse">倉庫管理</el-checkbox>
                  <el-checkbox label="other">其他</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item class="text-right ">
          <el-button v-if="dialogStatus=='create' " type="success " @click="createData() " icon="el-icon-check " circle></el-button>
          <el-button v-else type="success " @click="updateData() " icon="el-icon-check " circle></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  createCompanyDepartment,
  updateCompanyDepartment,
  deleteCompanyDepartment
} from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

const depart_type = [
  { key: 'day', display_name: '日間服務' },
  { key: 'live', display_name: '居住服務' },
  { key: 'job', display_name: '就業服務' }
]
export default {
  data() {
    return {
      temp: {
        // 日間服務
        company_id: this.id,
        depart_id: '',
        depart_type: 'day',
        sub_company_id: '',
        service_type: [],
        depart_name: '',
        plan_id: '',
        user_id: '',
        address: '',
        phone: '',
        // 居住服務
        house_type: '',
        have_elevator: '',
        house_nature: '',
        rent: '',
        floor: '',
        floor_area: '',
        parlor_count: '',
        bathroom_count: '',
        room_count: '',
        bed_count: '',
        // 就業服務
        work_start_time: '',
        work_end_time: '',
        salary: '',
        content: []
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      depart_type,
      rules: {
        depart_type: [
          {
            required: true,
            message: this.$t('table.select') + '單位種類',
            trigger: 'change'
          }
        ],
        // sub_company_id: [
        //   {
        //     required: true,
        //     message: this.$t('table.select') + '子公司/子組織',
        //     trigger: 'change'
        //   }
        // ],
        service_type: [
          {
            required: true,
            message: this.$t('table.select') + '服務類型',
            trigger: 'change'
          }
        ],
        depart_name: [
          {
            required: true,
            message: this.$t('table.input') + '單位名稱',
            trigger: 'change'
          },
          { max: 15, message: '單位名稱最長為15個字', trigger: 'change' }
        ],
        address: [
          {
            required: true,
            message: this.$t('table.input') + '地址',
            trigger: 'change'
          },
          { max: 20, message: '地址最長為20個字', trigger: 'change' }
        ],
        phone: [
          {
            required: true,
            message: this.$t('table.input') + '電話',
            trigger: 'change'
          }
        ],

        house_type: [
          {
            required: true,
            message: this.$t('table.input') + '房舍類型',
            trigger: 'change'
          }
        ],
        have_elevator: [
          {
            required: true,
            message: this.$t('table.select') + '電梯',
            trigger: 'change'
          }
        ],
        house_nature: [
          {
            required: true,
            message: this.$t('table.input') + '房舍性質',
            trigger: 'change'
          }
        ],
        rent: [
          {
            required: true,
            message: this.$t('table.input') + '每月租金',
            trigger: 'change'
          }
        ],
        floor: [
          {
            required: true,
            message: this.$t('table.input') + '樓層',
            trigger: 'change'
          }
        ],
        floor_area: [
          {
            required: true,
            message: this.$t('table.input') + '樓地板面積',
            trigger: 'change'
          }
        ],
        parlor_count: [
          {
            required: true,
            message: this.$t('table.input') + '客廳數',
            trigger: 'change'
          }
        ],
        bathroom_count: [
          {
            required: true,
            message: this.$t('table.input') + '衛浴數',
            trigger: 'change'
          }
        ],
        room_count: [
          {
            required: true,
            message: this.$t('table.input') + '房間數',
            trigger: 'change'
          }
        ],
        bed_count: [
          {
            required: true,
            message: this.$t('table.input') + '床位數',
            trigger: 'change'
          }
        ],
        work_hour: [
          {
            required: true,
            message: this.$t('table.input') + '工作時數',
            trigger: 'change'
          }
        ],
        salary: [
          {
            required: true,
            message: this.$t('table.input') + '工資',
            trigger: 'change'
          }
        ],
        content: [
          {
            required: true,
            message: this.$t('table.input') + '工作內容',
            trigger: 'change'
          }
        ]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        day: 'success',
        live: 'gray',
        job: 'danger'
      }
      return statusMap[status]
    },
    valueFilter(value) {
      const valueMap = {
        day: '日間',
        live: '居住',
        job: '就業'
      }
      return valueMap[value]
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['id', 'users', 'plans', 'departs', 'subCompanys']),
    work_hour() {
      if (
        this.temp.work_start_time === '' ||
        this.temp.work_end_time === '' ||
        this.temp.work_start_time < 0 ||
        this.temp.work_end_time < 0 ||
        this.temp.work_end_time - this.temp.work_start_time < 0 ||
        (this.temp.work_start_tim && this.temp.work_end_tim <= 24)
      ) {
        return ''
      }
      return this.temp.work_end_time - this.temp.work_start_time + '小時'
    }
  },
  methods: {
    ...mapActions([
      'GetUserList',
      'GetCompanySubCompanyList',
      'GetCompanyPlanList',
      'GetCompanyDepartmentList'
    ]),
    fetchData() {
      this.listLoading = true
      this.GetCompanyDepartmentList(this.id).then(response => {
        this.listLoading = false
        this.GetCompanySubCompanyList(this.id)
        this.GetCompanyPlanList(this.id)
        this.GetUserList(this.id)
      })
    },
    resetTemp() {
      this.temp = {
        // 日間服務
        company_id: this.id,
        depart_id: '',
        depart_type: 'day',
        sub_company_id: '',
        service_type: [],
        depart_name: '',
        plan_id: '',
        user_id: '',
        address: '',
        phone: '',
        // 居住服務
        house_type: '',
        have_elevator: '',
        house_nature: '',
        rent: '',
        floor: '',
        floor_area: '',
        parlor_count: '',
        bathroom_count: '',
        room_count: '',
        bed_count: '',
        // 就業服務
        work_start_time: '',
        work_end_time: '',
        salary: '',
        content: []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.depart')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.service_type = this.temp.service_type.toString()
          this.temp.content = this.temp.content.toString()
          createCompanyDepartment(this.temp).then(response => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: this.$t('table.add')
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.service_type = this.temp.service_type.split(',')
      if (this.temp.content !== null) {
        this.temp.content = this.temp.content.split(',')
      }
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.depart')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.service_type = this.temp.service_type.toString()
          if (this.temp.content !== null) {
            this.temp.content = this.temp.content.toString()
          }
          const tempData = Object.assign({}, this.temp)
          updateCompanyDepartment(tempData, this.temp.depart_id).then(() => {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: this.$t('table.save')
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm(this.$t('errorLog.whether_delete'), this.$t('table.info'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      }).then(() => {
        deleteCompanyDepartment(row.depart_id).then(() => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: this.$t('table.delete')
          })
        })
      })
    }
  }
}
</script>
