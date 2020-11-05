import { init } from '@/utils/createAction'; //
import * as services from '@/services/user';
import * as userCenterServices from '@/services/userCenter';
import { formatSelectList, nowYearMonth, setItem, getItem } from '@/utils';
import { history } from 'umi';
import { HOME } from '@/constants';

const namespace = 'user';
const { createActions } = init(namespace);

const otherActions = ['loginAsync'];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const userInfo = getItem('userInfo') ? getItem('userInfo') : {};

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    userInfo,
  },

  reducers: {
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
      console.log(' login ： ', state, payload); //
      return {
        ...state,
        userInfo: payload.bean,
      };
    },
  },

  effects: {
    *loginAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.login, payload);
      console.log(' loginAsync ： ', res, payload, action); //
      setItem('token', res.rest.token, true);
      setItem('tokens', res.rest.token);
      const userInfo = yield call(userCenterServices.getItem, payload);
      console.log(' userInfo ： ', userInfo); //
      yield put({
        type: 'login',
        payload: userInfo,
      });
      setItem('userInfo', userInfo.bean);
      history.push(HOME);
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
  },
};
