import { init, action } from '@/utils/createAction';
import * as services from '@/services/organize';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'organize';
const { createActions, createAction } = init(namespace);

const otherActions = ['getOrganizeAsync'];

const batchTurnActions = [];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

export const recursiveHandle = (data = [], parent_id) => {
  // console.log(' recursiveHandle   ,   ： ', data, parent_id);
  return data.map(v => ({
    ...v,
    value: v.id,
    title: v.name,
    label: v.name,
    parent_id: parent_id,
    // children: recursiveHandle(v.childrens, v.id),
    children: recursiveHandle(v.children, v.id),
    // children: Array.from({ length: 300 }, (_, index) => ({
    //   value: Math.random() + index,
    //   title: 'v.name' + index,
    //   label: 'v.name' + index,
    //   parent_id: index,
    // })),
  }));
  // return data.map(({childrens, ...v}) => ({...v, value: v.id, title: v.name, children: recursiveHandle(childrens)}))
};

const model = {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    d_id: '',

    searchInfo: {},
    organizeList: [],
  },

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
      const organizeList = recursiveHandle(payload.list);
      console.log('  organizeList ：', organizeList);
      return {
        ...state,
        // dataList: payload.list,
        dataList: organizeList,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        // itemDetail: payload.bean,
        itemDetail: {
          ...payload.payload,
          // parent_id: payload.payload.id,
          // parent_id: payload.payload.parent_id,
        },
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

    getOrganize(state, { payload, type }) {
      console.log(' getOrganize 修改  ： ', state, payload, type);
      return {
        ...state,
        organizeList: recursiveHandle(payload.list),
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
      // const res = yield call(services.getItem, payload);
      console.log(' getItemAsync ： ', payload);
      yield put(action({ payload }));
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

    *getOrganizeAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};

export const actions = createAction(model);

export default model;
