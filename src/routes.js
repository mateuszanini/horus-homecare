// import Home from './components/home/Home.vue';
// import Cadastro from './components/cadastro/Cadastro.vue';
import Login from './components/login/Login.vue';
import Home from './components/home/Home.vue'

export const routes = [{
    path: '/',
    component: Login,
    titulo: 'Login'
  },
  {
    path: '/home',
    component: Home,
    titulo: 'Home'
  }
];
