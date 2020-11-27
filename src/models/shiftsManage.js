import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/shiftsManage';
import * as userServices from '@/services/user';
import { formatSelectList, filterObjSame } from '@/utils';

const namespace = 'shiftsManage';
const { createActions } = init(namespace);

const otherActions = ['getUserAsync', 'uploadFileAsync', 'exportDataAsync'];

export const actions = {
  ...createActions(otherActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const formatUserList = data => {
  const res = data.map(v => ({
    ...v,
    label: v.nickname,
    value: v.id,
  }));
  console.log(' formatUserList res ： ', res); //
  return res;
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
    userList: [
      // { label: 'zyb', value: 'value1' },
      // { label: 'zyb1', value: 'value2' },
    ],
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
      console.log(' getListgetList ： ', payload); //
      return {
        ...state,
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload }) {
      console.log(' getItem ： ', payload); //
      const { team_headman, leader = {}, type, member } = payload.bean; //
      const { userList } = state;
      const teamHeadmanItem = {
        ...team_headman,
        value: `${team_headman.id}`,
        label: team_headman.nickname,
      };
      const leaderItem = {
        ...leader,
        value: `${leader.id}`,
        label: leader.nickname,
      };
      const typeItem = {
        ...type,
        value: `${type.id}`,
        label: type.nickname,
      };
      const memberList = member.map(v => ({
        ...v,
        value: `${v.id}`,
        label: v.name,
      }));
      const memberIdList = member.map(v => `${v.id}`);
      console.log(
        ' member  member.map vmemberIdListnick ： ',
        member,
        teamHeadmanItem,
        type,
      ); //
      const res = userList.some(v => v.id == memberList.value);
      console.log('  resresres ：', res, userList, memberList); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          d_id: payload.payload.d_id,
          team_headman: `${team_headman.id}`,
          leader: `${leader.id}`,
          type: `${type.id}`,
          member: memberIdList.length > 0 ? memberIdList : [''],
        },
        userList: filterObjSame([
          ...userList,
          teamHeadmanItem,
          leaderItem,
          ...memberList,
        ]),
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
        dataList: state.dataList.map(v => ({
          ...(v.id == payload.payload.d_id ? { ...v, ...payload.bean } : v),
        })),
        isShowModal: false,
      };
    },
    removeItem(state, { payload, type }) {
      console.log(' removeItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: state.dataList.filter(v => v.id != payload.payload.d_id),
      };
    },
    removeItems(state, { payload, type }) {
      console.log(' removeItems 修改  ： ', state, payload, type); //
      const removeList = payload.payload.id.split(',');
      console.log(' removeList ： ', removeList); //
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          removeList.every(item => v.id != item),
        ),
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        // userList: formatUserList(payload.list),
        userList: formatSelectList(payload.list, 'nickname'),
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
      console.log(' getItemAsync  payload ： ', payload); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      console.log(' addItemAsync  payload ： ', payload); //
      const res = yield call(services.addItem, payload);
      // yield put(action(res));
      yield put({ type: 'getListAsync' });
      // yield put(action());
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      console.log(' editItemAsync  payload ： ', payload); //
      const res = yield call(services.editItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
      // yield put(action());
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync  payload ： ', payload); //
      const res = yield call(services.removeItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
      // yield put(action());
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
      // yield put(action());
    },

    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
