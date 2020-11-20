import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/inspectPlan';
import * as tagsServices from '@/services/tags';
import * as userServices from '@/services/user';
import { formatSelectList, nowYearMonth, tips } from '@/utils';
import moment from 'moment'; //

const namespace = 'inspectPlan';
const { createActions } = init(namespace);

const otherActions = [
  'getTagUserAsync',
  'getUserAsync',
  'getScheduledListAsync',
];

const batchTurnActions = ['reset', 'changeStationPlan', 'changePlanAsync'];

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
    searchInfo: {
      month: moment(),
    },

    tagList: [],
    userList: [],
    tagUserList: [],
    dragList: [],
    initList: [],
    unScheduleList: [],
    scheduleList: [],
    unScheduleListOrigin: [],
    scheduleListOrigin: [],
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
    reset(state, { payload, type }) {
      const { unScheduleListOrigin, scheduleListOrigin } = state;
      return {
        ...state,
        unScheduleList: unScheduleListOrigin,
        scheduleList: scheduleListOrigin,
      };
    },
    getList(state, { payload, type }) {
      console.log(' getList ： ', state, payload, payload.searchInfo); //
      // const dataList = payload.list.map((v) => ({...v, station_name: `电站-${v.station.name}`, Tags: `客户`, start: v.plan_date,   }))
      // console.log(' dataList  dataList.map v ： ', dataList,   )
      const unScheduleListData = payload.unScheduleList.map((v, i) => {
        // console.log(' unScheduleListData v ： ', v,  )//
        return {
          ...v,
          url: i,
          overlap: false,
          extendedProps: {
            ...v,
            isScheduled: false,
          },
        };
      });
      const scheduleListData = payload.scheduleList.map(v => {
        // console.log(' scheduleListData v ： ', v,  )//
        return {
          ...v,
          title: `电站-${v.station.name} id:${v.station.id}`,
          tags: `客户`,
          start: v.plan_date,
          overlap: false,
          // isdraged: true,
          // station_id: v.station.station_id,
          extendedProps: {
            ...v,
            isScheduled: true,
          },
          // id: v.station.id,
        };
      });
      console.log(
        ' unScheduleListData, scheduleListData,  ： ',
        unScheduleListData,
        scheduleListData,
      ); //
      return {
        ...state,
        // dataList: payload.list,
        // initList: payload.list,
        // count: payload.rest.count,
        unScheduleList: unScheduleListData,
        scheduleList: scheduleListData,
        unScheduleListOrigin: unScheduleListData,
        scheduleListOrigin: scheduleListData,
        isShowModal: false,
        searchInfo: payload.searchInfo,
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

    getTagUser(state, { payload, type }) {
      console.log(
        ' getTagUser 修改  ： ',
        state,
        payload,
        type,
        payload.rest.users,
      ); //
      return {
        ...state,
        tagUserList: formatSelectList(payload.rest.users, 'nickname'),
        tagUserList: [
          {
            value: '1',
            label: '12312',
          },
        ],
        tagList: formatSelectList(payload.rest.users, 'name'),
      };
    },
    getUser(state, { payload, type }) {
      // console.log(' getUser 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        userList: formatSelectList(payload.list, 'nickname'),
      };
    },
    changeStationPlan(state, { payload = [], type }) {
      const { initList, unScheduleList } = state;
      const dragList = payload.map(v => ({
        start: v.startStr,
        plan_date: v.startStr,
        id: v.id,
        extendedProps: v.extendedProps,
        // station_id: v.station.station_id,
        // station_id: v.id,
      }));
      console.log(' dragList ： ', state, dragList, payload); //
      const latestDrag = payload[payload.length - 1]; // 当前拖动的最新的一个电站
      console.log(' latestDrag ： ', latestDrag); //
      const unScheduleListFilter = unScheduleList.map(v => {
        return latestDrag && v.id != latestDrag.id
          ? v
          : {
              ...v,
              surplus_plan_num:
                v.surplus_plan_num > 0 &&
                latestDrag &&
                latestDrag.url == v.surplus_plan_num
                  ? v.surplus_plan_num - 1
                  : v.surplus_plan_num,
              // isdraged: true,
            };
      });
      console.log(
        ' res  dragList.map v ： ',
        dragList,
        unScheduleList,
        unScheduleListFilter,
        latestDrag,
        [...payload],
      );
      return {
        ...state,
        dragList: dragList,
        unScheduleList: unScheduleListFilter,
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
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      console.log(' getListAsync ： ', payload, searchInfo, type); //
      const payloads = payload ? payload : searchInfo; //
      console.log('  payloads ：', payloads); //
      const params = {
        ...payloads,
        month:
          payloads && payloads.month
            ? payloads.month.format('YYYY-MM')
            : nowYearMonth,
        // month: searchInfo.month.format('YYYY-MM'),
      };

      if (!params.leader || !params.month) {
        if (!payload.isReset) {
          tips('请先选择客户代表及月份！', 2);
        }
        return;
      }
      const unScheduleList = yield call(services.getUnScheduleList, params);
      const scheduleList = yield call(services.getScheduledList, params);
      // const scheduleList = []
      console.log(
        ' unScheduleList, scheduleList ： ',
        unScheduleList,
        scheduleList,
        params,
      ); //
      yield put(
        // action({
        //   unScheduleList: unScheduleList.list,
        //   scheduleList: scheduleList.list,
        //   // scheduleList: [],
        //   // ...scheduleList,
        //   searchInfo: payloads,
        // }),
        {
          type: 'getList',
          payload: {
            unScheduleList: unScheduleList.list,
            scheduleList: scheduleList.list,
            // scheduleList: [],
            // ...scheduleList,
            searchInfo: payloads,
          },
        },
      );
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
    // *getScheduledListAsync({ payload, action, type }, { call, put }) {
    //   console.log(' getScheduledListAsync ： ', payload, action, type); //
    //   const res = yield call(services.getList, {
    //     ...payload,
    //     month: payload.month ? payload.month.format('YYYY-MM') : nowYearMonth,
    //   });
    //   yield put(action({ ...res, payload }));
    // },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put, select }) {
      const { dragList } = yield select(state => state[namespace]);
      console.log(' addItemAsync dragList ： ', dragList); //
      const planData = dragList
        .filter(v => v.plan_date != v.extendedProps.plan_date)
        .map(v => {
          const { station, id } = v.extendedProps;
          const items = {
            plan_date: v.plan_date,
            station_id: station ? station.id : v.id,
          };
          if (id) {
            items.id = id;
          }

          return items;
        });
      console.log(' planData ： ', planData); //
      // return
      const res = yield call(services.addItem, {
        // data: planData,
        data: planData,
      });
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put, select }) {
      const { dragList } = yield select(state => state[namespace]);
      console.log(' editItemAsync dragList ： ', dragList); //
      const res = yield call(services.changePlan, {
        data: dragList.filter(v => v.plan_date != v.extendedProps.plan_date),
      });
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *changePlanAsync({ payload, action, type }, { call, put, select }) {
      const { dragList } = yield select(state => state[namespace]);
      console.log(' changePlanAsync dragList ： ', dragList); //
      // const res = yield call(services.changePlan, {
      //   data: dragList,
      // });
      // yield put(action({ ...res, payload }));
    },

    *getTagUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(tagsServices.getTagUser, payload);
      yield put(action({ ...res, payload }));
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
