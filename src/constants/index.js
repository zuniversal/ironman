import { animate, createProperty } from '@/utils';

export const isDev = process.env.NODE_ENV === 'development';

// export const BASE_URL = `http://yapi.afafa.com.cn/mock/17/api/v1/console/`;
// export const BASE_URL = `http://188.131.235.243:31002/api/v1/console/`;
export const BASE_URL = `/api/v1/console/`;
// export const BASE_URL = `/api/v1/cnosole/`;

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

export const HOUSENO = '/om/houseNo?';
export const SHIFTSARRANGE = '/om/shiftsArrange?';

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
