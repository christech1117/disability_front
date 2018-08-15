const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  id: state => state.user.id,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  // 組織管理
  companyBasic: state => state.company.companyBasic,
  users: state => state.company.users,
  plans: state => state.company.plans,
  departs: state => state.company.departs,
  subCompanys: state => state.company.subCompanys,
  // 個人層級
  serviceUsers: state => state.person.serviceUsers
}
export default getters
