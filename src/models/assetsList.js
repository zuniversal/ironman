import { init, action } from '@/utils/createAction';
import * as services from '@/services/assets';
import { formatSelectList, filterObjSame } from '@/utils';
import moment from 'moment';

const namespace = 'assetsList';
const { createActions } = init(namespace);

const otherActions = [];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const formatParams = data => {
  const params = {
    ...data,
    production_date: data.production_date.format('YYYY-MM-DD'),
    operation_date: data.operation_date.format('YYYY-MM-DD'),
  };
  console.log(' formatParams params ： ', params);
  return params;
};

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  d_id: '',
  searchInfo: {},
};

export default {
  namespace,

  state: initialState,

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
    getList(state, { payload, type }) {
      console.log(' getList 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: payload.list.map((v, i) => ({ ...v, id: i })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        ...payload,
      };
      console.log(
        ' getListAsync  payload ： ',
        payload,
        searchInfo,
        action,
        params,
      );
      const res = yield call(services.getAssetDevice, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
  },
};
