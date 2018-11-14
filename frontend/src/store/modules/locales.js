import * as config from './../../../../ktm.config'
import { SET_PROJECT } from './../../../../constants/ActionTypes'

export default {
  state: {
    locales: config.locales,
    base: ''
  },
  // getters: {
  //   defaultBase: (state, rootState) => (id) => {
  //     return rootState.projects.find(project => project.id === id)
  //   }
  // },
  mutations: {
    [SET_PROJECT](state, lang) {
      state.base = lang
    }
  }
}
