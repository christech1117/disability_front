<template>
  <div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
    <table class="table">
      <tr>
        <th colspan="6" class="bg-gray">服務對象資訊</th>
      </tr>
      <tr>
        <th>姓名</th>
        <td></td>
        <th>性別</th>
        <td></td>
        <th>出生日期</th>
        <td></td>
      </tr>
      <tr>
        <th>地址</th>
        <td colspan="2"></td>
        <th>電話</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th>服務提供單位</th>
        <td colspan="5"></td>
      </tr>
      <tr>
        <th>服務提供單位地址</th>
        <td colspan="5"></td>
      </tr>
      <tr>
        <th>機構連絡人</th>
        <td colspan="2"></td>
        <th>電話</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th colspan="6" class="bg-gray">受訪者資訊</th>
      </tr>
      <tr>
        <th colspan="3">受訪者姓名</th>
        <th colspan="3">關係</th>
      </tr>
      <tr>
        <th colspan="6" class="bg-gray">訪員資訊</th>
      </tr>
      <tr>
        <th>訪員姓名</th>
        <td colspan="2"></td>
        <th>郵件信箱</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th>自我報告訪談日期</th>
        <td colspan="2"></td>
        <th>他人報告訪談日期</th>
        <td colspan="2"></td>
      </tr>
    </table>
    <h5>● 訪談記錄</h5>
    <table class="table">
      <tr>
        <th colspan="3"></th>
        <th>自我報告</th>
        <th>他人報告</th>
        <th rowspan="2">質性描述 (例如什麼是你人生重要的，甚麼是你的生活目 標，要改善你的生活品質與所得到支持需要是什 麼?)</th>
      </tr>
      <tr>
        <th>因素</th>
        <th>領域</th>
        <th>題項</th>
        <th>分數</th>
        <th>分數</th>
      </tr>
      <tr>
        <th rowspan="14">獨立</th>
        <th rowspan="7">個人發展</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th rowspan="7">自我決策</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th colspan="3">獨立因素的總分</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th rowspan="21">社會參與</th>
        <th rowspan="7">人際關係</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th rowspan="7">社會融合</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th rowspan="7">權利</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th colspan="3">社會參與因素的總分</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th rowspan="21">福祉</th>
        <th rowspan="7">情緒福祉</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>1</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th rowspan="7">身體福祉</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th rowspan="7">物質福祉</th>
        <th>1</th>
        <th></th>
        <th></th>
        <th rowspan="7"></th>
      </tr>
      <tr>
        <th>2</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>3</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>4</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>5</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>6</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>合計</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th colspan="3">福祉因素的總分</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>