import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsArrange';
import * as teamServices from '@/services/shiftsManage';
import moment from 'moment'; //
import { filterArr, getMonthWeekDaysSimple, tips, formatSelectList } from '@/utils';

const namespace = 'shiftsArrange';
const { createAction, createCRUD } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'getPortraitAsync',
  'getTeamAsync',
  'exportDataAsync',
];

export const actions = {
  ...createCRUD(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const formartDataList = (data, { id, teamList }) => {
  // const label = teamList.find(v => v.value == id).label;
  const label = 'label'
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
  console.log(' formatSearch ： ', data,    )// 
  return {
    ...data,
    page_size: 40,
    // title: data.team,
    schedule_date: data.schedule_date
      ? data.schedule_date.format('YYYY-MM')
      : '2020-10',
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
      team: 1,  
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
        // searchInfo: payload.payload,
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
      return {
        ...state,
        // teamList: formatTeamList(payload.list),
        userList: formatSelectList(payload.list, 'name', ),
      };
    },
    onChoiceRadio(state, { payload, type }) {
      console.log(' onChoiceRadio ： ', state, payload,   )// 
      const { dayList } = state; //
      return {
        ...state,
        isQuickArrange: !state.isQuickArrange,
        dayList: filterArr([...dayList, ...payload.target.value ? getMonthWeekDaysSimple : []]),
      }
    },
    onSelectChange(state, { payload, type }) {
      console.log(' onSelectChange ： ', state, payload,   )// 
      const { checked, day } = payload.target;
      const { dayList } = state; //
      const datas = checked
        ? [...dayList, day]
        : dayList.filter(v => v != day);
      console.log('  datas ：', datas); //
      return {
        ...state,
        dayList: datas,
      };
    },
    setState(state, { payload, type }) {
      console.log(' setState ： ', payload,   )// 
      return {
        ...state,
        ...payload,
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
    *addItemAsync({ payload, action, type }, { call, put, select, }) {
      const { dayList, searchInfo,  } = yield select(state => state[namespace]);
      if (dayList.length < 1) {
        tips('至少需要一条排班记录！', 2)
        return  
      } 
      const formatArrangeData = data => {
        console.log(' formatArrangeData,  , ： ', data, );
        return dayList.map(v => ({
          team: searchInfo.team,
          schedule_date: `${searchInfo.schedule_date.format('YYYY-MM')}-${v}`,
        }));
      };
      const params = formatArrangeData()
      console.log('  params ：', params,  )// 
      const res = yield call(services.addItem, {teamschedule_list: params, });
      yield put(action(res));
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
      // console.log(' exportDataAsync ： ', payload, type,     )//
      const res = yield call(services.exportData, payload);
      console.log('  exportDataAsync res ：', res); //
      // yield put(action({ ...res, payload }));
    },
    *getTeamAsync({ payload, action, type }, { call, put }) {
      console.log(' getTeamAsync ： ', payload); //
      const res = yield call(teamServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
  },
};
