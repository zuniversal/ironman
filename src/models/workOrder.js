import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/workOrder';
import * as teamServices from '@/services/shiftsManage';
import * as userServices from '@/services/user';
import * as powerStationServices from '@/services/powerStation';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'workOrder';
const { createActions } = init(namespace);

const otherActions = [
  'getTeamAsync',
  'getUserAsync',
  'getPowerAsync',
  'exportDataAsync',
  'dispatchOrderAsync',
  'addTicketAsync',
];

export const actions = {
  ...createActions(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export const formatSearch = data => {
  console.log(' formatSearch ： ', data); //
  return {
    ...data,
    // page_size: 40,
    data: data.data ? data.data.format('YYYY-MM') : nowYearMonth,
  };
};

export const formatAddTicket = data => {
  console.log(' formatAddTicket ： ', data); //
  return {
    ...data,
    work_date: data.work_date.format('YYYY-MM'),
  };
};

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
  },

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
      return {
        ...state,
        dataList: payload.list.map(v => ({
          ...v,
          created_time: v.created_time ? v.created_time : ''.split('T')[0],
        })),
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
      console.log(' editItem ： ', state, payload); //
      return {
        ...state,
        // d_id: payload.payload.d_id,
        // dataList: state.dataList.map(v => ({
        //   ...(v.id == payload.payload.d_id ? { ...v, ...payload.bean } : v),
        // })),
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
    getPower(state, { payload, type }) {
      return {
        ...state,
        powerList: formatSelectList(payload.list, 'name'),
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        userList: formatSelectList(payload.list, 'nickname'),
      };
    },
    getTeam(state, { payload, type }) {
      return {
        ...state,
        teamList: formatSelectList(payload.list, 'name'),
      };
    },
    dispatchOrder(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    addTicket(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        isShowModal: false,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        // ...formatSearch(payload),
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
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      console.log(' editItemAsync ： ', payload); //
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    // *exportDataAsync({ payload, action, type }, { call, put }) {
    //   console.log(' exportDataAsync ： ', payload, type); //
    //   const res = yield call(services.exportData, payload);
    //   console.log('  exportDataAsync res ：', res); //
    // },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, {
        keyword: payload,
      });
      yield put(action({ ...res, payload }));
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      const res = yield call(teamServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
    *dispatchOrderAsync({ payload, action, type }, { call, put }) {
      console.log(' dispatchOrderAsync ： ', payload, type); //
      const res = yield call(services.dispatchOrder, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *addTicketAsync({ payload, action, type }, { call, put }) {
      console.log(' addTicketAsync ： ', payload, type); //
      const params = {
        ...payload,
        work_date: payload.work_date.format('YYYY-MM-DD'),
      };
      console.log(' params ： ', params); //
      const res = yield call(services.addTicket, params);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
  },
};
