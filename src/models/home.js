import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/home';
import * as teamServices from '@/services/shiftsManage';
import * as workOrderServices from '@/services/workOrder';
import { formatSelectList, getItem, setItem } from '@/utils';

const namespace = 'home';
const { createActions } = init(namespace);

const otherActions = [
  'getStatisticAsync',
  'getChartAsync',
  'getOrdersChartAsync',
  'getInspectionsChartAsync',
  'getPendingOrdersAsync',
  'getInspectionTasksAsync',
  'getTeamAsync',
  'dispatchOrderAsync',
];

const batchTurnActions = ['saveHomeSetting'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

console.log(' actions ： ', actions, getItem('homeSettings')); //
export const mapStateToProps = state => state[namespace];

const settingData = [
  'inspectMission',
  'pendingOrder',
  'waitInspect',
  'waitReceive',
  'groupCount',
  'completeOrder',
  'compeleteInspect',
];

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},

    homeSettings:
      getItem(`${getItem('userInfo')?.id}_homeSettings`) || settingData,
    statisticData: {},
    chartData: {},
    requestFn: 'getInspectionsChart',
    chartSearchInfo: {},
    ordersChartData: {},
    inspectionsChartData: {},

    pendingOrdersSearchInfo: {},
    pendingOrdersList: [],
    pendingOrdersCount: 0,
    inspectionTasksList: [],
    inspectionTasksCount: 0,
    extraData: {},
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        extraData: payload.extraData,
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

    saveHomeSetting(state, { payload, type }) {
      console.log(' saveHomeSetting 修改  ： ', state, payload, type); //
      const userInfo = getItem('userInfo');
      setItem(`${userInfo.id}_homeSettings`, payload.homeSettings);
      return {
        ...state,
        isShowModal: false,
        ...payload,
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
          ...payload.payload,
        },
        requestFn: payload.payload.requestFn,
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
        pendingOrdersCount: payload.rest.count,
        isShowModal: false,
        pendingOrdersSearchInfo: payload.payload,
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
        inspectionTasksCount: payload.rest.count,
        isShowModal: false,
      };
    },

    getTeam(state, { payload, type }) {
      return {
        ...state,
        teamList: formatSelectList(payload.list, 'name'),
      };
    },
  },

  effects: {
    *getStatisticAsync({ payload, action, type }, { call, put }) {
      console.log(' getStatisticAsync ： ', payload, action, type); //
      const res = yield call(services.getStatistic, payload);
      yield put(action({ ...res, payload }));
    },
    *getChartAsync(
      {
        payload = {
          requestFn: 'getInspectionsChart',
        },
        action,
        type,
      },
      { call, put },
    ) {
      console.log(' getChartAsync ： ', payload, action, type); //
      const res = yield call(services[payload.requestFn], payload);
      yield put(action({ ...res, payload }));
    },
    // *getOrdersChartAsync({ payload, action, type }, { call, put }) {
    //   console.log(' getOrdersChartAsync ： ', payload, action, type); //
    //   const res = yield call(services.getOrdersChart, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getInspectionsChartAsync({ payload, action, type }, { call, put }) {
    //   console.log(' getInspectionsChartAsync ： ', payload, action, type); //
    //   const res = yield call(services.getInspectionsChart, payload);
    //   yield put(action({ ...res, payload }));
    // },
    *getPendingOrdersAsync({ payload, action, type }, { call, put, select }) {
      const { pendingOrdersSearchInfo } = yield select(
        state => state[namespace],
      );
      const params = {
        ...pendingOrdersSearchInfo,
        ...payload,
      };
      console.log(' getPendingOrdersAsync ： ', payload, action, type, params); //
      const res = yield call(services.getPendingOrders, params);
      // yield put(action({ ...res, payload }));
      yield put({
        type: 'getPendingOrders',
        payload: { ...res, payload: params },
      });
    },
    *getInspectionTasksAsync({ payload, action, type }, { call, put }) {
      console.log(' getInspectionTasksAsync ： ', payload, action, type); //
      const res = yield call(services.getInspectionTasks, payload);
      yield put(action({ ...res, payload }));
    },

    *getTeamAsync({ payload, action, type }, { call, put }) {
      console.log(' getTeamAsync ： ', payload, action, type); //
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *dispatchOrderAsync({ payload, action, type }, { call, put }) {
      console.log(' dispatchOrderAsync ： ', payload, type); //
      const res = yield call(workOrderServices.dispatchOrder, payload);
      yield put({ type: 'getPendingOrdersAsync' });
    },
  },
};
