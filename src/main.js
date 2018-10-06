import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
// import router from './router';
// import store from './store';

Vue.config.productionTip = false
Vue.use(Vuesax)

new Vue({
  // router,
  // store,
  render: h => h(App),
}).$mount('#app')
