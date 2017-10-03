import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
// Rotas
import {
  routes
} from './routes';
//Vuex
import {
  store
} from './store';
// CSS
import ('../node_modules/vuetify/dist/vuetify.min.css') // utilizar css-loader (npm install --save-dev css-loader)
import ('../node_modules/font-awesome/css/font-awesome.css') //font awesome
import ('../static/fonts/roboto-material-icons.css') //roboto font + material icon
//Vuetify
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: routes,
  store: store,
  render: h => h(App),
  components: {
    App
  },
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBjFaCO0s-wcr34t-PN5pdMg5uPQ-Iqu4A",
      authDomain: "horus-homecare.firebaseapp.com",
      databaseURL: "https://horus-homecare.firebaseio.com",
      projectId: "horus-homecare",
      storageBucket: "horus-homecare.appspot.com",
      messagingSenderId: "114846124020"
    })

    this.$store.dispatch('userIsAuthenticated').then(
      result => {
        if (result) {
          this.$router.push('/home')
        } else {
          this.$router.push('/')
        }
      })

    this.$store.dispatch('isOnline')

    var app = document.createElement('div')
    app.setAttribute('data-app', true)
    document.body.appendChild(app)
  }
})
