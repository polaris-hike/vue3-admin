import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

import 'element-plus/theme-chalk/index.css';
import '../theme/icon.css';

const app = createApp(App);

app.use(router);

app.use(ElementPlus);

app.mount('#app');
