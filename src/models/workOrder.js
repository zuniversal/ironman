import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/workOrder';
import * as teamServices from '@/services/shiftsManage';
import * as userServices from '@/services/userManage';
import * as powerStationServices from '@/services/powerStation';
import { formatSelectList, nowYearMonth } from '@/utils';
import { workOrderStatusMap, missionsTypeMap } from '@/configs';
import moment from 'moment'; //

const namespace = 'workOrder';
const { createActions } = init(namespace);

const otherActions = [
  'getTeamAsync',
  'getUserAsync',
  'getPowerAsync',
  'exportDataAsync',
  'exportExcelAsync',
  'dispatchOrderAsync',
  'addTicketAsync',
];

export const actions = {
  ...createActions(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

export const formatSearch = data => {
  console.log(' formatSearch ： ', data); //
  return {
    ...data,
    // page_size: 40,
    data: data.data ? data.data.format('YYYY-MM') : nowYearMonth,
  };
};

export const formatAddTicket = data => {
  console.log(' formatAddTicket ： ', data); //
  return {
    ...data,
    work_date: data.work_date.format('YYYY-MM'),
  };
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
          created_time: v.created_time ? v.created_time.split('T')[0] : '',
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload }) {
      console.log(' getItemgetItem ： ', payload); //
      const { created_time, type, status } = payload.bean;

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          // created_time: created_time ? created_time.split('T')[0] : '',
          created_time: moment(payload.bean.created_time).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          receiving_time: moment(payload.bean.receiving_time).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          commencement_date: moment(payload.bean.commencement_date).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
          type: missionsTypeMap[type],
          status: workOrderStatusMap[status],
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
      console.log(' editItem ： ', state, payload); //
      return {
        ...state,
        // d_id: payload.payload.d_id,
        // dataList: state.dataList.map(v => ({
        //   ...(v.id == payload.payload.d_id ? { ...v, ...payload.bean } : v),
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
    getPower(state, { payload, type }) {
      return {
        ...state,
        powerList: formatSelectList(payload.list, 'name'),
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        userList: formatSelectList(payload.list, 'nickname'),
      };
    },
    getTeam(state, { payload, type }) {
      return {
        ...state,
        teamList: formatSelectList(payload.list, 'name'),
      };
    },
    dispatchOrder(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    addTicket(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        isShowModal: false,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        // ...formatSearch(payload),
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
      yield put(action(res));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      console.log(' editItemAsync ： ', payload); //
      const res = yield call(services.editItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },
    *exportExcelAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, {
        keyword: payload,
      });
      yield put(action({ ...res, payload }));
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getList, { keyword: payload });
      // const res = yield call(userServices.getSearchList, payload);
      yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      // const res = yield call(teamServices.getList, { name: payload });
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *dispatchOrderAsync({ payload, action, type }, { call, put }) {
      console.log(' dispatchOrderAsync ： ', payload, type); //
      const res = yield call(services.dispatchOrder, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *addTicketAsync({ payload, action, type }, { call, put }) {
      console.log(' addTicketAsync ： ', payload, type); //
      // if (typeof res.file !== 'string') {
      //   console.log(' filefile ： ', res.file); //
      //   if (res.file && res.file.fileList.length > 0) {
      //     const fileList = res.file.fileList;
      //     res.file = fileList[fileList.length - 1].response.url;
      //   // } else {
      //   //   tips('logo不能为空！', 2);
      //   //   return;
      //   // }
      // }

      const params = {
        type: 1,
        code: '888',
        station_id: 79558,
        person_liable: 1,
        team_id: 72,
        addr: 'addr',
        job_content: 'job_content',
        plan_start_time: '2020-01-22 00:00:00',
        plan_end_time: '2020-02-22 00:00:00',
        supplement: 'supplement',
        file: null,
        person_num: 66,
        person_name: 'person_name',

        delay: '2020-01-22 00:00:00',

        finish_time: '2020-12-22 00:00:00',
        matter1: 'matter1',
        matter2: 'matter2',
        safety_measure: 'safety_measure',
        other: 'other',
        confirm: 'confirm',
        checkTime: 'checkTime',
        checkPointTo: 'checkPointTo',
        check: 'check',

        the_end1: 1,
        the_end2: 1,
        the_end3: 1,
        the_end4: 1,
        the_end5: '已全部拆除或',
        matter1: 1,
        matter2: 1,
        safety_measure: 1,
        other: 1,
        confirm: 1,
        wt_person_changes1: [
          {
            person: 1,
            type: 1,
            time: '2020-11-11 00:00:00',
            licensor: 1,
          },
        ],
        wt_person_changes0: [
          {
            person: 11,
            type: 0,
            time: '2020-01-01 00:00:00',
            licensor: 11,
          },
        ],

        equipment_operate1: 1,
        equipment_operate2: 1,
        checkTime: '2020-02-02 00:00:00',
        checkPointTo: 1,
        checkMan: 1,

        trigger: [
          {
            type: 'switch',
            content: 'content',
            done: 1,
            supplement_content: 'supplement_content',
            supplement_done: 1,
          },
        ],
        ground_wire: [
          {
            type: 'ground_wire',
            content: 'content',
            done: 1,
            supplement_content: 'supplement_content',
            supplement_done: 1,
          },
        ],
        warning_sign: [
          {
            type: 'warning_sign',
            content: 'content',
            done: 1,
            supplement_content: 'supplement_content',
            supplement_done: 1,
          },
        ],

        wt_contact: [
          {
            time: '2020-03-02 00:00:00',
            content: 'content',
            contact_person: 1,
            licensor: 1,
          },
        ],
        wt_person_changes1: [
          {
            type: 1,
            person: 1,
            time: '2020-04-02 00:00:00',
            licensor: 1,
          },
        ],
        wt_person_changes0: [
          {
            type: 0,
            person: 1,
            time: '2020-05-02 00:00:00',
            licensor: 1,
          },
        ],
        wt_work_record: [
          {
            finish_time: '2020-05-02 00:00:00',
            person_liable: 1,
            licensor: 1,
            start_time: '2020-06-02 00:00:00',
          },
        ],
        wt_child_ticket: [
          {
            code: 1,
            team_id: 72,
            person_liable: 1,
            permit_time: '2020-07-02 00:00:00',
            finish_time: '2020-08-02 00:00:00',
          },
        ],
      };

      const {
        equipment_operate1,
        equipment_operate2,
        matter1,
        matter2,
        safety_measure,
        other,
        confirm,

        trigger,
        ground_wire,
        warning_sign,

        wt_contact,
        wt_work_record,
        wt_child_ticket,

        wt_person_changes1,
        wt_person_changes0,

        the_end1,
        the_end2,
        the_end3,
        the_end4,
        the_end5,
        checkTime,
        checkPointTo,
        checkMan,
      } = params;

      const remarks = {
        equipment_operate: [equipment_operate1, equipment_operate2],
        matter: [matter1, matter2],
        safety_measure,
        other,
        confirm,
      };

      const params2 = {
        ...params,
        protective_measure: [...trigger, ...ground_wire, ...warning_sign],
        wt_contact,
        wt_person_changes: [...wt_person_changes1, ...wt_person_changes0],
        wt_work_record,
        wt_child_ticket,
        the_end: [the_end1, the_end2, the_end3, the_end4, the_end5],
        remarks: remarks,
        check: [checkTime, checkPointTo, checkMan],
        // work_date: payload.work_date.format('YYYY-MM-DD'),
      };
      console.log(' params2 ： ', params, params2); //

      // return
      const res = yield call(services.addTicket, {
        d_id: 1,
        order_id: 1,
        customer_id: 5996,

        ...params2,
      });
      // yield put(action({ ...res, payload }));
      // yield put({ type: 'getListAsync' });
    },
  },
};
