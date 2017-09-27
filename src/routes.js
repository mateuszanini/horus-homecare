import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/Login.vue';
import Home from './components/home/Home.vue'

Vue.use(VueRouter)

export const routes = new VueRouter({
  routes: [{
      path: '/',
      component: Login,
      titulo: 'Login',
      icone: 'fa-lock'
    },
    {
      path: '/home',
      component: Home,
      titulo: 'Home',
      icone: 'fa-home'
    }
  ],
  //mode: 'history' // para remover o # da URL
})
