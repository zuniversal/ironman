import { init } from '@/utils/createAction';
import * as services from '@/services/user';
import * as systemNotifyServices from '@/services/systemNotify';
import * as userCenterServices from '@/services/userCenter';
import {
  formatSelectList,
  openNotification,
  setItem,
  getItem,
  removeItem,
  getItems,
  setItems,
} from '@/utils';
import { history } from 'umi';
import {
  HOME,
  CRM_HOME,
  CS_HOME,
  isDev,
  homeMap,
  guestModeRedirectMap,
  LOGIN,
  DEF_PALTFORM,
  ASSET_DETAIL,
  noGetUserInfoPath,
} from '@/constants';
import defaultProps, {
  managerRoutes,
  customerRoutes,
  PLATFORM,
  platformMap,
  isPlatformCRM,
} from '@/configs/routes';
import { AUTH_FAIL } from '@/utils/request';
import cookie from 'react-cookies';
import io from 'socket.io-client';
import authData from '@/configs/auth';
import { notifyWs } from '@/services/common';
import { notification } from 'antd';
import moment from 'dayjs';
const namespace = 'user';
const { createActions, createAction } = init(namespace);

const otherActions = [
  'loginAsync',
  'logoutAsync',
  'getUserInfo',
  'getNotifyAsync',
  'getUserMsgAsync',
  'readAllMsgAsync',
];

const batchTurnActions = ['onPlatformChange'];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

export const userActions = actions;

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const userInfo = getItem('userInfo') ? getItem('userInfo') : {};
// console.log(' userInfo ： ', userInfo);

export const getClientId = props => {
  const userInfo = getItem('userInfo');
  // const customer_id = getItem('guestModeId') || userInfo.id;
  const customer_id =
    getItem('guestModeId') || userInfo.enterprises[0]?.customers[0]?.id;
  return customer_id;
};

export const handleGuestMode = props => {
  const { customer_id } = history.location.query;
  console.log(' handleGuestMode   ,   ： ', props, customer_id);
  setItem('isGuestMode', true);
  setItem('guestModeId', customer_id);
  if (customer_id) {
    cookie.save('s_cst_id', customer_id);
  }
};

export const logoutGuest = props => {
  console.log(' logoutGuest   ,   ： ', props);
  removeItem('isGuestMode');
  removeItem('guestModeId');
  cookie.remove('s_cst_id');
  cookie.remove('enterprise_id');
};

export const flatAuthTest = (data = []) => {
  // console.log(' flatAuthTest   ,   ： ', data, authData);
  const authConfig = {};
  data.forEach(v => {
    if (v.authKey) {
      authConfig[v.authKey] = v.authInfo;
    }
  });
  return authConfig;
};
// flatAuthTest(authData)

export const flatAuth = (authData = {}, authConfig = {}) => {
  // console.log(
  //   '  getRoutes(authData) flatAuthflatAuth   ,   ： ',
  //   authData,
  //   authConfig,
  // );
  Object.keys(authData).forEach(authKey => {
    authConfig[authKey] = authData[authKey].perms;
    // if (Object.keys(authData[authKey].sub).length) {
    if (authData[authKey].sub && Object.keys(authData[authKey].sub).length) {
      flatAuth(authData[authKey].sub, authConfig);
    }
  });
  return authConfig;
};

export const recursiveAuth = (data = [], authData = {}) => {
  // console.log(' Layouts  recursiveAuth   ,   ： ', data, authData);
  return data.map(v => ({
    // hideInMenu: isDev
    //   ? false
    //   : !(v.authKey ? authData[v.authKey]?.perms.module : true),
    hideInMenu: !(v.authKey && authData[v.authKey]
      ? authData[v.authKey]?.module
      : false),
    // hideInMenu: false,
    authInfo: authData[v.authKey] ?? {},
    ...v,
    // routes: recursiveAuth(v.routes, authData[v.authKey]?.sub),
    routes:
      v.routes && v.routes.length > 0
        ? recursiveAuth(v.routes, authData)
        : v.routes,
  }));
};

const routesMap = {
  manager: managerRoutes,
  // manager: [...managerRoutes, ...customerRoutes],
  customer: customerRoutes,
};

const getRoutesMap = (text, dataMap) => {
  const val = dataMap[text];
  return val ? val : [];
};

// const getRoutesAuthMap = (routes, routesAuthMap = []) => {
//   return routes.forEach(v => {
//     [v.authKey]: v.authKey,
//     routes: recursiveAuth(v.routes, authData[v.authKey]?.sub),
//   });
// };

const getRoutes = (props = {}) => {
  const userInfo = getItem('userInfo') ?? {};
  // console.log(' userInfo ： ', userInfo, props); //
  // const routes = isDev
  //   ? [...managerRoutes, ...customerRoutes]
  //   : // ? [...customerRoutes]
  //     getRoutesMap(userInfo.accountType, routesMap);
  const routes = getRoutesMap(userInfo.accountType, routesMap);
  // console.log(
  //   ' getRoutes   userInfo,   ： ',
  //   userInfo,
  //   userInfo.accountType,
  //   routes,
  //   props,
  // );
  const { platform = PLATFORM } = props; //
  // console.log(' platform ： ', platform); //
  // const routesConfig = recursiveAuth(routes, authData);
  const routesConfig = recursiveAuth(routes, flatAuth(props?.perms)).map(v => ({
    ...v,
    hideInMenu: v.cb
      ? v.cb()
      : v.platform
      ? (v.platform && v.platform !== platform) || v.hideInMenu
      : // : false,
        v.hideInMenu,
  }));
  const routesData = {
    route: {
      path: '/',
      // routes: routes,
      routes: routesConfig,
    },
    location: {
      pathname: '/',
    },
  };
  return routesData;
};

// const routesData = getRoutes(authData);
// console.log(
//   ' getRoutes(authData) ： ',
//   routesData,
//   recursiveAuth(routesData.route.routes, authData),
//   flatAuth(authData),
// );

const model = {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    userInfo,
    authInfo: {},
    accountType: 'customer',
    // getRoutes: getRoutes()[0],
    getRoutes: getRoutes(getItem('userInfo') || {}),
    system: 'OM',
    // homeSettings: [ 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', ],
    userMsg: [],
    platform: getItem('platform') || DEF_PALTFORM,
    guestInfo: {},
    isGuestMode: getItem('isGuestMode'),
    isNotice: false,
  },

  reducers: {
    toggle(state, { payload, type }) {
      console.log(' toggle 修改  ： ', state, payload, type);
      return {
        ...state,
        system: state.system == 'CS' ? 'OM' : 'CS',
      };
    },
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: false,
        itemDetail: {},
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: payload.bean,
      };
    },
    addItem(state, { payload, type }) {
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
        isShowModal: false,
        count: state.count + 1,
      };
    },
    editItem(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        isShowModal: false,
      };
    },
    removeItem(state, { payload, type }) {
      const removeList = payload.payload.filter(v => v.id);
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          removeList.some(item => v.id === item),
        ),
      };
    },
    login(state, { payload, type }) {
      const isGuestMode = getItem('isGuestMode');
      const userInfoKey = isGuestMode ? 'guestInfo' : 'userInfo';
      const authInfo = flatAuth(payload.perms);
      const routeData = getRoutes({
        ...payload,
        platform: state.platform,
      });
      // console.log(
      //   ' getRoutes(authData) login .userInfo.userInfo：state ',
      //   routeData,
      //   payload,
      // );
      return {
        ...state,
        isGuestMode,
        [userInfoKey]: payload,
        getRoutes: routeData,
        // authInfo: flatAuth(authData),
        // authInfo: flatAuth(payload.perms),
        authInfo: authInfo,
        accountType: payload.account.account_type,
        system: payload.account.account_type == 'manager' ? 'OM' : 'CS',
        platform: payload.platform || state.platform,
      };
    },
    getUserMsg(state, { payload, type }) {
      const { userMsg } = state;
      return {
        ...state,
        userMsg: payload,
        isNotice: userMsg.length !== payload.length,
      };
    },
    onPlatformChange(state, { payload, type }) {
      console.log(' onPlatformChange   ,   ： ', state, payload);
      const { getRoutes } = state;
      const { platform } = payload;
      setItem('platform', platform);
      const filteRouteData = getRoutes.route.routes.map(v => {
        // console.log(
        //   ' filteRouteData xxxxxx ： ',
        //   v,
        //   v.platform,
        //   platform,
        //   v.platform !== platform,
        //   v.platform && v.platform !== platform,
        // ); //
        return {
          ...v,
          // hideInMenu: v.platform && v.platform !== platform ? true : false,
          hideInMenu: v.cb
            ? v.cb()
            : v.platform
            ? (v.platform && v.platform !== platform) || v.hideInMenu
            : // : false,
              false,
          // hideInMenu: isDev
          //   ? false
          //   : v.platform && v.platform !== platform
          //   ? true
          //   : false,
        };
      });
      const path = isPlatformCRM() ? CRM_HOME : HOME; //
      history.push(path);
      console.log(' filteRouteData ： ', state, payload, filteRouteData); //
      return {
        ...state,
        platform,
        getRoutes: {
          route: {
            path: '/',
            routes: filteRouteData,
          },
          location: {
            pathname: '/',
          },
        },
      };
    },
    // saveHomeSetting(state, { payload, type }) {
    //   console.log(' saveHomeSetting 修改  ： ', state, payload, type);
    //   const { userInfo } = state;
    //   setItem(`${userInfo.id}_homeSettings`, payload.homeSettings)
    //   return {
    //     ...state,
    //     isShowModal: false,
    //     ...payload,
    //   };
    // },
    readMsg(state, { payload, type }) {
      const { userMsg } = state;
      return {
        ...state,
        userMsg: userMsg
          .filter(v => v.id !== payload.data.id)
          .map(v => ({ ...v, count: v.count - 1 })),
      };
    },
    readAllMsg(state, { payload, type }) {
      const { userMsg } = state;
      return {
        ...state,
        userMsg: [],
        isNotice: false,
      };
    },
    onNoticeChange(state, { payload, type }) {
      console.log(' onNoticeChange ： ', payload);
      return {
        ...state,
        isNotice: payload.isNotice,
      };
    },
  },

  effects: {
    *loginAsync({ payload, action, type }, { call, put }) {
      console.log(' loginAsync ： ');
      const res = yield call(services.login, payload);
      console.log(' loginAsync ： ', res, payload, action);
      setItem('token', res.rest.token, true);
      setItem('tokens', res.rest.token);
      // const userInfo = yield call(userCenterServices.getItem, payload);

      const resData = yield call(services.getUserInfo);
      const [enterprise = {}] = resData.bean.enterprises;
      // console.log(' enterprise ： ', enterprise);
      const accountType = resData.bean.user.account.account_type;
      // console.log(' resData ： ', resData, accountType,  )//
      const platform = platformMap[accountType];
      const userInfo = {
        ...resData.bean.user,
        ...resData.bean,
        accountType: accountType,
        platform: platform,
      };
      setItem('platform', platform);
      cookie.remove('enterprise_id');
      if (enterprise.enterprise_id) {
        // cookie.save('enterprise_id', enterprise.enterprise_id);
      }
      setItem('userInfo', userInfo);
      console.log(' userInfo2 ： ', userInfo);
      yield put({
        type: 'login',
        payload: userInfo,
      });
      const path = homeMap[accountType] ? homeMap[accountType] : '/';
      console.log(' path ： ', path, accountType, resData);
      // if (resData.rest.code === AUTH_FAIL) {
      //   history.push(LOGIN);
      // } else {
      // }

      history.push(path);
      openNotification({
        message: '系统通知',
        description: '欢迎来到电管家！',
      });
    },
    *logoutAsync({ payload, action, type }, { call, put }) {
      console.log(' logoutAsync ： ', payload, action, type);
      // const res = yield call(services.logout, payload);
      logoutGuest();
      history.push(LOGIN);
      window.location.reload();
      // yield put(action({ ...res, payload }));
    },
    *logoutGuestAsync({ payload, action, type }, { call, put }) {
      console.log(' logoutGuestAsync ： ', payload, action, type);
      logoutGuest();
      const res = yield put({
        type: 'getUserInfoAsync',
        payload: {
          isLogoutGuest: true,
        },
      });
      console.log('  logoutGuestAsync res ：', res); //
      // const res = yield call(services.logout, payload);
      // history.push(LOGIN);
      // window.location.reload();
      // yield put(action({ ...res, payload }));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },

    *getUserInfoAsync({ payload, action, type }, { call, put }) {
      // console.log(' getUserInfoAsync ： ', payload, action, type);
      const resData = yield call(services.getUserInfo);
      const [enterprise = {}] = resData.bean.enterprises;
      // console.log(' enterprise ： ', enterprise);
      const accountType = resData.bean.user.account.account_type;
      // console.log(' resData ： ', resData, accountType,  )//
      const userInfo = {
        ...resData.bean.user,
        ...resData.bean,
        accountType: accountType,
        platform: payload?.isLogoutGuest ? DEF_PALTFORM : null,
      };
      cookie.remove('enterprise_id');
      if (enterprise.enterprise_id) {
        // cookie.save('enterprise_id', enterprise.enterprise_id);
      }
      setItem('userInfo', userInfo);
      // console.log(' userInfo2 ： ', userInfo);

      yield put({
        type: 'login',
        payload: userInfo,
      });

      if (payload?.isLogoutGuest) {
        console.log(' getUserInfoAsync payload?.isLogoutGuest ： '); //
        history.push(guestModeRedirectMap[accountType]);
      }
    },

    *getNotifyAsync({ payload, action, type }, { call, put }) {
      console.log(' getNotifyAsync ： ', payload, action, type);
      const res = yield call(services.getNotify, payload);
      console.log(' getNotifyAsync res ： ', res);
      // yield put(action({ ...res, payload }));
    },

    *getUserMsgAsync({ payload, action, type }, { call, put }) {
      // const res = yield call(services.getUserMsg, payload);
      // const res = yield call(services.getUserMsg, {
      const res = yield call(systemNotifyServices.getList, {
        get_all: 1,
        is_read: 0,
        _sort: '-created_time',
      });
      const data = res.list.map(v => ({
        ...v,
        time: moment(v.timestamp).format('YYYY-MM-DD'),
        created_time: moment(v.created_time).format('YYYY-MM-DD'),
        count: res.rest.count,
      }));

      const popArr = data.filter(v => v.is_pop);

      if (!payload.noNotify) {
        popArr.forEach(v => {
          notification.info({
            // message: (
            //   <div>
            //     <div>{v.time}</div>
            //     <div>{v.verb}</div>
            //   </div>
            // ),
            message: v.title,
            description: v.content,
            className: 'userMsgNotice',
          });
          // systemNotifyServices.noPopMsg({d_id: v.id,});
        });
      }
      if (!!popArr.length) {
        systemNotifyServices.noPopAllMsg();
      }
      // yield put(action({ ...res, payload }));
      yield put({
        type: 'getUserMsg',
        payload: data,
      });
    },
    *readMsgAsync({ payload, action, type }, { call, put }) {
      console.log(' readMsgAsync ： ', payload, action, type);
      const isReadHandle =
        payload.data.is_read == 0 ? systemNotifyServices.readMsg : () => {}; //
      console.log('  isReadHandle ：', isReadHandle); //
      const res = yield call(isReadHandle, { d_id: payload.data.id });

      const userInfo = getItem('userInfo');
      yield put({
        type: 'getUserMsgAsync',
        payload: {
          user_id: userInfo.id,
          noNotify: true,
        },
      });

      // yield put({
      //   type: 'readMsg',
      //   payload,
      // });
    },
    *readAllMsgAsync({ payload, action, type }, { call, put }) {
      console.log(' readAllMsgAsync ： ', payload, action, type);
      const res = yield call(systemNotifyServices.readAllMsg);
      console.log(' readAllMsgAsync res ： ', res);

      const userInfo = getItem('userInfo');
      yield put({
        type: 'getUserMsgAsync',
        payload: {
          user_id: userInfo.id,
          noNotify: true,
        },
      });
    },
  },

  subscriptions: {
    setup: props => {
      const { dispatch, history } = props;

      const getUserMsg = params => {
        const userInfo = getItem('userInfo');
        if (userInfo?.id) {
          dispatch({
            type: 'getUserMsgAsync',
            payload: {
              user_id: userInfo.id,
            },
          });
        }
      };

      getUserMsg();

      setInterval(getUserMsg, 60 * 1000);
      // }, 3 * 1000);

      // dispatch({
      //   type: 'getUserMsgAsync',
      //   payload: {
      //     user_id: 1,
      //   },
      // });

      history.listen(location => {
        // console.log(' 监听路由 匹配 ： ', history, location);
        const { pathname } = location;
        // if (pathname !== '/login') {
        if (!noGetUserInfoPath.includes(pathname)) {
          dispatch({
            type: 'getUserInfoAsync',
          });
        }
      });

      return;
      const msgs = [
        {
          id: 1,
          unread: true,
          description: '创建快捷方式1',
          verb: 'admin发送了一条消息通知1',
          timestamp: '2020-12-22T11:56:56.472362',
          recipient_id: 79597,
        },
        {
          id: 2,
          unread: true,
          description: '创建快捷方式2',
          verb: 'admin发送了一条消息通知2',
          timestamp: '2020-12-22T11:56:56.472362',
          recipient_id: 79597,
        },
      ];
      const websocket = new window.WebSocket(
        'ws://119.3.123.144:8008/websocket',
      );
      // const websocket = new window.WebSocket(notifyWs);
      //连接成功建立的回调方法
      websocket.onopen = event => {
        console.log(' websocket.onopen ： ', event);
      };

      //连接发生错误的回调方法
      websocket.onerror = () => {
        console.log(' websocket.onerror ： ');
      };

      //接收到消息的回调方法
      websocket.onmessage = event => {
        console.log(' websocket.onmessage ： ', event.data);
        // console.log(' websocket.onmessage2 ： ', JSON.parse(event.data));
      };

      //连接关闭的回调方法
      websocket.onclose = () => {
        console.log(' websocket.onclose ： ');
      };

      // const socket = io('ws://121.40.165.18:8800');
      // socket.on('connect', () => {
      //   console.log(" 连接 subscribechannel, params ： ", socket.connected) //
      // });
      // const socket = io('http://localhost:8000/wsocket');
      // console.log(' subscribechannel socket ： ', socket, io )//
      // socket.on('connect', () => {
      //   console.log(" 连接 subscribechannel, params ： ", socket.connected) //
      // });
      // socket.on('connecting', () => {
      //   console.log(" 连接 subscribechannel, params2 ： ", socket.connected) //
      // });
    },
  },
};

export const actions = createAction(model);

export default model;
