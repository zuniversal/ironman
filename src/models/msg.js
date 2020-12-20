import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/msg';
import * as organizeServices from '@/services/organize';
import * as userManageServices from '@/services/userManage';
import { formatSelectList, nowYearMonth } from '@/utils';
// import { recursiveHandle } from '@/models/organize';

const namespace = 'msg';
const { createActions } = init(namespace);

const otherActions = ['getUserManageAsync', 'getOrganizeAsync'];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

export const recursiveHandle = (data = [], parent_id) => {
  // console.log(' recursiveHandle   ,   ： ', data, parent_id);
  return data.map(v => ({
    ...v,
    key: `id-${v.id}`,
    // value: v.id,
    id: `id-${v.id}`,
    title: v.name,
    label: v.name,
    parent_id: parent_id || Math.random(),
    pId: parent_id || Math.random(),
    children: recursiveHandle(v.children, `id-${v.id}`),
  }));
};

export const flatOrganize = (data = [], parent_id, init = []) => {
  // console.log(' flatOrganize   ,   ： ', data, parent_id);
  data.forEach(v => {
    init.push({
      ...v,
      // value: v.id,
      // title: v.name,
      // label: v.name,
      // parent_id: parent_id,
      // pId: parent_id,
      // isLeaf: false,
      isLeaf: !(v.children.length > 0),
    });
    if (v.children.length) {
      flatOrganize(v.children, v.id, init);
    }
  });
  return init;
};

export default {
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
    flatOrganizeList: [],
    userList: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: false,
        itemDetail: {},
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list.map(v => ({
          ...v,
          reciever: v.reciever.map(v => v.nickname),
          created_time: v.created_time.split('T')[0],
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      const { sender, reciever } = payload.bean;
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          sender: `${sender.id}`,
          reciever: reciever.map(v => `${v.id}`),
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
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
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
      console.log(' getOrganize ： ', state, payload); //
      const organizeList = recursiveHandle(payload.list);
      // 注意 id 和 pId 不能一样 否则会导致下拉项不渲染
      const flatOrganizeList = flatOrganize(
        organizeList,
        null,
        [],
      ).map(({ children, ...v }) => ({ ...v }));
      console.log(' flatOrganizeList ： ', flatOrganizeList); //
      return {
        ...state,
        organizeList,
        flatOrganizeList,
        // flatOrganizeList: [
        //   {
        //     id: 1,
        //     name: "总经办",
        //     value: 1,
        //     pId: 1,
        //     title: "总经办",
        //     label: "总经办",
        //     parent_id: null,
        //   },
        //   {
        //     id: 2,
        //     name: "营销客服中心",
        //     value: 2,
        //     pId: 2,
        //     title: "营销客服中心",
        //     label: "营销客服中心",
        //     parent_id: null,
        //   },
        // ],
      };
    },
    getUserManage(state, { payload, type }) {
      const { organizeList } = state;

      return {
        ...state,
        userList: organizeList,
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
      ); //
      const res = yield call(services.getList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
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
      console.log(' getOrganizeAsync ： ', payload); //
      const res = yield call(organizeServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getUserManageAsync({ payload, action, type }, { call, put }) {
      console.log(' getUserManageAsync ： ', payload); //
      const res = yield call(userManageServices.getSearchList, payload);
      // yield put(action({ ...res, payload }));
      return res.list;
    },
  },
};
