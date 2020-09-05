import { defineConfig } from 'umi';
import cs from './routes/cs';
import om from './routes/om';
import sm from './routes/sm';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: [
    // { path: '/login', component: 'login' },

    {
      path: '/',
      component: '@/layouts/index',
      routes: [...om],
    },

    ...cs,
    ...om,
    ...sm,
  ],
});
