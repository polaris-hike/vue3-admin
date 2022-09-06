import { createRouter, createWebHashHistory } from 'vue-router';
import AddGood from '@/views/AddGood.vue';
import Index from '@/views/Index.vue';
import Login from '@/views/Login.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
    },
    {
      path: '/add',
      component: AddGood,
      name: 'add',
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
    },
  ],
});

export default router;
