import { init } from '@/utils/createAction';
import * as services from '@/services/saleClue';

const namespace = 'saleClue';
const { createActions, createAction } = init(namespace);

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},

  saleClueCountData: {},
  saleClueTrendData: {},
  saleClueTrendSearchInfo: {},
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    getSaleClueCount(state, { payload, type }) {
      console.log(' getSaleClueCount ： ', payload);
      return {
        ...state,
        saleClueCountData: {
          ...payload.bean,
          rate: (payload.bean.rate * 100).toFixed(2), 
        }
      };
    },
    getSaleClueTrend(state, { payload, type }) {
      console.log(' getSaleClueTrend ： ', payload);
      return {
        ...state,
        saleClueTrendData: {
          ...payload.bean,
          rank: payload.bean.person_rank.map(v => ({ ...v, name: v.nickname })),
        },
        saleClueTrendSearchInfo: payload.payload,
      };
    },
  },

  effects: {
    *getSaleClueCountAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getSaleClueCount, payload);
      yield put({ type: 'getSaleClueCount', payload: { ...res, payload } });
    },
    *getSaleClueTrendAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getSaleClueTrend, payload);
      yield put({ type: 'getSaleClueTrend', payload: { ...res, payload } });
    },
  },
};

export const actions = createAction(model);

export default model;
