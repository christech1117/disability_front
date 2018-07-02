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
    url: '/company/plan/' + id,
    method: 'get'
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
    url: '/company/plan/' + id,
    method: 'delete'
  })
}

// 單位管理
export function getCompanyDepartmentList(id) {
  return request({
    url: '/company/department/' + id,
    method: 'get'
  })
}
// 新增單位
export function createCompanyDepartment() {
  return request({
    url: '/company/department',
    method: 'post'
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
export function deleteCompanyDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}

// 人員管理
export function getUserList(id) {
  return request({
    url: '/company/user/' + id,
    method: 'get'
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
export function deleteUser(id) {
  return request({
    url: '/company/user/' + id,
    method: 'delete'
  })
}
