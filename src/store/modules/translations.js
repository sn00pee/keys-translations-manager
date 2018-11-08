import { updateTranslation } from '@/api'
import {
  ADD_TRANSLATION,
  LOAD_TRANSLATIONS,
  REMOVE_TRANSLATION,
  UPDATE_TRANSLATION
} from '@/constants/ActionTypes'

const getTotal = (total, value) => total + value

export default {
  state: {
    translations: [],
  },
  getters:{
    empty: (state, getters, rootState) => {
      return state.translations.map(translation => {
        return rootState.locales.locales.map(locale => translation[locale] === '')
      })
    },
    done: (state) => {
      return state.translations.filter(item => item.ja && item.ja !== '')
    }
  },
  actions: {
    update ({ commit, state }, translation) {
      return new Promise((resolve, reject) => {
        updateTranslation(translation._id, translation)
          .then((response) => {
            commit(UPDATE_TRANSLATION, translation)
            resolve()
          })
          .catch((error) => {
            reject(error.message)
          })
      })
    }
  },
  mutations: {
    [LOAD_TRANSLATIONS](state, translations) {
      state.translations = translations
    },
    [ADD_TRANSLATION](state, item) {
      state.translation.push(item)
    },
    [UPDATE_TRANSLATION](state, item) {
      state.translations
        .find(translation => translation._id === item._id)[item.locale] = item.value
    },
    [REMOVE_TRANSLATION](state, item) {

    }
  }
}
