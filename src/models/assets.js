import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/assets';
import * as powerStationServices from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import { formatSelectList } from '@/utils';
import moment from 'moment'; //

const namespace = 'assets';
const { createAction, createCRUD } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'uploadFileAsync',
  'exportDataAsync',
  'getTemplatAsync',
  'getPowerAsync',
  'getHouseNoAsync',
];

export const actions = {
  ...createCRUD(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},
    d_id: '',

    syncOAData: [],
    portraitData: {},
    powerList: [],
    houseNoList: [],
  },

  reducers: {
    getList(state, { payload, type }) {
      // console.log(' getList 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        dataList: payload.list,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          d_id: payload.payload.d_id,
          created_time: moment(),
          production_date: moment(),
          operation_date: moment(),
        },
      };
      production_date;
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
        v.id === state.d_id ? { ...v, ...payload.payload } : v,
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
      console.log(' removeItem 修改  ： ', state, payload, type, this); //
      return {
        ...state,
        dataList: state.dataList.filter(v => v.id !== payload.payload.d_id),
      };
    },
    removeItems(state, { payload, type }) {
      console.log(' removeItems 修改  ： ', state, payload, type, this); //
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          payload.payload.some(item => v.id === item),
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
    getPortrait(state, { payload, type }) {
      // console.log(' getPortrait 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        // portraitData: payload.,
      };
    },
    getPower(state, { payload, type }) {
      console.log(' getPower 修改  ： ', state, payload, type); //
      return {
        ...state,
        powerList: formatSelectList(payload.list, 'name'),
      };
    },
    getPower(state, { payload, type }) {
      // console.log(' getPower 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        houseNoList: formatSelectList(payload.list, 'name'),
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
      const res = yield call(services.getItem, { id: payload.d_id });
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' addItemAsync ： ', payload, type,     )//
      const res = yield call(services.addItem, payload);
      console.log('  addItem res ：', res); //
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const res = yield call(services.editItem, payload);
      console.log('  editItem res ：', res); //
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
      const res = yield call(services.removeItem, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      yield put(action({ ...res, payload }));
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
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

    *uploadFile({ payload, action, type }, { call, put }) {
      // console.log(' uploadFile ： ', payload, type,     )//
      const res = yield call(services.syncOA, payload);
      console.log('  syncOA res ：', res); //
      // yield put({
      //   type: 'getList',
      //   payload: res,
      // });
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      // console.log(' exportDataAsync ： ', payload, type,     )//
      const res = yield call(services.exportData, payload);
      console.log('  exportDataAsync res ：', res); //
      // yield put(action({ ...res, payload }));
    },
    *getTemplate({ payload, action, type }, { call, put }) {
      // console.log(' getTemplate ： ', payload, type,     )//
      const res = yield call(services.getTemplate, payload);
      console.log('  getTemplate res ：', res); //
      // yield put(action({ ...res, payload }));
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, {
        keyword: payload,
      });
      yield put(action({ ...res, payload }));
    },
    *getHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
  },
};
