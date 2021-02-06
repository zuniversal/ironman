import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/inspectMission';
import * as userServices from '@/services/userManage';
import * as teamServices from '@/services/shiftsManage';
import * as clientServices from '@/services/client';
import * as powerStationServices from '@/services/powerStation';
import { formatSelectList, nowYearMonth } from '@/utils';
import moment from 'moment'; //

const namespace = 'inspectMission';
const { createActions } = init(namespace);

const otherActions = [
  'getUserAsync',
  'getTeamAsync',
  'getPowerAsync',
  'getClientAsync',
  'exportDataAsync',
  'batchDispatchAsync',
];

const batchTurnActions = ['batchDispatch', 'getClient'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const formatParams = data => {
  console.log(' formatParams data ： ', data); //
  const params = {
    ...data,
    work_date: data.work_date.format('YYYY-MM-DD'),
    // work_time: data.work_time.format('YYYY-MM-DD'),
  };
  return params;
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

    userList: [],
    teamList: [],
    clientList: [],
    powerList: [],
    clientId: '',
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
        clientId: '',
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list.map(v => ({
          ...v,
          work_date: moment(v.work_date).format('YYYY-MM-DD HH:mm:ss'),
          assign_date: v.assign_date?.split('T')[0],
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      const {
        created_time = '',
        start_time = '',
        end_time = '',
      } = payload.bean;
      console.log(
        ' getItemgetItem ： ',
        payload,
        created_time,
        start_time,
        end_time,
      ); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          created_time: created_time ? created_time.split('T')[0] : '',
          start_time: start_time ? start_time.split('T')[0] : '',
          end_time: end_time ? end_time.split('T')[0] : '',
        },
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
        // dataList: state.dataList.map(v => ({
        //   ...(v.id !== payload.payload.d_id ? payload : v),
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

    getUser(state, { payload, type }) {
      console.log(' getUserAsync 修改 1 ： ', state, payload); //
      const userList = payload.list.map(v => {
        // console.log(' getUserAsync 修改 22 ： ', state, payload, v.team); //
        return { ...v, id: `${v.team[0]?.id}`, teamId: `${v.team[0]?.id}` };
      });
      console.log(' getUserAsync 修改  ： ', state, payload, userList); //
      return {
        ...state,
        userList: formatSelectList(userList, 'nickname'),
      };
    },
    // getTeam(state, { payload, type }) {
    //   console.log(' getTeam 修改 1 ： ', state, payload, ); //
    //   const teamList = payload.list
    //   // .map(v => ({...v, teamId: v.team[0].id}))
    //   console.log(' getTeam 修改  ： ', state, payload, teamList); //
    //   return {
    //     ...state,
    //     teamList: formatSelectList(teamList, 'team_headman', 'teamId'),
    //   };
    // },
    getTeam(state, { payload, type }) {
      console.log(' getTeam 修改  ： ', state, payload, type); //
      return {
        ...state,
        teamList: formatSelectList(payload.list, 'team_headman'),
      };
    },
    getPower(state, { payload, type }) {
      console.log(' getPower 修改  ： ', state, payload, type); //
      return {
        ...state,
        powerList: formatSelectList(payload.list, 'name'),
      };
    },
    getClient(state, { payload, type }) {
      console.log(' getClient 修改  ： ', state, payload, type); //
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
      console.log(' getItemAsync ： ', payload); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      console.log(' addItemAsync ： ', payload); //
      const res = yield call(services.addItem, formatParams(payload));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      console.log(' editItemAsync ： ', payload); //
      // if (payload.action === 'assignMission') {
      //    res = yield call(services.assignMission, payload);
      // } else if (payload.action === 'editDate') {
      //    res = yield call(services.assignMission, payload);
      // }
      const params = {
        ...payload,
      };
      if (payload.date) {
        params.date = payload.date.format('YYYY-MM-DD');
      }
      // const res = yield call(services.assignMission, formatParams(params));
      const res = yield call(services.assignMission, params);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },

    *getUserAsync({ payload, action, type }, { call, put }) {
      console.log(' getUserAsync ： ', payload); //
      const res = yield call(userServices.getSearchList, {
        ...payload,
        team_headman: 1,
      });
      yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, payload);
      yield put(action({ ...res, payload }));
    },

    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },

    *batchDispatchAsync({ payload, action, type }, { call, put }) {
      console.log(' batchDispatchAsync ： ', payload); //
      const res = yield call(services.batchDispatch, payload);
      yield put({ type: 'getListAsync' });
    },
  },
};
