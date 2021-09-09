import { init, action } from '@/utils/createAction';
import * as services from '@/services/csHome';
import * as powerStationServices from '@/services/powerStation';
import * as inspectMissionServices from '@/services/inspectMission';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'csHome';
const { createActions, createAction } = init(namespace);

const otherActions = [
  'getStatisticAsync',
  'getPowerInfoAsync',
  'getStationStatusAsync',
  'getDeviceStatusAsync',
];

const batchTurnActions = [];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const model = {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    statisticData: {},
    powerInfoList: [],
    chartSearchInfo: {},
    stationStatusList: [],
    stationStatusCount: 0,
    deviceStatus: {},
    chartData: [],
    chartTimeData: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
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
      console.log(' getItemgetItem ： ', payload);
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
    getStatistic(state, { payload, type }) {
      return {
        ...state,
        statisticData: payload.bean,
      };
    },
    getDeviceStatus(state, { payload, type }) {
      const { t_status, s_status, equipment_status } = payload.bean;

      return {
        ...state,
        deviceStatus: {
          ...payload.bean,
          wdStatus: t_status === 0 ? '异常' : '正常',
          sdStatus: s_status === 0 ? '异常' : '正常',
          equipmentStatus: equipment_status === 0 ? '异常' : '正常',
        },
      };
    },
    getPowerInfo(state, { payload, type }) {
      const { chartSearchInfo } = state;
      const timeData =
        payload.payload.type && payload.payload.type != 'day'
          ? payload.bean.time
          : payload.bean.time[0];
      console.log(
        ' getPowerInfogetPowerInfo ： ',
        chartSearchInfo,
        payload,
        timeData,
      );
      return {
        ...state,
        chartData: payload.bean.data,
        chartTimeData: timeData.map(v => {
          console.log(' v ： ', v);
          const [year, month, day] = v.split('T')[0].split('-');
          return `${month}-${day}`;
        }),
        chartSearchInfo: {
          ...chartSearchInfo,
          ...payload.payload,
        },
      };
    },
    getStationStatus(state, { payload, type }) {
      return {
        ...state,
        stationStatusList: payload.list.map(v => ({
          ...v,
          defect: v.defect ? '有缺陷' : '无缺陷',
          confirm: !v.confirm ? '已完成' : '未完成',
        })),
        stationStatusCount: payload.rest.count,
      };
    },
  },

  effects: {
    *getStatisticAsync({ payload, action, type }, { call, put }) {
      console.log(' getStatisticAsync ： ', payload, action, type);
      const res = yield call(services.getStatistic, payload);
      yield put(action({ ...res, payload }));
    },
    *getDeviceStatusAsync({ payload, action, type }, { call, put }) {
      console.log(' getDeviceStatusAsync ： ', payload, action, type);
      const res = yield call(services.getDeviceStatus, payload);
      yield put(action({ ...res, payload }));
    },
    *getPowerInfoAsync({ payload, action, type }, { call, put }) {
      console.log(' getPowerInfoAsync ： ', payload, action, type);
      const powerStationRes = yield call(powerStationServices.getList, payload);
      console.log(' powerStationRes ： ', powerStationRes.list);
      if (powerStationRes.list.length > 0 && powerStationRes.list[0].id) {
        const res = yield call(services.getPowerInfo, {
          station_id: powerStationRes.list[0].id,
          ...payload,
        });
        console.log(' powerStationRes 有id ： ', powerStationRes, res);
        yield put(action({ ...res, payload }));
      }
    },
    *getStationStatusAsync({ payload, action, type }, { call, put }) {
      const res = yield call(inspectMissionServices.getList, payload);
      console.log(' getStationStatusAsync ： ', res);
      yield put(action({ ...res, payload }));
    },
  },
};

export const actions = createAction(model);

export default model;
