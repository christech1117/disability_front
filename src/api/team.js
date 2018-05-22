import request from '@/utils/request'

// 個人與團隊特質量表資料
export function getTraitChartData(params) {
  return request({
    url: '/team/traitChart',
    method: 'get',
    params
  })
}
