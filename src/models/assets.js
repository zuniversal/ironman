import { init, action } from '@/utils/createAction';
import * as services from '@/services/assets';
import * as powerStationServices from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import * as clientServices from '@/services/client';
import * as assetsServices from '@/services/assets';
import { formatSelectList, filterObjSame } from '@/utils';
import moment from 'moment';

const namespace = 'assets';
const { createActions } = init(namespace);

const otherActions = [
  'uploadFileAsync',
  'exportDataAsync',
  'getTemplatAsync',
  'getPowerAsync',
  'getHouseNoAsync',
  'getClientAsync',
  'getClientRelativedAsync',
  'getAssetListAsync',
  'getAssetDetailAsync',
];

const batchTurnActions = [
  'editItems',
  'addTreeNode',
  'editTreeNode',
  'onInputChange',
  'addTreeStruct',
  'changeAction',
  'getListFilter',
];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const formatParams = data => {
  const params = {
    ...data,
    production_date: data.production_date.format('YYYY-MM-DD'),
    operation_date: data.operation_date.format('YYYY-MM-DD'),
  };
  console.log(' formatParams params ： ', params);
  return params;
};

export const newTreeNode = {
  isNew: true,
  isEdit: false,
  title: '资产名',
  children: [],
};

export const recursiveResetAssets = (data = [], { indexes, pid } = {}) => {
  // console.log('treeDatas  recursiveResetAssets   ,   ： ', data, indexes, pid);
  // return data.map((v, i) => ({...v,}));
  return data.map((v, i) => {
    const item = {
      ...v,
      isEdit: false,
      isNew: false,
      children: v.sub ? recursiveResetAssets(v.sub) : [],
    };
    return item;
  });
};

export const recursiveAssets = (data = [], { indexes, pid } = {}) => {
  // console.log('treeDatas  recursiveAssets   ,   ： ', data, indexes, pid);
  return formatSelectList(data).map((v, i) => {
    const item = {
      ...v,
      // pid,
      isEdit: false,
      isNew: false,
      key: `${v.key || v.id}`,
      title: v.label,
      indexes: [...(indexes ?? []), i],
      children: v.sub
        ? recursiveAssets(v.sub, {
            indexes: [...(indexes ?? []), i],
            // pid: item.pid,
          })
        : [],
    };
    return item;
  });
};

const resetData = {
  type: undefined,
  name: undefined,
  manufacturer: undefined,
  model: undefined,
  production_code: undefined,
  voltage: undefined,
  current: undefined,
  production_date: undefined,
  operation_date: undefined,
  service_life: undefined,
  capacity: undefined,
  real_capacity: undefined,
};

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  d_id: '',
  searchInfo: {},

  powerList: [],
  houseNoList: [],
  clientList: [],
  clientCount: 0,
  treeDatas: [],
  selectItem: {},

  assetsSearchInfo: {},

  assetList: [],
  subAssetList: [],
  selectItem: {},
  assetDetail: {},
  subAssetTreeList: [],
};

export default {
  namespace,

  state: initialState,

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
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
    getItem(state, { payload, type }) {
      console.log(' getItem 修改  ： ', state, payload, type);
      const { powerList } = state;
      const { station, electricity_user } = payload.bean;
      const stationItem = {
        ...station,
        value: station.id ? `${station.id}` : null,
        label: station?.name,
      };
      return {
        ...state,
        itemDetail: {
          ...payload.bean,
          d_id: payload.payload.d_id,
          created_time: moment(),
          production_date: moment(),
          operation_date: moment(),
          list: payload.list,
          station: station.id ? `${station.id}` : null,
          electricity_user: electricity_user.id
            ? `${electricity_user.id}`
            : null,
        },
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        powerList: filterObjSame([...powerList, stationItem]),
      };
    },
    addItem(state, { payload, type }) {
      console.log(' addItem 修改  ： ', state, payload, type);
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
        isShowModal: false,
        count: state.count + 1,
      };
    },
    editItem(state, { payload, type }) {
      const dataList = state.dataList.map(v =>
        v.id === state.d_id ? { ...v, ...payload.payload } : v,
      );
      console.log(' editItem 修改  ： ', state, payload, type);
      return {
        ...state,
        dataList: dataList,
        d_id: '',
        isShowModal: false,
        // dataList: state.dataList.map((v) => ({...v.id !== payload.payload.data.id ? payload.data : v,   })),
      };
    },
    removeItem(state, { payload, type }) {
      console.log(' removeItem 修改  ： ', state, payload, type);
      return {
        ...state,
        dataList: state.dataList.filter(v => v.id != payload.payload.d_id),
      };
    },
    removeItems(state, { payload, type }) {
      console.log(' removeItems 修改  ： ', state, payload, type);
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          payload.payload.ids.some(item => v.id != item),
        ),
      };
    },
    getPower(state, { payload, type }) {
      return {
        ...state,
        powerList: formatSelectList(payload.list, 'name'),
      };
    },
    getHouseNo(state, { payload, type }) {
      return {
        ...state,
        houseNoList: formatSelectList(payload.list, 'number'),
      };
    },
    getClient(state, { payload, type }) {
      return {
        ...state,
        clientList: formatSelectList(payload.list, 'name'),
        // clientCount: payload.rest.count,
      };
    },
    getClientRelatived(state, { payload, type }) {
      const clientList = formatSelectList(payload.list, 'name');
      return {
        ...state,
        clientList,
        clientListFilter: clientList,
        clientCount: payload.rest.count,
      };
    },
    editItems(state, { payload, type }) {
      console.log(' editItems 修改  ： ', state, payload, type);
      // payload.form.setFieldsValue({
      //   manufacturer: '11111',
      // });
      // payload.form.resetFields();
      payload?.form.setFieldsValue(resetData);
      return {
        ...state,
        action: payload.action,
        selectItem: payload.selectItem,
        itemDetail: {},
      };
    },

    getList(state, { payload, type }) {
      console.log(' getList 修改  ： ', state, payload, type); //
      return {
        ...state,
        treeDatas: recursiveAssets(payload.list),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
        action: state.action === 'edit' ? 'detail' : state.action,
        // selectItem: {},
        // itemDetail: {},
        // action: '',
      };
    },
    getItem(state, { payload, type }) {
      action;
      console.log(' getItem 修改  ： ', state, payload, payload.action, type);
      return {
        ...state,
        itemDetail: {
          ...payload.bean,
        },
        action: payload.payload.action,
        selectItem: payload.payload.selectItem,
      };
    },

    changeAction(state, { payload, type }) {
      console.log(' changeAction 修改  ： ', state, payload, type);
      return {
        ...state,
        action: payload.action,
      };
    },
    onInputChange(state, { payload, type }) {
      // console.log(' onInputChange 修改  ： ', state, payload, type);
      // const treeDatas = editTreeAttr(payload)
      return {
        ...state,
        treeDatas: payload.treeDatas,
      };
    },
    addTreeStruct(state, { payload, type }) {
      console.log(' addTreeStruct 修改  ： ', state, payload, type);
      return {
        ...state,
        action: payload.action,
        treeDatas: [
          ...state.treeDatas,
          {
            ...newTreeNode,
            key: Math.random(),
          },
        ],
        selectItem: {},
        itemDetail: {},
      };
    },
    addTreeNode(state, { payload, type }) {
      console.log(' addTreeNode 修改  ： ', state, payload, type);
      // const treeDatas = addTreeAttr(payload)
      // console.log(' treeDatas ： ', treeDatas,  )//
      payload.form.setFieldsValue(resetData);
      return {
        ...state,
        action: payload.action,
        treeDatas: payload.treeDatas,
        selectItem: payload.selectItem,
        itemDetail: {},
      };
    },
    editTreeNode(state, { payload, type }) {
      console.log(' editTreeNode 修改  ： ', state, payload, type);
      // const treeDatas = addTreeAttr(payload)
      // console.log(' treeDatas ： ', treeDatas,  )//
      return {
        ...state,
        // action: payload.action,
        treeDatas: [...payload.treeDatas],
        selectItem: payload.selectItem,
      };
    },

    getAssetList(state, { payload, type }) {
      console.log(' getAssetList 修改  ： ', state, payload, type); //
      const assetList = recursiveAssets(payload.list);
      console.log(' assetList ： ', assetList); //
      const subAssetList = assetList[0].children;
      return {
        ...state,
        assetList,
        assetList: assetList,
        selectItem: assetList[0],
        subAssetList,
        subAssetTreeList: subAssetList.map(v => ({ tab: v.name, key: v.id })),
        assetsSearchInfo: payload.payload,
      };
    },
    getAssetDetail(state, { payload, type }) {
      console.log(' getAssetDetail 修改  ： ', state, payload, type); //
      return {
        ...state,
        // assetItemDetail: recursiveAssets(payload.list),
        // subAssetList: payload.payload.selectItem ? payload.payload.selectItem.children.map((v) => ({tab: v.name, key: v.id, })) : state.subAssetList,
        assetDetail: payload.bean,
        selectItem: payload.payload.selectItem ?? state.selectItem,
        subAssetList: payload.payload.subAssetList ?? state.subAssetList,
        subAssetTreeList: payload.payload.subAssetList
          ? payload.payload.subAssetList.map(v => ({ tab: v.name, key: v.id }))
          : state.subAssetTreeList,
      };
    },

    getListFilter(state, { payload, type }) {
      console.log(' getListFilter 修改  ： ', state, payload, type); //
      const { clientList } = state;
      // const filterKey = [
      //   'name',
      // ];
      // const clientListFilter = clientList.filter(v => {
      //   const isInclude = filterKey.some(key =>
      //     `${v[key]}`.includes(payload.keyword),
      //   );
      //   // console.log('  isInclude ：', isInclude,  )//
      //   return isInclude;
      // })
      // const houseNoList = [];
      // clientListFilter.forEach(v => houseNoList.push(...v.electricity_users));
      // console.log(' getListFilter ： ', state, payload, clientListFilter, houseNoList, );

      const clientListFilter = clientList.filter(
        v => v.id == payload.customer_id,
      );

      return {
        ...state,
        clientListFilter,
        // houseNoList: formatSelectList(houseNoList, 'number'),
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
    // *getItemAsync({ payload, action, type }, { call, put }) {
    //   console.log(' getItemAsync ： ', payload, type);
    //   const res = yield call(services.getItem, { id: payload.d_id });
    //   yield put(action({ ...res, payload }));
    // },
    // *addItemAsync({ payload, action, type }, { call, put }) {
    //   // console.log(' addItemAsync ： ', payload, type,     )//
    //   const res = yield call(services.addItem, formatParams(payload));
    //   console.log('  addItem res ：', res);
    //   // yield put(action(res));
    //   yield put({ type: 'getListAsync' });
    // },
    // *editItemAsync({ payload, action, type }, { call, put }) {
    //   // console.log(' editItemAsync ： ', payload, type,     )//
    //   const res = yield call(services.editItem, formatParams(payload));
    //   console.log('  editItem res ：', res);
    //   // yield put(action({ ...res, payload }));
    //   yield put({ type: 'getListAsync' });
    // },
    *getItemAsync({ payload, action, type }, { call, put }) {
      console.log(' getItemAsync ： ', payload, type);
      // const res = yield call(services.getItem, payload);
      const res = yield call(services.getItem, { d_id: payload.d_id });
      console.log('  getItemAsync  res ：', res);
      // const datas = {
      //   ...res.bean,
      //   res.operation_date = res.bean.operation_date ? moment(res.bean.operation_date) : null
      //   res.production_date = res.bean.production_date ? moment(res.bean.production_date) : null
      // }
      res.bean.operation_date = res.bean.operation_date
        ? moment(res.bean.operation_date)
        : null;
      res.bean.production_date = res.bean.production_date
        ? moment(res.bean.production_date)
        : null;
      // console.log(' datas ： ', datas,  )//
      // payload.form.setFieldsValue(datas);
      // payload.form.setFieldsValue({...res.bean, name: payload.selectItem.name,});
      // yield put(action({ ...datas, payload }));
      console.log(' res.bean ： ', res.bean); //
      payload.form.setFieldsValue({
        ...res.bean,
        type: `${res.bean.type}`,
      });
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' addItemAsync ： ', payload, type,     )//
      const res = yield call(services.addItem, payload);
      console.log('  addItem res ：', res);
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const res = yield call(services.editItem, payload);
      console.log('  editItem res ：', res);
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemAsync ： ', payload, type);
      const res = yield call(services.removeItem, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type);
      const res = yield call(services.removeItems, payload);
      // console.log('  removeItem res ：', res, {...res, payload,} )//
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },
    *getTemplate({ payload, action, type }, { call, put }) {
      // console.log(' getTemplate ： ', payload, type,     )//
      const res = yield call(services.getTemplate, payload);
      console.log('  getTemplate res ：', res);
      // yield put(action({ ...res, payload }));
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, { number: payload });
      yield put(action({ ...res, payload }));
    },
    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
    *getClientRelativedAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getRelatived, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
    *getAssetListAsync({ payload, action, type }, { call, put, select }) {
      console.log(' getAssetListAsyncgetAssetListAsync ： ', payload, type);
      const res = yield call(assetsServices.getList, payload);
      // const res = yield call(assetsServices.getList, {
      //   electricity_user_id: '6464',
      //   customer_id: '6464',
      // },);
      console.log(' getAssetListAsyncgetAssetListAsync res ： ', res); //
      let d_id;
      const selectItem = recursiveAssets(res.list)[0];
      if (selectItem) {
        if (selectItem.equipment_data_id) {
          console.log(' 111 ： '); //
          d_id = selectItem.id;
        }
        if (
          selectItem.children.length > 0 &&
          selectItem.children[0]?.equipment_data_id
        ) {
          console.log(' 222 ： '); //
          d_id = selectItem.children[0].id;
        }

        if (
          selectItem.children.length > 0 &&
          selectItem.children[0].children.length > 0 &&
          selectItem.children[0].children[0].equipment_data_id
        ) {
          console.log(' 333 ： '); //
          d_id = selectItem.children[0].children[0].id;
        }
        console.log(' d_id ： ', d_id); //
        yield put({
          type: 'getAssetDetailAsync',
          payload: {
            selectItem,
            d_id,
            subAssetList: selectItem.children,
          },
        });
      }
      yield put({ type: 'getAssetList', payload: { ...res, payload } });
    },
    *getAssetDetailAsync({ payload, action, type }, { call, put, select }) {
      console.log(' getAssetDetailAsync ： ', payload, type);
      const res = payload.d_id
        ? yield call(assetsServices.getItem, {
            d_id: payload.d_id,
          })
        : {
            bean: {},
          };
      yield put({ type: 'getAssetDetail', payload: { ...res, payload } });
    },
  },
};
