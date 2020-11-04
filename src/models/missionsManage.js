import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/missionsManage';
import * as teamServices from '@/services/shiftsManage';
import * as userServices from '@/services/user';
import * as powerStationServices from '@/services/powerStation';
import * as assetsServices from '@/services/assets';
import * as clientServices from '@/services/client';
import * as commonServices from '@/services/common';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'missionsManage';
const { createAction, createCRUD, batchTurn, createActions } = init(namespace);

const otherActions = [
  'getTeamAsync',
  'getUserAsync',
  'getPowerAsync',
  'getClientAsync',
  'getAssetsAsync',
  'getContractAsync',
  'startWorkOrderAsync',
  'closeMissionAsync',
  'linkContractAsync',
  'scheduleAsync',
  'confirmScheduleAsync',
  'getEnumListAsync',
];

export const actions = {
  ...createActions(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    d_id: '',

    clientList: [],
    contractList: [],
    clientData: [],
    enumList: [],
  },

  reducers: {
    getEnumList(state, { payload, type }) {
      console.log(' getEnumList ： ', payload); //
      return {
        ...state,
        enumList: payload.list,
      };
    },
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        d_id: payload.d_id,
        itemDetail: payload.itemDetail,
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
          confirm: v.confirm ? '已确认' : '未确认',
        })),
        count: payload.rest.count,
        isShowModal: false,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      const clientData = [
        {
          value: payload.bean.customer.id,
          label: payload.bean.customer.name,
        },
        // {
        //   value: 2,
        //   label: 'label-2',
        // },
      ];
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          // client: 2,
          client: payload.bean.customer.name,
          // client: {
          //   label: 'label-999',
          //   value: payload.bean.customer.name,
          // },
        },
        clientData,
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
        dataList: state.dataList.map(v => ({
          ...(v.id == payload.payload.d_id ? { ...v, ...payload.bean } : v),
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
    getClient(state, { payload, type }) {
      // console.log(' getClient 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        clientList: formatSelectList(payload.list, 'name'),
      };
    },
    getAssets(state, { payload, type }) {
      // console.log(' getAssets 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        assetsList: formatSelectList(payload.list, 'name'),
      };
    },
    getContract(state, { payload, type }) {
      // console.log(' getContract 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        contractList: formatSelectList(payload.list, 'name'),
      };
    },
    startWorkOrder(state, { payload, type }) {
      console.log(' startWorkOrderstartWorkOrder ： '); //
      return {
        ...state,
        // dataList: state.dataList.map(v => ({
        //   ...(v.id != payload.payload.d_id ? payload : v),
        // })),
        isShowModal: false,
      };
    },
    closeMission(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        isShowModal: false,
      };
    },
    schedule(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        isShowModal: false,
      };
    },
    confirmSchedule(state, { payload, type }) {
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
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： ', payload, action, type); //
      const res = yield call(services.getList, payload);
      yield put(action(res));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action(res));
      const dataList = yield call(services.getList, payload);
      yield put({
        type: 'getList',
        payload: dataList,
      });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getAssetsAsync({ payload, action, type }, { call, put }) {
      const res = yield call(assetsServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getContractAsync({ payload, action, type }, { call, put }) {
      const res = yield call(contractServices.getList, payload);
      yield put(action({ ...res, payload }));
    },

    *startWorkOrderAsync({ payload, action, type }, { call, put, select }) {
      const { itemDetail } = yield select(state => state[namespace]);
      console.log(' startWorkOrderAsync ： ', payload, type); //
      // return
      const res = yield call(services.startWorkOrder, {
        ...payload,
        // task_id: itemDetail.id
      });
      // yield put(action(res));
      const dataList = yield call(services.getList, payload);
      yield put({
        type: 'getList',
        payload: dataList,
      });
    },
    *closeMissionAsync({ payload, action, type }, { call, put }) {
      console.log(' closeMissionAsync ： ', payload, type); //
      // return;
      const res = yield call(services.closeMission, payload);
      // yield put(action({ ...res, payload }));
    },
    *linkContractAsync({ payload, action, type }, { call, put }) {
      console.log(' linkContractAsync ： ', payload, type); //
      const res = yield call(services.linkContract, payload);
      yield put(action({ ...res, payload }));
    },
    *scheduleAsync({ payload, action, type }, { call, put }) {
      console.log(' scheduleAsync ： ', payload, type); //
      const params = {
        ...payload,
      };
      const res = yield call(services.schedule, params);
      // yield put(action({ ...res, payload }));
      const dataList = yield call(services.getList, payload);
      yield put({
        type: 'getList',
        payload: dataList,
      });
    },
    *confirmScheduleAsync({ payload, action, type }, { call, put }) {
      console.log(' confirmScheduleAsync ： ', payload, type); //
      return;
      const res = yield call(services.confirmSchedule, payload);
      yield put(action({ ...res, payload }));
    },
    *getEnumListAsync({ payload, action, type }, { call, put }) {
      console.log(' getEnumListAsync ： ', payload, type); //
      const res = yield call(commonServices.getEnumList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
