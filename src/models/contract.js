import { init, action } from '@/utils/createAction';
import * as services from '@/services/contract';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'contract';
const { createActions } = init(namespace);

const otherActions = ['getPdfAsync'];

const batchTurnActions = ['showModal', 'onModalCancel'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    modalAction: '',
    isShowFormModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    extraData: {},
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        extraData: payload.extraData,
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
    showModal(state, { payload, type }) {
      console.log(' showModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowFormModal: true,
        modalAction: payload.action,
      };
    },
    onModalCancel(state, { payload, type }) {
      console.log(' onModalCancel 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowFormModal: false,
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
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： ', payload, action, type);
      const res = yield call(services.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, { id: payload.d_id });
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

    *getPdfAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getPdf, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
