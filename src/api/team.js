import request from '@/utils/request'

// 個人與團隊特質量表資料(要素)
export function getTraitChartDataType(params) {
  return request({
    url: '/team/traitChartType',
    method: 'get',
    params
  })
}
// 個人與團隊特質量表資料(面向)
export function getTraitChartDataSubtype(params) {
  return request({
    url: '/team/traitChartSubtype',
    method: 'get',
    params
  })
}
// 個人與團隊特質量表資料(題項)
export function getTraitChartDataTitle(params) {
  return request({
    url: '/team/traitChartTitle',
    method: 'get',
    params
  })
}
