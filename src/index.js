import 'to-blob'

import Vue from 'vue'
import App from './components/App.vue'

if (process.env.NODE_ENV === 'production') {
  require('./pwa')
}

new Vue({
  el: '#app',
  render: h => h(App)
})
