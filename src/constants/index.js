import { animate, createProperty } from '@/utils';





export const PRIMARY = '#00B460'












export const isTest = process.env.NODE_ENV === 'development';

export const TIMEOUT_TXT =
  'Somthing wrong happen, please contact IT Department ^_^ '; //

// export const URL = "http://192.168.108.165:8000/UserConfig/data"
// export const URL_PREFIX = "http://192.168.108.165:8000/"
// export const URL = "http://192.168.108.106:8000/UserConfig/data"

// export const URL_PREFIX = "http://192.168.108.167:8080/"
export const URL_PREFIX = 'https://app.pvumgroup.com/';
// export const URL_PREFIX = "http://192.168.108.85:8000/"
export const URL = `${URL_PREFIX}api/UserConfig/data/`;
export const forgetPwdURL = `${URL_PREFIX}empinfo/#/forgetPwd?system=empinfo`;
// export const forgetPwdURL = "http://localhost:8080/#/forgetPwd"
// export const forgetPwdURL = "http://192.168.108.167:8080/#/forgetPwd"
export const APPRAISAL_URL = `http://192.168.10.24:8080/appraisal`;

// export const URL = "https://app.pvumgroup.com/api/UserConfig/data"
// export const URL_PREFIX = "https://app.pvumgroup.com/api"
// export const forgetPwdURL = "https://app.pvumgroup.com/empinfo/#/forgetPwd/"

export const RESET_SUCC =
  "The Password Reset Successfully, Do You Want To Go Back System's Login o(*￣︶￣*)o"; //

// export const URL = "https://192.168.100.24:8000/UserConfig/data"
// export const URL_PREFIX = "https://192.168.100.24:8000/"
// export const forgetPwdURL = "http://192.168.100.23/empinfo/#/forgetPwd/"
// export const forgetPwdURL = "http://192.168.108.167:8080/#/forgetPwd"
export const TABPATH = 'page/';
export const PAGEATH = 'page/';
// export const {employeeID} = userInfo
// export const department = userInfo.department
export const SELECT_TXT = '请选择';
export const INPUT_TXT = '请输入';
export const WORD = '关键字';
export const REQUIRE = '字段必填！';

export const SIZE = 10;
export const PAGE = 1;

export const USER_INFO = 'USER_INFO';
export const LOUOUT = 'LOUOUT';
export const LOAD = 'LOAD';
export const ALL_SHCEDULE_NO = 'ALL_SHCEDULE_NO';
export const NO_BARCODE_DATA = 'NO_BARCODE_DATA';
export const STYLES = 'STYLES';
export const SCROLL_HEIGHT = 'SCROLL_HEIGHT';
export const IS_COLLPOSED = 'IS_COLLPOSED';

export const P_SUFFIX = '_PENDING';
export const F_SUFFIX = '_FULFILLED';
export const R_SUFFIX = '_REJECTED';

export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

export const PROMISE_LOGIN = 'PROMISE_LOGIN';
export const PROMISE_LOGIN_PENDING = `${PROMISE_LOGIN}${P_SUFFIX}`;
export const PROMISE_LOGIN_FULFILLED = `${PROMISE_LOGIN}${F_SUFFIX}`;
export const PROMISE_LOGIN_REJECTED = `${PROMISE_LOGIN}${R_SUFFIX}`;

export const CHECK_TXT = 'ON';
export const UN_CHECK_TXT = 'OFF';
export const TIME_ZERO = ' 00:00:00';

export const SUCC_TXT = 'Action Successful o(*￣︶￣*)o ！';

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
