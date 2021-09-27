import { init } from '@/utils/createAction';
import * as services from '@/services/clientPortrait';
// import * as services from '@/services/turnRate';
import { industryMap, enterpriseScaleMap, assetScaleMap } from '@/configs';
import { arrMapObj } from '@/utils';

const namespace = 'turnRate2';
const { createActions, createAction } = init(namespace);

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},

  turnRateSearchInfo: {},
  turnRateData: {},
  clientSignSearchInfo: {},
  clientSignData: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    getTurnRateProgress(state, { payload, type }) {
      console.log(' getIndustry getTurnRateProgress ： ', payload);
      let sum = 0;
      payload.list.forEach(v => (sum = v.count + sum));
      const industryList = [...payload.list].map(v => {
        // industryList: payload.list.map(v => {
        const items = v[payload.payload._value] ? 222222 : 666666;
        console.log(
          ' %c getIndustry 组件 this.state, this.props1 ： ',
          v[payload.payload._value],
          2222,
          v[payload.payload._value]
            ? industryMap[v[payload.payload._value]]
            : '其它999',
          666,
          { ...v },
        ); //
        console.log(
          ' %c getIndustry 组件 this.state, this.props1 ： ',
          industryMap[v[payload.payload._value]] ?? 'sssss',
          payload,
          items,
          '========',
          payload.list,
          32333,
          payload.payload._value,
        ); //
        return {
          ...v,
          value: v.count,
          amount: v.count,
          name: v[payload.payload._value]
            ? industryMap[v[payload.payload._value]]
            : '其它1',
          label: industryMap[v[payload.payload._value]] ?? '其它',
          percent: (v.count / sum).toFixed(2) * 100 + '%',
        };
      });
      console.log(' getIndustry industryList ： ', industryList); //
      return {
        ...state,
        industryList: industryList,
        industrySearchInfo: payload.searchInfo,
      };
    },
    getClientSignTrend(state, { payload, type }) {
      console.log(' getClientSignTrend ： ', payload);
      return {
        ...state,
        clientSignData: {
          ...payload.bean,
          count: payload.bean.data,
          rank: payload.bean.person_rank.map(v => ({ ...v, name: v.nickname })),
          // sign_contract_status: payload.bean.sign_contract_status.map(v => ({ ...v, data: v.data })),
        },
        clientSignSearchInfo: payload.payload,
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
          console.log(
            ' %c getIndustry 组件 this.state, this.props1 ： ',
            v[payload.payload._value] ? 888 : '其它999',
            666,
            { ...v },
          ); //
          console.log(
            ' %c getIndustry 组件 this.state, this.props1 ： ',
            industryMap[v[payload.payload._value]] ?? 'sssss',
            payload,
            items,
            '========',
            payload.list,
            32333,
            v[payload.payload._value],
            2222,
            payload.payload._value,
          ); //
          return {
            ...v,
            value: v.count,
            amount: v.count,
            name: v[payload.payload._value]
              ? industryMap[v[payload.payload._value]]
              : '其它',
            name: industryMap[v[payload.payload._value]] ?? '其它',
            percent: (v.count / sum).toFixed(2) * 100 + '%',
          };
        }),
        industrySearchInfo: payload.searchInfo,
      };
    },
    getAsset(state, { payload, type }) {
      console.log(
        ' getAsset getIndustry getTurnRateProgress ： ',
        state,
        payload,
      );
      let sum = 0;
      payload.list.forEach(v => (sum = v.count + sum));
      console.log(
        ' getAsset getIndustry getTurnRateProgress 2： ',
        state,
        payload,
        payload.list,
      );
      // [...payload.list].map(v => {
      //   console.log(' %c getAsset getIndustry 组件 this.state, this.props12 ： ', v )//
      //   return ({
      //     ...v,
      //     // value: v.count,
      //     // amount: v.count,
      //     // name: v[payload.payload._value] ? assetScaleMap[v[payload.payload._value]] : '其它',
      //     // percent: (v.count / sum).toFixed(2) * 100 + '%',
      //   })
      // })
      const assetList = [...payload.list].map(v => {
        console.log(
          ' %c getAsset getIndustry 组件 this.state, this.props1 ： ',
          state,
          payload.payload._value,
          v[payload.payload._value],
          v[payload.payload._value] ? 888 : '其它999',
          666,
          { ...v },
        ); //
        return {
          ...v,
          value: v.count,
          amount: v.count,
          name: v[payload.payload._value]
            ? assetScaleMap[v[payload.payload._value]]
            : '其它',
          label: assetScaleMap[v[payload.payload._value]] ?? '其它',
          percent: (v.count / sum).toFixed(2) * 100 + '%',
        };
      });
      return {
        ...state,
        assetList: assetList,
        assetSearchInfo: payload.searchInfo,
      };
    },
  },

  effects: {
    *getEchartsAsync({ payload, action, type }, { call, put, all }) {
      const res = yield call(services.getList, payload);
      console.log(
        ' %c getEchartsAsync getIndustry 组件 this.state, this.propsxxxxx ： ',
        payload,
        res,
      ); //
      yield put({ type: 'getIndustry', payload: { ...res, payload } });
      // yield put({ type: 'getAdcode', payload: { ...res, payload, reginRes } });
    },
    *getAssetAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      yield put({ type: 'getAsset', payload: { ...res, payload } });
    },
    *getTurnRateProgressAsync({ payload, action, type }, { call, put }) {
      // const res = yield call(services.getTurnRateProgress, payload);
      // yield put({ type: 'getTurnRateProgress', payload: { ...res, payload } });
      const res = yield call(services.getList, payload);
      console.log(
        ' %c getIndustry 组件 this.state, this.propsxxxxx ： ',
        payload,
        res,
      ); //
      // yield put({ type: 'getIndustry', payload: { ...res, payload } });
      yield put(action({ ...res, payload }));
    },
    *getClientSignTrendAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getClientSignTrend, payload);
      yield put({ type: 'getClientSignTrend', payload: { ...res, payload } });
    },
    // *getIndustryAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.getList, payload);
    //   console.log(' %c getIndustry 组件 this.state, this.propsxxxxx ： ', payload, res  )//
    //   // yield put({ type: 'getIndustry', payload: { ...res, payload } });
    //   yield put(action({ ...res, payload }));
    // },
  },
};

export const actions = createAction(model);

export default model;
