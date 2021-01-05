import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import * as clientServices from '@/services/client';
import { formatSelectList, nowYearMonth, tips, filterObjSame } from '@/utils';

const namespace = 'powerStation';
const { createActions } = init(namespace);

const otherActions = [
  'exportDataAsync',
  'getPowerAsync',
  'getHouseNoAsync',
  'getClientAsync',
  'addPowerInfoAsync',
  'getBelongHouseNoAsync',
  'editPowerInfoAsync',
  'removePowerInfoAsync',

  'getDistrictAsync',

  'addOutLineTableItemAsync',
  'editOutLineTableItemAsync',
  'removeOutLineTableItemAsync',
];

const batchTurnActions = ['modifyPowerInfo', 'modifyOutLineTableItem'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

const formatPowerList = (data, labelKey = 'label', idKey = 'id') => {
  const res = data.map(v => ({
    ...v,
    label: v.name + ' - ' + v.id,
    value: v.name,
    key: v.id,
  }));
  return res;
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
  // 'outline_number',
  'voltage_level',
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
  power_number: '',
  meter_number: '',
  incoming_line_name: '',
  magnification: '',
  transformer_capacity: '',
  real_capacity: '',
  outline_number: '',
  voltage_level: '',
  isEdit: true,
  // action: '',
};

const outLineTableItem = {
  key: Math.random(),
  name: '',
  powerstation: '',
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

    powerList: [],
    clientList: [],
    houseNoList: [],
    powerInfoData: [initItem],
    // powerInfoData: [],

    provinceList: [],
    citytList: [],
    countryList: [],

    outLineTableData: [
      {
        ...outLineTableItem,
      },
    ],
    outLineTableData: [],
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
        powerInfoData: [],
        outLineTableData: [],
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: formatSelectList(payload.list, 'name'),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
        powerInfoData: [],
      };
    },
    getItem(state, { payload, type }) {
      const {
        electricity_user,
        electricalinfromation_set,
        outline_set,
      } = payload.bean;
      const { houseNoList } = state; //

      const datas = electricalinfromation_set.map(v => ({
        ...v,
        key: Math.random(),
      }));
      console.log(' getItemgetItem ： ', payload, datas); //
      const itemDetail = {
        ...payload.bean,
        electricity_user: `${electricity_user.id}`,
      };
      // if (!itemDetail.inspection_time && itemDetail.inspection_time.length > 0) {
      if (!itemDetail.inspection_time) {
        delete itemDetail.inspection_time;
      } else {
        // itemDetail.inspection_time = itemDetail.inspection_time.split('[')[1].split(']')[0].split(',')
        itemDetail.inspection_time = itemDetail.inspection_time.split(',');
      }

      const electricityUserItem = {
        value: `${electricity_user ? electricity_user?.id : null}`,
        label: electricity_user ? electricity_user.number : '',
      };

      const houseNoListData = [...houseNoList, electricityUserItem];
      const houseNoListFitler = filterObjSame(houseNoListData, 'value');
      console.log(
        ' houseNoListData ： ',
        houseNoList,
        electricityUserItem,
        houseNoListData,
        houseNoListFitler,
      ); //

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        // itemDetail: payload.bean,
        // itemDetail: {
        //   ...payload.bean,
        //   electricity_user: `${payload.bean.electricity_user.id}`,
        // },
        itemDetail,
        powerInfoData: datas,
        outLineTableData: outline_set.map(v => ({
          ...v,
          key: Math.random(),
        })),
        houseNoList: houseNoListData,
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
          v.id == payload.payload.d_id
            ? {
                ...v,
                ...payload.bean,
              }
            : v,
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
      const { powerInfoData } = state;
      console.log(' addPowerInfo ： ', state, payload, powerInfoData); //
      return {
        ...state,
        // powerInfoData: payload.list.map(v => ({ ...v, key: Math.random(), isEdit: false, })),
        powerInfoData: powerInfoData.map((v, i) => {
          console.log(
            ' v.key === payload.payload.key ： ',
            v.key === payload.payload.key,
          ); //
          return v.key === payload.payload.key
            ? {
                ...v,
                ...payload.list[0],
                isEdit: false,
              }
            : v;
        }),
      };
    },
    editPowerInfo(state, { payload, type }) {
      const { powerInfoData } = state;
      console.log(' editPowerInfo ： ', state, payload, powerInfoData); //
      return {
        ...state,
        powerInfoData: powerInfoData.map((v, i) => {
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
    removePowerInfo(state, { payload, type }) {
      console.log(' removePowerInfo ： ', state, payload); //
      const { powerInfoData } = state;
      const { action, key, index, value } = payload.payload;
      let newData = [];
      // if (action === 'localRemove') {
      //   newData = powerInfoData.filter((v, i) => v.key != key);
      // } else {
      //   newData = payload.list.filter(v => v.id != payload.payload.id);
      // }
      newData = powerInfoData.filter(v => {
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
        powerInfoData: newData,
      };
    },
    modifyPowerInfo(state, { payload, type }) {
      console.log(' modifyPowerInfo ： ', state, payload); //
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
        newData = powerInfoData.filter((v, i) => v.key != key);
      }

      console.log(' modifyPowerInfo 修改  ： ', state, payload, type, newData); //
      return {
        ...state,
        powerInfoData: newData,
      };
    },
    getPower(state, { payload, type }) {
      console.log(' getPower 修改  ： ', state, payload, type); //
      return {
        ...state,
        powerList: formatPowerList(payload.list, 'name', 'name'),
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

    addOutLineTableItem(state, { payload, type }) {
      const { outLineTableData } = state;
      console.log(' addOutLineTableItem ： ', state, payload, outLineTableData); //
      return {
        ...state,
        // outLineTableData: payload.list.map(v => ({ ...v, key: Math.random(), isEdit: false, })),
        outLineTableData: outLineTableData.map((v, i) => {
          console.log(
            ' v.key === payload.payload.key ： ',
            v.key === payload.payload.key,
          ); //
          return v.key === payload.payload.key
            ? {
                ...v,
                ...payload.list[0],
                // ...payload.bean,
                isEdit: false,
              }
            : v;
        }),
      };
    },
    editOutLineTableItem(state, { payload, type }) {
      const { outLineTableData } = state;
      console.log(
        ' editOutLineTableItem ： ',
        state,
        payload,
        outLineTableData,
      ); //
      return {
        ...state,
        outLineTableData: outLineTableData.map((v, i) => {
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
    removeOutLineTableItem(state, { payload, type }) {
      console.log(' removeOutLineTableItem ： ', state, payload); //
      const { outLineTableData } = state;
      const { action, key, index, value } = payload.payload;
      let newData = [];
      // if (action === 'localRemove') {
      //   newData = outLineTableData.filter((v, i) => v.key != key);
      // } else {
      //   newData = payload.list.filter(v => v.id != payload.payload.id);
      // }
      newData = outLineTableData.filter(v => {
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
        outLineTableData: newData,
      };
    },
    modifyOutLineTableItem(state, { payload, type }) {
      console.log(' modifyOutLineTableItem ： ', state, payload); //
      const { outLineTableData } = state;
      const { action, keys, key, index, value } = payload;
      let newData = [];
      if (action === 'add') {
        newData = [
          {
            ...outLineTableItem,
            key: Math.random(),
          },
          ...outLineTableData,
        ];
      } else if (action === 'edit') {
        newData = outLineTableData.map((v, i) => ({
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
        newData = outLineTableData.filter((v, i) => v.key != key);
      }

      console.log(
        ' modifyOutLineTableItem 修改  ： ',
        state,
        payload,
        type,
        newData,
      ); //
      return {
        ...state,
        outLineTableData: newData,
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
        this,
      ); //
      const res = yield call(services.getList, params);
      yield put({
        type: 'getList',
        payload: {
          ...res,
          searchInfo: params,
        },
      });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *addItemAsync({ payload, action, type }, { call, put, select }) {
      const { powerInfoData, outLineTableData } = yield select(
        state => state[namespace],
      );
      console.log(' addItemAsync ： ', powerInfoData, payload); //

      // if (powerInfoData.length < 1) {
      //   tips('电源列表不能为空！', 2);
      //   return;
      // }

      // const datas = [
      //   {
      //     id: 1,
      //     power_number: '',
      //     meter_number: '',
      //     incoming_line_name: '',
      //     magnification: '',
      //     transformer_capacity: '',
      //     real_capacity: '',
      //     outline_number: '',
      //   },
      // ];
      const elecrical_info_list = powerInfoData.map(v => v.id);
      const isHaveId = elecrical_info_list.every(v => v);
      const outline_list = outLineTableData.map(v => v.id);
      const isHaveOutlineId = outline_list.every(v => v);
      console.log(
        ' isHaveId some  ： ',
        outLineTableData,
        outLineTableData,
        outline_list,
        isHaveId,
        outline_list,
        isHaveOutlineId,
      );

      // if (!isHaveId) {
      //   tips(`请先保存电源列表！`, 2);
      //   return;
      // }
      // if (!isHaveOutlineId) {
      //   tips(`请先保存出线侧列表！`, 2);
      //   return;
      // }

      // const isRight = getIsRight(powerInfoData);
      // console.log(' isRight ： ', isRight); //
      // if (isRight !== true) {
      //   tips(
      //     `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
      //     2,
      //   );
      //   return;
      // }
      // // return;

      const params = {
        ...payload,
        elecrical_info_list: elecrical_info_list,
        outline_list: outline_list,
      };
      if (payload.inspection_time) {
        params.inspection_time = params.inspection_time.join(',');
        console.log(' params ： ', params); //
      }
      console.log(' params ： ', params); //

      const res = yield call(services.addItem, params);
      // const res = yield call(services.addItem, {payload});
      // yield put(action({ ...res, payload }));
      yield put({
        type: 'getListAsync',
      });
    },
    *editItemAsync({ payload, action, type }, { call, put, select }) {
      // const { latitude, longitude, ...rest } = payload;
      const { powerInfoData, outLineTableData } = yield select(
        state => state[namespace],
      );
      console.log(
        ' editItemAsync ： ',
        powerInfoData,
        outLineTableData,
        payload,
      ); //
      // if (powerInfoData.length < 1) {
      //   tips('电源列表不能为空！', 2);
      //   return;
      // }
      const elecrical_info_list = powerInfoData.map(v => v.id);
      const isHaveId = elecrical_info_list.every(v => v);
      console.log(' isHaveId some  ： ', elecrical_info_list, isHaveId);
      // if (!isHaveId) {
      //   tips(`请先保存电源列表！`, 2);
      //   return;
      // }
      const outline_list = outLineTableData.map(v => v.id);
      const isHaveOutlineId = outline_list.every(v => v);
      // if (!isHaveOutlineId) {
      //   tips(`请先保存出线侧列表！`, 2);
      //   return;
      // }
      const isRight = getIsRight(powerInfoData);
      console.log(' isRight ： ', isRight); //
      // if (isRight !== true) {
      //   tips(
      //     `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
      //     2,
      //   );
      //   return;
      // }
      // return;
      const params = {
        ...payload,
        elecrical_info_list: elecrical_info_list,
        outline_list: outline_list,
      };
      if (payload.inspection_time) {
        params.inspection_time = params.inspection_time.join(',');
        console.log(' params ： ', params); //
      }
      console.log(' params ： ', params); //
      const res = yield call(services.editItem, params);
      // yield put(action({ ...res, payload }));
      yield put({
        type: 'getListAsync',
      });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({
        type: 'getListAsync',
      });
    },
    *removeItemsAsync({ payload, action, type }, { call, put }) {
      console.log(' removeItemsAsync ： ', payload, type); //
      const res = yield call(services.removeItems, payload);
      // yield put(action({ ...res, payload }));
      yield put({
        type: 'getListAsync',
      });
    },
    *exportDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.exportData, payload);
      return res;
    },

    // *addPowerInfoAsync({ payload, action, type }, { call, put, select }) {
    //   const { powerInfoData } = yield select(state => state[namespace]);
    //   const isRight = getIsRight(powerInfoData);
    //   console.log(' addPowerInfoAsync ： ', payload, powerInfoData);
    //   console.log(' isRight ： ', isRight); //
    //   if (isRight !== true) {
    //     tips(
    //       `电源列表 第${isRight.i + 1}行 ${isRight.key} 字段值不能为空！`,
    //       2,
    //     );
    //     return;
    //   }
    //   const res = yield call(
    //     services.addPowerInfo,
    //     // ...payload,
    //     {
    //       electrical_info_list: powerInfoData,
    //     },
    //     // {
    //     //   electrical_info_list: [
    //     //     {
    //     //       power_number: '1',
    //     //       meter_number: '2',
    //     //       incoming_line_name: '3',
    //     //       magnification: '4',
    //     //       transformer_capacity: '5',
    //     //       real_capacity: '6',
    //     //       outline_number: '7',
    //     //     },
    //     //   ],
    //     // },
    //   );
    //   // const res = yield call(services.addItem, {payload});
    //   yield put(action({ ...res, payload }));
    //   // yield put({ type: 'getListAsync' };
    // },
    *addPowerInfoAsync({ payload, action, type }, { call, put, select }) {
      console.log(' addPowerInfoAsync ： ', payload);
      const res = yield call(services.addPowerInfo, {
        electrical_info_list: [payload],
      });
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *editPowerInfoAsync({ payload, action, type }, { call, put, select }) {
      console.log(' editPowerInfoAsync ： ', payload);
      // const { powerInfoData } = yield select(state => state[namespace]);
      const res = yield call(services.editPowerInfo, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *removePowerInfoAsync({ payload, action, type }, { call, put }) {
      console.log(' removePowerInfoAsync ： ', payload);
      if (payload.action === 'remove') {
        const res = yield call(services.removePowerInfo, payload);
      }
      yield put(
        action({
          payload,
        }),
      );
    },

    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getList, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *getHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *getBelongHouseNoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(houseNoServices.getList, {
        customer: 1,
      });
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *batchGetAsync({ payload, action, type }, { call, put }) {
      // *getBelongHouseNoAsync({ payload, action, type }, { call, put }) {
      console.log(' batchGetAsync ： '); //
      const res = yield [
        call(clientServices.getList, payload),
        call(houseNoServices.getList, {
          keyword: payload,
        }),
        call(houseNoServices.getList, {
          customer: 1,
        }),
      ];
      console.log('  reresresress ：', res); //
    },

    *getDistrictAsync({ payload, action, type }, { call, put }) {
      console.log(' getDistrictAsync ： ', payload, type); //
      const res = yield call(clientServices.getDistrict, payload);
      console.log('  getDistrictAsync res ：', res); //
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },

    *addOutLineTableItemAsync(
      { payload, action, type },
      { call, put, select },
    ) {
      console.log(' addOutLineTableItemAsync ： ', payload);
      const { itemDetail } = yield select(state => state[namespace]);
      const params = {
        outline_list: [
          {
            ...payload,
            powerstation: itemDetail.id,
          },
        ],
      };
      const res = yield call(services.addOutLine, params);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *editOutLineTableItemAsync(
      { payload, action, type },
      { call, put, select },
    ) {
      const { itemDetail } = yield select(state => state[namespace]);
      console.log(' editOutLineTableItemAsync ： ', payload, itemDetail);
      const params = {
        outline_set: payload,
        // powerstation: itemDetail.id,
      };
      const res = yield call(services.editOutLine, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *removeOutLineTableItemAsync(
      { payload, action, type },
      { call, put, select },
    ) {
      const { itemDetail } = yield select(state => state[namespace]);
      console.log(' removeOutLineTableItemAsync ： ', payload);
      if (payload.action === 'remove') {
        const res = yield call(services.removeOutLine, {
          d_id: payload.id,
          id: `${payload.id}`,
        });
      }
      yield put(
        action({
          payload,
        }),
      );
    },
  },
  // subscriptions: {
  //   setup: (props) => {
  //     console.log(' setupsetup ： ', props, this); //
  //     const { dispatch, history } = props; //
  //     //
  //     // const res = await Promise.allSettled(11)
  //     // console.log(' resresres ： ', res); //
  //   },
  // },
};
