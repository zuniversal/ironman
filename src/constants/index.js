import { animate, createProperty } from '@/utils';

export const isDev = process.env.NODE_ENV === 'development';

export const MINI_POWER = 'http://81.68.221.146/#/home';

export const DOWN_ASSETS_TPL = '/api/v1/export/equipment.xlsx';

// export const BASE_URL = `http://yapi.afafa.com.cn/mock/17/api/v1/console/`;
// export const TEST_URL = `http://188.131.235.243:31002/api/v1/console/`;
// export const TEST_URL = `http://188.131.235.243:31005/api/v1/console/`;
// export const TEST_URL = `http://188.131.235.243:31005/api/v1/console/`;
// export const URL_PREFIX = `http://188.131.235.243:31002`;
export const URL_PREFIX = `http://81.68.218.18:31002`;
// export const URL_PREFIX = `https://epk.faladi.cn:31009`;
export const WS_DEV = `188.131.235.243:31002`;
export const WS_HOST = window.location.host;

const { protocol = 'http:', hostname } = window.location;
const wsMap = {
  'http:': 'ws:',
  'https:': 'wss:',
}[protocol];

export const WS_PREFIX = `${wsMap}//${isDev ? WS_DEV : WS_HOST}`;

export const DEV_SCREEN_PORT = '31004';
export const PROD_SCREEN_PORT = '31008';
export const screenPort = {
  'http:': DEV_SCREEN_PORT,
  'https:': PROD_SCREEN_PORT,
}[protocol];
export const BIG_SCREEN =
  protocol + '//' + hostname + `:${screenPort}/normal_screen`;

export const TEST_URL = `/api/v1/`;
export const PROXY_URL = `/api/v1/`;
// export const PROXY_URL = `/api/v1/cnosole/`;
// export const BASE_URL = isDev ? PROXY_URL : TEST_URL;
export const BASE_URL = isDev ? PROXY_URL : TEST_URL;
// console.log(' BASE_URL ： ', BASE_URL, process.env);
// export const URL = `${URL_PREFIX}${BASE_URL}`;
export const URL = `${BASE_URL}`;

export const PRIMARY = '#00B460';

// const account = 'admin'
// const pwd = 'afafa'

export const SELECT_TXT = '请选择';
export const INPUT_TXT = '请输入';
export const WORD = '关键字';
export const REQUIRE = '字段必填！';

export const SIZE = 10;
export const PAGE = 1;

export const CHECK_TXT = 'ON';
export const UN_CHECK_TXT = 'OFF';
export const TIME_ZERO = ' 00:00:00';

export const LOGIN = '/login';
export const HOME = '/om/home';
export const CS_HOME = '/cs/home';
export const homeMap = {
  manager: HOME,
  customer: CS_HOME,
};
export const HOUSENO = '/om/houseNo?';
export const SHIFTSARRANGE = '/om/shiftsArrange?';
export const csSystemNotify = '/cs/systemNotify?';
export const DRAW_PANEL = '/om/drawPanel';

const animations = [
  'bounce',
  'flash',
  'rubberBand',
  'shake',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutLeft',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedIn',
  'lightSpeedOut',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
];

export const ANIMATE = createProperty(animations, animate);
