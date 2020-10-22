/* 
  在原操作方法基础上  可选择性使用 创建相关 actions方法 简化方法的调用  

*/

import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/client';
import * as userServices from '@/services/user';

const namespace = 'client';
const { createAction, createCRUD, newAction } = init(namespace);

const otherActions = ['syncOAAsync', 'getPortraitAsync', 'addUserAsync'];

export const actions = {
  ...createCRUD(otherActions),
  // ...newAction({
  //   syncOAAsync: 'getList',
  // }),
};

export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},
    d_id: '',

    syncOAData: [],
    portraitData: {},
    userList: [],
  },

  reducers: {
    getList(state, { payload, type }) {
      // console.log(' getList 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        dataList: [...payload.list],
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
    // removeItem(state, { payload, type }) {
    //   console.log(' removeItem 修改  ： ', state, payload, type); //
    //   const removeList = payload.payload;
    //   console.log(
    //     ' removeList  payload.payload.filter v ： ',
    //     state,
    //     payload,
    //     removeList,
    //   );
    //   return {
    //     ...state,
    //     // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
    //     dataList: state.dataList.filter(v =>
    //       removeList.every(item => v.id !== item),
    //     ),
    //   };
    // },
    removeItem(state, { payload, type }) {
      console.log(' removeItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: state.dataList.filter(v => v.id != payload.payload.d_id),
      };
    },
    removeItems(state, { payload, type }) {
      console.log(' removeItems 修改  ： ', state, payload, type); //
      const removeList = payload.payload.id.split(',');
      console.log(' removeList ： ', removeList); //
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          removeList.every(item => v.id != item),
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
    addUser(state, { payload, type }) {
      return {
        ...state,
        userList: [payload.bean, ...state.userList],
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
      const params = {
        ...payload,
        customer_admin: [
          {
            id: 1,
          },
        ],
      };
      console.log(' params ： ', params); //
      const res = yield call(services.addItem, params);
      // const res = yield call(services.addItem, payload);
      console.log('  addItem res ：', res); //
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put, select }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const { itemDetail } = yield select(state => state[namespace]);
      const params = {
        ...itemDetail,
        ...payload,
        // region: 'xxx',
        customer_admin: [
          {
            id: 1,
          },
        ],
      };
      console.log(' params ： ', params); //
      const res = yield call(services.editItem, params);
      console.log('  editItem res ：', res, itemDetail); //
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
      const res = yield call(services.removeItem, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      yield put(action({ ...res, payload }));
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
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
    *getPortraitAsync({ payload, action, type }, { call, put }) {
      // console.log(' getPortraitAsync ： ', payload, type,     )//
      const res = yield call(services.getPortrait, payload);
      console.log('  getPortrait res ：', res); //
      yield put(action({ ...res, payload }));
    },
    *addUserAsync({ payload, action, type }, { call, put }) {
      // console.log(' addUserAsync ： ', payload, type,     )//
      const res = yield call(userServices.addItem, payload);
      console.log('  addUserAsync res ：', res); //
      yield put(action(res));
    },
  },
};
