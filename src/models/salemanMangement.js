import { init } from '@/utils/createAction';
import * as services from '@/services/salemanMangement';

const namespace = 'salemanMangement';
const { createActions, createAction } = init(namespace);

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},

  importUserList: [],
};

const model = {
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

        importUserList: [],
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      const { roles, tags, account, role, join_date } = payload.bean;
      console.log(' getItemgetItem ： ', payload, account);
      const role_ids = role[0]?.role_id ? `${role[0]?.role_id}` : null;
      const tag_ids = tags[0]?.tag_id ? `${tags[0]?.tag_id}` : null;
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          role_ids,
          tag_ids,
          organization_ids: payload.bean.organization.map(
            v => v.organization_id,
          ),
          join_date: join_date ? moment(join_date) : null,
        },
      };
    },
    importUser(state, { payload, type }) {
      console.log(' importUser 修改  ： ', state, payload, type);
      const { importUserList } = state; //
      const res = importUserList.find(v => v.id === payload.record.id);
      console.log(' res  state.find v ： ', res);
      const data = res ? importUserList : [payload.record, ...importUserList];
      return {
        ...state,
        importUserList: data,
      };
    },
    removeUser(state, { payload, type }) {
      console.log(' removeUser 修改  ： ', state, payload, type);
      const { importUserList } = state; //
      const res = importUserList.filter(v => v.id !== payload.record.id);
      console.log(' res  state.filter v ： ', res);
      return {
        ...state,
        importUserList: res,
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
      const res = yield call(services.getList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put({ type: 'getItem', payload: { ...res, payload } });
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put({ type: 'getListAsync' });
    },

    *importUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.importUser, payload);
      yield put({ type: 'getListAsync' });
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },
  },
};

export const actions = createAction(model);

export default model;
