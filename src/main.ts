import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.less';

import App from './App.vue';
import router from './router';
import './styles/theme.less';
import './styles/dashboard.less';

if (typeof document !== 'undefined') {
  document.body.setAttribute('arco-theme', 'dark');
}

createApp(App).use(ArcoVue).use(router).mount('#app');
