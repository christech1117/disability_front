<template>
  <div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
    <h4 class="text-center">ISP會議記錄</h4>
    <table class="table">
      <tr>
        <th>姓名</th>
        <td></td>
        <th>主席</th>
        <td colspan="2"></td>
        <th>紀錄</th>
        <td colspan="2"></td>
        <th>會議日期</th>
        <td colspan="3"></td>
      </tr>
      <tr>
        <th>職稱</th>
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
      <tr>
        <th>姓名</th>
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
      <tr>
        <th colspan="12">會議內容</th>
      </tr>
      <tr>
        <td colspan="12">一、報告各領域服務內容</td>
      </tr>
      <tr class="bg-gray">
        <th rowspan="2">目標</th>
        <th rowspan="2">生活品質領域</th>
        <th colspan="5">最重要的目標與支持需求</th>
        <th rowspan="2">支持策略</th>
        <th rowspan="2">支持目標(A)</th>
        <th rowspan="2">執行條件(B)</th>
        <th rowspan="2">會議決議</th>
        <th rowspan="2">修正後目標</th>
      </tr>
      <tr class="bg-gray">
        <th colspan="2">題項</th>
        <th>頻率</th>
        <th>時間</th>
        <th>型態</th>
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
      <tr>
        <td colspan="12">二、個案期望/意見：</td>
      </tr>
      <tr>
        <td colspan="12">三、家屬期望/意見：</td>
      </tr>
      <tr>
        <td colspan="12">四、其他建議與回覆：</td>
      </tr>
      <tr>
        <td colspan="12">五、家屬同意書: 本人同意本中心所擬定的服務計畫。本計畫內容將於年中/年底重新評估，執行過程中，如有調整之必要，由負責社工員\師、教保員與主管討論後修正之，並通知家屬。</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>