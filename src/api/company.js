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

// 子公司管理
export function getCompanySubCompanyList(id) {
  return request({
    url: '/company/sub_company/' + id,
    method: 'get'
  })
}
// 新增子公司
export function createCompanySubCompany(params) {
  return request({
    url: '/company/sub_company',
    method: 'post',
    params
  })
}
// 修改子公司
export function updateCompanySubCompany(params, id) {
  return request({
    url: '/company/sub_company/' + id,
    method: 'put',
    params
  })
}
// 刪除子公司
export function deleteCompanySubCompany(id) {
  return request({
    url: '/company/sub_company/' + id,
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
export function deleteCompanyDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}

// 新增單位[日間服務]
export function createCompanyDepartDay(params) {
  return request({
    url: '/company/departday',
    method: 'post',
    params
  })
}
// 修改單位[日間服務]
export function updateCompanyDepartDay(params, id) {
  return request({
    url: '/company/departday/' + id,
    method: 'put',
    params
  })
}

// 新增單位[居住服務]
export function createCompanyDepartLive(params) {
  return request({
    url: '/company/departlive',
    method: 'post',
    params
  })
}
// 修改單位[居住服務]
export function updateCompanyDepartLive(params, id) {
  return request({
    url: '/company/departlive/' + id,
    method: 'put',
    params
  })
}

// 新增單位[就業服務]
export function createCompanyDepartJob(params) {
  return request({
    url: '/company/departjob',
    method: 'post',
    params
  })
}
// 修改單位[就業服務]
export function updateCompanyDepartJob(params, id) {
  return request({
    url: '/company/departjob/' + id,
    method: 'put',
    params
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
