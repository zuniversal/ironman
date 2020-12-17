import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/common';
// import * as powerStationServices from '@/services/powerStation';
// import * as clientServices from '@/services/client';
// import * as houseNoServices from '@/services/houseNo';
// import * as assetsServices from '@/services/assets';
// import * as missionsManageServices from '@/services/missionsManage';
// import * as inspectRecordServices from '@/services/inspectRecord';
import * as alarmNotifyServices from '@/services/alarmNotify';
import * as alarmRecordServices from '@/services/alarmRecord';
import * as alarmTemplateServices from '@/services/alarmTemplate';
import * as assetsServices from '@/services/assets';
import * as bussniessRecordServices from '@/services/bussniessRecord';
import * as clientServices from '@/services/client';
import * as clientReportServices from '@/services/clientReport';
import * as contractServices from '@/services/contract';
import * as csClientReportServices from '@/services/csClientReport';
import * as csHomeServices from '@/services/csHome';
import * as csInspectRecordServices from '@/services/csInspectRecord';
import * as csMonitorServices from '@/services/csMonitor';
import * as csOrganizeServices from '@/services/csOrganize';
import * as csUserCenterServices from '@/services/csUserCenter';
import * as dictServices from '@/services/dict';
import * as goodsServices from '@/services/goods';
import * as homeServices from '@/services/home';
import * as houseNoServices from '@/services/houseNo';
import * as inspectMissionServices from '@/services/inspectMission';
import * as inspectPlanServices from '@/services/inspectPlan';
import * as inspectRecordServices from '@/services/inspectRecord';
import * as missionsManageServices from '@/services/missionsManage';
import * as monitorManageServices from '@/services/monitorManage';
import * as msgServices from '@/services/msg';
import * as msgListServices from '@/services/msgList';
import * as operateRecordServices from '@/services/operateRecord';
import * as organizeServices from '@/services/organize';
import * as powerStationServices from '@/services/powerStation';
import * as roleServices from '@/services/role';
import * as shiftsArrangeServices from '@/services/shiftsArrange';
import * as shiftsManageServices from '@/services/shiftsManage';
import * as shiftsTransferServices from '@/services/shiftsTransfer';
import * as smMonitorServices from '@/services/smMonitor';
import * as smOrganizeServices from '@/services/smOrganize';
import * as systemNotifyServices from '@/services/systemNotify';
import * as tagsServices from '@/services/tags';
import * as userServices from '@/services/user';
import * as userCenterServices from '@/services/userCenter';
import * as userManageServices from '@/services/userManage';
import * as visitManageServices from '@/services/visitManage';
import * as weakServices from '@/services/weak';
import * as workOrderServices from '@/services/workOrder';
import * as newsKnowServices from '@/services/newsKnow';
import * as knowledgeCateServices from '@/services/knowledgeCate';

import { formatSelectList, nowYearMonth, tips } from '@/utils';
import moment from 'moment'; //
import {
  missionsStatusMap,
  missionsTypeMap,
  inspectMissionsStatusMap,
} from '@/configs';

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

const serviceConfigMap = {
  alarmNotifyServices,
  alarmRecordServices,
  alarmTemplateServices,
  assetsServices,
  bussniessRecordServices,
  clientServices,
  clientReportServices,
  contractServices,
  csClientReportServices,
  csHomeServices,
  csInspectRecordServices,
  csMonitorServices,
  csOrganizeServices,
  csUserCenterServices,
  dictServices,
  goodsServices,
  homeServices,
  houseNoServices,
  inspectMissionServices,
  inspectPlanServices,
  inspectRecordServices,
  missionsManageServices,
  monitorManageServices,
  msgServices,
  msgListServices,
  operateRecordServices,
  organizeServices,
  powerStationServices,
  roleServices,
  shiftsArrangeServices,
  shiftsManageServices,
  shiftsTransferServices,
  smMonitorServices,
  smOrganizeServices,
  systemNotifyServices,
  tagsServices,
  userServices,
  userCenterServices,
  userManageServices,
  visitManageServices,
  weakServices,
  workOrderServices,

  newsKnowServices,
  knowledgeCateServices,
};

const getService = action => {
  const dettailSuffix = 'DetailAsync';
  const serviceSuffix = 'Services';
  const actionSlice = action.split(dettailSuffix)[0];
  const serviceStr = action.split(dettailSuffix)[0] + serviceSuffix;
  console.log(' getService   action,   ： ', action, actionSlice, serviceStr);
  return serviceConfigMap[serviceStr];
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
        electricityuser,
        file,
      } = payload.bean; //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          customer_admin:
            customer_admin && customer_admin.length > 0 ? customer_admin : [{}],
          service_staff: `${service_staff.nickname}`,
          last_service_staff: `${last_service_staff.nickname}`,
          electricityuser: electricityuser.map(v => v.number).join(','),
          file: file ? file.split(',') : [],
        },
      };
    },
    contractDetail(state, { payload, type }) {
      console.log(' contractDetail ： ', state, payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          list: payload.bean,
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
          electricity_user: `${payload.bean.electricity_user.number}`,
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
    shiftsManageDetail(state, { payload }) {
      console.log(' shiftsManageDetail ： ', state, payload); //
      const { team_headman, leader = {}, type, member } = payload.bean; //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          team_headman: `${team_headman.nickname}`,
          leader: `${leader.nickname}`,
          type: `${type.name}`,
          member: member.map(v => v.name),
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
    inspectMissionDetail(state, { payload, type }) {
      console.log(' inspectMissionDetail ： ', state, payload); //
      const {
        created_time = '',
        start_time = '',
        end_time = '',
        status,
      } = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          created_time: created_time ? created_time.split('T')[0] : '',
          start_time: start_time ? start_time.split('T')[0] : '',
          end_time: end_time ? end_time.split('T')[0] : '',
          status: inspectMissionsStatusMap[status],
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
    weakDetail(state, { payload, type }) {
      console.log(' weakDetail ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          status: missionsStatusMap[payload.bean.status],
        },
      };
    },
    workOrderDetail(state, { payload, type }) {
      console.log(' workOrderDetail ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          status: missionsStatusMap[payload.bean.status],
          type: missionsTypeMap[payload.bean.type],
          receiving_time: `${payload.bean.receiving_time}`.split('T')[0],
          created_time: moment(payload.bean.created_time).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          receiving_time: moment(payload.bean.receiving_time).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          commencement_date: moment(payload.bean.commencement_date).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          finish_time: moment(payload.bean.finish_time).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          // customer_id: payload.bean.customer.name,
          extra: payload.payload.extra,
        },
      };
    },
    newsKnowDetail(state, { payload, type }) {
      console.log(' newsKnowDetail ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          knowledge_type: `${payload.bean.knowledge_type}`,
          knowledge_warehouse_type: `${payload.bean.knowledge_warehouse_type}`,
        },
      };
    },
    knowledgeCateDetail(state, { payload, type }) {
      console.log(' knowledgeCateDetail ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
        },
      };
    },
  },

  effects: {
    *showItemAsync({ payload = {}, action, type }, { call, put }) {
      // const service = serviceMap[payload.action];
      const service = getService(payload.action);
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
