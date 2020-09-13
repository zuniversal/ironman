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
  locale: {
    default: 'zh-CN',
    antd: true,  
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  alias: {
    'smartTb': './components/Table',
    'smartForm': './components/Form',
    '_Widgets': './components/Widgets',

  },
  routes: [
    // { path: '/login', component: 'login' },
    // { path: '/userCenter', component: '@/pages/UserCenter' },

    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        ...cs,
        ...om,
        ...sm,
      ],
    },

    ...cs,
    ...om,
    ...sm,
  ],
  theme: {
    '@primary-color': '#00B460',
    '@menu-dark-bg': '#2C2C2C',
    

  },
  
});
