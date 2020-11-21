import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/common';
import * as powerStationServices from '@/services/powerStation';
import * as clientServices from '@/services/client';
import * as houseNoServices from '@/services/houseNo';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'common';
const { createActions } = init(namespace);

const otherActions = [
  'getEnumListAsync',
  'powerStationAsync',
  'clientAsync',
  'houseNoAsync',
];

const batchTurnActions = [];

export const commonActions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    action: '',
    isShowCommonModal: false,
    itemDetail: {},
    commonModalContent: null,
  },

  reducers: {
    showCommonModal(state, { payload, type }) {
      console.log(' showCommonModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowCommonModal: true,
        action: payload.action,
        commonModalContent: payload.content,
      };
    },
    closeCommonModal(state, { payload, type }) {
      console.log(' closeCommonModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowCommonModal: false,
        itemDetail: {},
        commonModalContent: null,
      };
    },
    clientDetail(state, { payload, type }) {
      console.log(' clientDetail ： ', state, payload); //
      const {
        customer_admin,
        service_staff,
        last_service_staff,
      } = payload.bean; //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
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
    powerStationDetail(state, { payload, type }) {
      const datas = payload.bean.electricalinfromation_set.map(v => ({
        ...v,
        key: Math.random(),
      }));
      console.log(' getItem ： ', state, payload, datas); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          electricity_user: `${payload.bean.electricity_user.id}`,
        },
        powerInfoData: datas,
      };
    },
    houseNoDetail(state, { payload, type }) {
      console.log(' houseNoDetail ： ', state, payload); //
      const { customer } = payload.bean; //
      const { clientList } = state;
      const customerItem = {
        ...customer,
        value: `${customer.id}`,
        label: customer.name,
      };
      console.log(' customer ： ', customer, customerItem); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          customer: `${customer.id}`,
        },
        clientList: [customerItem, ...clientList],
      };
    },
  },

  effects: {
    // *getUserAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(userServices.getList, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getTeamAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(teamServices.getList, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getPowerAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(powerStationServices.getList, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getHouseNoAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(houseNoServices.getList, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getClientAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(clientServices.getList, payload);
    //   yield put(action({ ...res, payload }));
    // },
    *showItemAsync({ payload, action, type }, { call, put }) {
      const serviceMap = {
        powerStationDetail: powerStationServices,
        houseNoDetail: houseNoServices,
        clientDetail: clientServices,
      };
      const service = serviceMap[payload.action];
      console.log(' showItemAsync service ： ', service, payload); //
      const res = yield call(service.getItem, payload);
      yield put({
        type: `${payload.action}`,
        payload: {
          ...res,
          payload,
        },
      });
    },
  },
};
