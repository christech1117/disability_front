<template>
  <div>
    <h5>一、基本資料</h5>
    <table class="table">
      <tr>
        <th>姓名</th>
        <td colspan="2"></td>
        <th>出生日期</th>
        <td colspan="2"></td>
        <td rowspan="3"></td>
      </tr>
      <tr>
        <th>性別</th>
        <td colspan="2"></td>
        <th>身分證字號</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th>手冊核發日期</th>
        <td colspan="2"></td>
        <th>後續鑑定日期</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th rowspan="10">障礙類別</th>
      </tr>
      <tr>
        <th>第一大類</th>
        <td colspan="6">
          <p-check class="p-default p-smooth p-bigger" color="warning" value="obstacles" v-model="service_people">智能/發展障礙</p-check>
          <p-check class="p-default p-smooth p-bigger" color="warning" value="old" v-model="service_people">高齡</p-check>
          <p-check class="p-default p-smooth p-bigger" color="warning" value="spirit" v-model="service_people">精神/行為健康</p-check>
          <p-check class="p-default p-smooth p-bigger" color="warning" value="Special" v-model="service_people">特殊教育</p-check>
          其他<input class="v-form-group" required/>
        </td>
      </tr>
      <tr>
        <th>第二大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>第三大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>第四大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>第五大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>第六大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>第七大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>第八大類</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="6">
          多重障礙者
          罕見疾病
          其他經中央衛生主管機關認定之障礙者(□先天代謝異常 □染色體異常 □先天性缺陷)
        </td>
      </tr>
      <tr>
        <th>障礙等級</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>慣用語言</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>婚姻狀況</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>戶籍地址</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>通訊地址</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th rowspan="3">家長監護人</th>
        <td>姓名</td>
        <td></td>
        <td>關係</td>
        <td></td>
        <td>電話</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="6">通訊地址：</td>
      </tr>
      <tr>
        <td colspan="6">電子信箱：</td>
      </tr>
      <tr>
        <th>身份</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>個案來源</th>
        <td colspan="6"></td>
      </tr>
    </table>
    <h5>二、家庭狀況</h5>
    <table class="table">
      <tr>
        <th>住所型態</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>住所類型</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>經濟狀況</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>家庭成員</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>家系圖暨生態圖</th>
        <td colspan="6"></td>
      </tr>
    </table>
    <h5>三、醫療史</h5>
    <table class="table">
      <tr>
        <th>障礙過程</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>身體狀況</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>重大傷病</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>醫療使用情形</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>用藥情形</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>輔具使用</th>
        <td colspan="6"></td>
      </tr>
    </table>
    <h5>四、教育狀況</h5>
    <table class="table">
      <tr>
        <th>教育程度</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>學歷</th>
        <td colspan="6"></td>
      </tr>
    </table>
    <h5>五、安置/訓練服務經歷</h5>
    <table class="table">
      <tr>
        <th>服務機構</th>
        <th>起迄日期</th>
        <th>服務內容</th>
        <th>離開/轉換原因</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h5>六、就業經歷</h5>
    <table class="table">
      <tr>
        <th>工作單位名稱</th>
        <th>起迄日期</th>
        <th>職務</th>
        <th>待遇</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h5>七、福利補助狀況</h5>
    <table class="table">
      <tr>
        <th rowspan="2">福利補助</th>
        <th>項目</th>
        <th>金額</th>
        <th>起迄日期</th>
        <th>補助單位</th>
        <th>備註(自費額)</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h5>八、對服務需求與期待</h5>
    <table class="table">
      <tr>
        <th>個案期待</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>案家期待</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>主訴問題</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>服務需求評估</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>其他說明</th>
        <td colspan="6"></td>
      </tr>
      <tr>
        <th>服務日期</th>
        <td colspan="6"></td>
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