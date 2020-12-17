import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsArrange';
import * as teamServices from '@/services/shiftsManage';
import moment from 'moment'; //
import { history } from 'umi';
import { SHIFTSARRANGE } from '@/constants';
import {
  filterArr,
  getMonthWeekDaysSimple,
  tips,
  formatSelectList,
  nowYearMonth,
} from '@/utils';

const namespace = 'shiftsArrange';
const { createAction, createCRUD, batchTurn } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'getTeamAsync',
  'exportDataAsync',
  'setSearchAsync',
];

const batchTurnActions = ['setSearchInfo', 'onChoiceRadio', 'onCheck'];

export const actions = {
  ...createCRUD(otherActions),
  ...batchTurn(batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const formartDataList = (data, { id, teamList }) => {
  // const label = teamList.find(v => v.value == id).label;
  const label = 'label';
  console.log(' label ： ,', data, label, id, teamList); //
  return data.map(v => ({
    ...v,
    title: v.team,
    start: v.schedule_date,
    days: `${Number(v.schedule_date.split('-')[2])}`,
    // start: '2020-10-10',
  }));
};

const formatTeamList = data => {
  const res = data.map(v => ({
    ...v,
    label: v.name,
    value: v.id,
  }));
  console.log(' formatTeamList res ： ', res); //
  return res;
};

const formatSearch = data => {
  console.log(' formatSearch ： ', data); //
  return {
    ...data,
    page_size: 40,
    // title: data.team,
    schedule_date: data.schedule_date
      ? data.schedule_date.format('YYYY-MM')
      : nowYearMonth,
  };
};

export default {
  namespace,

  state: {
    dataList: [],
    itemDetail: {},

    syncOAData: {},
    portraitData: {},
    userList: [
      // { label: 'zyb', value: 'zyb1' },
      // { label: 'zyb1', value: 'zyb11' },
    ],
    searchInfo: {
      // team: 1,
      schedule_date: moment(),
    },
    teamList: [
      // { label: 'xxx', value: '1' },
      // { label: 'yyy', value: '2' },
    ],
    isQuickArrange: false,
    dayList: [],
  },

  reducers: {
    getList(state, { payload, type }) {
      console.log(' formartDataList(payload) ： ', payload, state); //
      const dataList = formartDataList(payload.list, {
        // id: payload.payload.team,
        id: state.team,
        teamList: state.teamList,
      });
      return {
        ...state,
        searchInfo: payload.payload,
        dataList,
        dayList: dataList.map(v => v.days),
      };
    },
    getItem(state, { payload, type }) {
      return {
        ...state,
        itemDetail: payload.list,
      };
    },
    addItem(state, { payload, type }) {
      const dataList = formartDataList(payload.list, {
        // id: payload.payload.team,
        id: state.team,
        teamList: state.teamList,
      });
      return {
        ...state,
        // dataList: [payload.bean, ...state.dataList],
        dataList,
      };
    },
    editItem(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    removeItem(state, { payload, type }) {
      const removeList = payload.payload.filter(v => v.id);
      return {
        ...state,
        // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
        dataList: state.dataList.filter(v =>
          removeList.some(item => v.id === item),
        ),
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        // ...payload,
        userList: [...payload.list],
      };
    },
    getTeam(state, { payload, type }) {
      console.log(' getTeamgetTeam ： ', payload, state); //
      const { searchInfo } = state; //
      const teamList = payload.list;
      if (searchInfo.team) {
        teamList.push({ id: searchInfo.team, name: searchInfo.teamName });
        console.log('  getTeamgetTeam teamList ：', teamList);
      }
      return {
        ...state,
        // teamList: formatTeamList(payload.list),
        teamList: formatSelectList(teamList, 'name'),
      };
    },
    onChoiceRadio(state, { payload, type }) {
      console.log(' onChoiceRadio ： ', state, payload); //
      const { dayList } = state; //
      return {
        ...state,
        isQuickArrange: !state.isQuickArrange,
        dayList: filterArr([
          ...dayList,
          ...(payload.target.value ? getMonthWeekDaysSimple : []),
        ]),
      };
    },
    onCheck(state, { payload, type }) {
      console.log(' onCheck ： ', state, payload); //
      const { checked, day } = payload.target;
      const { dayList } = state; //
      const datas = checked ? [...dayList, day] : dayList.filter(v => v != day);
      console.log('  datas ：', datas); //
      return {
        ...state,
        dayList: datas,
      };
    },
    setSearchInfo(state, { payload, type }) {
      console.log(' setSearchInfo ： ', state, payload); //
      return {
        ...state,
        searchInfo: {
          ...state.searchInfo,
          ...payload,
          // schedule_date: payload.schedule_date
          //   ? payload.schedule_date.format('YYYY-MM')
          //   : nowYearMonth,
        },
      };
    },
    setSearch(state, { payload, type }) {
      console.log(' setSearch ： ', payload); //
      const dataList = formartDataList(payload.list, {
        id: state.team,
        teamList: state.teamList,
      });
      return {
        ...state,
        dataList,
        dayList: dataList.map(v => v.days),
        searchInfo: {
          ...state.searchInfo,
          ...payload.searchInfo,
        },
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsyncgetListAsync ： ', payload); //
      const res = yield call(services.getList, formatSearch(payload));
      yield put(action({ ...res, payload }));
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action(res));
    },
    *addItemAsync({ payload, action, type }, { call, put, select }) {
      const { dayList, searchInfo } = yield select(state => state[namespace]);
      if (dayList.length < 1) {
        tips('至少需要一条排班记录！', 2);
        return;
      }
      if (!searchInfo.team || !searchInfo.schedule_date) {
        tips('排班班组、日期不能为空！', 2);
        return;
      }
      const formatArrangeData = data => {
        console.log(' formatArrangeData,  , ： ', data, searchInfo);
        return dayList.map(v => ({
          team: searchInfo.team,
          schedule_date: `${searchInfo.schedule_date.format('YYYY-MM')}-${v}`,
        }));
      };
      const params = formatArrangeData();
      console.log('  params ：', params); //
      const res = yield call(services.addItem, { teamschedule_list: params });
      yield put(action(res));
      history.push(SHIFTSARRANGE);
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
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
    *getTeamAsync({ payload, action, type }, { call, put }) {
      console.log(' getTeamAsync ： ', payload); //
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    // *setSearchAsync({ payload, type }, { call, put }) {
    //   console.log(' setSearchAsync ： ', payload); //
    //   const res = yield call(services.getList, formatSearch(payload));
    //   yield put(action({ ...res, payload }));
    //   // yield put(({
    //   //   type: 'setSearch',
    //   //   payload: {...res, payload},
    //   // }));
    // },
    *setSearchAsync({ payload, type }, { call, put }) {
      console.log(' setSearchAsync ： ', payload); //
      const res = yield call(services.getList, formatSearch(payload));
      yield put({
        type: 'setSearchInfo',
        payload,
      });
      yield put({
        type: 'getList',
        payload: { ...res, payload },
      });
    },
  },
};
