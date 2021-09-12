import { init } from '@/utils/createAction';
import * as services from '@/services/turnRate';

const namespace = 'turnRate';
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
      console.log(' getTurnRateProgress ： ', payload);
      return {
        ...state,
        turnRateData: payload.bean,
        turnRateSearchInfo: payload.payload,
      };
    },
    getClientSignTrend(state, { payload, type }) {
      console.log(' getClientSignTrend ： ', payload);
      return {
        ...state,
        clientSignData: {
          ...payload.bean,
          count: payload.bean.data,
          rank: payload.bean.rank.map(v => ({ ...v, name: v.amount })),
        },
        clientSignSearchInfo: payload.payload,
      };
    },
  },

  effects: {
    *getTurnRateProgressAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getTurnRateProgress, payload);
      yield put({ type: 'getTurnRateProgress', payload: { ...res, payload } });
    },
    *getClientSignTrendAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getClientSignTrend, payload);
      yield put({ type: 'getClientSignTrend', payload: { ...res, payload } });
    },
  },
};

export const actions = createAction(model);

export default model;
