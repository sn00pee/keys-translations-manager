export default {
  state: {
    translations: []
  },
  getters:{
    empty: (state) => {
      return state.translations.filter(item => Object.keys(item).indexOf('ja') === -1 || item.ja === '')
    },
    done: (state) => {
      return state.translations.filter(item => item.ja && item.ja !== '')
    }
  },
  actions: {},
  mutations: {
    SET_TRANSLATIONS(state, translations) {
      state.translations = translations
    },
    ADD_TRANSLATION(state, item) {
      state.translation.push(item)
    },
    UPDATE_TRANSLATION(state, item) {
      state.translations
        .find(translation => translation._id === item._id)[item.locale] = item.value
    },
    REMOVE_TRANSLATION(state, item) {

    }
  },
}
