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

// 取得人員資料
export function getUserList() {
  return request({
    url: '/company/user',
    method: 'get'
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
export function createCompanyPlan() {
  return request({
    url: '/company/plan',
    method: 'post'
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
export function deleteCompanyPlan(params) {
  return request({
    url: '/company/plan/:id',
    method: 'delete',
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
export function createCompanyDepartment(params) {
  return request({
    url: '/company/department',
    method: 'post',
    params
  })
}
// 修改單位
export function updateCompanyDepartment(params) {
  return request({
    url: '/company/department/:id',
    method: 'put',
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

// 人員管理
export function getCompanyMemberList(params) {
  return request({
    url: '/company/member',
    method: 'get',
    params
  })
}
// 新增人員
export function createCompanyMember(params) {
  return request({
    url: '/company/member',
    method: 'put',
    params
  })
}
// 修改人員
export function updateCompanyMember(params) {
  return request({
    url: '/company/member/:id',
    method: 'patch',
    params
  })
}
// 刪除人員
export function deleteCompanyMember(params) {
  return request({
    url: '/company/member/:id',
    method: 'delete',
    params
  })
}
