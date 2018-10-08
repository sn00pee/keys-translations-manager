import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://localhost:3000');

Vue.config.productionTip = false
Vue.use(Vuesax)

new Vue({
  router,
  store,
  sockets:{
    connect() {
      console.log('socket connected')
    },
    keyUpdated(item) {
      if (this.$route.name === 'project' && (item.project.indexOf(this.$route.params.id) > -1)) {
        this.$vs.notify({
          title: `Key: ${item.key} Updated`,
          text: `${item.locale}: ${item.value}`
        })
      }
    }
  },
  render: h => h(App),
}).$mount('#app')
