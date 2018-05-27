<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="warning" icon="el-icon-edit">編輯</el-button>
    </div>
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自評" name="first">
          <table class="table">
            <tr>
              <th colspan="2">姓名(自評)</th>
              <td></td>
              <th>施測日期</th>
              <td></td>
            </tr>
            <tr class="title bg-green">
              <th>要素</th>
              <th>面向</th>
              <th style="width: 700px;">題項</th>
              <th>分數</th>
              <th>小計</th>
            </tr>
            
            <!-- <tbody v-for="n in 3" :key="n">
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <th rowspan="10">{{ item.type }}</th>
                <th rowspan="3">{{ item.subtype[0] }}</th>
                <td>{{ item.title[0] }}</td>
                <td>{{ item.score }}</td>
                <td rowspan="3">{{ item.total }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <td>{{ item.title[1] }}</td>
                <td>{{ item.score }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <td>{{ item.title[2] }}</td>
                <td>{{ item.score }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <th rowspan="3">{{ item.subtype[1] }}</th>
                <td>{{ item.title[0] }}</td>
                <td>{{ item.score }}</td>
                <td>{{ item.total }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <td>{{ item.title[1] }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <td>{{ item.title[2] }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <th rowspan="3">{{ item.subtype[2] }}</th>
                <td>{{ item.title[0] }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <td>{{ item.title[1] }}</td>
              </tr>
              <tr v-for="(item, index) in type" :key="item.id" v-if="index===0">
                <td>{{ item.title[2] }}</td>
              </tr>
            </tbody> -->

            <tr>
              <th rowspan="10">專業能力</th>
              <th rowspan="3">專業標準</th>
              <td>認識自己與他人的能力範圍</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>使用即時的資訊和客觀的判斷</td>
              <td></td>
            </tr>
            <tr>
              <td>盡可能的減少利益衝突</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">專業道德</th>
              <td>體現公義(公平的對待他人)</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>體現良善(做好事)</td>
              <td></td>
            </tr>
            <tr>
              <td>體現自主性(尊重每個人自我掌控及自我管理的權力)</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">解決問題</th>
              <td>當問題發生時能呈現並描述問題</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>面對問題時維持一個正向及冷靜的態度，能聚焦於思考解決辦法</td>
              <td></td>
            </tr>
            <tr>
              <td>針對所描述的問題能發展及執行有效的解決辦法</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">合計</th>
              <td colspan="2"></td>
            </tr>
            <tr>
              <th rowspan="10">領導能力</th>
              <th rowspan="3">輔導與教導</th>
              <td>引進及解說概念、資訊、及想法</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>體現及發展具體團隊提升策略及/或技巧</td>
              <td></td>
            </tr>
            <tr>
              <td>批評時用正向的態度及方法，建立他人的自信及自尊</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">激勵及賦權</th>
              <td>提供一個願景</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>體現高度動機</td>
              <td></td>
            </tr>
            <tr>
              <td>支配工作及授權給他人</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">合作及伙伴關係</th>
              <td>和團隊成員一起協作</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>採用共同解決問題的態度及策略</td>
              <td></td>
            </tr>
            <tr>
              <td>連結其他潛在夥伴來提升團隊表現</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">合計</th>
              <td colspan="2"></td>
            </tr>
            <tr>
              <th rowspan="10">情緒穩定能力</th>
              <th rowspan="3">壓力承擔</th>
              <td>能面對不利的事件及壓力大的狀況而不崩潰</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>運用好的壓力管理辦法來正向的應付壓力</td>
              <td></td>
            </tr>
            <tr>
              <td>能在努力工作與私人時間兩者中維持一個恰當的平衡</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">衝動約束</th>
              <td>抗拒或遲緩一個衝動、激動或誘惑行動</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>體現高挫折承擔能力</td>
              <td></td>
            </tr>
            <tr>
              <td>生氣時維持自我約束</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">恆心/毅力</th>
              <td>有個認真努力工作的歷史</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>按時並高標準的完成工作</td>
              <td></td>
            </tr>
            <tr>
              <td>碰到挫折時能繼續邁進</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">合計</th>
              <td colspan="2"></td>
            </tr>
                        <tr>
              <th rowspan="10">人際關係技巧能力</th>
              <th rowspan="3">社交關係</th>
              <td>團隊成員裡建立及維持互相滿意的關係</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>表現同理心 (了解及賞識他人的感受及心態)</td>
              <td></td>
            </tr>
            <tr>
              <td>建構社會資產 (例如他人的支持及貢獻)</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">衝突管理</th>
              <td>衝突狀態中能了解雙方的觀點，並追求一個雙贏的策略</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>解決衝突時能同時體現獨斷表達及相互合作</td>
              <td></td>
            </tr>
            <tr>
              <td>知道如何以尊重的態度面對重要議題，發生衝突時避免無關緊要的異議</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">適應性</th>
              <td>根據團隊的需求或狀況的訴求，調整態度、方法、或行為</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>根據顯性知識(客觀性)或隱性知識(主觀經驗)，調整態度、 方法、或行為</td>
              <td></td>
            </tr>
            <tr>
              <td>依據深思熟慮後的判斷而調整自己，避免不穩定的姿態</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">合計</th>
              <td colspan="2"></td>
            </tr>
            <tr>
              <th rowspan="10">資源運用能力</th>
              <th rowspan="3">時間管理</th>
              <td>會安排時間自我調適，自我獎勵，有經常性的運動安排</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>可由一個工作中得到多重效益 (例如一個行動能完成兩件 事)</td>
              <td></td>
            </tr>
            <tr>
              <td>願意投入時間幫助他人提升效率</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">知識</th>
              <td>體認資源，包括時間、專長、財務資本、社會資本、和科技</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>認識及使用資訊來源來加強自己的知識及洞察力</td>
              <td></td>
            </tr>
            <tr>
              <td>做決定時結合研究文獻及個人經驗</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="3">科技</th>
              <td>精通使用輔助資訊科技 (包括電腦)，能在工作及溝通上獨 立操作使用</td>
              <td></td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td>熟悉資訊科技的創新與發展，用科技增強個人或/及團隊的 績效</td>
              <td></td>
            </tr>
            <tr>
              <td>願意並有能力學習新資訊科技相關使用技術</td>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">合計</th>
              <td colspan="2"></td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="團隊評量" name="second">
          <table class="table">
            <tr>
              <th>團隊類別</th>
              <td>{{temp.company_name}}</td>
              <th>團隊名稱</th>
              <td>{{temp.company_name}}</td>
            </tr>
            <tr class="title">
              <th>施測者</th>
              <td>{{temp.company_name}}</td>
              <th>施測日期</th>
              <td>{{temp.company_name}}</td>
            </tr>
            <tr>
              <th>成員姓名</th>
              <td colspan="3"></td>
            </tr>
          </table>
          <table class="table">
            <tr class="bg-green">
              <th>要素</th>
              <th>面向</th>
              <th>題項</th>
            </tr>
            <tr>
              <th rowspan="10">專業能力</th>
              <th rowspan="3">專業標準</th>
              <td>認識自己與他人的能力範圍</td>
            </tr>
            <tr>
              <td>使用即時的資訊和客觀的判斷</td>
            </tr>
            <tr>
              <td>盡可能的減少利益衝突</td>
            </tr>
            <tr>
              <th rowspan="3">專業道德</th>
              <td>體現公義(公平的對待他人)</td>
            </tr>
            <tr>
              <td>體現良善(做好事)</td>
            </tr>
            <tr>
              <td>體現自主性(尊重每個人自我掌控及自我管理的權力)</td>
            </tr>
            <tr>
              <th rowspan="3">解決問題</th>
              <td>當問題發生時能呈現並描述問題</td>
            </tr>
            <tr>
              <td>面對問題時維持一個正向及冷靜的態度，能聚焦於思考解決辦法</td>
            </tr>
            <tr>
              <td>針對所描述的問題能發展及執行有效的解決辦法</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { getTraitChartDataType, getTraitChartDataSubtype, getTraitChartDataTitle } from '@/api/team'

export default {
  data() {
    return {
      type: null,
      subtype: null,
      title: null,
      listLoading: true,
      textMap: {
        update: '編輯',
        create: '新增'
      },
      temp: {
        type: this.list,
        // subtype: this.list['subtype']
      },
      activeName: 'first',
      dialogFormVisible: false
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
      getTraitChartDataType(this.listQuery).then(response => {
        this.type = response.data.items
        this.listLoading = false
      })
      getTraitChartDataSubtype(this.listQuery).then(response => {
        this.subtype = response.data.items
        this.listLoading = false
      })
      getTraitChartDataTitle(this.listQuery).then(response => {
        this.title = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        type: '',
        subtype: []
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
