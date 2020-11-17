import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import * as clientServices from '@/services/client';
import { formatSelectList, nowYearMonth, tips } from '@/utils';

const namespace = 'powerStation';
const { createActions } = init(namespace);

const otherActions = [
  'exportDataAsync',
  'getHouseNoAsync',
  'getClientAsync',
  'addPowerInfo',
];

const batchTurnActions = ['editPowerInfo'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const initItem = {
  key: Math.random(),
  power_number: '',
  meter_number: '',
  incoming_line_name: '',
  magnification: '',
  transformer_capacity: '',
  real_capacity: '',
  outline_number: '',
  action: '',
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

    clientList: [],
    houseNoList: [],
    powerInfoData: [initItem],
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
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        // itemDetail: payload.bean,
        itemDetail: payload.list,
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
        dataList: state.dataList.map(v =>
          v.id == payload.payload.d_id ? { ...v, ...payload.bean } : v,
        ),
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

    editPowerInfo(state, { payload, type }) {
      console.log(' editPowerInfo ： ', state, payload); //
      const { powerInfoData } = state;
      const { action, keys, key, index, value } = payload;
      let newData = [];
      if (action === 'add') {
        newData = [
          {
            ...initItem,
            key: Math.random(),
          },
          ...powerInfoData,
        ];
      } else if (action === 'edit') {
        newData = powerInfoData.map((v, i) => ({
          ...(i === index
            ? {
                ...v,
                [keys]: value,
              }
            : v),
        }));
      } else if (action === 'remove') {
        newData = powerInfoData.filter((v, i) => v.key !== key);
      }

      console.log(' editPowerInfo 修改  ： ', state, payload, type, newData); //
      return {
        ...state,
        powerInfoData: newData,
      };
    },
    getClient(state, { payload, type }) {
      // console.log(' getClient 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        clientList: formatSelectList(payload.list, 'name'),
      };
    },
    getHouseNo(state, { payload, type }) {
      // console.log(' getHouseNo 修改  ： ', state, payload, type,     )//
      return {
        ...state,
        houseNoList: formatSelectList(payload.list, 'number'),
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
    *addItemAsync({ payload, action, type }, { call, put, select }) {
      console.log(' addItemAsync ： ', payload); //
      const { powerInfoData } = yield select(state => state[namespace]);
      // if (payload.file && payload.file.fileList) {
      //   const fileList = payload.file.fileList;
      //   payload.file = fileList[fileList.length - 1].response.url;
      // } else {
      //   tips('文件不能为空！', 2)
      //   return
      // }
      const datas = [
        {
          id: 1,
          power_number: '',
          meter_number: '',
          incoming_line_name: '',
          magnification: '',
          transformer_capacity: '',
          real_capacity: '',
          outline_number: '',
        },
      ];
      let isRight = true;
      // powerInfoData.forEach((item) => {
      datas.forEach((item, i) => {
        console.log(' powerInfoData v ： ', item);
        Object.keys(item).forEach(key => {
          if (!item[key]) {
            isRight = {
              i,
              key,
            };
          }
        });
      });
      console.log(' isRight ： ', isRight); //
      if (isRight !== true) {
        tips(
          `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
          2,
        );
        return;
      }
      return;

      const res = yield call(services.addItem, {
        ...payload,
        elecrical_info_list: [
          {
            id: 1,
            power_number: '',
            meter_number: '',
            incoming_line_name: '',
            magnification: '',
            transformer_capacity: '',
            real_capacity: '',
            outline_number: '',
          },
        ],
      });
      // const res = yield call(services.addItem, {payload});
      // yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const { latitude, longitude, ...rest } = payload;
      const res = yield call(services.editItem, rest);
      yield put(action({ ...res, payload }));
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      yield put(action({ ...res, payload }));
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },

    *addPowerInfo({ payload, action, type }, { call, put }) {
      console.log(' addPowerInfo ： ', payload); //
      const res = yield call(services.addPowerInfo, {
        // ...payload,
        // elecrical_info_list:
        // {
        power_number: '1',
        meter_number: '2',
        incoming_line_name: '3',
        magnification: '4',
        transformer_capacity: '5',
        real_capacity: '6',
        outline_number: '7',
        // },
      });
      // const res = yield call(services.addItem, {payload});
      // yield put(action({ ...res, payload }));
    },
    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
  },
};
