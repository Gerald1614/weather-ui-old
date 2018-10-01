import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://192.168.2.14:3000');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
