import { init, action } from '@/utils/createAction';
import * as services from '@/services/energyInfo';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'energyInfo';
const { createActions } = init(namespace);

const otherActions = [
  'getPowerStatisticAsync',
  'getRecentPowerAsync',
  'getPowerDataAsync',
];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
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
    statisticData: {},
    powerData: {
      data: [],
      xAxis: [],
    },
    powerUseData: {
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
      const [month, today, yesterday, lastMonth] = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
      };
    },
    getRecentPower(state, { payload, type }) {
      return {
        ...state,
        action: payload.payload.action,
        powerUseData: {
          data: payload.bean.data,
          xAxis: payload.bean.time,
          // data: [ 121.6,
          //   151.9,
          //   191.0,
          //   201.7,
          //   231.4,
          //   261.7,
          //   281.6,
          // ],
        },
      };
    },
    getPowerData(state, { payload, type }) {
      return {
        ...state,
        action: payload.payload.action,
        powerData: {
          data: payload.bean.data,
          xAxis: payload.bean.time,
          // data: [ 121.6,
          //   151.9,
          //   191.0,
          //   201.7,
          //   231.4,
          //   261.7,
          //   281.6,
          // ],
          // xAxis: ['周一',
          //   '周二',
          //   '周三',
          //   '周四',
          //   '周五',
          // ],
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
  },
};
