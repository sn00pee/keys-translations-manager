<template>
  <div id="project">
    <div class="header">
      <h1>{{name}}</h1>

      <vs-input vs-icon="search" placeholder="Search" v-model="search"/>
    </div>

    <div class="translations">
      <vs-table :data="translations">
        <template slot="thead">
          <vs-th>
            key
          </vs-th>
          <vs-th>
            description
          </vs-th>
          <vs-th v-for="locale in locales" :key="locale">
            {{locale}}
          </vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr v-for="(tr, indextr) in data">

            <vs-td :data="tr.key">
              {{tr.key}}
            </vs-td>

            <vs-td :data="tr.description">
              {{tr.description}}
            </vs-td>

            <vs-td :data="tr[locale]" v-for="locale in locales">
              {{tr[locale]}}

              <template slot="edit">
                <vs-input v-model="tr[locale]" class="inputx" :placeholder="locale"/>
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
    translations: null,
    search: ''
  }),
  computed: {
    locales() {
      return this.$store.state.locales
    },
    name() {
      return this.$store.getters.getProject(this.id).name
    }
  },
  methods: {
    fetchTranslations(id) {
      getTranslations(id)
        .then((response) => {
          this.translations = response.data
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
