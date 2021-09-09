import { init } from '@/utils/createAction';
import * as services from '@/services/myTask';
import * as clientClueServices from '@/services/clientClue';
import { MYTASK_PENDING_APPROVE } from '@/configs';

const namespace = 'myTask';
const { createActions, createAction } = init(namespace);

const otherActions = [];

const batchTurnActions = ['onTabChange'];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},
  tabType: MYTASK_PENDING_APPROVE,
  taskInfo: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      let taskInfo = [];
      if (payload.taskInfo) {
        taskInfo = payload.taskInfo;
      }
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
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
      const { file, logo } = payload.clientClueRes.bean.content.enterprise;

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        itemDetail: {
          ...payload.bean,
          clientClueRes: {
            ...payload.clientClueRes.bean,
            ...payload.clientClueRes.bean.content,
            file: file ? file.split(',') : [],
            logo: logo ? logo.split(',') : [],
          },
        },
      };
    },
    addItem(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    editItem(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    removeItem(state, { payload, type }) {
      return {
        ...state,
      };
    },

    onTabChange(state, { payload, type }) {
      console.log(' onTabChange ： ', payload);
      return {
        ...state,
        tabType: payload.tabType,
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
      // const clientClueRes = yield call(clientClueServices.getItem, payload);
      const clientClueRes = yield call(clientClueServices.getItem, {
        d_id: res.bean.customer.id,
        d_id: 14,
      });
      // const clientClueRes = yield put({ type: 'approveTaskAsync', payload: {
      //   d_id: res.bean.customer.id,
      //   d_id: 14,
      // }});
      console.log(' getItemAsyncgetItemAsync 修改  ： ', clientClueRes);
      yield put({
        type: 'getItem',
        payload: { ...res, payload, clientClueRes },
      });
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

    *approveTaskAsync({ payload, action, type }, { call, put }) {
      console.log(' approveTaskAsync 修改  ： ', payload);
      const res = yield call(services.approveTask, payload);
      yield put({ type: 'getListAsync' });
    },
  },
};

export const actions = createAction(model);

export default model;
