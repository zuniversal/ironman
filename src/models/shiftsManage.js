import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsManage';
import * as userServices from '@/services/user';
import { formatSelectList } from '@/utils';

const namespace = 'shiftsManage';
const { createAction, createCRUD } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'getUserAsync',
  'uploadFileAsync',
  'exportDataAsync',
];

export const actions = {
  ...createCRUD(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const formatUserList = data => {
  const res = data.map(v => ({
    ...v,
    label: v.nickname,
    value: v.id,
  }));
  console.log(' formatUserList res ： ', res); //
  return res;
};

export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},

    syncOAData: {},
    portraitData: {},
    userList: [
      // { label: 'zyb', value: 'value1' },
      // { label: 'zyb1', value: 'value2' },
    ],
  },

  reducers: {
    getList(state, { payload, type }) {
      return {
        ...state,
        // ...payload,
        dataList: [...payload.list],
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItem ： ', payload); //
      return {
        ...state,
        itemDetail: { ...payload.list, d_id: payload.payload.d_id },
      };
    },
    addItem(state, { payload, type }) {
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
      };
    },
    editItem(state, { payload, type }) {
      console.log(' editItem ： ', state, payload); //
      return {
        ...state,
        // d_id: payload.payload.d_id,
        dataList: state.dataList.map(v => ({
          ...(v.id == payload.payload.d_id ? { ...v, ...payload.bean } : v),
        })),
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    removeItem(state, { payload, type }) {
      console.log(' removeItem 修改  ： ', state, payload, type, this); //
      return {
        ...state,
        dataList: state.dataList.filter(v => v.id != payload.payload.d_id),
      };
    },
    removeItems(state, { payload, type }) {
      console.log(' removeItems 修改  ： ', state, payload, type, this); //
      const removeList = payload.payload.id.split(',');
      console.log(' removeList ： ', removeList); //
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          removeList.every(item => v.id != item),
        ),
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        // userList: formatUserList(payload.list),
        userList: formatSelectList(payload.list, 'nickname'),
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync  payload ： ', payload); //
      const res = yield call(services.getList, payload);
      yield put(action(res));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      console.log(' getItemAsync  payload ： ', payload); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      console.log(' addItemAsync  payload ： ', payload); //
      const res = yield call(services.addItem, payload);
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      console.log(' editItemAsync  payload ： ', payload); //
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync  payload ： ', payload); //
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      yield put(action({ ...res, payload }));
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      console.log(' exportDataAsync ： ', payload, type); //
      const res = yield call(services.exportData, payload);
      console.log('  exportDataAsync res ：', res); //
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
