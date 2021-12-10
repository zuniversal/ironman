import { init } from '@/utils/createAction';
import * as services from '@/services/clientPortrait';
import { getRegionOne } from '@/services/common';
import { industryMap, enterpriseScaleMap, assetScaleMap } from '@/configs';
import { arrMapObj, toFixed } from '@/utils';

const namespace = 'clientPortrait';
const { createActions, createAction } = init(namespace);

const otherActions = [];

const batchTurnActions = [];

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},

  adcodeList: [],
  adcodeSearchInfo: {},
  industryList: [],
  industrySearchInfo: {},
  saleList: [],
  saleSearchInfo: {},
  assetList: [],
  assetSearchInfo: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    getAdcode(state, { payload, type }) {
      const { reginRes } = payload;
      const filterData = payload.list
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);
      let sum = 0;
      filterData.forEach(v => (sum = v.count + sum));
      return {
        ...state,
        adcodeList: filterData.map(v => ({
          ...v,
          value: v.count,
          amount: v.count,
          name:
            v.adcode != undefined
              ? arrMapObj(reginRes.list, { key: 'adcode', label: 'name' })[
                  v.adcode
                ] ?? '未知'
              : '其它',
          percent: toFixed((v.count / sum) * 100, 2) + '%',
          sum,
        })),
        adcodeSearchInfo: payload.searchInfo,
      };
    },
    getIndustry(state, { payload, type }) {
      console.log(
        ' %c getIndustry 组件 this.state, this.props12222 ： ',
        payload,
        payload.list,
        payload.payload,
      ); //
      let sum = 0;
      payload.list.forEach(v => (sum = v.count + sum));
      return {
        ...state,
        industryList: [...payload.list].map(v => {
          // industryList: payload.list.map(v => {
          const items = v[payload.payload._value] ? 222222 : 666666;
          // console.log(' %c getIndustry 组件 this.state, this.props1 ： ', v[payload.payload._value] ? 888 : '其它999', 666, {...v},  )//
          // console.log(' %c getIndustry 组件 this.state, this.props1 ： ', industryMap[v[payload.payload._value]] ?? 'sssss', payload, items, '========',  payload.list, 32333, v[payload.payload._value], 2222, payload.payload._value, )//
          console.log(
            ' (v.count / sum).toFixed(2) ： ',
            v.count / sum,
            (v.count / sum).toFixed(2),
            toFixed(v.count / sum, 2),
          ); //
          return {
            ...v,
            value: v.count,
            amount: v.count,
            name:
              v[payload.payload._value] != undefined
                ? industryMap[v[payload.payload._value]] ?? '未知'
                : '其它',
            name: industryMap[v[payload.payload._value]] ?? '其它',
            percent: toFixed((v.count / sum) * 100, 2) + '%',
            sum,
          };
        }),
        industrySearchInfo: payload.searchInfo,
      };
    },
    getSale(state, { payload, type }) {
      console.log(
        ' %c getSale 组件 this.state, this.props12222 ： ',
        payload,
        payload.list,
        payload.payload,
      ); //
      let sum = 0;
      payload.list.forEach(v => (sum = v.count + sum));
      return {
        ...state,
        saleList: payload.list.map(v => ({
          ...v,
          value: v.count,
          amount: v.count,
          name:
            v[payload.payload._value] != undefined
              ? enterpriseScaleMap[v[payload.payload._value]] ?? '未知'
              : '其它',
          percent: toFixed((v.count / sum) * 100, 2) + '%',
          sum,
        })),
        saleSearchInfo: payload.searchInfo,
      };
    },
    getAsset(state, { payload, type }) {
      let sum = 0;
      payload.list.forEach(v => (sum = v.count + sum));
      return {
        ...state,
        assetList: payload.list.map(v => ({
          ...v,
          value: v.count,
          amount: v.count,
          name:
            v[payload.payload._value] != undefined
              ? assetScaleMap[v[payload.payload._value]] ?? '未知'
              : '其它',
          percent: toFixed((v.count / sum) * 100, 2) + '%',
          sum,
        })),
        assetSearchInfo: payload.searchInfo,
      };
    },
  },

  effects: {
    *getEchartsAsync({ payload, action, type }, { call, put, all }) {
      const res = yield all([
        call(services.getList, {
          _group: 'industry',
          _value: 'industry',
        }),
        call(services.getList, {
          _group: 'adcode',
          _value: 'adcode',
        }),
      ]);
      console.log(' resresresresres ： ', res); //
      // yield put({ type: 'getAdcode', payload: { ...res, payload, reginRes } });
    },
    *getAdcodeAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      const reginRes = yield call(getRegionOne);
      yield put({ type: 'getAdcode', payload: { ...res, payload, reginRes } });
    },
    *getIndustryAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      console.log(
        ' %c getIndustry 组件 this.state, this.propsxxxxx ： ',
        payload,
        res,
      ); //
      // yield put({ type: 'getIndustry', payload: { ...res, payload } });
      yield put(action({ ...res, payload }));
    },
    *getSaleAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      yield put({ type: 'getSale', payload: { ...res, payload } });
    },
    *getAssetAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      yield put({ type: 'getAsset', payload: { ...res, payload } });
    },
  },
};

export const actions = createAction(model);

export default model;
