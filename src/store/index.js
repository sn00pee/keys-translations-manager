import Vue from 'vue'
import Vuex from 'vuex'
import * as config from '../../ktm.config'
import translations from './modules/translations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    translations
  },
  state: {
    locales: config.locales,
    projects: config.projects,

  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id)
    }
  },
  mutations: {},
  actions: {},
})
