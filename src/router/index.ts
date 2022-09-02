import { createRouter, createWebHashHistory } from 'vue-router';
import AddGood from '@/views/AddGood.vue';
import Index from '@/views/Index.vue';

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
  ],
});

export default router;
