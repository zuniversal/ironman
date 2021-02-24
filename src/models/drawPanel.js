import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/powerStation';
import * as screenServices from '@/services/screen';
import { formatSelectList, nowYearMonth } from '@/utils';
import { history } from 'umi';

const namespace = 'drawPanel';
const { createActions } = init(namespace);

const otherActions = [
  'getCircuitItemAsync',
  'addCircuitItemAsync',
  'editCircuitItemAsync',
  'removeCircuitItemAsync',
  'getPowerPointListAsync',
  'getPowerPointRealListAsync',
];

const batchTurnActions = ['clearCircurt'];

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
    d_id: '',

    searchInfo: {},
    canvasData: {},
    powerPointList: [],
    powerPointRealList: [],
    circuitList: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        canvasData: payload.canvasData,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: false,
        itemDetail: {},
        canvasData: {},
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

    getCircuitItem(state, { payload, type }) {
      console.log(' getCircuitItem ： ', state, payload); //
      return {
        ...state,
        circuitList: formatSelectList(
          payload.list.map((v, index) => {
            console.log(' v, index ： ', v, index, {
              ...v,
              label: `线路图-${index + 1}`,
            }); //
            const { deleted, ...rest } = v;
            return { ...rest, label: `线路图-${index + 1}`, id: `${v.id}` };
          }),
          'label',
        ),
      };
    },
    addCircuitItem(state, { payload, type }) {
      console.log(' addCircuitItem ： ', state, payload); //
      return {
        ...state,
      };
    },
    editCircuitItem(state, { payload, type }) {
      console.log(' editCircuitItem ： ', state, payload); //
      return {
        ...state,
      };
    },
    removeCircuitItem(state, { payload, type }) {
      console.log(' removeCircuitItem ： ', state, payload); //
      return {
        ...state,
      };
    },

    getPowerPointList(state, { payload, type }) {
      return {
        ...state,
        powerPointList: formatSelectList(payload.list, 'name', 'line'),
      };
    },
    getPowerPointRealList(state, { payload, type }) {
      return {
        ...state,
        powerPointRealList: formatSelectList(payload.list, 'name'),
      };
    },
    clearCircurt(state, { payload, type }) {
      console.log(' clearCircurt ： ', state, payload); //
      return {
        ...state,
        circuitList: [],
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
        history,
      ); //
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

    *getCircuitItemAsync({ payload, action, type }, { call, put }) {
      const { powerstation_id, number } = history.location.query;
      const res = yield call(services.getCircuitItem, {
        power_station_id: powerstation_id,
      });
      yield put({ type: 'getCircuitItem', payload: { ...res } });
    },
    *addCircuitItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addCircuitItem, payload);
      yield put({ type: 'getCircuitItemAsync' });
    },
    *editCircuitItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editCircuitItem, payload);
      yield put({ type: 'getCircuitItemAsync' });
    },
    *removeCircuitItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeCircuitItem, payload);
      yield put({ type: 'getCircuitItemAsync' });
    },

    *getPowerPointListAsync({ payload, action, type }, { call, put }) {
      console.log(' getPowerPointListAsync ： ', payload); //
      const res = yield call(screenServices.getPowerPointList, payload);
      yield put(action({ ...res, payload }));
    },
    *getPowerPointRealListAsync({ payload, action, type }, { call, put }) {
      console.log(' getPowerPointRealListAsync ： ', payload); //
      const res = yield call(screenServices.getPowerPointRealList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
