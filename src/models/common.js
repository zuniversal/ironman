import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/common';
import * as powerStationServices from '@/services/powerStation';
import * as clientServices from '@/services/client';
import * as houseNoServices from '@/services/houseNo';
import * as assetsServices from '@/services/assets';
import * as missionsManageServices from '@/services/missionsManage';
import * as inspectRecordServices from '@/services/inspectRecord';
import { formatSelectList, nowYearMonth, tips } from '@/utils';
import moment from 'moment'; //

const namespace = 'common';
const { createActions } = init(namespace, true);

const otherActions = [
  // 'getEnumListAsync',
  // 'powerStationAsync',
  // 'clientAsync',
  // 'houseNoAsync',
  // 'powerStationDetailAsync',
  // 'houseNoDetailAsync',
  // 'clientDetailAsync',
  'showItemAsync',
];

const batchTurnActions = ['closeCommonModal'];

// export const commonActions = transferActions(otherActions,)
export const commonActions = {
  ...createActions(otherActions, batchTurnActions),
};

const serviceMap = {
  powerStationDetailAsync: powerStationServices,
  houseNoDetailAsync: houseNoServices,
  clientDetailAsync: clientServices,
  assetsDetailAsync: assetsServices,
  inspectRecordDetailAsync: inspectRecordServices,
  missionsManageDetailAsync: missionsManageServices,
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
        itemDetail: {
          ...payload.bean,
          customer_admin:
            customer_admin && customer_admin.length > 0 ? customer_admin : [{}],
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
      console.log(' powerStationDetail ： ', state, payload, datas); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          electricity_user: `${payload.bean.electricity_user.id}`,
          status: payload.bean.status ? '正常' : '异常',
        },
        powerInfoData: datas,
      };
    },
    assetsDetail(state, { payload, type }) {
      console.log(' assetsDetail ： ', state, payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          // created_time: moment(),
          // production_date: moment(),
          // operation_date: moment(),
          list: payload.list,
          station: payload.bean.station.name,
        },
      };
    },
    houseNoDetail(state, { payload, type }) {
      console.log(' houseNoDetail ： ', state, payload); //
      const { customer } = payload.bean; //
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
          customer: `${customer.name}`,
        },
      };
    },
    missionsManageDetail(state, { payload, type }) {
      console.log(' missionsManageDetail ： ', state, payload); //
      const { customer, person, contacts_phone } = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          customer_id: customer.name,
          person: person ? person.nickname : person,
          phone: contacts_phone,
        },
      };
    },
    inspectRecordDetail(state, { payload, type }) {
      console.log(' inspectRecordDetail ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          powerData: payload.bean.power_data && payload.bean.power_data[0],
        },
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
    *showItemAsync({ payload = {}, action, type }, { call, put }) {
      const service = serviceMap[payload.action];
      console.log(' showItemAsync service ： ', serviceMap, service, payload); //
      if (!payload.action || !service) {
        tips('请传入对应详情的action参数！', 2);
        return;
      }
      const res = yield call(service.getItem, payload);
      console.log(' showItemAsync service ： ', res, payload);
      yield put({
        type: `${payload.action.split('Async')[0]}`,
        payload: {
          ...res,
          payload,
        },
      });
    },
  },
};
