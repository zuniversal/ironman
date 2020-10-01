import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/organize';

const namespace = 'organize';
const { createAction, createCRUD } = init(namespace);

const otherActions = ['syncOAAsync', 'getPortraitAsync'];

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
        // dataList: [payload.bean, ],
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
      console.log(' removeItem 修改  ： ', state, payload, type); //
      const removeList = payload.payload.filter(v => v.id);
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
          removeList.some(item => v.id === item),
        ),
      };
    },
  },

  effects: {
    *getListAsync(params, { call, put }) {
      const { payload, action, type } = params;
      console.log(' getListAsync ： ', payload, action, type, params); //
      // const params = { name: 'zyb',  }
      // const res = yield call(services.getList, params)
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
  },
};
