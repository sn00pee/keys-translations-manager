<template>
  <div id="project">
    <div class="header">
      <h1>{{name}}</h1>
    </div>
    <div class="progress">
      <vs-progress :percent="completed"></vs-progress>
    </div>

    <div class="translations">
      <vs-table search :data="translations" max-height="65vh">
        <template slot="thead">
          <vs-th sort-key="key">
            key
          </vs-th>
          <vs-th v-for="locale in locales" :key="locale" :sort-key="locale">
            {{locale}}
          </vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr v-for="(tr, indextr) in data" :key="indextr">

            <vs-td :data="tr.key">
              {{tr.key}}
            </vs-td>

            <vs-td :data="tr[locale]" v-for="locale in locales" :key="locale" :ref="`${indextr}-${locale}`">
              {{tr[locale]}}

              <template slot="edit">
                <div class="">
                  <vs-input @change="hasChanged(tr, locale, indextr)" v-model="tr[locale]" class="inputx" :placeholder="locale"/>
                  <p v-if="tr.description">description: {{tr.description}}</p>
                </div>
              </template>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>
<script>
import { getTranslations } from '@/api'
import { mapMutations, mapActions } from 'vuex'
import {
  LOAD_TRANSLATIONS,
  UPDATE_TRANSLATION,
  SET_PROJECT
} from './../../../constants/ActionTypes'

export default {
  name: 'Project',
  props: {
    id: {
      type: String
    }
  },
  created() {
    this.fetchTranslations(this.id)
  },
  data: () => ({
    search: ''
  }),
  computed: {
    locales() {
      return this.$store.state.locales.locales
    },
    name() {
      return this.$store.getters.getProject(this.id).name
    },
    translations() {
      return this.$store.state.translations.translations
    },
    completed() {
      return (this.$store.getters.done.length / this.translations.length) * 100
    }
  },
  methods: {
    ...mapMutations({
      setTranslations: LOAD_TRANSLATIONS,
      setProject: SET_PROJECT
    }),
    ...mapActions({
      save: 'update'
    }),
    fetchTranslations(id) {
      getTranslations(id)
        .then((response) => {
          this.setProject(id)
          this.setTranslations(response.data)
        })
    },
    hasChanged(item, locale, index) {
      this.save(item)
        .then(() => {
          this.$refs[`${index}-${locale}`][0].close()
          this.$socket.emit('keyUpdated', {
            key: item.key,
            _id: item._id,
            project: item.project,
            value: item[locale],
            locale,
            action: UPDATE_TRANSLATION
          })
        })
        .catch((message) => {
          console.log(message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
