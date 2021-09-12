import { init } from '@/utils/createAction';
import * as services from '@/services/saleData';

const namespace = 'saleData';
const { createActions, createAction } = init(namespace);

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},

  saleCountData: {},
  saleAmountData: {},
  saleAmountSearchInfo: {},
  saleAreaData: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    getSaleCount(state, { payload, type }) {
      console.log(' getSaleCount ： ', payload);
      return {
        ...state,
        saleCountData: payload.bean,
      };
    },
    getSaleAmount(state, { payload, type }) {
      console.log(' getSaleAmount ： ', payload);
      return {
        ...state,
        saleAmountData: {
          ...payload.bean,
          rank: payload.bean.rank.map(v => ({ ...v, name: v.amount })),
        },
        saleAmountSearchInfo: payload.payload,
      };
    },
    getSaleArea(state, { payload, type }) {
      console.log(' getSaleArea ： ', payload);
      let saleAreaAmount = 0;
      payload.bean.area_amount.forEach(
        v => (saleAreaAmount = v.amount + saleAreaAmount),
      );
      let saleIndustyAmount = 0;
      payload.bean.industry_amount.forEach(
        v => (saleIndustyAmount = v.amount + saleIndustyAmount),
      );
      return {
        ...state,
        saleAreaData: {
          ...payload.bean,
          saleAreaData: payload.bean.area_amount.map(v => ({
            ...v,
            value: v.amount,
            name: v.adcode,
          })),
          saleIndustyData: payload.bean.industry_amount.map(v => ({
            ...v,
            value: v.amount,
            name: v.industry,
          })),
          saleAreaAmount,
          saleIndustyAmount,
        },
      };
    },
  },

  effects: {
    *getSaleCountAsync({ payload, action, type }, { call, put }) {
      console.log(' getSaleCountAsync11 ： ', services.getSaleCount, payload); //
      const res = yield call(services.getSaleCount, payload);
      console.log(' getSaleCountAsync ： ', res); //
      yield put({ type: 'getSaleCount', payload: { ...res, payload } });
    },
    *getSaleAmountAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getSaleAmount, payload);
      yield put({ type: 'getSaleAmount', payload: { ...res, payload } });
    },
    *getSaleAreaAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getSaleArea, payload);
      yield put({ type: 'getSaleArea', payload: { ...res, payload } });
    },
  },
};

export const actions = createAction(model);

export default model;
