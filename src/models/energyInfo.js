import { init, action } from '@/utils/createAction';
import * as services from '@/services/energyInfo';
import { formatSelectList } from '@/utils';
import dayjs from 'dayjs'; //

const namespace = 'energyInfo';
const { createActions } = init(namespace);

const otherActions = [
  'getPowerStatisticAsync',
  'getRecentPowerAsync',
  'getPowerDataAsync',
  'getRecentPower10DayAsync',
  'getRecentPower6MonthAsync',
];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const data = [
  {
    consumption: {
      valley: 5284709.177734375,
      usual: 6651159.505859375,
      peak: 3989059.578125,
    },
    cost: {
      valley: 1564273.916609375,
      usual: 3977393.3845039057,
      peak: 3937201.803609375,
    },
  },
  {
    consumption: {
      valley: 5938325.11328125,
      usual: 7401832.6953125,
      peak: 4440668.767578125,
    },
    cost: {
      valley: 1757744.2335312504,
      usual: 4426295.951796875,
      peak: 4382940.07359961,
    },
  },
  {
    consumption: {
      valley: 14154972.896484375,
      usual: 14957293.6640625,
      peak: 2501542.46875,
    },
    cost: {
      valley: 4189871.977359374,
      usual: 8944461.611109374,
      peak: 2469022.4166562497,
    },
  },
];

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    statisticData: {},
    powerData: {
      data: [],
      xAxis: [],
    },
    powerUseData: {
      data: [],
      xAxis: [],
    },
    recentPower10DayData: {
      data: [],
      xAxis: [],
    },
    recentPower6MonthData: {
      data: [],
      xAxis: [],
    },
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

    getPowerStatistic(state, { payload, type }) {
      const [month, today, yesterday, lastMonth] = payload.bean.map(v => v.ept);
      return {
        ...state,
        statisticData: { month, today, yesterday, lastMonth },
      };
    },
    getRecentPower(state, { payload, type }) {
      return {
        ...state,
        powerUseData: {
          data: payload.bean.data.map(v => v.ept),
          xAxis: payload.bean.time.map(v => dayjs(v).format('HH:mm:ss')),
        },
      };
    },
    getPowerData(state, { payload, type }) {
      return {
        ...state,
        powerData: {
          data: payload.bean.data,
          // xAxis: payload.bean.time[0].map((v) => v?.split('T')[0]),
          xAxis: payload.bean.time[0].map(v => dayjs(v).format('HH:mm')),
        },
      };
    },
    getRecentPower10Day(state, { payload, type }) {
      const { data } = payload.bean;
      return {
        ...state,
        recentPower10DayData: {
          data: [
            data.map(v => v.consumption.valley),
            data.map(v => v.consumption.usual),
            data.map(v => v.consumption.peak),
            data.map(v => v.cost.valley),
            data.map(v => v.cost.usual),
            data.map(v => v.cost.peak),
          ],
          xAxis: payload.bean.time.map(v => v?.split('T')[0]),
        },
      };
    },
    getRecentPower6Month(state, { payload, type }) {
      const { data } = payload.bean;
      return {
        ...state,
        recentPower6MonthData: {
          data: [
            data.map(v => v.consumption.valley),
            data.map(v => v.consumption.usual),
            data.map(v => v.consumption.peak),
            data.map(v => v.cost.valley),
            data.map(v => v.cost.usual),
            data.map(v => v.cost.peak),
          ],
          xAxis: payload.bean.time.map(v => v?.split('T')[0]),
        },
      };
    },
  },

  effects: {
    *getPowerStatisticAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getPowerStatistic, payload);
      yield put(action({ ...res, payload }));
    },
    *getRecentPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getRecentPower, payload);
      yield put(action({ ...res, payload }));
    },
    *getPowerDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getPowerData, payload);
      yield put(action({ ...res, payload }));
    },
    *getRecentPower10DayAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getRecentPower10Day, payload);
      yield put(action({ ...res, payload }));
    },
    *getRecentPower6MonthAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getRecentPower6Month, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
