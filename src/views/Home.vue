<template>
  <div id="home">
    <div class="project" v-for="project in projects">
        <h2>{{project.name}}</h2>
        <vs-button
          vs-type="line"
          :to="{name: 'project', params: { id: project.id }}"
        >View</vs-button>
    </div>
  </div>
</template>
<script>
import { getProjects } from '@/api'

export default {
  name: "Home",
  created() {
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
#home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.project {
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
</style>
