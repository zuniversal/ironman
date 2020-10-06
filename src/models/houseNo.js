import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/houseNo';

const namespace = 'houseNo';
const { createAction, createCRUD } = init(namespace);

const otherActions = ['syncOAAsync', 'getPortraitAsync'];

export const actions = {
  ...createCRUD(otherActions),
};

export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},
    d_id: '',

    syncOAData: [],
  },

  reducers: {
    getList(state, { payload, type }) {
      // console.log(' getList 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        dataList: [payload.bean],
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        d_id: payload.payload.d_id,
        itemDetail: { ...payload.bean, d_id: payload.payload.d_id },
      };
    },
    addItem(state, { payload, type }) {
      console.log(' addItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
      };
    },
    editItem(state, { payload, type }) {
      const dataList = state.dataList.map(v =>
        v.id === state.d_id ? { ...v, ...payload.bean } : v,
      );
      console.log(' editItem 修改  ： ', state, payload, type, dataList); //
      return {
        ...state,
        dataList: dataList,
        d_id: '',
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    removeItem(state, { payload, type }) {
      console.log(' removeItem 修改  ： ', state, payload, type); //
      const removeList = payload.payload;
      console.log(
        ' removeList  payload.payload.filter v ： ',
        state,
        payload,
        removeList,
      );
      return {
        ...state,
        // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
        dataList: state.dataList.filter(v =>
          removeList.every(item => v.id !== item),
        ),
      };
    },

    syncOA(state, { payload, type }) {
      // console.log(' syncOA 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        // portraitData: payload.,
      };
    },
  },

  effects: {
    *getListAsync(params, { call, put }) {
      const { payload, action, type } = params;
      console.log(' getListAsync ： ', payload, action, type, params); //
      const res = yield call(services.getList, payload);
      console.log('  getListAsync res ：', res); //
      yield put(action(res));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      console.log(' getItemAsync ： ', payload, type); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' addItemAsync ： ', payload, type,     )//
      const res = yield call(services.addItem, payload);
      console.log('  addItem res ：', res); //
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put, select }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const { itemDetail } = yield select(state => state[namespace]);
      const res = yield call(services.editItem, { ...itemDetail, ...payload });
      console.log('  editItem res ：', res, itemDetail); //
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
      const res = yield call(services.removeItem, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      yield put(action({ ...res, payload }));
    },

    *syncOAAsync({ payload, action, type }, { call, put }) {
      // console.log(' syncOAAsync ： ', payload, type,     )//
      const res = yield call(services.syncOA, payload);
      console.log('  syncOA res ：', res); //
      yield put({
        type: 'getList',
        payload: res,
      });
    },

    *syncOAAsync({ payload, action, type }, { call, put }) {
      // console.log(' syncOAAsync ： ', payload, type,     )//
      const res = yield call(services.syncOA, payload);
      console.log('  syncOA res ：', res); //
      yield put({
        type: 'getList',
        payload: res,
      });
    },
  },
};
