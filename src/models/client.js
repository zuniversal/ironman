/* 
  在原操作方法基础上  可选择性使用 创建相关 actions方法 简化方法的调用  

*/

import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/client';
import * as userServices from '@/services/user';
import { formatSelectList, filterObjSame } from '@/utils';
import { customerTypeMap } from '@/configs';

const namespace = 'client';
const { createActions } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'getPortraitAsync',
  'getUserAsync',
  'addUserAsync',
  'removeUserAsync',
  'exportDataAsync',
  'getDistrictAsync',

  'addTableItemAsync',
  'editTableItemAsync',
  'removeTableItemAsync',
];
const batchTurnActions = ['onAdminChange', 'modifyTableItem'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};
export const mapStateToProps = state => state[namespace];

const initItem = {
  key: Math.random(),
  nickname: '',
  username: '',
  password: '',
  phone: '',
  isEdit: true,
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

    syncOAData: [],
    portraitData: {},
    userList: [
      // { label: 'zyb', value: 'value1' },
      // { label: 'zyb1', value: 'value2' },
    ],
    adminList: [],
    // adminList: [{}],
    districtList: [],
    provinceList: [],
    citytList: [],
    countryList: [],

    tableData: [initItem],
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
        customer_admin: [],
        tableData: [],
      };
    },
    getList(state, { payload, type }) {
      console.log(' getList 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: payload.list.map(v => ({
          ...v,
          admin: v.customer_admin.map(v => v.nickname),
          // type: customerTypeMap[v.type],
          type: v.type.map(v => customerTypeMap[v]),
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItem 修改  ： ', state, payload, type); //
      const {
        customer_admin,
        service_staff,
        last_service_staff,
        electricityuser,
        file,
      } = payload.bean; //
      const { userList, adminList } = state;
      const serviceStaff = {
        ...service_staff,
        value: `${service_staff?.id}`,
        label: service_staff?.nickname,
      };
      const lastServiceStaff = {
        ...last_service_staff,
        value: `${last_service_staff?.id}`,
        label: last_service_staff?.nickname,
      };
      console.log(
        ' serviceStaff, lastServiceStaff ： ',
        serviceStaff,
        lastServiceStaff,
      ); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          customer_admin:
            customer_admin && customer_admin.length > 0 ? customer_admin : [{}],
          d_id: payload.payload.d_id,
          service_staff: `${service_staff?.id}`,
          last_service_staff: `${last_service_staff?.id}`,
          electricityuser: electricityuser.map(v => v.number).join(','),
          file: file ? file.split(',') : [],
          // service_staff: 'zybxxx',
        },
        // adminList: [payload.bean.customer_admin],
        adminList: payload.bean.customer_admin,
        tableData: payload.bean.customer_admin.map(v => ({
          ...v,
          // acount:
          key: Math.random(),
          password: '',
          isEdit: false,
        })),
        // adminList: [...adminList, payload.bean.customer_admin],
        // userList: [serviceStaff, lastServiceStaff, ...userList],
        userList: filterObjSame([...userList, serviceStaff, lastServiceStaff]),
      };
    },
    addItem(state, { payload, type }) {
      console.log(' addItem 修改  ： ', state, payload, type); //
      return {
        ...state,
        isShowModal: false,
        count: state.count + 1,
        dataList: [payload.bean, ...state.dataList],
      };
    },
    editItem(state, { payload, type }) {
      const dataList = state.dataList.map(v =>
        v.id === state.d_id ? { ...v, ...payload.bean } : v,
      );
      console.log(' editItem 修改  ： ', state, payload, type, dataList); //
      return {
        ...state,
        isShowModal: false,
        dataList: dataList,
        d_id: '',
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    // removeItem(state, { payload, type }) {
    //   console.log(' removeItem 修改  ： ', state, payload, type); //
    //   const removeList = payload.payload;
    //   console.log(
    //     ' removeList  payload.payload.filter v ： ',
    //     state,
    //     payload,
    //     removeList,
    //   );
    //   return {
    //     ...state,
    //     // dataList: state.dataList.filter((v) => v.id !== payload.payload.d_id)
    //     dataList: state.dataList.filter(v =>
    //       removeList.every(item => v.id !== item),
    //     ),
    //   };
    // },
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

    syncOA(state, { payload, type }) {
      // console.log(' syncOA 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        // portraitData: payload.,
      };
    },
    getPortrait(state, { payload, type }) {
      // console.log(' getPortrait 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        // portraitData: payload.,
      };
    },
    getUser(state, { payload, type }) {
      return {
        ...state,
        userList: formatSelectList(payload.list, 'nickname'),
      };
    },
    onAdminChange(state, { payload, type }) {
      console.log(' onAdminChange ： ', payload); //
      return {
        ...state,
        // adminList: [...state.adminList, ...payload.list, ],
        // adminList: payload.list,
        // adminList: [...state.adminList, ...payload.list, ],
      };
    },
    addUser(state, { payload, type }) {
      console.log(' addUseraddUser ： ', payload); //
      return {
        ...state,
        // // adminList: [...state.adminList, ...payload.list],
        // adminList: payload.list,
        adminList: [...state.adminList, ...payload.bean],
        // adminList: payload.bean,
      };
    },
    removeUser(state, { payload, type }) {
      console.log(' removeUseraddUser ： ', payload); //
      return {
        ...state,
        adminList: payload.list,
      };
    },
    getDistrict(state, { payload, type }) {
      let datas = [];
      const data = payload.list.map(v => ({
        label: v,
        value: v,
      }));
      if (Object.keys(payload.payload).length === 0) {
        datas = {
          provinceList: data,
        };
      }
      if (payload.payload.province) {
        datas = {
          citytList: data,
        };
      }
      if (payload.payload.city) {
        datas = {
          countryList: data,
        };
      }
      console.log(' getDistrict ： ', state, payload, datas); //

      return {
        ...state,
        ...datas,
      };
    },
    getProvnice(state, { payload, type }) {
      return {
        ...state,
        provinceList: payload.list.map(v => ({
          label: v,
          value: v,
        })),
      };
    },
    getCity(state, { payload, type }) {
      return {
        ...state,
        citytList: payload.list.map(v => ({
          label: v,
          value: v,
        })),
      };
    },

    addTableItem(state, { payload, type }) {
      const { tableData } = state;
      console.log(' addTableItem ： ', state, payload, tableData); //
      return {
        ...state,
        // tableData: payload.list.map(v => ({ ...v, key: Math.random(), isEdit: false, })),
        tableData: tableData.map((v, i) => {
          console.log(
            ' v.key === payload.payload.key ： ',
            v.key === payload.payload.key,
          ); //
          return v.key === payload.payload.key
            ? {
                ...v,
                // ...payload.list[0],
                ...payload.bean,
                isEdit: false,
              }
            : v;
        }),
      };
    },
    editTableItem(state, { payload, type }) {
      const { tableData } = state;
      console.log(' editTableItem ： ', state, payload, tableData); //
      return {
        ...state,
        tableData: tableData.map((v, i) => {
          console.log(
            ' v.key === payload.payload.key ： ',
            v.key === payload.payload.key,
          ); //
          return v.key === payload.payload.key
            ? {
                ...v,
                ...payload.bean,
                isEdit: false,
              }
            : v;
        }),
      };
    },
    removeTableItem(state, { payload, type }) {
      console.log(' removeTableItem ： ', state, payload); //
      const { tableData } = state;
      const { action, key, index, value } = payload.payload;
      let newData = [];
      // if (action === 'localRemove') {
      //   newData = tableData.filter((v, i) => v.key != key);
      // } else {
      //   newData = payload.list.filter(v => v.id != payload.payload.id);
      // }
      newData = tableData.filter(v => {
        console.log(
          ' v.id != payload.id ： ',
          v.id != payload.payload.id,
          v.id,
          payload.id,
        ); //
        return v.id != payload.payload.id;
      });
      console.log(' newData ： ', newData); //
      return {
        ...state,
        tableData: newData,
      };
    },
    modifyTableItem(state, { payload, type }) {
      console.log(' modifyTableItem ： ', state, payload); //
      const { tableData } = state;
      const { action, keys, key, index, value } = payload;
      let newData = [];
      if (action === 'add') {
        newData = [
          {
            ...initItem,
            key: Math.random(),
          },
          ...tableData,
        ];
      } else if (action === 'edit') {
        newData = tableData.map((v, i) => ({
          // ...(i === index
          ...(v.key === payload.key
            ? {
                ...v,
                [keys]: value,
                isEdit: true,
              }
            : v),
        }));
      } else if (action === 'remove') {
        newData = tableData.filter((v, i) => v.key != key);
      }

      console.log(' modifyTableItem 修改  ： ', state, payload, type, newData); //
      return {
        ...state,
        tableData: newData,
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
      console.log(' getItemAsync ： ', payload, type); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' addItemAsync ： ', payload, type,     )//
      const params = {
        ...payload,
        // customer_admin: [
        //   {
        //     id: 1,
        //   },
        // ],
      };
      console.log(' params ： ', params); //
      const res = yield call(services.addItem, params);
      // const res = yield call(services.addItem, payload);
      console.log('  addItem res ：', res); //
      // yield put(action(res));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put, select }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const { itemDetail } = yield select(state => state[namespace]);
      const params = {
        ...itemDetail,
        ...payload,
        // region: 'xxx',
        // customer_admin: [
        //   {
        //     id: 1,
        //   },
        // ],
      };
      console.log(' params ： ', params); //
      const res = yield call(services.editItem, params);
      console.log('  editItem res ：', res, itemDetail); //
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
      const res = yield call(services.removeItem, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },

    *syncOAAsync({ payload, action, type }, { call, put }) {
      // console.log(' syncOAAsync ： ', payload, type,     )//
      const res = yield call(services.syncOA, payload);
      console.log('  syncOA res ：', res); //
      yield put({
        type: 'getList',
        payload: res,
      });
    },
    *getPortraitAsync({ payload, action, type }, { call, put }) {
      // console.log(' getPortraitAsync ： ', payload, type,     )//
      const res = yield call(services.getPortrait, payload);
      console.log('  getPortrait res ：', res); //
      yield put(action({ ...res, payload }));
    },
    *getUserAsync({ payload, action, type }, { call, put }) {
      const res = yield call(userServices.getSearchList, {
        service_staff: 1,
        ...payload,
      });
      yield put(action({ ...res, payload }));
    },
    *addUserAsync({ payload, action, type }, { call, put }) {
      console.log(' addUserAsync ： ', payload, type); //
      // const res = yield call(services.addAdmin, payload);
      const params = {
        ...payload,
        // tag_ids: [],
        // role_ids: [],
        // organization_ids: [],
        customer: true,
        customer_id: null,
        account: {
          password: payload.password ? payload.password : null,
          // 认证状态 默认值 1
          certification_status: 1,
          // 默认 - 管理者
          // account_type: 'manager',
          account_type: 'customer',
        },
      };
      const res = yield call(services.addAdmin, params);
      console.log('  addUserAsync res ：', res); //
      yield put(action(res));
    },
    *removeUserAsync({ payload, action, type }, { call, put }) {
      // console.log(' removeUserAsync ： ', payload, type,     )//
      const res = yield call(services.removeAdmin, payload);
      console.log('  removeUserAsync res ：', res); //
      yield put(action(res));
    },
    *getDistrictAsync({ payload, action, type }, { call, put }) {
      console.log(' getDistrictAsync ： ', payload, type); //
      const res = yield call(services.getDistrict, payload);
      console.log('  getDistrictAsync res ：', res); //
      yield put(action({ ...res, payload }));
      // yield put({ type: 'getListAsync' });
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },

    *addTableItemAsync({ payload, action, type }, { call, put, select }) {
      console.log(' addTableItemAsync ： ', payload);
      const { itemDetail } = yield select(state => state[namespace]);
      // const res = yield call(services.addAdmin, {
      //   customer_admin_list: [payload],
      // });
      const params = {
        ...payload,
        customer: true,
        customer_id: itemDetail.id ? itemDetail.id : null,
        account: {
          password: payload.password ? payload.password : null,
          // 认证状态 默认值 1
          certification_status: 1,
          // 默认 - 管理者
          // account_type: 'manager',
          account_type: 'customer',
          username: payload.username,
        },
      };
      const res = yield call(services.addAdmin, params);
      yield put(action({ ...res, payload }));
    },
    *editTableItemAsync({ payload, action, type }, { call, put, select }) {
      const { itemDetail } = yield select(state => state[namespace]);
      console.log(' editTableItemAsync ： ', payload, itemDetail);
      const { account, ...rest } = payload;

      // const res = yield call(services.editAdmin, rest);
      // 不要携带 account 属性对象
      const res = yield call(services.editAdmin, {
        // ...rest,
        ...payload,
        customer_id: itemDetail.id ? itemDetail.id : null,
        email: null,
        account: {
          password: payload.password ? payload.password : null,
          // 认证状态 默认值 1
          certification_status: 1,
          // 默认 - 管理者
          // account_type: 'manager',
          account_type: 'customer',
          username: payload.username,
        },
      });
      yield put(action({ ...res, payload }));
    },
    *removeTableItemAsync({ payload, action, type }, { call, put, select }) {
      const { itemDetail } = yield select(state => state[namespace]);
      console.log(' removeTableItemAsync ： ', payload);
      if (payload.action === 'remove') {
        // const res = yield call(services.removeAdmin, payload);
        const res = yield call(services.removeAdmin, {
          d_id: payload.id,
          id: `${payload.id}`,
          customer_id: itemDetail.id ? itemDetail.id : null,
        });
      }
      yield put(action({ payload }));
    },
  },
};
