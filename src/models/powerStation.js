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
  'addPowerInfoAsync',
  'getBelongHouseNoAsync',
  'removePowerInfoAsync',
];

const batchTurnActions = ['editPowerInfo'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const validateConfig = [
  'power_number',
  'meter_number',
  'incoming_line_name',
  'magnification',
  'transformer_capacity',
  'real_capacity',
  'outline_number',
];

export const getIsRight = (
  data,
  // validateConfig = validateConfig,
) => {
  console.log(' getIsRight data ： ', data); //
  let isRight = true;
  // powerInfoData.forEach((item) => {
  data.forEach((item, i) => {
    console.log(' powerInfoData v ： ', item);
    validateConfig.forEach(key => {
      if (!item[key]) {
        isRight = {
          i,
          key,
        };
      }
    });
  });
  return isRight;
}; //

const initItem = {
  key: Math.random(),
  power_number: '11',
  meter_number: '22',
  incoming_line_name: '33',
  magnification: '44',
  transformer_capacity: '55',
  real_capacity: '66',
  outline_number: '77',
  // action: '',
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
    powerInfoData: [],
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
      const datas = payload.bean.electricalinfromation_set.map(v => ({
        ...v,
        key: Math.random(),
      }));
      console.log(' getItemgetItem ： ', payload, datas); //
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        // itemDetail: payload.bean,
        itemDetail: {
          ...payload.bean,
          electricity_user: `${payload.bean.electricity_user.id}`,
        },
        powerInfoData: datas,
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

    addPowerInfo(state, { payload, type }) {
      console.log(' addPowerInfo ： ', state, payload); //
      return {
        ...state,
        powerInfoData: payload.list.map(v => ({ ...v, key: Math.random() })),
      };
    },
    removePowerInfo(state, { payload, type }) {
      console.log(' removePowerInfo ： ', state, payload); //
      const { powerInfoData } = state;
      const { action, keys, key, index, value } = payload;
      let newData = [];
      if (action === 'localRemove') {
        newData = payload.list.filter((v, i) => v.key != key);
      } else {
        newData = powerInfoData.filter(v => v.id != payload.payload.id);
      }
      console.log(' newData ： ', newData); //
      return {
        ...state,
        powerInfoData: newData,
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
        newData = powerInfoData.filter((v, i) => v.key != key);
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
      const { powerInfoData } = yield select(state => state[namespace]);
      console.log(' addItemAsync ： ', powerInfoData, payload); //
      if (powerInfoData.length < 1) {
        tips('电源列表不能为空！', 2);
        return;
      }
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
      const elecrical_info_list = powerInfoData.map(v => v.id);
      const isHaveId = elecrical_info_list.every(v => v);
      console.log(' isHaveId some  ： ', elecrical_info_list, isHaveId);
      if (!isHaveId) {
        tips(`请先保存电源列表！`, 2);
        return;
      }
      const isRight = getIsRight(powerInfoData);
      console.log(' isRight ： ', isRight); //
      if (isRight !== true) {
        tips(
          `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
          2,
        );
        return;
      }
      // return;

      const res = yield call(services.addItem, {
        ...payload,
        elecrical_info_list: elecrical_info_list,
      });
      // const res = yield call(services.addItem, {payload});
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put, select }) {
      // const { latitude, longitude, ...rest } = payload;
      const { powerInfoData } = yield select(state => state[namespace]);
      console.log(' addItemAsync ： ', powerInfoData, payload); //
      if (powerInfoData.length < 1) {
        tips('电源列表不能为空！', 2);
        return;
      }
      const elecrical_info_list = powerInfoData.map(v => v.id);
      const isHaveId = elecrical_info_list.every(v => v);
      console.log(' isHaveId some  ： ', elecrical_info_list, isHaveId);
      if (!isHaveId) {
        tips(`请先保存电源列表！`, 2);
        return;
      }
      const isRight = getIsRight(powerInfoData);
      console.log(' isRight ： ', isRight); //
      if (isRight !== true) {
        tips(
          `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
          2,
        );
        return;
      }
      // return;

      const res = yield call(services.editItem, {
        ...payload,
        elecrical_info_list: elecrical_info_list,
      });
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },

    *addPowerInfoAsync({ payload, action, type }, { call, put, select }) {
      const { powerInfoData } = yield select(state => state[namespace]);
      const isRight = getIsRight(powerInfoData);
      console.log(' addPowerInfoAsync ： ', payload, powerInfoData);
      console.log(' isRight ： ', isRight); //
      if (isRight !== true) {
        tips(
          `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
          2,
        );
        return;
      }
      const res = yield call(
        services.addPowerInfo,
        // ...payload,
        {
          electrical_info_list: powerInfoData,
        },
        // {
        //   electrical_info_list: [
        //     {
        //       power_number: '1',
        //       meter_number: '2',
        //       incoming_line_name: '3',
        //       magnification: '4',
        //       transformer_capacity: '5',
        //       real_capacity: '6',
        //       outline_number: '7',
        //     },
        //   ],
        // },
      );
      // const res = yield call(services.addItem, {payload});
      yield put(action({ ...res, payload }));
      // yield put({ type: 'getListAsync' };
    },
    *removePowerInfoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removePowerInfo, payload);
      yield put(action({ ...res, payload }));
    },

    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, { keyword: payload });
      yield put(action({ ...res, payload }));
    },
    *getBelongHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, { customer: 1 });
      yield put(action({ ...res, payload }));
    },
  },
};
