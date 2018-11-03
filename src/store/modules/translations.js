const getTotal = (total, value) => total + value
import {
  ADD_TRANSLATION,
  LOAD_TRANSLATIONS,
  REMOVE_TRANSLATION,
  UPDATE_TRANSLATION
} from '@/constants/ActionTypes'

export default {
  state: {
    translations: [],
  },
  getters:{
    empty: (state, rootState) => {
      return state.translations.map(translation => {
        return rootState.locales.map(locale => translation[locale] === '')
      })
    },
    done: (state) => {
      return state.translations.filter(item => item.ja && item.ja !== '')
    }
  },
  actions: {},
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
