import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Clients from '@/views/Clients.vue';
import Motorcar from '@/views/Motorcar.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/clients', component: Clients },
  { path: '/motorcar', component: Motorcar },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
