import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/inspectPlan';
import * as clientServices from '@/services/client';
import { formatSelectList, nowYearMonth } from '@/utils';
import moment from 'moment'; //

const namespace = 'inspectPlan';
const { createAction, createCRUD, batchTurn, createActions } = init(namespace);

const otherActions = ['getClientAsync'];

const batchTurnActions = ['changeStationPlan', 'changePlanAsync'];

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

    clientList: [],
    dragList: [],
    initList: [],
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
      console.log(' getList ： ', state, payload); //
      // const dataList = payload.list.map((v) => ({...v, station_name: `电站-${v.station.name}`, client: `客户`, start: v.plan_date,   }))
      // console.log(' dataList  dataList.map v ： ', dataList,   )
      return {
        ...state,
        dataList: payload.list,
        initList: payload.list,
        count: payload.rest.count,
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

    getClient(state, { payload, type }) {
      // console.log(' getClient 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        clientList: formatSelectList(payload.list, 'name'),
      };
    },
    changeStationPlan(state, { payload, type }) {
      const { initList, dataList } = state;
      const dragList = payload.map(v => ({
        start: v.startStr,
        plan_date: v.startStr,
        id: v.id,
        station_id: v.id,
      }));
      console.log(' dragList ： ', state, dragList); //
      const latestDrag = dragList[dragList.length - 1];
      console.log(' latestDrag ： ', latestDrag); //
      const dataListFilter = dataList.map(v => {
        return v.id != latestDrag.id
          ? v
          : {
              ...v,
              surplus_plan_num:
                v.surplus_plan_num - 1 > 0
                  ? v.surplus_plan_num - 1
                  : v.surplus_plan_num,
            };
      });
      console.log(
        ' res  dragList.map v ： ',
        dragList,
        dataList,
        dataListFilter,
        latestDrag,
      );
      return {
        ...state,
        dragList: dragList,
        dataList: dataListFilter,
      };
    },
    resetStationData(state, { payload, type }) {
      const { initList } = state;
      return {
        ...state,
        dragList: [],
        dataList: initList,
      };
    },

    changePlan(state, { payload, type }) {
      return {
        ...state,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： ', payload, action, type); //
      const res = yield call(services.getList, {
        ...payload,
        month: payload.month ? data.month.format('YYYY-MM') : nowYearMonth,
      });
      yield put(action({ ...res, payload }));
      // const { form,  } = payload; //
      // try {
      //   const res = yield form.validateFields();
      //   console.log('  res await 结果  ：', res, action); //
      //   const data = yield call(services.getList, {
      //     ...res,
      //     month: res.month.format('YYYY-MM'),
      //   });
      //   yield put(action({ ...data, payload }));
      // } catch (error) {
      //   console.log(' error ： ', error); //
      // }
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put, select }) {
      const { dragList } = yield select(state => state[namespace]);
      console.log(' addItemAsync dragList ： ', dragList); //
      const res = yield call(services.addItem, {
        data: dragList,
      });
      yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *changePlanAsync({ payload, action, type }, { call, put, select }) {
      const { dragList } = yield select(state => state[namespace]);
      console.log(' dragList ： ', dragList); //
      const res = yield call(services.changePlan, {
        data: dragList,
      });
      yield put(action({ ...res, payload }));
    },

    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
