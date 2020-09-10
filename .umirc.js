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
  publicPath: './',
  routes: [
    // { path: '/login', component: 'login' },
    // { path: '/userCenter', component: '@/pages/UserCenter' },

    {
      path: '/',
      component: '@/layouts/index',
      routes: [...om],
    },

    ...cs,
    ...om,
    ...sm,
  ],
  theme: {
    '@primary-color': '#00B460',
  },
});
