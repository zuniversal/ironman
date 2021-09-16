import { init } from '@/utils/createAction';
import * as services from '@/services/saleData';
import { getRegionOne } from '@/services/common';
import { arrMapObj } from '@/utils';
import { industryMap } from '@/configs';

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
      const {reginRes,  } = payload
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
            name: v.adcode ? arrMapObj(reginRes.list, { key: 'adcode', label: 'name' })[v.adcode] : v.industry,
            // name: 440000 ? arrMapObj(reginRes.list, { key: 'adcode', label: 'name' })[440000] : v.industry,
            percent: (v.amount / saleAreaAmount).toFixed(2) * 100 + '%', 
          })),
          saleIndustyData: payload.bean.industry_amount.map(v => ({
            ...v,
            value: v.amount,
            name: v.industry ? industryMap[v.industry] : v.industry,
            // name: 1 ? industryMap[1] : v.industry,
            percent: (v.amount / saleIndustyAmount).toFixed(2) * 100 + '%', 
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
      const reginRes = yield call(getRegionOne);
      yield put({ type: 'getSaleArea', payload: { ...res, payload, reginRes } });
    },
  },
};

export const actions = createAction(model);

export default model;
