import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/role';
import * as permissionServices from '@/services/permission';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'role';
const { createActions } = init(namespace);

const otherActions = ['getPermissionAsync'];

const batchTurnActions = ['onPermsCheck'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const otherRoutes = [
  {
    authKey: 'screen',
    name: '大屏',
    routes: [
      {
        authKey: 'screenDashboard',
        name: '大屏面板',
        routes: [],
      },
    ],
  },
];

const formatPerms = (data = []) => {
  // console.log(' formatPerms   data,   ： ', data  )
  const init = [];
  // const init = {}
  // data.forEach((v) => {
  //   console.log(' v ： ', v,  )//
  // })
  // data.forEach((v) => init[v[2]] = v[1])
  data.forEach(v =>
    init.push({
      key: v[2],
      value: v[2],
      title: v[1],
      label: v[1],
    }),
  );
  const [item1, ...rest] = init;
  // console.log(' initinitinitinit ： ', init, rest); //
  return init;
  return rest;
};

export const flatData = (data = {}, init = {}) => {
  // console.log(' flatData  permission  ,   ： ', data, init);
  Object.keys(data).forEach((key, i) => {
    // init[data[key].perms[2]] = data[key].perms[1]
    // init[key] = formatPerms(data[key].perms)
    init[key] = formatPerms(data[key].perms);
    if (Object.keys(data[key].sub).length > 0) {
      flatData(data[key].sub, init);
    }
  });
  console.log(' init ： ', init); //
  return init;
};

// export const recursiveHandle = (data = [], perms = {}) => {
//   // console.log(' recursiveHandle   ,   ： ', data, parent_id);
//   return data.map(v => ({
//     ...v,
//     value: v.path,
//     title: v.name,
//     label: v.name,
//     // children: recursiveHandle(v.children, perms[v.authKey]),
//     children: [
//       ...v,
//     ],
//   }));
// };

export const recursiveHandle2 = (data = [], perms = {}, datas = []) => {
  // console.log(' recursiveHandle   ,   ： ', data, parent_id);
  data.forEach(v => {
    // console.log(' recursiveHandle ： ', perms, v, v.authKey, perms[v.authKey]); //
    const value =
      v.authKey && perms[v.authKey] ? perms[v.authKey][0].value : Math.random();
    const item = {
      ...v,
      // value: v.path,
      value: value,
      key: value,
      title: v.name,
      label: v.name,
      // children: [
      //   ...v,
      //   // perms[v.authKey],
      // ],
    };
    if (v.routes.length > 0) {
      recursiveHandle(v.children, perms[v.authKey], datas);
    }
    if (v.authKey && perms[v.authKey]) {
      // console.log(' perms[v.authKey] ： ', perms, v, v.authKey, perms[v.authKey], )//
      // item.children = [
      //   // ...item.children,
      //   perms[v.authKey],
      // ]
      // item.children = perms[v.authKey]
      item.children = v.routes;
    }
    // if (v.authKey && perms[v.authKey] && perms[v.authKey].routes.length > 0) {
    // if (v.authKey && perms[v.authKey] && v.routes.length > 0) {

    datas.push(item);
  });
  console.log('  datas ：', datas);
  return datas;
};

export const recursiveHandle = (data = [], perms = {}, datas = []) => {
  console.log(' recursiveHandle   ,   ： ', data, perms, datas);
  data.forEach(item => {
    // console.log(
    //   ' recursiitemeHandle ： ',
    //   perms,
    //   item,
    //   `22${item.authKey}11`,
    //   perms[item.authKey],
    //   data,
    // ); //
    const value =
      item.authKey && perms[item.authKey]
        ? perms[item.authKey][0].value
        : Math.random();
    item.value = value;
    item.key = value;
    item.title = item.name;
    item.label = item.name;
    if (!item.hideInMenu && item.routes && item.routes.length > 0) {
      // recursiveHandle(item.routes, perms[item.authKey], datas)
      recursiveHandle(item.routes, perms, datas);
    }
    if (!item.hideInMenu && item.authKey && perms[item.authKey]) {
      // console.log(' perms[v.authKey] ： ', perms, v, v.authKey, perms[v.authKey], )//
      // item.children = [
      //   // ...item.children,
      //   perms[v.authKey],
      // ]
      // item.children = perms[v.authKey]
      const [item1, ...rest] = perms[item.authKey];
      let routes = [];
      if (item.haveDetail) {
        routes = item.routes.filter(v => !v.hideInMenu);
      } else {
        routes = item.routes;
      }

      item.children = [
        // ...perms[item.authKey],
        ...rest,
        // .map((v) => ({...v, label: `${v.label}${item.name}`, title: `${v.title}${item.name}`,  })),
        ...routes,
      ];
    }
    // if (v.authKey && perms[v.authKey] && perms[v.authKey].routes.length > 0) {
    // if (v.authKey && perms[v.authKey] && v.routes.length > 0) {
    if (item.hideInMenu) {
    }

    datas.push(item);
  });
  // console.log('  datasdatasdatas ：', data, datas);
  // return data
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
    permission: [],
    permsData: [],
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
        permsData: [],
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      const permsData = payload.bean.perms_codes.filter(
        v => !`${v}`.endsWith('00'),
      );
      console.log('  permsData ：', payload.bean.perms_codes, permsData); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: payload.bean,
        permsData: permsData,
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

    getPermission(state, { payload, type }) {
      console.log(' getPermission ： ', state, payload); //
      // const permsData = flatData(payload.bean.system.sub)
      const permsData = flatData(payload.bean);
      const routeData = payload.payload.filter(v => !v.noAuth);
      const allRouteData = [...routeData, ...otherRoutes];
      const dataArr = [];
      const permission = recursiveHandle(allRouteData, permsData, dataArr);
      console.log(
        '  permissionpermissionpermissionpermission ：',
        payload,
        routeData,
        permission,
        payload.bean,
        permsData,
        dataArr,
        allRouteData,
      ); //
      return {
        ...state,
        permission: [
          {
            id: 'all',
            value: 'all',
            key: 'all',
            title: '全部',
            label: '全部',
            // children: permission,
            // children: routeData,
            children: allRouteData,
          },
        ],
      };
    },
    onPermsCheck(state, { payload, type }) {
      console.log(' onPermsCheck ： ', state, payload); //
      return {
        ...state,
        permsData: payload,
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
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put({ type: 'getListAsync' });
    },

    *getPermissionAsync({ payload, action, type }, { call, put }) {
      console.log(' getPermissionAsync ： ', payload); //
      const res = yield call(permissionServices.getList);
      yield put(action({ ...res, payload }));
    },
  },
  // subscriptions: {
  //   setup(props) {
  //     console.log(' setup ： ', props); //
  //     const { dispatch, history } = props; //
  //     history.listen(location => {
  //       console.log(' 匹配 ： ', location); //
  //     }); //
  //     return location => console.log(' unlistenFunction匹配 ： ', location); //
  //   },
  // },
};
