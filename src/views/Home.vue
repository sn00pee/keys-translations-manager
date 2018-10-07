<template>
  <div id="home">
    <div class="project" v-for="project in projects">
        <h2>{{project.name}}</h2>
        <vs-button vs-type="line">View</vs-button>
    </div>
  </div>
</template>
<script>
import { getProjects } from '@/api'

export default {
  name: "Home",
  mounted() {
    this.fetchProjects()
  },
  data: () => ({
    projects: null
  }),
  methods: {
    fetchProjects() {
      getProjects()
        .then((response) => {
          this.projects = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
