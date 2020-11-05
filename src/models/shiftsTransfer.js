import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsTransfer';
import * as teamServices from '@/services/shiftsManage';
import * as userServices from '@/services/user';
import * as powerStationServices from '@/services/powerStation';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'shiftsTransfer';
const { createActions } = init(namespace);

const otherActions = [
  'getTeamAsync',
  'getUserAsync',
  'getPowerAsync',
  'exportDataAsync',
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

export const formatDetail = data => {
  console.log(' formatDetail ： ', data); //
  const { work_situation = '', work_ticket = '' } = data;

  return {
    ...data,
    wire: work_situation.split(',')[0],
    knife: work_situation.split(',')[1],
    lock: work_situation.split(',')[2],
    executing: work_ticket.split(',')[0],
    finished: work_ticket.split(',')[1],
    unExecuted: work_ticket.split(',')[2],
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
    teamList: [
      // { label: 'xxx', value: 'xxx1' },
      // { label: 'yyy', value: 'yyy1' },
    ],
    powerList: [
      // { label: 'power', value: 'power1' },
      // { label: 'power1', value: 'power11' },
    ],
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
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: formatDetail(payload.bean),
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
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： ', payload, action, type); //
      const res = yield call(services.getList, formatSearch(payload));
      yield put(action(res));
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
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },
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
  },
};
