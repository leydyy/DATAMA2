import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';  // Ensure the correct path
import Clients from '../components/Clients.vue';

const routes = [
  { path: '/', component: Home },  // Ensure this line is included
  { path: '/clients', component: Clients }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
