import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/missionsManage';
import * as teamServices from '@/services/shiftsManage';
import * as userServices from '@/services/user';
import * as powerStationServices from '@/services/powerStation';
import * as assetsServices from '@/services/assets';
import * as clientServices from '@/services/client';
import * as contractServices from '@/services/contract';
import * as commonServices from '@/services/common';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'missionsManage';
const { createActions } = init(namespace);

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
  'showClientAsync',
  'showContractAsync',
];

export const actions = {
  ...createActions(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => ({
  ...state[namespace],
  authInfo: state.user.authInfo.teamManagement,
});

const formatTeamList = data => {
  const res = data.map(v => ({
    ...v,
    label: v.team_headman + ' - ' + v.name,
    value: v.id,
  }));
  // console.log(' formatTeamList res ： ', res); //
  return res;
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
    clientList: [],
    contractList: [],
    clientData: [],
    enumList: [],
    teamList: [],
    clientDetail: {},
    contractDetail: {},
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
          created_time: v.created_time.split('T')[0],
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
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
      const { customer, person, contacts_phone } = payload.bean;

      const itemDetail = {
        ...payload.bean,
        // client: 2,
        // client: {
        //   label: 'label-999',
        //   value: payload.bean.customer.name,
        // },
      };
      if (payload.payload.action === 'detail') {
        itemDetail.customer_id = customer.name;
        // itemDetail.client = customer ? customer.name : customer
        itemDetail.person = person ? person.nickname : person;
        itemDetail.phone = contacts_phone;
      }
      if (payload.payload.action === 'startWorkOrder') {
        itemDetail.client = customer ? customer.name : customer;
      }

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: itemDetail,
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
        // teamList: formatSelectList(payload.list, 'team_headman'),
        teamList: formatTeamList(payload.list),
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
        contractList: formatSelectList(payload.list, 'code'),
      };
    },
    startWorkOrder(state, { payload, type }) {
      console.log(' startWorkOrderstartWorkOrder ： '); //
      return {
        ...state,
        isShowModal: false,
      };
    },
    closeMission(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    schedule(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    confirmSchedule(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },

    showClient(state, { payload, type }) {
      console.log(' showClient ： ', payload); //
      const {
        customer_admin,
        service_staff,
        last_service_staff,
      } = payload.bean; //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        clientDetail: {
          ...payload.bean,
          customer_admin:
            customer_admin && customer_admin.length > 0 ? customer_admin : [{}],
          d_id: payload.payload.d_id,
          service_staff: `${service_staff.id}`,
          last_service_staff: `${last_service_staff.id}`,
        },
      };
    },
    showContract(state, { payload, type }) {
      console.log(' showContract ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        contractDetail: {
          // ...payload.list[0],
          ...payload.bean,
        },
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
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      // yield put(action(res));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
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
      // const dataList = yield call(services.getList, payload);
      yield put({ type: 'getListAsync' });
    },
    *closeMissionAsync({ payload, action, type }, { call, put }) {
      console.log(' closeMissionAsync ： ', payload, type); //
      // return;
      const res = yield call(services.closeMission, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *linkContractAsync({ payload, action, type }, { call, put }) {
      console.log(' linkContractAsync ： ', payload, type); //
      const res = yield call(services.linkContract, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *scheduleAsync({ payload, action, type }, { call, put }) {
      console.log(' scheduleAsync ： ', payload, type); //
      const params = {
        ...payload,
      };
      const res = yield call(services.schedule, params);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *confirmScheduleAsync({ payload, action, type }, { call, put }) {
      console.log(' confirmScheduleAsync ： ', payload, type); //
      // return;
      const res = yield call(services.confirmSchedule, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *getEnumListAsync({ payload, action, type }, { call, put }) {
      console.log(' getEnumListAsync ： ', payload, type); //
      const res = yield call(commonServices.getEnumList, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },

    *showClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *showContractAsync({ payload, action, type }, { call, put }) {
      const res = yield call(contractServices.getItem, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
