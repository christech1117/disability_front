<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
      <!-- <div class="block">
        <span class="demonstration">{{ $t('table.search') }}</span>
        <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="開始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
        </el-date-picker>
      </div> -->
    </div>
    <el-table :data="subCompanys" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" :label="$t('table.id')" width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('company.sub_company_name')" align="center">
        <template slot-scope="scope">
          {{scope.row.sub_company_name}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.created_at')" align="center">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.updated_at')" align="center">
        <template slot-scope="scope">
          {{scope.row.updated_at}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="temp" :rules="rules" ref="dataForm" label-width="100px" class="demo-ruleForm">
        <table class="table day" border="1">
          <tr>
            <th>{{ $t('company.sub_company_name') }}</th>
            <td colspan="3">
              <el-form-item prop="sub_company_name">
                <el-input maxlength="15" v-model="temp.sub_company_name"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>{{ $t('company.sub_company_description') }}</th>
            <td colspan="3">
              <el-form-item prop="sub_company_description">
                <el-input maxlength="50" type="textarea" :rows="4" resize="none" v-model="temp.sub_company_description"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item class="text-right">
          <el-button v-if="dialogStatus=='create'" type="success" @click="createData()" icon="el-icon-check" circle></el-button>
          <el-button v-else type="success" @click="updateData()" icon="el-icon-check" circle></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  createCompanySubCompany,
  updateCompanySubCompany,
  deleteCompanySubCompany
} from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {
        company_id: this.id,
        sub_company_name: '',
        sub_company_description: ''
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: '',
      rules: {
        sub_company_name: [
          {
            required: true,
            message:
              this.$t('table.input') + this.$t('company.sub_company_name'),
            trigger: 'change'
          },
          {
            max: 15,
            message: this.$t('company.sub_company_name') + '最長為 15 個字',
            trigger: 'change'
          }
        ],
        sub_company_description: [
          {
            required: true,
            message:
              this.$t('table.input') +
              this.$t('company.sub_company_description'),
            trigger: 'change'
          },
          {
            max: 50,
            message:
              this.$t('company.sub_company_name') + '方案名稱最長為 50 個字',
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
    ...mapGetters(['id', 'subCompanys'])
  },
  methods: {
    ...mapActions(['GetCompanySubCompanyList']),
    fetchData() {
      this.listLoading = true
      this.GetCompanySubCompanyList(this.id).then(response => {
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        company_id: this.id,
        sub_company_name: '',
        sub_company_description: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle =
        this.$t('table.add') + ' ' + this.$t('company.sub_company')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createCompanySubCompany(this.temp).then(response => {
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
        this.$t('table.edit') + ' ' + this.$t('company.sub_company')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateCompanySubCompany(tempData, this.temp.id).then(() => {
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
        deleteCompanySubCompany(row.id).then(() => {
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
