import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/inspectPlan';
import * as tagsServices from '@/services/tags';
import * as userServices from '@/services/userManage';
import { formatSelectList, nowYearMonth, tips } from '@/utils';
import moment from 'moment'; //

const namespace = 'inspectPlan';
const { createActions } = init(namespace);

const otherActions = [
  'getTagUserAsync',
  'getUserAsync',
  'getScheduledListAsync',
  'removePlanAsync',
  'getScheduledDetailListAsync',
];

const batchTurnActions = [
  'reset',
  'changeStationPlan',
  'changePlanAsync',
  'onUnScheduleListChange',
];

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
      // month: moment(),
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
    dateList: [],
    dayEvents: [],
    monthEvents: [],
    dayInfo: {},
    unScheduleFilter: [],
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
          textColor: i,
          // url: '#',
          href: '#',
          // overlap: false,

          extendedProps: {
            ...v,
            isScheduled: false,
          },

          value: v.id,
          label: `${v.name} - ${v.customer}`,
        };
      });
      const scheduleListData = payload.scheduleList.map(v => {
        // console.log(' scheduleListData v ： ', v,  )//
        return {
          ...v,
          // title: `电站-${v.station.name} id:${v.station.id}`,
          // title: `${v.station.name}`,
          title: `${v.count} 已排`,
          tags: `客户`,
          start: v.plan_date,

          // overlap: false,

          isdraged: true,
          constraint: 'availableForMeeting',
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
        dayEvents: [],
        monthEvents: [],
        unScheduleFilter: unScheduleListData,
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
        // tagUserList: [
        //   {
        //     value: '1',
        //     label: '12312',
        //   },
        // ],
        tagList: formatSelectList(payload.rest.users, 'name'),
        userList: formatSelectList(payload.rest.users, 'nickname'),
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
      const { initList, unScheduleList, scheduleList } = state;
      const dragList = payload.map(v => ({
        start: v.startStr,
        plan_date: v.startStr,
        id: v.id,
        extendedProps: v.extendedProps,
        // station_id: v.station.station_id,
        // station_id: v.id,
      }));
      console.log(
        ' dragList latestDrag ： ',
        state,
        scheduleList,
        dragList,
        payload,
      ); //
      const latestDrag = payload[payload.length - 1]; // 当前拖动的最新的一个电站
      console.log(' latestDrag ： ', latestDrag, latestDrag.textColor); //
      const unScheduleListFilter = unScheduleList.map(v => {
        return latestDrag && v.id != latestDrag.id
          ? v
          : {
              ...v,
              surplus_plan_num:
                v.surplus_plan_num > 0 &&
                latestDrag &&
                // latestDrag.url == v.surplus_plan_num
                latestDrag.textColor == v.surplus_plan_num
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

      const scheduleListData =
        latestDrag && latestDrag.id
          ? scheduleList.map(v => {
              console.log(' latestDrag scheduleList ： ', v, latestDrag); //
              return v.start != latestDrag.startStr
                ? v
                : {
                    ...v,
                    count: v.count + 1,
                    title: v.count + 1,
                  };
            })
          : scheduleList; //
      console.log(
        '  latestDrag scheduleListData ：',
        unScheduleListFilter,
        scheduleListData,
      ); //
      return {
        ...state,
        dragList: dragList,
        unScheduleList: unScheduleListFilter,
        unScheduleFilter: unScheduleListFilter,
        // scheduleList: scheduleListData,
        // scheduleList: scheduleList.map((v) => {
        //   console.log(' scheduleList ： ', v, latestDrag, )//
        //   return v
        // })
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
    getScheduledDetailList(state, { payload, type }) {
      const dayEvents = payload.list.filter(
        v => v.station.inspection_type === 0,
      );
      const monthEvents = payload.list.filter(
        v => v.station.inspection_type === 1,
      );
      console.log(' dayEvents  .map v ： ', payload, dayEvents, monthEvents);
      return {
        ...state,
        dateList: payload.list,
        dayInfo: payload.payload,
        dayEvents,
        monthEvents,
      };
    },

    changePlan(state, { payload, type }) {
      return {
        ...state,
      };
    },
    removePlan(state, { payload, type }) {
      console.log(' removePlan ： ', state, payload); //
      const { planDetailList } = state;
      const planDetailListRes = planDetailList.filter(
        v => v.id != payload.payload.data[0],
      );
      console.log(' planDetailListRes ： ', planDetailListRes); //
      return {
        ...state,
        planDetailList: planDetailListRes,
      };
    },
    onUnScheduleListChange(state, { payload, type }) {
      const { unScheduleList } = state;
      const unScheduleFilter = unScheduleList.filter(v => {
        // console.log(' unScheduleList includes v ： ', v )
        return v.label.includes(payload.target.value);
      });
      console.log(
        ' onUnScheduleListChange ： ',
        payload.target.value,
        unScheduleFilter,
      ); //
      return {
        ...state,
        unScheduleFilter,
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
        page_size: 1000,
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
      // const scheduleList2 = yield call(services.getScheduledList, params);
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
      console.log('  对吗  dragList.length ', dragList.length);
      if (dragList.length > 0) {
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
      }
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
    *getScheduledDetailListAsync(
      { payload, action, type },
      { call, put, select },
    ) {
      const { searchInfo, dayInfo } = yield select(state => state[namespace]);
      console.log(' getScheduledDetailListAsync  ： ', payload, searchInfo); //
      // const date = payload.event ? dayInfo : payload
      const params = {
        // leader: payload.event.extendedProps.id,
        ...dayInfo,
        leader: searchInfo.leader,
        date: payload.event
          ? payload.event.extendedProps.plan_date
          : dayInfo.date,
        page_size: payload.event.title,
        // date: payload.event ? payload.event.extendedProps.plan_date.split('T')[0] : dayInfo.date,
      };
      console.log(' paramsparams ： ', params, payload, dayInfo); //
      const res = yield call(services.getScheduledDetailList, params);
      yield put(action({ ...res, payload: params }));
    },

    *getTagUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(tagsServices.getTagUser, payload);
      yield put(action({ ...res, payload }));
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getSearchList, {
        service_staff: 1,
        choices: 1,
        ...payload,
      });
      yield put(action({ ...res, payload }));
    },
    *removePlanAsync({ payload, action, type }, { call, put }) {
      console.log(' removePlanAsync  ： ', payload); //
      const params = {
        data: [payload.id],
      };
      const res = yield call(services.removePlan, params);
      // yield put({ type: 'getScheduledDetailListAsync' });
      yield put({ type: 'getListAsync' });
    },
  },
};
