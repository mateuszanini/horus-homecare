import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/Login.vue';
import Home from './components/home/Home.vue'
import Beats from './components/beats/Beats.vue'
import Pressure from './components/pressure/Pressure.vue'
import Glucose from './components/glucose/Glucose.vue'
import CreateBeats from './components/shared/create/CreateBeats.vue'

Vue.use(VueRouter)

export const routes = new VueRouter({
  routes: [{
      path: '/',
      component: Login,
      titulo: 'Login',
      icone: 'fa-lock'
    },
    {
      path: '/home/',
      component: Home,
      titulo: 'Home',
      icone: 'fa-home',
      children: [{
          path: 'beats',
          component: Beats
        },
        {
          path: 'pressure',
          component: Pressure
        },
        {
          path: 'glucose',
          component: Glucose
        }
      ]
    }, 
    {
      path: '/create/beats',
      component: CreateBeats
    }
  ],
  //mode: 'history' // para remover o # da URL
})
