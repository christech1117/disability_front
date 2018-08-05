<template>
  <div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
    <h5>一、綜合摘要</h5>
    <table class="table">
      <tr>
        <th class="bg-gray" style="width:50px">夢想目標</th>
        <td></td>
      </tr>
      <tr>
        <th class="bg-gray" style="width:50px">現況描述</th>
        <td></td>
      </tr>
      <tr>
        <th class="bg-gray" style="width:50px">支持需求(評量摘要)</th>
        <td>
          <ul>
            <li>居家生活：</li>
            <li>社區生活活動：</li>
            <li>終身學習活動：</li>
            <li>就業活動：</li>
            <li>健康與安全活動：</li>
            <li>社交活動：</li>
            <li>保護與倡議活動：</li>
            <li>特殊醫療：</li>
            <li>特殊行為：</li>
          </ul>
        </td>
      </tr>
    </table>
    <h5>二、服務計畫</h5>
    <table class="table">
      <tr class="bg-gray">
        <th rowspan="2">目標</th>
        <th rowspan="2">生活品質領域</th>
        <th colspan="4">最重要的目標與支持需求</th>
        <th rowspan="2">支持策略</th>
        <th rowspan="2">支持目標(A)</th>
        <th rowspan="2">執行條件(B)</th>
        <th colspan="2">監督</th>
        <th rowspan="2">評估結果說明</th>
      </tr>
      <tr>
        <th>題項</th>
        <th>型態</th>
        <th>頻率</th>
        <th>時間</th>
        <th>A</th>
        <th>B</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h6>*備註:1.○=已達成、=須持續、=未執行。2.每 3 個月監督一次;監督者，A 為 ISP 促進者、B 為執行監督者。</h6>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>