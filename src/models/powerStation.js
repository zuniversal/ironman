import { init, action } from '@/utils/createAction';
import * as services from '@/services/powerStation';
import * as houseNoServices from '@/services/houseNo';
import * as clientServices from '@/services/client';
import * as teamServices from '@/services/shiftsManage';
import {
  formatSelectList,
  nowYearMonth,
  tips,
  filterObjSame,
  format2Null,
} from '@/utils';
import moment from 'dayjs';

const namespace = 'powerStation';
const { createActions, createAction } = init(namespace);

const otherActions = [
  'exportDutyDataAsync',
  'exportDataAsync',
  'getPowerAsync',
  'getHouseNoAsync',
  'getClientAsync',
  'getPowerInfoAsync',
  'addPowerInfoAsync',
  'getBelongHouseNoAsync',
  'editPowerInfoAsync',
  'removePowerInfoAsync',

  'getDistrictAsync',
  'getTeamAsync',

  'addOutLineTableItemAsync',
  'editOutLineTableItemAsync',
  'removeOutLineTableItemAsync',

  'getCircuitItemAsync',
  'addCircuitItemAsync',
  'editCircuitItemAsync',
  'removeCircuitItemAsync',

  'addPowerNumberAsync',
  'editPowerNumberAsync',
  'addOutlineAsync',
  'editOutlineAsync',
  'removeOutlineAsync',
];

const batchTurnActions = [
  'modifyPowerInfo',
  'modifyOutLineTableItem',
  'showFormModal2',
  'onCancel2',
];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

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
  console.log(' getIsRight data ： ', data);
  let isRight = true;
  // powerInfoData.forEach((item) => {
  data.forEach((item, i) => {
    console.log(' powerInfoData v ： ', item);
    validateConfig.forEach(key => {
      if (!item[key] && item[key] != 0) {
        isRight = {
          i,
          key,
        };
      }
    });
  });
  return isRight;
};

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
  power_number: [],
  isEdit: true,
};

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
    powerInfoList: [],
    extraData2: {},
    record: {},
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        d_id: payload.d_id,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
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
        outLineTableData: [],
      };
    },
    getItem(state, { payload, type }) {
      const {
        electricity_user,
        electricalinfromation_set,
        outline_set,
        service_team = [],
        end_time,
      } = payload.bean;
      const { houseNoList, teamList, clientList } = state;

      const customer = payload.bean.customer || {};
      console.log('  customer ：', customer);

      const datas = electricalinfromation_set.map(v => ({
        ...v,
        voltage_level: v.voltage_level ?? '',
        key: Math.random(),
      }));
      console.log(' getItemgetItem ： ', payload, datas);
      const itemDetail = {
        ...payload.bean,
        electricity_user: `${electricity_user.id}`,
        customer: `${customer.id}`,
        end_time: end_time ? moment(end_time) : null,
        inspection_type: payload.bean.inspection_type ?? 0,
      };
      // if (itemDetail.inspection_type === 0 && Array.isArray(itemDetail.service_team)) {
      //   itemDetail.service_team = itemDetail.service_team.split(',')
      // }
      if (
        // itemDetail.inspection_type === 0 &&
        itemDetail.inspection_type !== 1 &&
        Array.isArray(itemDetail.service_team)
      ) {
        console.log(' itemDetail.service_team 0 ： ', itemDetail.service_team);
        itemDetail.service_team = `${itemDetail.service_team[0].id}`;
      }
      if (
        itemDetail.inspection_type === 1 &&
        Array.isArray(itemDetail.service_team)
      ) {
        console.log(' itemDetail.service_team 1 ： ', itemDetail.service_team);
        itemDetail.service_team = itemDetail.service_team.map(v => `${v.id}`);
      }
      if (!itemDetail.service_team) {
        console.log(' itemDetail.service_team 2 ： ', itemDetail.service_team);
        itemDetail.service_team = null;
      }

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
      );

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
          // power_number: v.power_number.split(','),
          power_number: v.power_number ? `${v.power_number.id}` : null,
          power_number_id: v.power_number ? `${v.power_number.id}` : null,
          power_number_name: v.power_number
            ? `${v.power_number.power_number}`
            : null,
          key: Math.random(),
        })),
        houseNoList: houseNoListData,
        teamList: formatSelectList([...teamList, ...service_team], 'name'),
        clientList: formatSelectList([...clientList, customer], 'name'),
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
      console.log(' removeItems 修改  ： ', state, payload, type);
      const removeList = payload.payload.id.split(',');
      console.log(' removeList ： ', removeList);
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          removeList.every(item => v.id != item),
        ),
      };
    },

    getPowerInfo(state, { payload, type }) {
      return {
        ...state,
        powerInfoList: formatSelectList(payload.list, 'power_number'),
      };
    },
    // addPowerInfo(state, { payload, type }) {
    //   const { powerInfoData } = state;
    //   console.log(' addPowerInfo ： ', state, payload, powerInfoData);
    //   return {
    //     ...state,
    //     // powerInfoData: payload.list.map(v => ({ ...v, key: Math.random(), isEdit: false, })),
    //     powerInfoData: powerInfoData.map((v, i) => {
    //       console.log(
    //         ' v.key === payload.payload.key ： ',
    //         v.key === payload.payload.key,
    //       );
    //       return v.key === payload.payload.key
    //         ? {
    //             ...v,
    //             ...payload.list[0],
    //             isEdit: false,
    //           }
    //         : v;
    //     }),
    //   };
    // },
    // editPowerInfo(state, { payload, type }) {
    //   const { powerInfoData } = state;
    //   console.log(' editPowerInfo ： ', state, payload, powerInfoData);
    //   return {
    //     ...state,
    //     powerInfoData: powerInfoData.map((v, i) => {
    //       console.log(
    //         ' v.key === payload.payload.key ： ',
    //         v.key === payload.payload.key,
    //       );
    //       return v.key === payload.payload.key
    //         ? {
    //             ...v,
    //             ...payload.bean,
    //           }
    //         : v;
    //     }),
    //   };
    // },
    // removePowerInfo(state, { payload, type }) {
    //   console.log(' removePowerInfo ： ', state, payload);
    //   const { powerInfoData } = state;
    //   const { action, key, index, value } = payload.payload;
    //   let newData = [];
    //   // if (action === 'localRemove') {
    //   //   newData = powerInfoData.filter((v, i) => v.key != key);
    //   // } else {
    //   //   newData = payload.list.filter(v => v.id != payload.payload.id);
    //   // }
    //   newData = powerInfoData.filter(v => {
    //     console.log(
    //       ' v.id != payload.id ： ',
    //       v.id != payload.payload.id,
    //       v.id,
    //       payload.id,
    //     );
    //     return v.id != payload.payload.id;
    //   });
    //   console.log(' newData ： ', newData);
    //   return {
    //     ...state,
    //     powerInfoData: newData,
    //   };
    // },
    addPowerInfo(state, { payload, type }) {
      const { powerInfoData } = state;
      console.log(' addPowerInfo ： ', state, payload, powerInfoData);
      return {
        ...state,
        isShowModal2: false,
        powerInfoData: [...powerInfoData, payload.list[0]],
      };
    },
    editPowerInfo(state, { payload, type }) {
      const { powerInfoData } = state;
      console.log(' editPowerInfo ： ', state, payload, powerInfoData);
      return {
        ...state,
        isShowModal2: false,
        powerInfoData: powerInfoData.map((v, i) => {
          return v.id === payload.payload.id
            ? {
                ...v,
                ...payload.bean,
              }
            : v;
        }),
      };
    },
    removePowerInfo(state, { payload, type }) {
      console.log(' removePowerInfo ： ', state, payload);
      const { powerInfoData } = state;
      return {
        ...state,
        powerInfoData: powerInfoData.filter(v => {
          console.log(
            ' v.id != payload.id ： ',
            v.id != payload.payload.id,
            v.id,
            payload.id,
          );
          return v.id != payload.payload.id;
        }),
      };
    },
    addOutline(state, { payload, type }) {
      const { outLineTableData } = state;
      console.log(' addOutline ： ', state, payload, outLineTableData);
      return {
        ...state,
        isShowModal2: false,
        outLineTableData: [
          ...outLineTableData,
          {
            ...payload.bean,
            power_number: `${payload.bean.power_number.id}`,
          },
        ],
      };
    },
    editOutline(state, { payload, type }) {
      const { outLineTableData } = state;
      console.log(' editOutline ： ', state, payload, outLineTableData);
      return {
        ...state,
        isShowModal2: false,
        outLineTableData: outLineTableData.map((v, i) => {
          return v.id === payload.payload.id
            ? {
                ...v,
                ...payload.bean,
                power_number: `${payload.bean.power_number.id}`,
              }
            : v;
        }),
      };
    },
    removeOutline(state, { payload, type }) {
      console.log(' removeOutline ： ', state, payload);
      const { outLineTableData } = state;
      return {
        ...state,
        outLineTableData: outLineTableData.filter(
          v => v.id != payload.payload.id,
        ),
      };
    },
    modifyPowerInfo(state, { payload, type }) {
      console.log(' modifyPowerInfo ： ', state, payload);
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

      console.log(' modifyPowerInfo 修改  ： ', state, payload, type, newData);
      return {
        ...state,
        powerInfoData: newData,
      };
    },
    getPower(state, { payload, type }) {
      console.log(' getPower 修改  ： ', state, payload, type);
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
    getTeam(state, { payload, type }) {
      return {
        ...state,
        teamList: formatSelectList(payload.list, 'name'),
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
      console.log(' getDistrict ： ', state, payload, datas);

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

    showFormModal2(state, { payload, type }) {
      console.log(' showFormModal2 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal2: true,
        action2: payload.action,
        record: payload.record,
        extraData2: payload.extraData2,
      };
    },
    onCancel2(state, { payload, type }) {
      console.log(' onCancel2 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal2: false,
        itemDetail2: {},
      };
    },

    addOutLineTableItem(state, { payload, type }) {
      const { outLineTableData } = state;
      console.log(' addOutLineTableItem ： ', state, payload, outLineTableData);
      return {
        ...state,
        // outLineTableData: payload.list.map(v => ({ ...v, key: Math.random(), isEdit: false, })),
        outLineTableData: outLineTableData.map((v, i) => {
          console.log(
            ' v.key === payload.payload.key ： ',
            v.key === payload.payload.key,
          );
          return v.key === payload.payload.key
            ? {
                ...v,
                // ...payload.list[0],
                ...payload.bean,
                power_number: payload.bean.power_number
                  ? `${payload.bean.power_number.id}`
                  : null,
                power_number_id: payload.bean.power_number.id,
                power_number_name: payload.bean.power_number.power_number,
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
      );
      return {
        ...state,
        outLineTableData: outLineTableData.map((v, i) => {
          console.log(
            ' v.key === payload.payload.key ： ',
            v.key === payload.payload.key,
          );
          return v.key === payload.payload.key
            ? {
                ...v,
                ...payload.bean,
                power_number: `${payload.bean.power_number.id}`,
                isEdit: false,
              }
            : v;
        }),
      };
    },
    removeOutLineTableItem(state, { payload, type }) {
      console.log(' removeOutLineTableItem ： ', state, payload);
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
        );
        return v.id != payload.payload.id;
      });
      console.log(' newData ： ', newData);
      return {
        ...state,
        outLineTableData: newData,
      };
    },
    modifyOutLineTableItem(state, { payload, type }) {
      console.log(' modifyOutLineTableItem ： ', state, payload);
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
      );
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
      );
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
      console.log(
        ' addItemAsync ： ',
        powerInfoData,
        outLineTableData,
        powerInfoData,
        payload,
      );

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
      // console.log(' isRight ： ', isRight);
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
        console.log(' params ： ', params);
      }
      console.log(' params ： ', params);

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
      );
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
      console.log(' isRight ： ', isRight);
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
        console.log(' params ： ', params);
      }
      console.log(' params ： ', params);
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
      console.log(' removeItemsAsync ： ', payload, type);
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
    *exportDutyDataAsync({ payload, action, type }, { call, put }) {
      console.log(' exportDutyDataAsync ： ', payload, type);
      const res = yield call(services.exportDutyData, payload);
      return res;
    },

    // *addPowerInfoAsync({ payload, action, type }, { call, put, select }) {
    //   const { powerInfoData } = yield select(state => state[namespace]);
    //   const isRight = getIsRight(powerInfoData);
    //   console.log(' addPowerInfoAsync ： ', payload, powerInfoData);
    //   console.log(' isRight ： ', isRight);
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
    *getPowerInfoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getPowerInfo, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *addPowerInfoAsync({ payload, action, type }, { call, put, select }) {
      console.log(' addPowerInfoAsync ： ', payload);
      const res = yield call(services.addPowerInfo, {
        electrical_info_list: [format2Null(payload, validateConfig)],
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
      const res = yield call(
        services.editPowerInfo,
        format2Null(payload, validateConfig),
      );
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
    *getTeamAsync({ payload, action, type }, { call, put }) {
      console.log(' getTeamAsync ： ', payload);
      const res = yield call(teamServices.getList, payload);
      yield put(action({ ...res, payload }));
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
      console.log(' batchGetAsync ： ');
      const res = yield [
        call(clientServices.getList, payload),
        call(houseNoServices.getList, {
          keyword: payload,
        }),
        call(houseNoServices.getList, {
          customer: 1,
        }),
      ];
      console.log('  reresresress ：', res);
    },

    *getDistrictAsync({ payload, action, type }, { call, put }) {
      console.log(' getDistrictAsync ： ', payload, type);
      const res = yield call(clientServices.getDistrict, payload);
      console.log('  getDistrictAsync res ：', res);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },

    *addPowerNumberAsync({ payload, action, type }, { call, put }) {
      console.log(' addOutLineTableItemAsync ： ', payload);
      const res = yield call(services.addOutLine, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *addOutlineAsync({ payload, action, type }, { call, put }) {
      console.log(' addOutlineAsync ： ', payload);
      const res = yield call(services.addOutLine, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *editOutlineAsync({ payload, action, type }, { call, put }) {
      console.log(' editOutlineAsync ： ', payload);
      const res = yield call(services.editOutLine, payload);
      yield put(
        action({
          ...res,
          payload,
        }),
      );
    },
    *removeOutlineAsync({ payload, action, type }, { call, put }) {
      console.log(' removeOutlineAsync ： ', payload);
      const res = yield call(services.removeOutLine, payload);
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
            // power_number: payload.power_number.join(','),
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
      // const params = {
      //   outline_set: payload,
      //   // powerstation: itemDetail.id,
      // };
      const params = {
        ...payload,
        // power_number: payload.power_number.join(','),
      };
      const res = yield call(services.editOutLine, params);
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

    // *addCircuitItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.addCircuitItem, payload);
    //   yield put({ type: 'addCircuitItem' });
    // },
    // *editCircuitItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.editCircuitItem, payload);
    //   yield put({ type: 'editCircuitItem' });
    // },
    // *removeCircuitItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.removeCircuitItem, payload);
    //   yield put({ type: 'removeCircuitItem' });
    // },
  },
  // subscriptions: {
  //   setup: (props) => {
  //     console.log(' setupsetup ： ', props, this);
  //     const { dispatch, history } = props;
  //     //
  //     // const res = await Promise.allSettled(11)
  //     // console.log(' resresres ： ', res);
  //   },
  // },
};

export const actions = createAction(model);

export default model;
