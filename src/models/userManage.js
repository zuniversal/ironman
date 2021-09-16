import { init, action } from '@/utils/createAction';
import * as services from '@/services/userManage';
import * as organizeServices from '@/services/organize';
import * as roleServices from '@/services/role';
import * as tagsServices from '@/services/tags';
import { recursiveHandle } from '@/models/organize';
import { formatSelectList, nowYearMonth } from '@/utils';
import moment from 'moment';

const namespace = 'userManage';
const { createActions, createAction } = init(namespace);

const otherActions = [
  'getAllAsync',
  'getOrganizeAsync',
  'getRoleAsync',
  'getTagsAsync',
  'getSearchListAsync',
];

const batchTurnActions = [];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const model = {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},

    d_id: '',
    searchInfo: {},
    organizeList: [],
    roleList: [],
    tagsList: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      let itemDetail = {}
      if (payload.action === 'changePasswordAsync') {
        itemDetail = payload.record;
      }
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        itemDetail,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
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
          // role: v.roles.map(v => v.name),
          role: v.role.map(v => v.name),
          tag: v.tags.map(v => v.name),
          // organization: v.organizations.map(v => v.name),
          organization: v.organization.map(v => v.name),
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      const { roles, tags, account, role, join_date, } = payload.bean;
      console.log(' getItemgetItem ： ', payload, account);
      // const role_ids = roles[0]?.role_id ? `${roles[0]?.role_id}` : null;
      const role_ids = role[0]?.role_id ? `${role[0]?.role_id}` : null;
      const tag_ids = tags[0]?.tag_id ? `${tags[0]?.tag_id}` : null;
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          // role_ids: payload.bean.roles.map(v => `${v.role_id}`),
          // tag_ids: payload.bean.tags.map(v => `${v.tag_id}`),
          // role_ids: `${payload.bean.roles[0]?.role_id}`,
          // tag_ids: `${payload.bean.tags[0]?.tag_id}`,
          // username: account.username,
          role_ids,
          tag_ids,
          // organization_ids: payload.bean.organizations.map(
          //   v => v.organization_id,
          // ),
          organization_ids: payload.bean.organization.map(
            v => v.organization_id,
          ),
          join_date: join_date ? moment(join_date) : null,
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

    getOrganize(state, { payload, type }) {
      console.log(' getOrganize ： ', state, payload);
      const organizeList = recursiveHandle(payload.list);
      return {
        ...state,
        organizeList,
      };
    },

    getRole(state, { payload, type }) {
      return {
        ...state,
        roleList: formatSelectList(payload.list, 'name'),
      };
    },
    getTags(state, { payload, type }) {
      return {
        ...state,
        tagsList: formatSelectList(payload.list, 'name'),
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
      );
      const res = yield call(services.getList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      console.log(' getItemAsync ： ', payload);
      const res = yield call(services.getItem, payload);
      // const res = yield call(services.getItem, {
      //   user_id: payload.d_id,
      // });
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      console.log(' addItemAsync ： ', payload);
      const params = {
        ...payload,
        account: {
          password: payload.password,
          // 认证状态 默认值 1
          certification_status: 1,
          // 默认 - 管理者
          account_type: 'manager',
          username: payload.username,
        },
      };
      console.log(' params ： ', params);
      // return
      const res = yield call(services.addItem, params);
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const params = {
        ...payload,
        account: {
          password: payload.password ? payload.password : null,
          // 认证状态 默认值 1
          certification_status: 1,
          // 默认 - 管理者
          account_type: 'manager',
          username: payload.username,
        },
      };
      console.log(' params ： ', params);
      const res = yield call(services.editItem, params);
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put({ type: 'getListAsync' });
    },

    *getAllAsync({ payload, action, type }, all) {
      // const { searchInfo } = yield select(state => state[namespace]);
      // const params = {
      //   ...searchInfo,
      //   ...payload,
      // };
      console.log(
        ' getAllAsync  payload ： ',
        // payload,
        // searchInfo,
        // action,
        // params,
        all,
      );
      // const res = yield call(services.getList, params);
      // yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getSearchListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        ...payload,
      };
      console.log(
        ' getSearchListAsync  payload ： ',
        payload,
        searchInfo,
        action,
        params,
      );
      const res = yield call(services.getSearchList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getOrganizeAsync({ payload, action, type }, { call, put }) {
      console.log(' getOrganizeAsync ： ', payload);
      const res = yield call(organizeServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getRoleAsync({ payload, action, type }, { call, put }) {
      console.log(' getRoleAsync ： ', payload);
      const res = yield call(roleServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getTagsAsync({ payload, action, type }, { call, put }) {
      console.log(' getTagsAsync ： ', payload);
      const res = yield call(tagsServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *changePasswordAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.changePassword, payload);
      yield put({ type: 'changePassword', payload: { ...res, payload } });
    },
  },
};

export const actions = createAction(model);

export default model;
