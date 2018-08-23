<template>
  <div>
    <h4 class="text-center">我的支持計畫</h4>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='第一(A)部分:特殊醫療及行為支持需求' width="95">
        <el-table-column label="需要的特殊醫療支持" width="250px">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column label="不需要支持">
        </el-table-column>
        <el-table-column label="需要部分支持">
        </el-table-column>
        <el-table-column label="需要廣泛與多元支持">
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label='第一(B)部分: 特殊行為支持需求' width="95">
        <el-table-column label="需要的特殊行為支持" width="250px">
        </el-table-column>
        <el-table-column label="不需要支持">
        </el-table-column>
        <el-table-column label="需要部分支持">
        </el-table-column>
        <el-table-column label="需要廣泛與多元支持">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>