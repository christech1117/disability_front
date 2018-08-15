<template>
  <div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
    <h4 class="text-center">支持強度量表(SIS)</h4>
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
        <td colspan="3"></td>
        <th>電話</th>
        <td></td>
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
        <td colspan="3"></td>
        <th>電話</th>
        <td></td>
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
        <td colspan="3"></td>
        <th>聯絡電話</th>
        <td colspan="3"></td>
      </tr>
      <tr>
        <th>郵件信箱</th>
        <td colspan="5"></td>
      </tr>
      <tr>
        <th>訪談日期</th>
        <td colspan="3"></td>
        <th>報告填寫日期</th>
        <td colspan="3"></td>
      </tr>
    </table>
    <h5>● 訪談表</h5>
    <table class="table">
      <tr class="bg-gray">
        <th colspan="4">第一(A)部分:特殊醫療及行為支持需求</th>
        <th colspan="4">第一(B)部分: 特殊行為支持需求</th>
      </tr>
      <tr>
        <th style="width:650px">需要的特殊醫療支持</th>
        <th>不需要支持</th>
        <th>需要部分支持</th>
        <th>需要廣泛與多元支持</th>
        <th style="width:650px">需要的特殊行為支持</th>
        <th>不需要支持</th>
        <th>需要部分支持</th>
        <th>需要廣泛與多元支持</th>
      </tr>
      <tr>
        <th colspan="4">呼吸道照顧</th>
        <th colspan="4">外在導向的行為</th>
      </tr>
      <tr>
        <td>1.吸入性治療或氧氣治療</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>1.避免情緒失控</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>2.姿位引流</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>2.避免對他人的攻擊和傷害</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>3.胸腔物理治療</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3.避免物品毀損(如縱火、摔壞家 具)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>4.抽痰</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>4.避免偷竊</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <th colspan="4">餵食協助</th>
        <th colspan="4">自我導向的行為</th>
      </tr>
      <tr>
        <td>5.口腔刺激或下巴擺位控制</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>5.避免自傷</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>6.管灌餵食(如鼻胃管)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>6.避免自殺</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>7.注射餵食(如靜脈注射)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>7.避免異食癖(攝取不可食用的物 品)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <th colspan="4">皮膚照顧</th>
        <th colspan="4">性方面的行為</th>
      </tr>
      <tr>
        <td>8.翻身或擺位</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>8.避免非侵犯性但不適當的行為(例 如在公共場所暴露自己的身體、裸 露狂、不適當的觸碰和手勢)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>9.傷口護理</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>9.避免性侵犯的行為</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <th colspan="4">其他特殊醫療照顧</th>
        <th colspan="4">其他</th>
      </tr>
      <tr>
        <td>10.因免疫系統失調，需要保護以免 感染傳染疾病</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>10.避免物質濫用(譯著:菸、酒、 毒品)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>11.癲癇處理</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>11.避免四處遊走</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>12.洗腎</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>12.持續心理衛生治療</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>13.造口護理</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td rowspan="4">13.避免其他嚴重行為問題(請詳細 說明)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>14.扶、抱和 / 或轉位</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>15.治療服務</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>16.高血壓</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>17.過敏</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>圈選 1 和 2 的個別總和</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>18.糖尿病</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td colspan="3">總計(1 和 2 的總和)</td>
        <td></td>
      </tr>
      <tr>
        <td>19.其他(請詳細說明)</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td rowspan="3" colspan="4"></td>
      </tr>
      <tr>
        <td>圈選 1 和 2 的個別總和</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="3">總計(1 和 2 的總和)</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>