<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-plus">新增</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本資料" name="first">
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
      </el-tab-pane>
      <el-tab-pane label="支持強度量表(SIS)" name="second">
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
      </el-tab-pane>
      <el-tab-pane label="我的支持計畫" name="three">
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
      </el-tab-pane>
      <el-tab-pane label="個別化支持服務計畫" name="four">
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
      </el-tab-pane>
      <el-tab-pane label="ISP會議記錄" name="five">
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
      </el-tab-pane>
      <el-tab-pane label="個人成果量表(POS)" name="six">
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
      </el-tab-pane>
      <el-tab-pane label="社區生活技能評量表" name="seven">

      </el-tab-pane>
      <el-tab-pane label="統計分析" name="eight">
      </el-tab-pane>
      <el-tab-pane label="個案管理" name="night">
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <table class="table day" border="1">
        <tr>
          <th>姓名</th>
          <td>
            <el-input v-model="temp.name"></el-input>
          </td>
          <th>照片</th>
          <td></td>
        </tr>
        <tr>
          <th>就職日期</th>
          <td>
            <el-input v-model="temp.work_start_date"></el-input>
          </td>
          <th>工作狀態</th>
          <td>
              <el-radio v-for="item in work_status" :key="item.key" :label="item" v-model="temp.work_status">{{item}}</el-radio>
          </td>
        </tr>
        <tr>
          <th>電話</th>
          <td>
            <el-input v-model="temp.tel"></el-input>
          </td>
          <th>E-mail</th>
          <td>
            <el-input v-model="temp.email"></el-input>
          </td>
        </tr>
        <tr>
          <th>聯絡住址</th>
          <td colspan="3">
            <el-input v-model="temp.adress"></el-input>
          </td>
        </tr>
        <tr>
          <th>部門或單位</th>
          <td>
            <el-input v-model="temp.depart_name"></el-input>
          </td>
          <th>職稱</th>
          <td>
            <el-input v-model="temp.work_title"></el-input>
          </td>
        </tr>
        <tr>
          <th>方案計畫名稱</th>
          <td colspan="3">
            <el-input v-model="temp.plan_name"></el-input>
          </td>
        </tr>
        <tr>
          <th>所屬團隊</th>
          <td colspan="3">
            <el-input v-model="temp.team_name"></el-input>
          </td>
        </tr>
        <tr>
          <th colspan="4" class="bg-grap">權限</th>
        </tr>
        <tr>
          <th>角色</th>
          <td colspan="3">
            <el-checkbox-group v-model="temp.role">
              <el-checkbox v-for="item in role" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <th>審核</th>
          <td>
            <el-checkbox-group v-model="temp.approve_status">
              <el-checkbox v-for="item in approve_status" :key="item.key" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>
            
          </td>
          <th>個人收入</th>
          <td>
            <el-radio v-for="item in income" :key="item.key" :label="item" v-model="temp.income">{{item}}</el-radio>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSisData } from '@/api/person'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      textMap: {
        update: '編輯',
        create: '新增'
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      activeName: 'first'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        服務中: 'success',
        暫停: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getSisData(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        member_id: undefined,
        name: '',
        avatar: '',
        work_start_date: '',
        work_end_date: '',
        work_status: '',
        tel: '',
        email: '',
        adress: '',
        depart_name: '',
        work_title: '',
        plan_name: '',
        team_name: '',
        role: [],
        approve_status: [],
        income: [],
        is_del: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
