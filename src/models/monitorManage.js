import { init, action } from '@/utils/createAction';
import * as services from '@/services/monitorManage';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'monitorManage';
const { createActions } = init(namespace);

const otherActions = ['getRealDataAsync'];

const batchTurnActions = [];

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
    dataList: [],
    count: 0,
    itemDetail: {},
    realDataParams: {},
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        realDataParams: payload.realDataParams,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: false,
        itemDetail: {},
        realDataParams: {},
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
      const {
        customer_id,
        station_id,
        electricity_user_id,
        equipment_id,
        device_id,
        template_id,
      } = payload.bean;

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          customer_id: `${customer_id}`,
          electricity_user_id: `${electricity_user_id}`,
          station_id: `${station_id}`,
          equipment_id: `${equipment_id}`,
          device_id: `${device_id}`,
          template_id: template_id ? `${template_id}` : template_id,
        },
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

    getRealData(state, { payload, type }) {
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        realDataParams: payload.payload.realDataParams,
        itemDetail: {
          ...payload.bean,
          // customer_id: `${customer_id}`,
          // electricity_user_id: `${electricity_user_id}`,
          // station_id: `${station_id}`,
          // equipment_id: `${equipment_id}`,
          // device_id: `${device_id}`,
          // template_id: `${template_id}`,
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
      yield put(action({ ...res, payload }));
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

    *getRealDataAsync({ payload, action, type }, { call, put }) {
      console.log(' getRealDataAsync ： ', payload); //
      const res = yield call(services.getRealData, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
