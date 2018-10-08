import Vue from 'vue'
import Vuex from 'vuex'
import * as config from '../../ktm.config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locales: config.locales,
    projects: config.projects
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id)
    }
  },
  mutations: {

  },
  actions: {

  },
})
