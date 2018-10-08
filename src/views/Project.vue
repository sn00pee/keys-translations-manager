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

            <vs-td :data="tr[locale]" v-for="locale in locales" :key="locale">
              {{tr[locale]}}

              <template slot="edit">
                <div class="">
                  <vs-input @change="hasChanged(tr, locale)" v-model="tr[locale]" class="inputx" :placeholder="locale"/>
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
import { mapMutations } from 'vuex'

export default {
  name: "Project",
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
      return this.$store.state.locales
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
      setTranslations: 'SET_TRANSLATIONS'
    }),
    fetchTranslations(id) {
      getTranslations(id)
        .then((response) => {
          this.setTranslations(response.data)
        })
    },
    hasChanged(item, locale) {
      this.$socket.emit('keyUpdated', {
        key: item.key,
        project: item.project,
        value: item[locale],
        locale,

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
