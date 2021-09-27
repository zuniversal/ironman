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
      const {
        contract_number,
        customer_clue_number,
        scheme_number,
        visit_customer_number,
      } = payload.bean;

      return {
        ...state,
        turnRateData: {
          ...payload.bean,
          customerCluePercent: 100,
          contractPercent: (
            (contract_number / customer_clue_number) *
            100
          ).toFixed(2),
          schemePercent: ((scheme_number / customer_clue_number) * 100).toFixed(
            2,
          ),
          visitCustomerPercent: (
            (visit_customer_number / customer_clue_number) *
            100
          ).toFixed(2),
        },
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
          rank: payload.bean.person_rank.map(v => ({ ...v, name: v.nickname })),
          // sign_contract_status: payload.bean.sign_contract_status.map(v => ({ ...v, data: v.data })),
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
