<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate()" type="warning" icon="el-icon-plus">{{ $t('table.add') }}</el-button>
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
      <table class="table day" border="1">
        <tr>
          <th>{{ $t('company.sub_company_name') }}</th>
          <td colspan="3">
            <input class="c-input" v-model="temp.sub_company_name" v-validate="'required'" name="sub_company" type="text">
            <span class="error-message" v-show="errors.has('sub_company')"  >{{ errors.first('sub_company') }}</span>
          </td>
          {{temp}}
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="success" @click="createData()" icon="el-icon-check" circle></el-button>
        <el-button v-else type="success" @click="updateData()" icon="el-icon-check" circle></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createCompanySubCompany, updateCompanySubCompany, deleteCompanySubCompany } from '@/api/company'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      temp: {},
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle: '',
      dialogStatus: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'id',
      'subCompanys'
    ])
  },
  methods: {
    ...mapActions([
      'GetCompanySubCompanyList'
    ]),
    fetchData() {
      this.listLoading = true
      this.GetCompanySubCompanyList(this.id).then(response => {
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        sub_company_name: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = this.$t('table.add') + ' ' + this.$t('company.sub_company')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      const errors = this.errors.items
      if (errors.length === 0) {
        const filter_temp = {
          company_id: this.id,
          sub_company_name: this.temp.sub_company_name
        }
        const tempData = Object.assign({}, filter_temp)
        createCompanySubCompany(tempData).then(response => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: this.$t('table.add')
          })
          this.fetchData()
        })
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogTitle = this.$t('table.edit') + ' ' + this.$t('company.sub_company')
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      const errors = this.errors.items
      if (errors.length === 0) {
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
    },
    handleDelete(row) {
      this.$confirm(this.$t('errorLog.whether_delete'), this.$t('table.info'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      }).then(() => {
        deleteCompanySubCompany(row.id).then(() => {
          this.fetchData()
        })
        this.$message({
          type: 'success',
          message: this.$t('table.delete')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('table.cancel')
        })
      })
    }
  }
}
</script>
