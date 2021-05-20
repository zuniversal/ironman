import { init, action } from '@/utils/createAction';
import * as services from '@/services/electricInfo';
import * as monitorManageServices from '@/services/monitorManage';
import { getClientPower, getRelatived } from '@/services/client';
import { getCircuitItem, removeCircuitItem } from '@/services/powerStation';
import { formatSelectList, getItem } from '@/utils';
import { history } from 'umi';
import { handleGuestMode } from '@/models/user';

const namespace = 'electricInfo';
const { createActions } = init(namespace);

const otherActions = [
  'getRelativedAsync',
  'removeCircuitItemAsync',
  // 'getPowerInfoAsync', 'getClientPowerAsync', 'getMonitorDeviceListAsync',
];

const batchTurnActions = ['setStationList'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

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
        itemDetail: {},
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
  },

  effects: {
    *getRelativedAsync({ payload, action, type }, { call, put }) {
      handleGuestMode({ put });
      yield put({
        type: 'user/getUserInfoAsync',
      });
      const { customer_id } = history.location.query;
      console.log(' history22 ： ', getItem('userInfo')); //
      console.log(
        ' getItem.enterprises[0] ： ',
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
        const powerInfoRes = yield call(services.getPowerInfo, {
          ele_number: res.list[0].electricity_users[0].number,
        });
        const canvasDataRes = yield call(getCircuitItem, {
          power_station_id: res.list[0].electricity_users[0].stations[0].id,
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
  },
};
