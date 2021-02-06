import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/clientReport';
import { formatSelectList, nowYearMonth } from '@/utils';
import moment from 'moment'; //

const namespace = 'clientReport';
const { createActions } = init(namespace);

const otherActions = ['getClientReportUpgradeAsync'];

const batchTurnActions = ['closePdf', 'toggleExportPDF', 'getListFilter'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

export const formatSearch = data => {
  console.log(' formatSearch ： ', data); //
  return {
    ...data,
    year_month: data.year_month ? data.year_month.format('YYYY-MM') : '',
  };
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
    searchInfo: {
      year_month: moment().subtract(1, 'months'),
    },
    isShowPdfDetail: false,
    missionItemDetail: {},
    isShowExportPdf: false,
    originData: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
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
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
        originData: payload.list,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      const { bill, inspect } = payload.bean;

      const itemDetail = {
        ...payload.bean,
        bill: bill.map(v => {
          const volumeAll =
            v.peak_volume + v.usual_volume + v.valley_volume + v.other_volume;
          const priceAll =
            v.peak_price + v.usual_price + v.valley_price + v.other_price;
          const calcAll = v.basic_price
            ? (v.max_md * v.basic_price).toFixed(2)
            : 0;
          const nowAvg = v.volume ? (v.amount / v.volume).toFixed(2) : 0;
          const oldAvg = v.old_volume
            ? (Number(v.old_amount) / Number(v.old_volume)).toFixed(2)
            : 0;

          const volumeRate = v.old_volume
            ? (
                (v.volume - Number(v.old_volume)) /
                Number(v.old_volume)
              ).toFixed(4) * 100
            : 0;
          const amountRate = v.old_amount
            ? (
                (v.amount - Number(v.old_amount)) /
                Number(v.old_amount)
              ).toFixed(4) * 100
            : 0;

          // const rateAvg = (v.rate - v.old_rate) / v.old_rate
          // const rateAvg = v.amount / v.old_amount

          const rate = oldAvg ? (nowAvg / oldAvg).toFixed(3) * 100 : 0;

          // console.log(' volumeAll ： ', v, v.valley_volume, volumeAll, priceAll, calcAll, v.volume - v.old_volume, v.amount - v.old_amount, volumeRate, amountRate, nowAvg, oldAvg, rate, )//

          return {
            ...v,
            peak_volume_b: volumeAll
              ? ((v.peak_volume / volumeAll) * 100).toFixed(2)
              : 0,
            usual_volume_b: volumeAll
              ? ((v.usual_volume / volumeAll) * 100).toFixed(2)
              : 0,
            valley_volume_b: volumeAll
              ? ((v.valley_volume / volumeAll) * 100).toFixed(2)
              : 0,
            other_volume_b: volumeAll
              ? ((v.other_volume / volumeAll) * 100).toFixed(2)
              : 0,

            peak_price_b: priceAll
              ? ((v.peak_price / priceAll) * 100).toFixed(2)
              : 0,
            usual_price_b: priceAll
              ? ((v.usual_price / priceAll) * 100).toFixed(2)
              : 0,
            valley_price_b: priceAll
              ? ((v.valley_price / priceAll) * 100).toFixed(2)
              : 0,
            other_price_b: priceAll
              ? ((v.other_price / priceAll) * 100).toFixed(2)
              : 0,

            volumeAll,
            priceAll,
            calcAll,

            oldAvg: oldAvg ?? 0,
            nowAvg: nowAvg ?? 0,
            volumeRate,
            amountRate,
            rate,
          };
        }),
        inspect: inspect.map(v => ({
          ...v,
          // inspect_in: v?.inspect_in.map((v) => ({...v, })),
          spectOut: v?.inspect_in.map(v => v?.outline),
          humidityTemp: v.temperature + '℃ / ' + v.humidity + ' %',
          number: payload.bean.number,
          capacityRate: v?.inspect_in[0]
            ? `${v?.inspect_in[0]?.capacity} / ${v?.inspect_in[0]?.real_capacity} （KVA)`
            : '',
        })),
      };
      console.log(' itemDetail ： ', itemDetail); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: payload.bean,
        itemDetail: itemDetail,
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

    getListFilter(state, { payload, type }) {
      console.log(' getListFilter ： ', state, payload); //
      const { originData } = state;
      const filterKey = [
        'number',
        'name',
        'service_staff_name',
        'service_team_name',
      ];

      return {
        ...state,
        dataList: originData.filter(v => {
          const isInclude = filterKey.some(key =>
            `${v[key]}`.includes(payload.filter),
          );
          // console.log('  isInclude ：', isInclude,  )//
          return isInclude;
        }),
        isShowModal: false,
      };
    },
    closePdf(state, { payload, type }) {
      return {
        ...state,
        isShowExportPdf: false,
      };
    },
    toggleExportPDF(state, { payload, type }) {
      console.log(' toggleExportPDF ： ', payload); //
      return {
        ...state,
        isExportPDF: !state.isExportPDF,
        isShowExportPdf: !state.isShowExportPdf,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      console.log(' getListAsync ： ', payload, searchInfo, type); //
      const params = {
        ...searchInfo,
        ...payload,
      };

      const res = yield call(services.getList, formatSearch(params));
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
      // const payloads = payload ? payload : searchInfo; //
      // console.log('  payloads ：', payloads); //
      // const params = {
      //   ...payloads,
      //   year_month:
      //     payloads && payloads.year_month
      //       ? payloads.year_month.format('YYYY-MM')
      //       : nowYearMonth,
      // };

      // if (!params.leader || !params.month) {
      //   if (!payload.isReset) {
      //     tips('请先选择客户代表及月份！', 2);
      //   }
      //   return;
      // }
      // const res = yield call(services.getList, params);
      // yield put(action({ ...res, payload }));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },

    *getClientReportUpgradeAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getClientReportUpgrade, payload);
      yield put(action({ ...res, payload }));
      return res;
    },
  },
};
