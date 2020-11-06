import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/inspectMission';
import * as userServices from '@/services/user';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'inspectMission';
const { createActions } = init(namespace);

const otherActions = [
  // 'editMissionAsync',
  'getUserAsync',
];

const batchTurnActions = [];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},

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
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: payload.bean,
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
        // dataList: state.dataList.map(v => ({
        //   ...(v.id !== payload.payload.d_id ? payload : v),
        // })),
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

    getUser(state, { payload, type }) {
      console.log(' getUserAsync 修改  ： ', state, payload, type); //
      return {
        ...state,
        userList: formatSelectList(payload.list, 'nickname'),
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： ', payload, action, type); //
      const res = yield call(services.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      console.log(' getItemAsync ： ', payload); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      console.log(' editItemAsync ： ', payload); //
      // if (payload.action === 'assignMission') {
      //    res = yield call(services.assignMission, payload);
      // } else if (payload.action === 'editDate') {
      //    res = yield call(services.assignMission, payload);
      // }
      const params = {
        ...payload,
      };
      if (payload.date) {
        params.date = payload.date.format('YYYY-MM-DD');
      }
      const res = yield call(services.assignMission, params);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },

    *getUserAsync({ payload, action, type }, { call, put }) {
      console.log(' getUserAsync ： ', payload); //
      const res = yield call(userServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
