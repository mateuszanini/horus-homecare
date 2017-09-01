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
import ('../node_modules/font-awesome/css/font-awesome.css') //font awesome
import ('../static/fonts/roboto-material-icons.css') //roboto font + material icon

import Vuetify from 'vuetify' 
Vue.use(Vuetify)

//Firebase + VueFire
// import VueFire from 'vuefire'
// Vue.use(VueFire)
// import Firebase from 'firebase'
// let config = {
//     apiKey: "AIzaSyBjFaCO0s-wcr34t-PN5pdMg5uPQ-Iqu4A",
//     authDomain: "horus-homecare.firebaseapp.com",
//     databaseURL: "https://horus-homecare.firebaseio.com",
//     projectId: "horus-homecare",
//     storageBucket: "horus-homecare.appspot.com",
//     messagingSenderId: "114846124020"
//   };
// let app = Firebase.initializeApp(config)
// let db = app.database()

import * as firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
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
    if (localStorage.getItem('user')) {
        this.$router.push('/home')
    }
  }
})
