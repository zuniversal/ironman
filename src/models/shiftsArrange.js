import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsArrange';
import * as teamServices from '@/services/shiftsTransfer';
import moment from 'moment'; //

const namespace = 'shiftsArrange';
const { createAction, createCRUD } = init(namespace);

const otherActions = [
  'syncOAAsync', 
  'getPortraitAsync',
  'getTeamAsync',
  'exportDataAsync',
];

export const actions = {
  ...createCRUD(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const formartDataList = data =>
  data.map(v => ({ ...v, title: v.team, start: '2020-10-10' }));
const formatSearch = data => ({
  ...data,
  // schedule_date: data.schedule_date
  //   ? data.schedule_date.format('YYYY-MM')
  //   : '2020-10',
});

export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},

    syncOAData: {},
    portraitData: {},
    userList: [
      { label: 'zyb', value: 'zyb1' },
      { label: 'zyb1', value: 'zyb11' },
    ],
    teamList: [
      { label: 'xxx', value: 'xxx1' },
      { label: 'yyy', value: 'yyy1' },
    ],
  },

  reducers: {
    getList(state, { payload, type }) {
      console.log(
        ' formartDataList(payload) ： ',
        formartDataList(payload.list),
      ); //
      return {
        ...state,
        // ...payload,
        dataList: formartDataList(payload.list),
      };
    },
    getItem(state, { payload, type }) {
      return {
        ...state,
        itemDetail: payload.list,
      };
    },
    addItem(state, { payload, type }) {
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
      };
    },
    editItem(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    removeItem(state, { payload, type }) {
      const removeList = payload.payload.filter(v => v.id);
      return {
        ...state,
        // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
        dataList: state.dataList.filter(v =>
          removeList.some(item => v.id === item),
        ),
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        // ...payload,
        userList: [...payload.list],
      };
    },
    getTeam(state, { payload, type }) {
      return {
        ...state,
        // ...payload,
        teamList: [...payload.list],
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsyncgetListAsync ： ', payload); //
      const res = yield call(services.getList, formatSearch(payload));
      yield put(action(res));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action(res));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      // console.log(' exportDataAsync ： ', payload, type,     )//
      const res = yield call(services.exportData, payload);
      console.log('  exportDataAsync res ：', res); //
      // yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
