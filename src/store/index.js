import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import config from '../../ktm.config.js'
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
