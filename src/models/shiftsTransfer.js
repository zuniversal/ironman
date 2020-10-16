import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsTransfer';
import * as teamServices from '@/services/shiftsTransfer';
import * as powerStationServices from '@/services/powerStation';

const namespace = 'shiftsTransfer';
const { createAction, createCRUD } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'getPortraitAsync',
  'getTeamAsync',
  'getPowerAsync',
  'exportDataAsync',
];

export const actions = {
  ...createCRUD(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export const formatDetail = data => {
  console.log(' formatDetail ： ', data,   )// 
  const {work_situation = '', work_ticket = '',  } = data
  
  return {
    ...data,
    wire: work_situation.split(',')[0], 
    knife: work_situation.split(',')[1], 
    lock: work_situation.split(',')[2], 
    executing: work_ticket.split(',')[0], 
    finished: work_ticket.split(',')[1], 
    unExecuted: work_ticket.split(',')[2], 
  } 
}


export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},

    syncOAData: {},
    portraitData: {},
    teamList: [
      { label: 'xxx', value: 'xxx1' },
      { label: 'yyy', value: 'yyy1' },
    ],
    powerList: [
      { label: 'power', value: 'power1' },
      { label: 'power1', value: 'power11' },
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
      console.log(' getItemgetItem ： ', payload); //
      return {
        ...state,
        // ...payload,
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
    getPower(state, { payload, type }) {
      return {
        ...state,
        powerList: [...payload.list],
      };
    },
    getTeam(state, { payload, type }) {
      return {
        ...state,
        teamList: [...payload.list],
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      yield put(action(res));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action(formatDetail(res)));
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
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
