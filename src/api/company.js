import request from '@/utils/request'

// 組織基本資料
export function getCompanyBasic(params) {
  return request({
    url: '/company/basic',
    method: 'get',
    params
  })
}
// 單位管理
export function getCompanyDepartmentList(params) {
  return request({
    url: '/company/department',
    method: 'get',
    params
  })
}
// 新增單位
export function addCompanyDepartment(params) {
  return request({
    url: '/company/department',
    method: 'put',
    params
  })
}
// 修改單位
export function updateCompanyDepartment(params) {
  return request({
    url: '/company/department/:id',
    method: 'patch',
    params
  })
}
// 刪除單位
export function deleteCompanyDepartment(params) {
  return request({
    url: '/company/department/:id',
    method: 'delete',
    params
  })
}
// 方案管理
export function getCompanyPlanList(params) {
  return request({
    url: '/company/plan',
    method: 'get',
    params
  })
}
// 新增方案
export function addCompanyPlan(params) {
  return request({
    url: '/company/plan',
    method: 'put',
    params
  })
}
// 修改方案
export function updateCompanyPlan(params) {
  return request({
    url: '/company/plan/:id',
    method: 'patch',
    params
  })
}
// 刪除方案
export function deleteCompanyPlan(params) {
  return request({
    url: '/company/plan/:id',
    method: 'delete',
    params
  })
}
