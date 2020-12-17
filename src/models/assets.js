import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/assets';
import * as powerStationServices from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import * as clientServices from '@/services/client';
import { formatSelectList, filterObjSame } from '@/utils';
import moment from 'moment'; //

const namespace = 'assets';
const { createActions } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'uploadFileAsync',
  'exportDataAsync',
  'getTemplatAsync',
  'getPowerAsync',
  'getHouseNoAsync',
  'getClientAsync',
];

export const actions = {
  ...createActions(otherActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const formatParams = data => {
  const params = {
    ...data,
    production_date: data.production_date.format('YYYY-MM-DD'),
    operation_date: data.operation_date.format('YYYY-MM-DD'),
  };
  console.log(' formatParams params ： ', params); //
  return params;
};

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  d_id: '',
  searchInfo: {},

  syncOAData: [],
  powerList: [],
  houseNoList: [],
  clientList: [],
};

export default {
  namespace,

  state: initialState,

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
      // console.log(' getList 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItem 修改  ： ', state, payload, type); //
      const { powerList } = state;
      const { station } = payload.bean; //
      const stationItem = {
        ...station,
        value: `${station.id}`,
        label: station.name,
      };
      return {
        ...state,
        itemDetail: {
          ...payload.bean,
          d_id: payload.payload.d_id,
          created_time: moment(),
          production_date: moment(),
          operation_date: moment(),
          list: payload.list,
          station: `${station.id}`,
        },
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        powerList: filterObjSame([...powerList, stationItem]),
      };
      production_date;
    },
    addItem(state, { payload, type }) {
      console.log(' addItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
        isShowModal: false,
        count: state.count + 1,
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
        isShowModal: false,
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    removeItem(state, { payload, type }) {
      console.log(' removeItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: state.dataList.filter(v => v.id != payload.payload.d_id),
      };
    },
    removeItems(state, { payload, type }) {
      console.log(' removeItems 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          payload.payload.ids.some(item => v.id != item),
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
    getHouseNo(state, { payload, type }) {
      // console.log(' getHouseNo 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        houseNoList: formatSelectList(payload.list, 'number'),
      };
    },
    getClient(state, { payload, type }) {
      // console.log(' getClient 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        clientList: formatSelectList(payload.list, 'name'),
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
      ); //
      const res = yield call(services.getList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      console.log(' getItemAsync ： ', payload, type); //
      const res = yield call(services.getItem, { id: payload.d_id });
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' addItemAsync ： ', payload, type,     )//
      const res = yield call(services.addItem, formatParams(payload));
      console.log('  addItem res ：', res); //
      // yield put(action(res));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const res = yield call(services.editItem, formatParams(payload));
      console.log('  editItem res ：', res); //
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
      const res = yield call(services.removeItem, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },

    // *syncOAAsync({ payload, action, type }, { call, put }) {
    //   // console.log(' syncOAAsync ： ', payload, type,     )//
    //   const res = yield call(services.syncOA, payload);
    //   console.log('  syncOA res ：', res); //
    //   yield put({
    //     type: 'getList',
    //     payload: res,
    //   });
    // },

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
      const res = yield call(services.exportData, payload);
      return res;
    },
    *getTemplate({ payload, action, type }, { call, put }) {
      // console.log(' getTemplate ： ', payload, type,     )//
      const res = yield call(services.getTemplate, payload);
      console.log('  getTemplate res ：', res); //
      // yield put(action({ ...res, payload }));
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
  },
};
