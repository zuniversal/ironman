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
      // const [month, today, yesterday, lastMonth] = payload.bean.map(v => v.ept);
      return {
        ...state,
        // statisticData: { month, today, yesterday, lastMonth },
        statisticData: payload.bean,
      };
    },
    getPowerData(state, { payload, type }) {
      console.log(' getPowerData ： ', state, payload); //
      return {
        ...state,
        powerData: {
          ...state.powerData,
          data: payload.bean.data.map(v => v.toFixed(2)),
          // xAxis: payload.bean.time[0].map((v) => v?.split('T')[0]),
          // xAxis: payload.bean?.time[0].map(v => dayjs(v).format('HH:mm')),
          // xAxis: payload.bean?.time?.map(v => dayjs(v).format('HH:mm')),
        },
      };
    },
    getRecentPower(state, { payload, type }) {
      console.log(' getRecentPower ： ', state, payload); //
      //   const bean =  {
      //     "f": {
      //         "2021-05-01": 59.01030935700407,
      //         "2021-05-02": 73.49374969800313,
      //         "2021-05-03": 63.412499825159706,
      //         "2021-05-04": 64.49375013510387,
      //         "2021-05-05": 58.45979377903889,
      //         "2021-05-06": 104.63750036557515,
      //         "2021-05-07": 114.15416673819225,
      //         "2021-05-08": 127.42083326975505,
      //         "2021-05-09": 85.40206173768978,
      //         "2021-05-10": 175.42680351021363,
      //         "2021-05-11": 171.9458335240682,
      //         "2021-05-12": 139.33608167196059,
      //         "2021-05-13": 138.12783487064323,
      //         "2021-05-14": 144.21249993642172,
      //         "2021-05-15": 114.26391735273538,
      //         "2021-05-16": 99.77319611224931,
      //         "2021-05-17": 122.97142869599011,
      //         "2021-05-18": 167.00983591548732
      //     },
      //     "u": {
      //         "2021-05-01": 78.03749970595042,
      //         "2021-05-02": 75.9249997138977,
      //         "2021-05-03": 68.1938148183921,
      //         "2021-05-04": 75.44329916570605,
      //         "2021-05-05": 70.68041233180725,
      //         "2021-05-06": 130.24166671435037,
      //         "2021-05-07": 137.26185560718025,
      //         "2021-05-08": 151.85567033905343,
      //         "2021-05-09": 112.51250044504802,
      //         "2021-05-10": 194.0583332379659,
      //         "2021-05-11": 193.70309251608307,
      //         "2021-05-12": 159.81666612625122,
      //         "2021-05-13": 162.00833344459534,
      //         "2021-05-14": 168.54845318351823,
      //         "2021-05-15": 120.06666652361552,
      //         "2021-05-16": 95.45979395600938,
      //         "2021-05-17": 139.21249993642172,
      //         "2021-05-18": 138.78000043233234
      //     },
      //     "v": {
      //         "2021-05-01": 88.36288672378383,
      //         "2021-05-02": 83.18350502879349,
      //         "2021-05-03": 79.19166668256123,
      //         "2021-05-04": 79.10515452906029,
      //         "2021-05-05": 77.93750019868214,
      //         "2021-05-06": 80.82886619174603,
      //         "2021-05-07": 93.6083333492279,
      //         "2021-05-08": 102.597938301637,
      //         "2021-05-09": 91.40206177701656,
      //         "2021-05-10": 97.53402041405747,
      //         "2021-05-11": 100.30927827186191,
      //         "2021-05-12": 100.95000012715657,
      //         "2021-05-13": 110.56494817045547,
      //         "2021-05-14": 106.60618575577884,
      //         "2021-05-15": 93.4927833006554,
      //         "2021-05-16": 85.63749996821086,
      //         "2021-05-17": 90.15416701634724,
      //         "2021-05-18": 97.15555583106146
      //     }
      // }
      return {
        ...state,
        powerUseData: {
          // data: payload.bean.data.map(v => v.ept),
          // xAxis: payload.bean.time.map(v => dayjs(v).format('HH:mm:ss')),
          data: payload.bean.data,
          xAxis: payload.bean.time,
        },
        powerUseData: {
          data: [
            Object.values(payload.bean?.f ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean?.u ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean?.v ?? {}).map(v => v.toFixed(2)),
            // Object.values(bean.f).map((v) => v.toFixed(2)),
            // Object.values(bean.u).map((v) => v.toFixed(2)),
            // Object.values(bean.v).map((v) => v.toFixed(2)),
            // Object.values(bean.u).map((v) => v.toFixed(2)),
          ],
          xAxis: Object.keys(payload.bean?.f ?? {}),
        },
        // powerUseData: {
        //   data: [
        //     Object.values(bean.f).map((v) => v.toFixed(2)),
        //     Object.values(bean.u).map((v) => v.toFixed(2)),
        //     Object.values(bean.v).map((v) => v.toFixed(2)),
        //     // Object.values(bean.u).map((v) => v.toFixed(2)),
        //   ],
        //   xAxis: Object.keys(bean.f),
        // },
      };
    },
    getRecentPower10Day(state, { payload, type }) {
      const { data } = payload.bean;
      const datas = {
        bean: {
          time: [
            '2020-12-01T00:00:00',
            '2021-01-01T00:00:00',
            '2021-02-01T00:00:00',
            '2021-03-01T00:00:00',
            '2021-04-01T00:00:00',
            '2021-05-01T00:00:00',
          ],
          data: {
            power: {
              '2020-12': 135664.125,
              '2021-01': 149565.25,
              '2021-02': 1875516.5,
              '2021-03': 100392.75,
              '2021-04': 73822.0,
              '2021-05': 40743.625,
            },
            money: {
              '2020-12': 236811.91062500002,
              '2021-01': 261731.549,
              '2021-02': 2030830.93475,
              '2021-03': 175033.66724999997,
              '2021-04': 128563.22175,
              '2021-05': 70425.46612499999,
            },
          },
        },
      };
      // const {money, power, } =
      const bean = {
        power: {
          f: {
            '2020-12': 134814.0,
            '2021-01': 148758.0,
            '2021-02': 81846.625,
            '2021-03': 99709.375,
            '2021-04': 73205.75,
            '2021-05': 44242.5,
          },
          u: {
            '2020-12': 133562.75,
            '2021-01': 148041.25,
            '2021-02': 1875175.625,
            '2021-03': 98596.625,
            '2021-04': 72411.0,
            '2021-05': 45112.375,
          },
          v: {
            '2020-12': 135664.125,
            '2021-01': 149565.25,
            '2021-02': 1875516.5,
            '2021-03': 100392.75,
            '2021-04': 73822.0,
            '2021-05': 44084.75,
          },
        },
        money: {
          '2020-12': 236811.91062500002,
          '2021-01': 261731.549,
          '2021-02': 2030830.93475,
          '2021-03': 175033.66724999997,
          '2021-04': 128563.22175,
          '2021-05': 78473.675625,
        },
      };
      return {
        ...state,
        // recentPower10DayData: {
        //   data: [
        //     // data.map(v => v.consumption.valley),
        //     // data.map(v => v.consumption.usual),
        //     // data.map(v => v.consumption.peak),
        //     // data.map(v => v.cost.valley),
        //     // data.map(v => v.cost.usual),
        //     // data.map(v => v.cost.peak),

        //     Object.values(datas.bean.data.power),
        //     Object.values(datas.bean.data.money),
        //   ],
        //   xAxis: datas.bean.time.map(v => v?.split('T')[0]),
        // },
        // recentPower10DayData: {
        //   data: [
        //     // Object.values(payload.bean.data.power).map((v) => v.toFixed(2)),
        //     // Object.values(payload.bean.data.money).map((v) => v.toFixed(2)),
        //     Object.values(payload.bean?.power.f ?? {}).map((v) => v.toFixed(2)),
        //     Object.values(payload.bean?.power.u ?? {}).map((v) => v.toFixed(2)),
        //     Object.values(payload.bean?.power.v ?? {}).map((v) => v.toFixed(2)),
        //     Object.values(payload.bean.money).map((v) => v.toFixed(2)),
        //   ],
        //   xAxis: Object.keys(payload.bean.money),
        // },
        recentPower10DayData: {
          data: [
            // Object.values(payload.bean.data.power).map((v) => v.toFixed(2)),
            // Object.values(payload.bean.data.money).map((v) => v.toFixed(2)),
            Object.values(payload.bean?.power.f ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean?.power.u ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean?.power.v ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean.money).map(v => v.toFixed(2)),
          ],
          xAxis: Object.keys(payload.bean.money),
        },
      };
    },
    getRecentPower6Month(state, { payload, type }) {
      const { data } = payload.bean;
      return {
        ...state,
        // recentPower6MonthData: {
        //   data: [
        //     data.map(v => v.consumption.valley),
        //     data.map(v => v.consumption.usual),
        //     data.map(v => v.consumption.peak),
        //     data.map(v => v.cost.valley),
        //     data.map(v => v.cost.usual),
        //     data.map(v => v.cost.peak),
        //   ],
        //   xAxis: payload.bean.time.map(v => v?.split('T')[0]),
        // },
        recentPower6MonthData: {
          data: [
            // Object.values(payload.bean.power).map((v) => v.toFixed(2)),
            // Object.values(payload.bean.money).map((v) => v.toFixed(2)),
            Object.values(payload.bean?.power.f ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean?.power.u ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean?.power.v ?? {}).map(v => v.toFixed(2)),
            Object.values(payload.bean.money).map(v => v.toFixed(2)),
          ],
          xAxis: Object.keys(payload.bean.money),
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
