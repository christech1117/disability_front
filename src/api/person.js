import request from '@/utils/request'

// 病人列表
export function getList(params) {
  return request({
    url: '/person/list',
    method: 'get',
    params
  })
}
// 支持強度量表(SIS)資料
export function getSisData(params) {
  return request({
    url: '/person/sisData',
    method: 'get',
    params
  })
}
