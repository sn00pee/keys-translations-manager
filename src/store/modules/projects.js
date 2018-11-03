import * as config from '../../../ktm.config'
import { SET_PROJECT } from '@/constants/ActionTypes'

export default {
  state: {
    projects: config.projects,
    current: null
  },
  getters: {
    getProject: (state) => (id) => {
      return state.projects.find(project => project.id === id)
    }
  },
  actions: {

  },
  mutations: {
    [SET_PROJECT](state, projectId) {
      state.current = projectId
    }
  }
}
