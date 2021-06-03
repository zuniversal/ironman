import { init, action } from '@/utils/createAction';
import * as services from '@/services/electricInfo';
import * as monitorManageServices from '@/services/monitorManage';
import { getRelatived } from '@/services/client';
import { getCircuitItem, removeCircuitItem } from '@/services/powerStation';
import * as assetsServices from '@/services/assets';
import { formatSelectList, getItem } from '@/utils';
import { history } from 'umi';
import { handleGuestMode } from '@/models/user';
import { recursiveAssets } from '@/models/assets';

const namespace = 'electricInfo';
const { createActions } = init(namespace);

const otherActions = [
  'getRelativedAsync',
  'removeCircuitItemAsync',
  'getAssetListAsync',
  'getAssetDetailAsync',
  // 'getPowerInfoAsync', 'getClientPowerAsync', 'getMonitorDeviceListAsync',
];

const batchTurnActions = ['setStationList'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const flatAssets = (data = {}, config = []) => {
  Object.keys(data).forEach(key => {
    config.push(data[key]);
    if (data[key].sub && Object.keys(data[key].sub).length) {
      flatAssets(data[key].sub, config);
    }
  });
  return config;
};

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    powerInfo: {},
    clientPowerList: [],
    clientPowerList2: [],
    monitorDeviceList: [],
    stationList: [],
    houseNo: null,
    stationId: null,
    canvasInfo: {},
    realDataParams: {},
    assetList: [],
    subAssetList: [],
    selectItem: {},
    assetDetail: {},
    subAssetTreeList: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        realDataParams: payload.realDataParams,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: false,
        assetDetail: {},
        realDataParams: {},
      };
    },
    // getPowerInfo(state, { payload, type }) {
    //   return {
    //     ...state,
    //     powerInfo: payload.bean,
    //   };
    // },
    // getClientPower(state, { payload, type }) {
    //   const clientPowerList = formatSelectList(
    //     payload.list,
    //     'customer_name',
    //     'customer_id',
    //   )
    //   console.log('  clientPowerList ：', clientPowerList,  )//
    //   return {
    //     ...state,
    //     clientPowerList: clientPowerList,
    //   };
    // },
    // getMonitorDeviceList(state, { payload, type }) {
    //   const monitorDeviceList = payload.list
    //   console.log('  getMonitorDeviceList ：', monitorDeviceList,  )//
    //   return {
    //     ...state,
    //     monitorDeviceList: monitorDeviceList,
    //     dataList: monitorDeviceList,
    //   };
    // },
    getRelatived(state, { payload, type }) {
      const clientPowerList = formatSelectList(
        payload.list.map(v => v.electricity_users[0]),
        'number',
        'number',
      );
      const stationList = clientPowerList[0].stations.map(v => ({
        ...v,
        text: v.name,
        type: `${v.id}`,
      }));
      console.log('  getRelatived ：', clientPowerList, stationList); //
      return {
        ...state,
        clientPowerList: clientPowerList,
        stationList: stationList,
        houseNo: `${clientPowerList[0].number}`,
        stationId: stationList[0].type,
        powerInfo: payload.powerInfo,
        canvasData: payload.canvasData,
        canvasInfo: payload.canvasInfo,
      };
    },
    setStationList(state, { payload, type }) {
      console.log('  setStationList ：', payload); //
      return {
        ...state,
        stationList: payload.stationList.map(v => ({
          text: v.name,
          type: `${v.id}`,
        })),
        houseNo: payload.houseNo,
      };
    },

    getAssetList(state, { payload, type }) {
      console.log(' getAssetList 修改  ： ', state, payload, type); //
      // const dataList = recursiveAssets(payload.list)
      // const assetList = payload.list.map((v) => ({
      //   key: v.id,
      //   title: v.name,
      // }))
      const assetList = recursiveAssets(payload.list);
      console.log(' assetList ： ', assetList); //
      // const subAssetList = dataList[3].children
      const subAssetList = assetList[0].children;
      return {
        ...state,
        assetList,
        assetList: assetList,
        selectItem: assetList[0],
        subAssetList,
        subAssetTreeList: subAssetList.map(v => ({ tab: v.name, key: v.id })),
        // subAssetList: [],
        // subAssetTreeList: [],
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
  },

  effects: {
    *getRelativedAsync({ payload, action, type }, { call, put }) {
      handleGuestMode({ put });
      yield put({
        type: 'user/getUserInfoAsync',
      });
      const { customer_id } = history.location.query;
      console.log(
        ' history22 ： ',
        getItem('userInfo'),
        getItem('userInfo')?.enterprises[0],
      ); //
      const { customers = [] } = getItem('userInfo')?.enterprises[0];
      const user_id = customers[0]?.id;
      console.log(' history ： ', history, customer_id, user_id); //
      const clientId = customer_id || user_id;
      console.log(' history clientId ： ', clientId); //
      if (clientId) {
        const res = yield call(getRelatived, {
          customer_id: clientId,
        });
        console.log(' resres ： ', res); //
        const powerInfoRes = yield call(services.getPowerInfo, {
          ele_number: res.list[0].electricity_users[0].number,
        });
        const canvasDataRes = yield call(getCircuitItem, {
          power_station_id: res.list[0].electricity_users[0].stations[0].id,
        });
        yield put({
          type: 'getAssetListAsync',
          payload: {
            customer_id: clientId,
            electricity_user_id: res.list[0].electricity_users[0].id,
            // electricity_user_id: '6464',
            // customer_id: '6464',
          },
        });
        console.log(
          ' canvasDataRes, res ： ',
          powerInfoRes,
          canvasDataRes,
          res,
        ); //
        yield put(
          action({
            ...res,
            payload,
            powerInfo: {
              ...powerInfoRes.bean,
              priceType: powerInfoRes.bean.type?.name,
            },
            canvasData: canvasDataRes.list[0]?.draw,
            canvasInfo: canvasDataRes.list[0],
          }),
        );
      }
    },
    *removeCircuitItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(removeCircuitItem, payload);
      yield put({ type: 'removeCircuitItem' });
    },
    // *getPowerInfoAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.getPowerInfo, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getClientPowerAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(getClientPower, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *getMonitorDeviceListAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(monitorManageServices.getList, {
    //     keyword: '0000727272',
    //   });
    //   yield put(action({ ...res, payload }));
    // },
    *getAssetListAsync({ payload, action, type }, { call, put, select }) {
      console.log(' getAssetListAsyncgetAssetListAsync ： ', payload, type);
      const res = yield call(assetsServices.getList, payload);
      let d_id;
      const selectItem = recursiveAssets(res.list)[0];
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
