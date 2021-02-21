import { defineConfig } from 'umi';
import cs from './routes/cs';
import om from './routes/om';
import sm from './routes/sm';
import common from './routes/common';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
  links: [{ rel: 'icon', href: 'favicon.ico' }],
  // 启用 语言本地化 需要在 src 下创建一个 locales 目录
  // Warning: The current popular language does not exist please check the locales folder!
  locale: {
    antd: true,
    default: 'zh-CN', //
  },

  dynamicImport: {
    loading: '@/common/Loading',
  },
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        },
      },
    });
  },
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },

  alias: {
    smartTb: './src/components/Table',
    smartForm: './src/components/Form',
    widgets: './src/components/Widgets',
    _Widgets: './src/components/Widgets',

    '@smartTb': './src/components/Table',
    '@smartForm': './src/components/Form',
    '@Widgets': './src/components/Widgets',
  },
  routes: [
    // { path: '/login', component: 'login' },
    // { path: '/userCenter', component: '@/pages/UserCenter' },

    ...common,
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        // { path: '/om/test', component: '@/pages/Test' },
        // ...cs,
        // ...om,
        // ...sm,

        {
          path: '/om/inspectRecord',
          authKey: 'inspectionRecord',
          component: '@/pages/om/InspectRecord',
          title: '巡检记录',
        },
        {
          path: '/om/powerStation',
          authKey: 'powerStation',
          component: '@/pages/om/PowerStation',
          title: '电站管理',
        },
        {
          path: '/om/drawPanel',
          authKey: 'drawPanelConfig',
          component: '@/pages/om/DrawPanel',
          title: '一次线路图',
        },

        // ...routes,
      ],
    },

    // ...cs,
    // ...om,
    // ...sm,
  ],
  theme: {
    '@primary-color': '#00B460',
    '@menu-dark-bg': '#2C2C2C',
  },

  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        },
      },
    });
  },
  proxy: {
    '/api': {
      target: 'http://188.131.235.243:31002',
      // target: 'http://192.168.124.14:8001',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
    '/proapi': {
      target: 'https://epk.faladi.cn:31009',
      // target: 'http://192.168.124.14:8001',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
    '/wsocket': {
      target: 'ws://119.3.123.144:8008/websocket',
      changeOrigin: true,
      ws: true,
    },
  },
});
