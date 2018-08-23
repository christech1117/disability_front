<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table :data="serviceUsers" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('person.name')" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
          <el-tag :type="scope.row.sex | statusFilter">{{scope.row.sex | valueFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          <img class="user-avatar" :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          {{ scope.row.birthday }}
        </template>
      </el-table-column>
      <el-table-column label="手冊核發日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.publish_date }}
        </template>
      </el-table-column>
      <el-table-column label="後續鑑定日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.identify_date }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230px">
        <template slot-scope="scope">
          <router-link :to="'/person/serviceUser/'+scope.row.id">
            <el-button type="success" icon="el-icon-view" circle></el-button>
          </router-link>
          <el-button type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <table class="table">
          <tr>
            <th>姓名</th>
            <td>
              <el-form-item prop="name">
                <el-input v-model="temp.name"></el-input>
              </el-form-item>
            </td>
            <th>照片</th>
            <td>
              <img class="dialog-user-avatar center" :src="temp.avatar" alt="">
            </td>
          </tr>
          <tr>
            <th>出生日期</th>
            <td>
              <el-form-item prop="birthday">
                <el-date-picker value-format="yyyy-MM-dd" v-model="temp.birthday" type="date" placeholder="選擇日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>性別</th>
            <td>
              <el-form-item prop="sex">
                <el-radio-group v-model="temp.sex">
                  <el-radio :label="'1'">男</el-radio>
                  <el-radio :label="'0'">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>身分證字號</th>
            <td>
              <el-form-item prop="identity">
                <el-input maxlength="10" v-model="temp.identity"></el-input>
              </el-form-item>
            </td>
            <th>手冊核發日期</th>
            <td>
              <el-form-item prop="publish_date">
                <el-date-picker value-format="yyyy-MM-dd" v-model="temp.publish_date" type="date" placeholder="選擇日期" :picker-options="startDatePicker">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>後續鑑定日期</th>
            <td colspan="3">
              <el-form-item prop="identify_date">
                <el-date-picker value-format="yyyy-MM-dd" v-model="temp.identify_date" type="date" placeholder="選擇日期" :picker-options="endDatePicker">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item class="text-right">
          <el-button v-if="dialogStatus=='create'" type="warning" @click="createData()" icon="el-icon-check">{{ $t('table.add') }}</el-button>
          <el-button v-else type="warning" @click="updateData()" icon="el-icon-check">{{ $t('table.save') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  createServiceUser,
  updateServiceUser,
  deleteServiceUser
} from '@/api/person'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {
        company_id: this.id,
        id: '',
        name: '',
        avatar: '',
        identity: '',
        birthday: '',
        publish_date: '',
        identify_date: '',
        sex: ''
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      startDatePicker: {
        disabledDate: time => {
          return time.getTime() > new Date(this.temp.identify_date).getTime()
        }
      },
      endDatePicker: {
        disabledDate: time => {
          return time.getTime() < new Date(this.temp.publish_date).getTime()
        }
      },
      rules: {
        name: [
          { required: true, message: '請輸入姓名', trigger: 'change' },
          { max: 20, message: '姓名最長為 20 個字', trigger: 'change' }
        ],
        identity: [
          { required: true, message: '請輸入身分證字號', trigger: 'change' },
          { min: 10, max: 10, message: '身分證長度為10個字', trigger: 'change' }
        ],
        birthday: [
          { required: true, message: '請選擇日期', trigger: 'change' }
        ],
        publish_date: [
          { required: true, message: '請選擇日期', trigger: 'change' }
        ],
        identify_date: [
          { required: true, message: '請選擇日期', trigger: 'change' }
        ],
        sex: [{ required: true, message: '請選擇性別', trigger: 'change' }]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '0': 'danger'
      }
      return statusMap[status]
    },
    valueFilter(value) {
      const valueMap = {
        '1': '男',
        '0': '女'
      }
      return valueMap[value]
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['id', 'serviceUsers'])
  },
  methods: {
    ...mapActions(['GetServiceUserList']),
    fetchData() {
      this.listLoading = true
      this.GetServiceUserList(this.id).then(response => {
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        company_id: this.id,
        id: '',
        name: '',
        avatar: '',
        identity: '',
        birthday: '',
        publish_date: '',
        identify_date: '',
        sex: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle =
        this.$t('table.add') + ' ' + this.$t('person.service_user')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData(temp) {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createServiceUser(this.temp).then(response => {
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
      this.dialogTitle =
        this.$t('table.edit') + ' ' + this.$t('person.service_user')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const filter_temp = {
            company_id: this.id,
            id: this.temp.id,
            name: this.temp.name,
            avatar: this.temp.avatar,
            birthday: this.temp.birthday,
            sex: this.temp.sex,
            identity: this.temp.identity,
            identify_date: this.temp.identify_date,
            publish_date: this.temp.publish_date
          }
          const tempData = Object.assign({}, filter_temp)

          updateServiceUser(tempData, this.temp.id).then(() => {
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
        deleteServiceUser(row.id).then(() => {
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
