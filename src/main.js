import Vue from 'vue'
import App from './App'

// Rotas
import VueRouter from 'vue-router'
import {
  routes
} from './routes';
Vue.use(VueRouter)
const router = new VueRouter({
  routes: routes, 
  //mode: 'history' // para remover o # da URL
});

// CSS
import ('../node_modules/vuetify/dist/vuetify.min.css') // utilizar css-loader (npm install --save-dev css-loader)
import Vuetify from 'vuetify' 
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  components: {
    App
  }
})
