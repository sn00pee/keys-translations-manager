<template>
  <div id="app">
    <vs-sidebar default-index="1" color="primary" class="sidebarx" spacer v-model="active">
      test
    </vs-sidebar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    active: false
  })
}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>
