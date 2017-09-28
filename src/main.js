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
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //     this.$store.dispatch('fetchUserData')
    //   }
    // })
    // this.$store.dispatch('loadMeetups')

    if (localStorage.getItem('user')) {
      this.$router.push('/home')
    }
  }
})
