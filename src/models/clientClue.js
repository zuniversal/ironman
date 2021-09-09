import { init } from '@/utils/createAction';
import * as services from '@/services/clientClue';

const namespace = 'clientClue';
const { createActions, createAction } = init(namespace);

const otherActions = [];

const batchTurnActions = [];

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},
  formInitData: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      let formInitData = {};
      if (payload.action === 'approveClientClueAsync') {
        formInitData = payload;
      }
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        formInitData,
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
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      const { file, logo } = payload.bean.content.enterprise;

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        itemDetail: {
          ...payload.bean,
          ...payload.bean.content,
          file: file ? file.split(',') : [],
          logo: logo ? logo.split(',') : [],
        },
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        ...payload,
      };
      console.log(
        ' getListAsync  payload ： ',
        payload,
        searchInfo,
        action,
        params,
      );
      const res = yield call(services.getList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put({ type: 'getItem', payload: { ...res, payload } });
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put({ type: 'getListAsync' });
    },

    *approveClientClueAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.approveClientClue, payload);
      yield put({ type: 'getListAsync' });
    },
  },
};

export const actions = createAction(model);

export default model;