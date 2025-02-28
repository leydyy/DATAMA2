import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Clients from '@/views/Clients.vue';
import Motorcar from '@/views/Motorcar.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/clients', name: 'Clients', component: Clients },
  { path: '/motorcar', name: 'Motorcar', component: Motorcar }, // ✅ Added route name
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
