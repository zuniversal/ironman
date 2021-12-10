import { init } from '@/utils/createAction';
import * as services from '@/services/approvalMangement';

const namespace = 'approvalMangement';
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
  planStepId: '',
  taskInfo: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      let formInitData = {};
      if (payload.action === 'approveapprovalMangementAsync') {
        formInitData = payload;
      }
      let taskInfo = [];
      if (payload.taskInfo) {
        taskInfo = payload.taskInfo;
      }
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        formInitData,
        taskInfo,
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
          contacts: payload.bean.content.contacts.map(v => ({
            ...v,
            is_urge: [v.is_urge ? 1 : 0],
            is_quit: [v.is_quit ? 1 : 0],
            tags: v.tags?.map(v => `${v.id}`) ?? [],
          })),
        },
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        planStepId: payload.payload.d_id,
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
    *getItemAsync({ payload, action, type }, { call, put }) {
      yield put({ type: 'getItem', payload: { payload } });
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
    *approveTaskAsync({ payload, action, type }, { call, put }) {
      console.log(' approveTaskAsync 修改  ： ', payload);
      const res = yield call(services.approveTask, payload);
      yield put({ type: 'getListAsync' });
    },
  },
};

export const actions = createAction(model);

export default model;
