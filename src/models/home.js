import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/home';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'home';
const { createActions } = init(namespace);

const otherActions = [
  'getStatisticAsync',
  'getOrdersChartAsync',
  'getInspectionsChartAsync',
  'getPendingOrdersAsync',
  'getInspectionTasksAsync',
];

const batchTurnActions = ['homeSetting'];

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

    chartSearchInfo: {},
    statisticData: {},
    chartData: {},
    ordersChartData: {},
    inspectionsChartData: {},
    pendingOrdersList: [],
    inspectionTasksList: [],
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
    homeSetting(state, { payload, type }) {
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

    getStatistic(state, { payload, type }) {
      console.log(' getStatistic ： ', state, payload); //
      return {
        ...state,
        statisticData: payload.bean,
      };
    },
    getChart(state, { payload, type }) {
      console.log(' getChart ： ', state, payload); //
      const { chartSearchInfo } = state;

      return {
        ...state,
        chartData: payload.bean,
        chartSearchInfo: {
          ...chartSearchInfo,
          ...payload,
        },
      };
    },
    getOrdersChart(state, { payload, type }) {
      console.log(' getOrdersChart ： ', state, payload); //
      return {
        ...state,
        chartData: payload.bean,
        // ordersChartData: payload.bean,
      };
    },
    getInspectionsChart(state, { payload, type }) {
      console.log(' getInspectionsChart ： ', state, payload); //
      return {
        ...state,
        chartData: payload.bean,
        // inspectionsChartData: payload.bean,
      };
    },
    getPendingOrders(state, { payload, type }) {
      console.log(' getPendingOrders ： ', state, payload); //
      return {
        ...state,
        pendingOrdersList: payload.list.map(v => ({
          ...v,
          created_time: v.created_time.split('T')[0],
        })),
      };
    },
    getInspectionTasks(state, { payload, type }) {
      console.log(' getInspectionTasks ： ', state, payload); //
      return {
        ...state,
        inspectionTasksList: payload.list.map(v => ({
          ...v,
          created_time: v.created_time.split('T')[0],
        })),
      };
    },
  },

  effects: {
    *getStatisticAsync({ payload, action, type }, { call, put }) {
      console.log(' getStatisticAsync ： ', payload, action, type); //
      const res = yield call(services.getStatistic, payload);
      yield put(action(res));
    },
    *getChartAsync({ payload, action, type }, { call, put }) {
      console.log(' getChartAsync ： ', payload, action, type); //
      const res = yield call(services.getChart, payload);
      yield put(action(res));
    },
    *getOrdersChartAsync({ payload, action, type }, { call, put }) {
      console.log(' getOrdersChartAsync ： ', payload, action, type); //
      const res = yield call(services.getOrdersChart, payload);
      yield put(action(res));
    },
    *getInspectionsChartAsync({ payload, action, type }, { call, put }) {
      console.log(' getInspectionsChartAsync ： ', payload, action, type); //
      const res = yield call(services.getInspectionsChart, payload);
      // yield put(action(res));
    },
    *getPendingOrdersAsync({ payload, action, type }, { call, put }) {
      console.log(' getPendingOrdersAsync ： ', payload, action, type); //
      const res = yield call(services.getPendingOrders, payload);
      yield put(action(res));
    },
    *getInspectionTasksAsync({ payload, action, type }, { call, put }) {
      console.log(' getInspectionTasksAsync ： ', payload, action, type); //
      const res = yield call(services.getInspectionTasks, payload);
      yield put(action(res));
    },
  },
};
