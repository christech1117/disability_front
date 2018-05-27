<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">下載</el-button> -->
    </div>
    <h5>一、訪談資料建立</h5>
    <table class="table">
      <tr>
        <th>訪談組織\部門</th>
        <td colspan="5"></td>
      </tr>
      <tr>
        <th>訪談日期</th>
        <td colspan="2"></td>
        <th>訪談時間</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th>訪員姓名</th>
        <td></td>
        <th>職稱</th>
        <td></td>
        <th>Email</th>
        <td></td>
      </tr>
    </table>
    <h5>二、訪談量表</h5>
    <table class="table">
      <tr>
        <td colspan="4">
          <h6 class="text-center">顧客觀點</h6>
          <p>顧客觀點之焦點: 顧客觀點含括: (a) 校準服務/支持於明確的支持需求，(b) 報告在更獨立、更高產值、社區融合 性更佳的工作或居住環境之服務對象人數，(c) 測量個人成果，(d) 分析及報告個人成果的總計，(e) 使用科技來提升個人成果</p>
        </td>
      </tr>
      <tr>
        <th>實證本位指標</th>
        <th>實證標準</th>
        <th>實證範例</th>
        <th>實證本位指標 (圈)</th>
      </tr>
      <tr>
        <td>1. 校準服務/支持及明確的支持需求</td>
        <td></td>
        <td>支持需求評估資料，個別化支持計畫包含支持需求資料</td>
        <td></td>
      </tr>
      <tr>
        <td>2. 報告在更獨立、更高產 值、社區融合性更佳的工作或居住環境之服務對象人數</td>
        <td></td>
        <td>組織內部資訊管理系統所提供的資料</td>
        <td></td>
      </tr>
      <tr>
        <td>3. 測量個人成果</td>
        <td></td>
        <td>持續使用一個具信效度的個人成果量表</td>
        <td></td>
      </tr>
      <tr>
        <td>4. 分析及報告個人成果的總計</td>
        <td></td>
        <td>組織內部資訊管理系統所提供的資料</td>
        <td></td>
      </tr>
      <tr>
        <td>5. 使用科技來提升個人成果</td>
        <td></td>
        <td>資訊科技與輔助科技使用政策，呈現使用狀況，表明科技之實際操作，評估使用科技所產生的影響</td>
        <td></td>
      </tr>
      <tr>
        <th colspan="3">顧客觀點分數</th>
        <td></td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td colspan="4">
          <h6 class="text-center">成長觀點</h6>
          <p>成長觀點之焦點: 成長觀點含括: (a) 明確表達組織使命與預期成果，(b) 建立夥伴關係，(c) 發展方案選擇，(d) 採用高效益團隊，(e) 監督工作滿意度及發展工作豐富化方案</p>
        </td>
      </tr>
      <tr>
        <th>實證本位指標</th>
        <th>實證標準</th>
        <th>實證範例</th>
        <th>實證本位指標 (圈)</th>
      </tr>
      <tr>
        <td>6. 明確表達組織使命與預期成果</td>
        <td></td>
        <td>包含具體目標及目的之組織使命</td>
        <td></td>
      </tr>
      <tr>
        <td>7. 建立夥伴關係</td>
        <td></td>
        <td>夥伴關係清單，摘要/報告相關合作活動</td>
        <td></td>
      </tr>
      <tr>
        <td>8. 發展方案選擇</td>
        <td></td>
        <td>方案選擇清單，政策聲明</td>
        <td></td>
      </tr>
      <tr>
        <td>9. 採用高效益團隊</td>
        <td></td>
        <td>會議制度協議，團隊成員與工作內容，衝突解決策略</td>
        <td></td>
      </tr>
      <tr>
        <td>10. 監督工作滿意度及發展工作豐富化方案</td>
        <td></td>
        <td>工作滿意度調查結果，工作豐富化方案描述，員工訓練/發展 活動描述</td>
        <td></td>
      </tr>
      <tr>
        <th colspan="3">成長觀點分數</th>
        <td></td>
      </tr>
      <tr>
        <th colspan="3">效益指數</th>
        <td></td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td colspan="4">
          <h6 class="text-center">財務觀點</h6>
          <p>財務觀點之焦點: 財務觀點含括: (a) 執行跨地區與平台之成本單位比較，(b) 報告分配於直接個案支持服務相關經費預算之百分比，(c) 監督社會資本與組織資本之關係，(d) 使用固定成本與變動成本資訊建立基準成本率，(e) 分析間接成本率，提升效率</p>
        </td>
      </tr>
      <tr>
        <th>實證本位指標</th>
        <th>實證標準</th>
        <th>實證範例</th>
        <th>實證本位指標 (圈)</th>
      </tr>
      <tr>
        <td>11. 執行跨地區與平台之 成本單位比較</td>
        <td></td>
        <td>計算預算中成本部分之單位成本，跨地區成本，比較跨方案平台之成本</td>
        <td></td>
      </tr>
      <tr>
        <td>12. 報告分配於個案本位支持服務相關經費預算之百分比</td>
        <td></td>
        <td>預算，財務報告，年度報告 (可採用於運作成本計算)</td>
        <td></td>
      </tr>
      <tr>
        <td>13. 監督社會資本與組織資本之關係</td>
        <td></td>
        <td>預算，社會資本經濟價值之估計</td>
        <td></td>
      </tr>
      <tr>
        <td>14. 使用固定成本與變動成本資訊建立基準成本率</td>
        <td></td>
        <td>預算，定期監督於評估成本率</td>
        <td></td>
      </tr>
      <tr>
        <td>15. 分析間接成本率，提升效率</td>
        <td></td>
        <td>間接成本比例計算，分析成本率時間性的變動</td>
        <td></td>
      </tr>
      <tr>
        <th colspan="3">財務觀點分數</th>
        <td></td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <td colspan="4">
          <h6 class="text-center">內部運作觀點</h6>
          <p>內部運作觀點之焦點: 內部運作觀點含括: (a) 16. 水平校準組織輸入、過程、輸出之方案要件，(b) 垂直校準組織 層面及相對之個人層面的輸入、過程、輸出要件，(c) 表明所提供之服務/支持單位與評估所得的個案支持需求之間 之關係，(d) 多重的運用個人成果及組織輸出相關資訊，(e) 運用實證本位指標來進行持續性品質提升</p>
        </td>
      </tr>
      <tr>
        <th>實證本位指標</th>
        <th>實證標準</th>
        <th>實證範例</th>
        <th>實證本位指標 (圈)</th>
      </tr>
      <tr>
        <td>16. 水平校準組織輸入、 過程、輸出之方案要 件</td>
        <td></td>
        <td>是否有邏輯模式圖表，呈現組織之輸入、過程、輸出要件，水平校準之實證</td>
        <td></td>
      </tr>
      <tr>
        <td>17. 垂直校準組織層面及相對之個人層面的輸入、過程、輸出要件</td>
        <td></td>
        <td>水平校準之實證與範例，垂直校準之實證與範例</td>
        <td></td>
      </tr>
      <tr>
        <td>18. 表明所提供之服務/支持單位與評估所得的個案支持需求之間 之關係</td>
        <td></td>
        <td>描述標準服務單位訂定辦法，描述組織的標準支持需求評估辦法，研究組織所提供之服務/支持單位與評估所得的個案支持需求之間之關係</td>
        <td></td>
      </tr>
      <tr>
        <td>19. 多重的運用個人成果及組織輸出相關資訊</td>
        <td></td>
        <td>資訊集之描述，個人成果資訊運用範例，組織輸出資訊運用範例</td>
        <td></td>
      </tr>
      <tr>
        <td>20. 運用實證本位指標來進行持續性品質提升</td>
        <td></td>
        <td>實證本位指標/實作之範例，績效表 現本位措施之範例，績效表現觀點，平衡計分表， 網狀圖，品質提升計畫</td>
        <td></td>
      </tr>
      <tr>
        <th colspan="3">內部運作觀點分數</th>
        <td></td>
      </tr>
      <tr>
        <th colspan="3">效益指數</th>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      temp: {
        compony_id: undefined,
        company_name: '',
        member_name: '',
        tel: '',
        email: '',
        service_area: '',
        user_count: '',
        member_count: '',
        service_people: '',
        people_age: '',
        budget: '',
        service_content: '',
        created_at: new Date(),
        updated_at: new Date()
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
