// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import Motorcar from '../components/Motorcar.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/motorcar',
    name: 'Motorcar',
    component: Motorcar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;