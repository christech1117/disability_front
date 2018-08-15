import {
  getServiceUserList
} from '@/api/person'

const person = {
  state: {
    serviceUsers: []
  },

  mutations: {
    GET_SERVICE_USER_LIST: (state, serviceUsers) => {
      state.serviceUsers = serviceUsers
    }
  },

  actions: {
    GetServiceUserList({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        getServiceUserList(id).then(response => {
          const data = response.data

          commit('GET_SERVICE_USER_LIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default person
