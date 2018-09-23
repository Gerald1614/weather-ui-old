import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
const SocketInstance = socketio('http://192.168.2.14:3000')
Vue.use(VueSocketio, SocketInstance)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
