import request from '@/utils/request'

// 服務人員列表
export function getServiceUserList(id) {
  return request({
    url: '/person/serviceuser/' + id,
    method: 'get'
  })
}
// 選擇人員
export function getServuceUser(id) {
  return request({
    url: '/person/basic/' + id,
    method: 'get'
  })
}
// 新增人員
export function createServiceUser(params) {
  return request({
    url: '/person/serviceuser',
    method: 'post',
    params
  })
}
// 修改人員
export function updateServiceUser(params, id) {
  return request({
    url: '/person/serviceuser/' + id,
    method: 'put',
    params
  })
}
// 刪除人員
export function deleteServiceUser(id) {
  return request({
    url: '/person/serviceuser/' + id,
    method: 'delete'
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
