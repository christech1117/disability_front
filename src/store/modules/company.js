import {
  getUserList,
  getCompanyBasic,
  getCompanyPlanList,
  getCompanyDepartmentList,
  getCompanySubCompanyList
} from '@/api/company'

const company = {
  state: {
    companyBasic: [],
    users: [],
    plans: [],
    departs: [],
    subCompanys: []
  },

  mutations: {
    GET_USER_LIST: (state, users) => {
      state.users = users
    },
    GET_COMPANY_BASIC: (state, companyBasic) => {
      state.companyBasic = companyBasic
    },
    GET_COMPANY_PLAN_LIST: (state, plans) => {
      state.plans = plans
    },
    GET_COMPANY_SUB_COMPANY_LIST: (state, subCompanys) => {
      state.subCompanys = subCompanys
    },
    GET_COMPANY_DEPARTMENT_LIST: (state, departs) => {
      state.departs = departs
    }
  },

  actions: {
    GetUserList({ commit }, id) {
      return new Promise((resolve, reject) => {
        getUserList(id).then(response => {
          const data = response.data

          commit('GET_USER_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCompanyBasic({ commit }, id) {
      return new Promise((resolve, reject) => {
        getCompanyBasic(id).then(response => {
          const data = response.data

          commit('GET_COMPANY_BASIC', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCompanyPlanList({ commit }, id) {
      return new Promise((resolve, reject) => {
        getCompanyPlanList(id).then(response => {
          const data = response.data

          commit('GET_COMPANY_PLAN_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCompanySubCompanyList({ commit }, id) {
      return new Promise((resolve, reject) => {
        getCompanySubCompanyList(id).then(response => {
          const data = response.data

          commit('GET_COMPANY_SUB_COMPANY_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCompanyDepartmentList({ commit }, id) {
      return new Promise((resolve, reject) => {
        getCompanyDepartmentList(id).then(response => {
          const data = response.data

          commit('GET_COMPANY_DEPARTMENT_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default company
