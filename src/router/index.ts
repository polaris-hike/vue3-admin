import { createRouter, createWebHashHistory } from 'vue-router';
import AddGood from '@/views/AddGood.vue';
import Index from '@/views/Index.vue';
import IndexConfig from '@/views/IndexConfig.vue';
import Login from '@/views/Login.vue';
import Swiper from '@/views/Swiper.vue';

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
    {
      path: '/swiper',
      component: Swiper,
      name: 'swiper',
    },
    {
      path: '/hot',
      name: 'hot',
      component: IndexConfig,
    },
    {
      path: '/new',
      name: 'new',
      component: IndexConfig,
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: IndexConfig,
    },
  ],
});

export default router;
