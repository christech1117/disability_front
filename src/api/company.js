import request from '@/utils/request'

// 組織基本資料
export function getCompanyBasic(id) {
  return request({
    url: '/company/basic/' + id,
    method: 'get'
  })
}
// 編輯組織基本資料
export function updateCompanyBasic(params, id) {
  return request({
    url: '/company/basic/' + id,
    method: 'put',
    params
  })
}

// 方案管理
export function getCompanyPlanList(id) {
  return request({
    url: '/company/plan',
    method: 'get',
    params: { id }
  })
}
// 新增方案
export function createCompanyPlan(params) {
  return request({
    url: '/company/plan',
    method: 'post',
    params
  })
}
// 修改方案
export function updateCompanyPlan(params, id) {
  return request({
    url: '/company/plan/' + id,
    method: 'put',
    params
  })
}
// 刪除方案
export function deleteCompanyPlan(id) {
  return request({
    url: '/company/plan/del/' + id,
    method: 'put'
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
export function createCompanyDepartment(params) {
  return request({
    url: '/company/department',
    method: 'post',
    params
  })
}
// 修改單位
export function updateCompanyDepartment(params, id) {
  return request({
    url: '/company/department/' + id,
    method: 'put',
    params
  })
}
// 刪除單位
export function deleteCompanyDepartment(params, id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete',
    params
  })
}

// 人員管理
export function getUserList(params) {
  return request({
    url: '/company/user',
    method: 'get',
    params
  })
}
// 新增人員
export function createUser(params) {
  return request({
    url: '/company/user',
    method: 'post',
    params
  })
}
// 修改人員
export function updateUser(params, id) {
  return request({
    url: '/company/user/' + id,
    method: 'put',
    params
  })
}
// 刪除人員
export function deleteUser(params, id) {
  return request({
    url: '/company/user/' + id,
    method: 'put',
    params
  })
}
