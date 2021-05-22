import { init, action } from '@/utils/createAction';
import * as services from '@/services/assets';
import * as powerStationServices from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import * as clientServices from '@/services/client';
import { formatSelectList, filterObjSame } from '@/utils';
import moment from 'moment';

const namespace = 'assets';
const { createActions } = init(namespace);

const otherActions = [
  'syncOAAsync',
  'uploadFileAsync',
  'exportDataAsync',
  'getTemplatAsync',
  'getPowerAsync',
  'getHouseNoAsync',
  'getClientAsync',
  'getAssetDeviceAsync',
];

const batchTurnActions = [
  'editItems',
  'editAssetStruct',
  'addTreeNode',
  'editTreeNode',
  'onInputChange',
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

export const recursiveResetAssets = (data = [], { indexes, pid } = {}) => {
  console.log(
    'treeData  recursiveAssets recursiveResetAssets  ,   ： ',
    data,
    indexes,
    pid,
  );
  // return data.map((v, i) => ({...v,}));
  return data.map((v, i) => {
    const item = {
      ...v,
      isEdit: false,
      isNew: false,
    };
    item.children = item.sub ? recursiveAssets(v.sub) : [];
    return item;
  });
};

export const recursiveAssets = (data = [], { indexes, pid } = {}) => {
  // console.log('treeData  recursiveAssets   ,   ： ', data, indexes, pid);
  // return data.map((v, i) => ({...v,}));
  return formatSelectList(data).map((v, i) => {
    const item = {
      ...v,
      // pid,
      isEdit: false,
      isNew: false,
      key: `${v.key || v.id}`,
      title: v.label,
      indexes: [...(indexes ?? []), i],
    };
    // if (v.children) {
    //   item.children = recursiveAssets(v.children, [...(indexes ?? []), i])
    // }
    item.children = item.sub
      ? recursiveAssets(v.sub, {
          indexes: [...(indexes ?? []), i],
          // pid: item.pid,
        })
      : [];
    return item;
  });
};

const treeDatas = recursiveAssets([
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
]);

const addTreeAttr = ({ treeData, val, attr, item, i }) => {
  console.log(' addTreeAttr   e, item, i,   ： ', treeData, val, item, i);
  const { indexes } = item;
  const [index0, index1, index2] = indexes;
  const copyData = [...treeData];
  console.log('  对吗  indexes.length ', indexes);
  const newTreeNode = {
    // indexes: [...indexes, children.length],
    isEdit: true,
    title: '资产名',
    children: [],
  };
  switch (indexes.length) {
    case 1:
      copyData[index0].children = [
        ...copyData[index0].children,
        {
          ...newTreeNode,
          key: `${item.key}-${copyData[index0].children.length}`,
          indexes: [...indexes, copyData[index0].children.length],
        },
      ];
      break;
    case 2:
      console.log(
        ' copyData[index0].children[index1].children  ： ',
        copyData[index0].children[index1].children,
      ); //
      copyData[index0].children[index1].children = [
        ...copyData[index0].children[index1].children,
        {
          ...newTreeNode,
          key: `${item.key}-${copyData[index0].children[index1].children.length}`,
          indexes: [
            ...indexes,
            copyData[index0].children[index1].children.length,
          ],
        },
      ];
      break;
    case 3:
      copyData[index0].children[index1].children[index2].children = [
        ...copyData[index0].children[index1].children[index2].children,
        {
          ...newTreeNode,
          key: `${item.key}-${copyData[index0].children[index1].children[index2].children.length}`,
          indexes: [
            ...indexes,
            copyData[index0].children[index1].children[index2].children.length,
          ],
        },
      ];
      break;
    default:
      break;
  }
  console.log(' copyData ： ', copyData); //
  return copyData;
};
const editTreeAttr = ({ treeData, val, attr, item, i }) => {
  console.log(' editTreeAttr   e, item, i,   ： ', treeData, val, item, i);
  const { indexes } = item;
  const [index0, index1, index2] = indexes;
  const copyData = [...treeData];
  console.log('  对吗  indexes.length ', indexes);
  switch (indexes.length) {
    case 1:
      copyData[index0][attr] = val;
      break;
    case 2:
      copyData[index0].children[index1][attr] = val;
      break;
    case 3:
      copyData[index0].children[index1].children[index2][attr] = val;
      break;
    default:
      break;
  }
  console.log(' copyData ： ', copyData); //
  return copyData;
};

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  d_id: '',
  searchInfo: {},

  syncOAData: [],
  powerList: [],
  houseNoList: [],
  clientList: [],
  treeData: [],
  treeData: treeDatas,
  assetDeviceList: [],
  selectItem: {},
  // formTypes: 'addConfig',
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
    getList(state, { payload, type }) {
      console.log(' getList 修改  ： ', state, payload, type); //
      return {
        ...state,
        dataList: recursiveAssets(payload.list),
        treeData: recursiveAssets(payload.list),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
        selectItem: {},
        itemDetail: {},
        action: '',
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
        formTypes: 'addConfig',
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

    syncOA(state, { payload, type }) {
      return {
        ...state,
        // portraitData: payload.,
      };
    },
    getPortrait(state, { payload, type }) {
      return {
        ...state,
        // portraitData: payload.,
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
      };
    },
    editItems(state, { payload, type }) {
      console.log(' editItems 修改  ： ', state, payload, type);
      // payload.form.setFieldsValue({
      //   manufacturer: '11111',
      // });
      // payload.form.resetFields();
      payload?.form.setFieldsValue({
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
      });
      return {
        ...state,
        action: payload.action,
        selectItem: payload.selectItem,
        formTypes: payload.formTypes,
        itemDetail: {},
      };
    },

    getAssetDevice(state, { payload, type }) {
      // console.log(' getAssetDevice 修改  ： ', state, payload, type);
      return {
        ...state,
        assetDeviceList: payload.list,
      };
    },

    addTreeNode(state, { payload, type }) {
      console.log(' addTreeNode 修改  ： ', state, payload, type);
      // const treeDatas = addTreeAttr(payload)
      // console.log(' treeDatas ： ', treeDatas,  )//
      payload.form.setFieldsValue({
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
      });
      return {
        ...state,
        action: payload.action,
        dataList: payload.treeDatas,
        treeData: payload.treeDatas,
        selectItem: payload.selectItem,
        itemDetail: {},
        formTypes: 'addConfig',
      };
    },
    editTreeNode(state, { payload, type }) {
      console.log(' editTreeNode 修改  ： ', state, payload, type);
      // const treeDatas = addTreeAttr(payload)
      // console.log(' treeDatas ： ', treeDatas,  )//
      return {
        ...state,
        action: payload.action,
        dataList: [...payload.treeDatas],
        treeData: [...payload.treeDatas],
        selectItem: payload.selectItem,
      };
    },
    onInputChange(state, { payload, type }) {
      // console.log(' onInputChange 修改  ： ', state, payload, type);
      // const treeDatas = editTreeAttr(payload)
      return {
        ...state,
        dataList: payload.treeDatas,
        treeData: payload.treeDatas,
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
      console.log(' getItemAsync ： ', payload, type);
      const res = yield call(services.getItem, { id: payload.d_id });
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' addItemAsync ： ', payload, type,     )//
      const res = yield call(services.addItem, formatParams(payload));
      console.log('  addItem res ：', res);
      // yield put(action(res));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      // console.log(' editItemAsync ： ', payload, type,     )//
      const res = yield call(services.editItem, formatParams(payload));
      console.log('  editItem res ：', res);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
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
      payload.form.setFieldsValue(res.bean);
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
    *getAssetDeviceAsync({ payload, action, type }, { call, put }) {
      console.log(' getAssetDeviceAsync ： ', payload, type);
      const res = yield call(services.getAssetDevice, payload);
      yield put(action({ ...res, payload }));
    },

    *uploadFile({ payload, action, type }, { call, put }) {
      // console.log(' uploadFile ： ', payload, type,     )//
      const res = yield call(services.syncOA, payload);
      console.log('  syncOA res ：', res);
      // yield put({
      //   type: 'getList',
      //   payload: res,
      // });
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
  },
};
