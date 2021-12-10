import { animate, createProperty } from '@/utils';

export const isDev = process.env.NODE_ENV === 'development';

export const PROXY_IMG_URL = '/img/';
export const IMG_URL =
  'https://images-1302976931.cos.ap-shanghai.myqcloud.com/';

export const MONITOR_DEVICE_TPL =
  'https://upload-1302976931.cos.ap-shanghai.myqcloud.com/excel_import/devices_demo.xlsx';
export const PDF_URL =
  'https://report-1302976931.cos.ap-shanghai.myqcloud.com/'; //
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
export const DANGER = 'red'; //
export const WARN = '#f50'; //
export const INFO = '#108ee9'; //
export const SUB = 'cyan'; //

export const tagColorMap = {
  0: DANGER,
  1: PRIMARY,
  2: WARN,
  3: INFO,
  4: SUB,
};

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
export const CRM_HOME = '/crm/clientList';
// export const CS_HOME = '/cs/home';
export const CS_SYSTEM = 'CS';
export const DEF_PALTFORM = 'bp';
export const USER_CENTER = '/om/userCenter?';
export const HOUSENO = '/om/houseNo?';
export const SHIFTSARRANGE = '/om/shiftsArrange?';
export const csSystemNotify = '/cs/systemNotify?';
export const csElectricInfo = '/cs/electricInfo?';
export const DRAW_PANEL = '/om/drawPanel';
export const TRUST_CLIENT = '/om/trustClient';
export const CS_HOME = '/cs/energyInfo';
export const ASSETS_DETAIL = '/om/assetsDetail?';
export const ASSETS = '/om/assets';
export const ASSET_DETAIL = '/assetDetail';
export const CLIENT_LIST = '/crm/clientList?';

export const noGetUserInfoPath = [LOGIN, ASSET_DETAIL];

export const noRedirectLoginPath = [ASSET_DETAIL];

export const homeMap = {
  manager: HOME,
  customer: CS_HOME,
};
export const guestModeRedirectMap = {
  manager: TRUST_CLIENT,
  customer: CS_HOME,
};

export const INIT_BILL_TYPE = '16';
export const SIM_XLSX = '/sim.xlsx';

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
