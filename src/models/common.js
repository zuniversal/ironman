import { init, action } from '@/utils/createAction';
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
import * as electricBillServices from '@/services/electricBill';

import * as monitorDeviceServices from '@/services/monitorDevice'; // 同一份请求
import * as monitorApprovalServices from '@/services/monitorApproval';
import * as meterNumberServices from '@/services/meterNumber';

import { formatSelectList, nowYearMonth, tips } from '@/utils';
import moment from 'moment';
import {
  missionsStatusMap,
  missionsTypeMap,
  inspectMissionsStatusMap,
  customerTypeMap,
  inspectRecordDateConfig,
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
  electricBillServices,
  monitorDeviceServices,
  monitorApprovalServices,
  powerNumberServices: () => {},
  meterNumberServices,
};

const removeParams = (params, keys = []) => {
  console.log(' removeParams   ,   ： ');
  keys.forEach((v, i) => {
    delete params[v];
  });
};

const getService = params => {
  const {
    action,
    dettailSuffix = 'DetailAsync',
    serviceSuffix = 'Services',
    serviceKey,
  } = params;
  // const dettailSuffix = 'DetailAsync';
  // const serviceSuffix = 'Services';
  const actionSlice = action.split(dettailSuffix)[0];
  const serviceStr =
    serviceKey || action.split(dettailSuffix)[0] + serviceSuffix;
  console.log(
    ' getService   action,   ： ',
    params,
    action,
    actionSlice,
    serviceStr,
    serviceConfigMap,
    serviceConfigMap[serviceStr],
  );
  removeParams(params, ['dettailSuffix', 'serviceSuffix', 'serviceKey']);
  return serviceConfigMap[serviceStr];
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const model = {
  namespace,

  state: {
    action: '',
    isShowCommonModal: false,
    itemDetail: {},
    commonModalContent: null,
    extraData: {},
  },

  reducers: {
    showCommonModal(state, { payload, type }) {
      console.log(' showCommonModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowCommonModal: true,
        action: payload.action,
        commonModalContent: payload.content,
      };
    },
    closeCommonModal(state, { payload, type }) {
      console.log(' closeCommonModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowCommonModal: false,
        itemDetail: {},
        commonModalContent: null,
      };
    },
    alarmTemplateDetail(state, { payload, type }) {
      console.log(' alarmTemplateDetail ： ', state, payload);
      const [
        // one,
        two,
        three,
      ] = payload.bean.role;
      const role = {
        // one: {
        //   ...one,
        //   range: {
        //     0: one.range['0'],
        //     1: one.range['1'],
        //   },
        // },
        two: {
          ...two,
          range: {
            0: two.range['0'],
            1: two.range['1'],
          },
        },
        three,
      };
      const itemDetail = {
        ...payload.bean,
        role,
      };
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail,
      };
    },
    meterNumberDetail(state, { payload, type }) {
      console.log(' meterNumberDetail ： ', state, payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: payload.bean,
      };
    },
    monitorManageDetail(state, { payload, type }) {
      console.log(' monitorManageDetail ： ', payload);
      const {
        customer_id,
        station_id,
        electricity_user_id,
        equipment_id,
        device_id,
        frequency,
        electrical_info_id,
        outline_id,
      } = payload.bean;

      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          customer_id: `${customer_id}`,
          electricity_user_id: `${electricity_user_id}`,
          station_id: `${station_id}`,
          equipment_id: equipment_id ? `${equipment_id}` : equipment_id,
          device_id: `${device_id}`,
          electrical_info_id: electrical_info_id
            ? `${electrical_info_id}`
            : electrical_info_id,
          outline_id: outline_id ? `${outline_id}` : outline_id,
          frequency: frequency ? `${frequency}` : frequency,
        },
      };
    },
    monitorApprovalDetail(state, { payload, type }) {
      console.log(' monitorApprovalDetail ： ', state, payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: payload.bean,
      };
    },
    powerNumberDetail(state, { payload, type }) {
      console.log(' powerNumberDetail ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        extraData: payload.payload.extraData,
      };
    },
    clientDetail(state, { payload, type }) {
      console.log(' clientDetail ： ', state, payload);
      const {
        customer_admin,
        service_staff,
        last_service_staff,
        electricityuser,
        file,
        contact,
        service_staff_name,
        last_service_staff_name,
        service_organization_name,
        enterprise,
      } = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          customer_admin:
            customer_admin && customer_admin.length > 0
              ? // ? customer_admin.map(v => ({ ...v, tags: v.tags ?? [] }))
                customer_admin.map(v => ({
                  ...v,
                  nickname: v.name,
                  phone: v.phone,
                  tags: v.tags.map(v => `${v.id}`) ?? [],
                }))
              : // : [{}],
                null,
          // electricityuser: electricityuser.map(v => v.number).join(','),
          file: file ? file.split(',') : [],
          enterprise: {
            ...enterprise,
            file: enterprise?.file ? enterprise?.file.split(',') : [],
            logo: enterprise?.logo ? enterprise?.logo.split(',') : [],
          },

          contact: contact.map(v => ({
            ...v,
            is_urge: [v.is_urge],
            is_quit: [v.is_quit],
            tags: v.tags.map(v => `${v.id}`) ?? [],
          })),
          // service_staff: service_staff?.nickname,
          // last_service_staff: last_service_staff
          // ? `${last_service_staff?.nickname}`
          // : '',
          // service_staff: `${service_staff_name}`,
          // last_service_staff: `${last_service_staff_name}`,
          // service_organization_id: service_organization_name ?? '',
          // service_staff_id: service_staff_name,
          // last_service_staff_id: `${last_service_staff_name}`,
        },
      };
    },
    contractDetail(state, { payload, type }) {
      console.log(' contractDetail ： ', state, payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          type: payload.bean.type ? `${payload.bean.type}` : null,
          list: payload.bean,
        },
      };
    },
    powerStationDetail(state, { payload, type }) {
      // payload.bean = {"id":80437,"name":"上海市奉贤区庄行镇社区卫生服务中心","addr":"上海市奉贤区庄行镇南亭公路3073号","province":null,"city":null,"area":null,"customer":{"id":80437,"name":"上海市奉贤区庄行镇社区卫生服务中心"},"electricity_user":{"id":80437,"number":"0231001380","voltage_level":"1","ep_factor":0.85,"is_md":null},"operation_level":null,"person":null,"phone":null,"file":null,"status":true,"inspections_number":1,"total_capacity":160.0,"real_capacity":160.0,"electricalinfromation_set":[{"id":4103,"power_number":"0231001380","meter_number":"583","powerstation":80437,"incoming_line_name":"","comment":"","magnification":60.0,"transformer_capacity":160.0,"real_capacity":160.0,"voltage_level":"1","ep_factor":"0.85"}],"outline_set":[{"id":5240,"name":"583-出","powerstation":80437,"power_number":"4103"}],"inspection_time":null,"inspection_type":null,"service_team":[{"id":700,"name":"蒋佩明组"}],"end_time":"2022-03-31T00:00:00"}
      const itemDetail = {
        ...payload.bean,
        customer: payload.bean.customer?.name,
        inspection_type: payload.bean.inspection_type ?? 0,
        end_time: payload.bean.end_time
          ? // ? moment(payload.bean.end_time).format('YYYY-MM-DD')
            moment(payload.bean.end_time)
          : null,
      };

      if (
        itemDetail.inspection_type === 0 &&
        Array.isArray(itemDetail.service_team)
      ) {
        itemDetail.service_team = `${itemDetail.service_team[0].name}`;
      }
      if (
        itemDetail.inspection_type === 1 &&
        Array.isArray(itemDetail.service_team)
      ) {
        itemDetail.service_team = itemDetail.service_team.map(v => v.name);
      }
      console.log(' powerStationDetail ： ', state, payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...itemDetail,
          electricity_user: `${payload.bean.electricity_user.number}`,
          status: payload.bean.status ? '正常' : '异常',
          powerInfoData: payload.bean.electricalinfromation_set.map(v => ({
            ...v,
            key: Math.random(),
          })),
          outLineTableData: payload.bean.outline_set.map(v => ({
            ...v,
            // power_number: v.power_number.split(','),
            power_number: v.power_number ? `${v.power_number.id}` : null,
            power_number_id: v.power_number ? `${v.power_number.id}` : null,
            power_number_name: v.power_number
              ? `${v.power_number.power_number}`
              : null,
            key: Math.random(),
          })),
        },
      };
    },
    assetsDetail(state, { payload, type }) {
      console.log(' assetsDetail ： ', state, payload);
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
          station: payload.bean.station?.name,
        },
      };
    },
    assetsDetail(state, { payload, type }) {
      console.log(' assetsDetail ： ', state, payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          type: `${payload.bean.type}`,
          operation_date: payload.bean.operation_date
            ? moment(payload.bean.operation_date)
            : null,
          production_date: payload.bean.production_date
            ? moment(payload.bean.production_date)
            : null,
        },
      };
    },
    houseNoDetail(state, { payload, type }) {
      console.log(' houseNoDetail ： ', state, payload);
      const { customer } = payload.bean;
      const customerItem = {
        ...customer,
        value: `${customer.id}`,
        label: customer.name,
      };
      console.log(' customer ： ', customer, customerItem);
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
      console.log(' shiftsManageDetail ： ', state, payload);
      const { team_headman, leader = {}, type, member } = payload.bean;
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
      console.log(' missionsManageDetail ： ', state, payload);
      const {
        customer,
        person,
        contacts_phone,
        work_log,
        team,
        electricity_user,
        created_time,
      } = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          customer_id: customer.name,
          person: person ? person.nickname : person,
          phone: contacts_phone,
          work_log: work_log.map(v => ({
            ...v,
            created_time: moment(v.created_time).format('YYYY-MM-DD HH:mm:ss'),
          })),
          team_id: team?.name,
          // repair_time: moment(created_time).format('YYYY-MM-DD HH:mm:ss'),
        },
        extraData: {
          clientItem: {
            ...payload.bean,
            ...customer,
            address: payload.bean.addr,
            // clientType: customer.type,
            // clientType: customer.type?.map(v => v == 1 ? '托管' : '非托管'),
            type: customerTypeMap[customer.type],
            houseNo:
              customer?.electricity_user &&
              customer?.electricity_user.length > 0
                ? customer?.electricity_user[0].number
                : '',
          },
        },
      };
    },
    inspectMissionDetail(state, { payload, type }) {
      console.log(' inspectMissionDetail ： ', state, payload);
      const {
        created_time = '',
        start_time = '',
        end_time = '',
        assign_date = '',
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
          assign_date: assign_date ? assign_date.split('T')[0] : '',
          status: inspectMissionsStatusMap[status],
        },
      };
    },
    inspectRecordDetail(state, { payload, type }) {
      console.log(' inspectRecordDetail ： ', payload);
      const {
        created_time = '',
        start_time = '',
        end_time = '',
        power_data = [],
        inspection_task,
        spect_out = [],
        safety_equirpment,
      } = payload.bean;
      console.log(' getItemgetItem ： ', payload);
      const safetyEquirpment = {
        ...safety_equirpment,
      };
      inspectRecordDateConfig.forEach((v, i) => {
        console.log(' inspectRecordDateConfig v ： ', v, i);
        safetyEquirpment[v] = moment(safety_equirpment[v]);
      });
      console.log(' safetyEquirpment ： ', safetyEquirpment, safety_equirpment);

      const itemDetail = {
        ...payload.bean,
        workDate:
          inspection_task && inspection_task.work_date
            ? inspection_task.work_date.split('T')[0]
            : '',
        powerData: power_data && power_data[0],
        power_data: power_data.map(v => ({
          ...v,
          spect_out: v.spect_out.map(v => ({
            ...v,
            outlineName: v?.outline?.name,
          })),
        })),
        safety_equirpment: safetyEquirpment,
      };

      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        // itemDetail: {
        //   ...payload.bean,
        //   powerData: payload.bean.power_data && payload.bean.power_data[0],
        // },
        itemDetail,
      };
    },
    weakDetail(state, { payload, type }) {
      console.log(' weakDetail ： ', payload);
      const { inspection_task = {} } = payload.bean;

      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          inspection_task: {
            ...inspection_task,
            work_date: inspection_task?.work_date?.split('T')[0],
          },
          status: missionsStatusMap[payload.bean.status],
          created_time: payload.bean?.created_time?.split('T')[0],
        },
      };
    },
    workOrderDetail(state, { payload, type }) {
      console.log(' workOrderDetail ： ', payload);
      const {
        status,
        created_time,
        commencement_date,
        finish_time,
        receiving_time,
        order_record,
      } = payload.bean;

      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          status: missionsStatusMap[status],
          type: missionsTypeMap[payload.bean.type],
          // receiving_time: `${receiving_time}`.split('T')[0],
          created_time: moment(created_time).format('YYYY-MM-DD HH:mm:ss'),
          receiving_time: receiving_time
            ? moment(receiving_time).format('YYYY-MM-DD HH:mm:ss')
            : '',
          commencement_date: moment(commencement_date).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          finish_time: finish_time
            ? moment(finish_time).format('YYYY-MM-DD HH:mm:ss')
            : '',
          // customer_id: customer.name,
          extra: payload.payload.extra,
          order_record: order_record.map(v => ({
            ...v,
            is_finish: v.is_finish ? '是' : '否',
          })),
        },
        extraData: {
          extraReqData: payload.extraReqData?.list ?? [],
        },
      };
    },
    newsKnowDetail(state, { payload, type }) {
      console.log(' newsKnowDetail ： ', payload);
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
      console.log(' knowledgeCateDetail ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
        },
      };
    },
    clientReportDetail(state, { payload }) {
      console.log(' clientReportDetail ： ', state, payload);
      const { team_headman, leader = {}, type, member } = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
        isShowCommonModal: true,
        itemDetail: {
          ...payload.bean,
          // team_headman: `${team_headman.nickname}`,
          // leader: `${leader.nickname}`,
          // type: `${type.name}`,
          // member: member.map(v => v.name),
        },
      };
    },
  },

  effects: {
    *showItemAsync({ payload = {}, action, type }, { call, put }) {
      // const service = getService(payload.action);
      const service = getService(payload);
      console.log(' showItemAsync service ： ', service, payload);
      if (!payload.action || !service) {
        tips('请传入对应详情的action参数！', 2);
        return;
      }
      const res = !payload.noReq ? yield call(service.getItem, payload) : {};
      console.log(' showItemAsync service ： ', res, payload);
      let extraReqData;
      if (payload.extraReq) {
        extraReqData = yield call(
          service[payload.extraReq.url],
          payload.extraReq.params,
        );
      }

      yield put({
        type: `${payload.action.split('Async')[0]}`,
        payload: {
          ...res,
          payload,
          extraReqData,
        },
      });
    },
  },
};

export default model;
