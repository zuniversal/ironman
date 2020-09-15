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

  // 启用 语言本地化 需要在 src 下创建一个 locales 目录 
  // Warning: The current popular language does not exist, please check the locales folder!
  locale: {
    antd: true,  
    // default: 'zh-CN',
    // title: false,
    // baseNavigator: true,
    // baseSeparator: '-',
  },
  alias: {
    'smartTb': './src/components/Table',
    'smartForm': './src/components/Form',
    'widgets': './src/components/Widgets',
    '_Widgets': './src/components/Widgets',

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
