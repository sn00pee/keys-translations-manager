import Vue from 'vue'
import Vuex from 'vuex'
import translations from './modules/translations'
import projects from './modules/projects'
import locales from './modules/locales'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    translations,
    projects,
    locales
  },
})
