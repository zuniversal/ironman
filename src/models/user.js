import { init } from '@/utils/createAction'; //
import * as services from '@/services/user';
import * as userCenterServices from '@/services/userCenter';
import { formatSelectList, nowYearMonth, setItem, getItem } from '@/utils';
import { history } from 'umi';
import { HOME, CS_HOME, isDev, homeMap, LOGIN } from '@/constants';
import defaultProps, { managerRoutes, customerRoutes } from '@/configs/routes';
import { AUTH_FAIL } from '@/utils/request';

const namespace = 'user';
const { createActions } = init(namespace);

const otherActions = ['loginAsync', 'logoutAsync', 'getUserInfo'];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const userInfo = getItem('userInfo') ? getItem('userInfo') : {};
console.log(' userInfo ： ', userInfo); //

const getRoutes = path => {
  const userInfo = getItem('userInfo') ? getItem('userInfo') : {};

  const routesMap = {
    manager: managerRoutes,
    // manager: [...managerRoutes, ...customerRoutes],
    customer: customerRoutes,
  };
  const getRoutesMap = (text, dataMap) => {
    const val = dataMap[text];
    return val ? val : [];
  };
  const routes = false
    ? [...managerRoutes, ...customerRoutes]
    : getRoutesMap(userInfo.accountType, routesMap);
  console.log(
    ' getRoutes   userInfo,   ： ',
    userInfo,
    userInfo.accountType,
    routes,
  );
  const routesData = {
    route: {
      path: '/',
      routes: routes,
    },
    location: {
      pathname: '/',
    },
  };
  return routesData;
};

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    userInfo,
    accountType: 'customer',
    getRoutes: getRoutes(),
    system: 'OM',
  },

  reducers: {
    toggle(state, { payload, type }) {
      console.log(' toggle 修改  ： ', state, payload, type); //
      return {
        ...state,
        system: state.system == 'CS' ? 'OM' : 'CS',
      };
    },
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type); //
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
      console.log(' getItemgetItem ： ', payload); //
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
      console.log(' login .userInfo.userInfo：state ', getRoutes(), payload); //
      return {
        ...state,
        getRoutes: { ...getRoutes() },
        userInfo: { ...payload },
        accountType: payload.account.account_type,
        system: payload.account.account_type == 'manager' ? 'OM' : 'CS',
      };
    },
  },

  effects: {
    *loginAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.login, payload);
      console.log(' loginAsync ： ', res, payload, action); //
      setItem('token', res.rest.token, true);
      setItem('tokens', res.rest.token);
      // const userInfo = yield call(userCenterServices.getItem, payload);

      const resData = yield call(services.getUserInfo, payload);
      const accountType = resData.bean.user.account.account_type;
      // console.log(' resData ： ', resData, accountType,  )//
      const userInfo = {
        ...resData.bean.user,
        ...resData.bean,
        accountType: accountType,
      };
      setItem('userInfo', userInfo);
      // console.log(' userInfo2 ： ', userInfo); //
      yield put({
        type: 'login',
        payload: userInfo,
      });
      const path = homeMap[accountType] ? homeMap[accountType] : '/';
      console.log(' path ： ', path, accountType, resData); //
      // if (resData.rest.code === AUTH_FAIL) {
      //   history.push(LOGIN);
      // } else {
      // }
      history.push(path);
    },
    *logoutAsync({ payload, action, type }, { call, put }) {
      // const res = yield call(services.logout, payload);
      history.push(LOGIN);
      // yield put(action({ ...res, payload }));
    },
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： ', payload, action, type); //
      const res = yield call(services.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },

    *getUserInfoAsync({ payload, action, type }, { call, put }) {
      console.log(' getUserInfoAsync ： ', payload, action, type); //
      const resData = yield call(services.getUserInfo, payload);
      const accountType = resData.bean.user.account.account_type;
      // console.log(' resData ： ', resData, accountType,  )//
      const userInfo = {
        ...resData.bean.user,
        ...resData.bean,
        accountType: accountType,
      };
      setItem('userInfo', userInfo);
      // console.log(' userInfo2 ： ', userInfo); //
      yield put({
        type: 'login',
        payload: userInfo,
      });
    },
  },

  subscriptions: {
    setup: props => {
      console.log(' 用户 setup ： ', props, this); //
      const { dispatch, history } = props; //
      history.listen(location => {
        console.log(' 监听路由 匹配 ： ', location); //
        // dispatch({
        //   type: 'getUserInfoAsync',
        // })
      }); //
    },
  },
};
