import { init, action } from '@/utils/createAction';
import * as services from '@/services/monitorApproval';
import { addItem as addMonitorDeviceItem } from '@/services/monitorManage';
import { formatSelectList, nowYearMonth } from '@/utils';
import { deviceFrequencyConfig } from '@/configs';

const namespace = 'monitorApproval';
const { createActions } = init(namespace);

const otherActions = ['approvalAsync', 'approvalPassAsync'];

const batchTurnActions = [];

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
    dataList: [],
    count: 0,
    itemDetail: {},
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
        // itemDetail: payload.action === 'approval' ? payload.record : {},
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
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
        },
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
      console.log(' getItemAsync ： ', payload); //
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
    *approvalPassAsync({ payload, action, type }, { call, put }) {
      console.log(' approvalPassAsync ： ', payload); //
      const res = yield call(services.editItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *approvalAsync({ payload, action, type }, { call, put }) {
      console.log(' approvalAsync ： ', payload); //
      const {
        id,
        outline_id,
        equipment_id,
        customer_id,
        electricity_user_id,
        device_id,
        electrical_info_id,
        name,
        power,
        current_ratio,
        voltage_ratio,
      } = payload;

      const deviceParams = {
        id,
        outline_id,
        equipment_id,
        customer_id,
        electricity_user_id,
        device_id,
        electrical_info_id,
        name,
        power,
        frequency: deviceFrequencyConfig[0].value,
        template_id: null,
        comments: null,
      };
      const point_data = {
        customer_id,
        electricity_user_id,
        equipment_id,
        name,
        frequency: deviceFrequencyConfig[0].value,
        current_ratio,
        voltage_ratio,
        power,
        comments: null,
        electrical_info_id,
        station_id: null,
      };
      console.log(' approvalAsyncdeviceParams ： ', deviceParams); //
      const deviceRes = yield call(addMonitorDeviceItem, deviceParams);
      console.log(' approvalAsync deviceRes ： ', deviceRes); //
      // const { , ...rest  } = payload
      // const res = yield call(services.editItem, payload);
      yield put({ type: 'approvalPassAsync', payload });
      // const res = yield call(services.editItem, {
      //   ...payload,
      //   record_id: id,
      //   // point_data,
      // });
      // console.log(' approvalAsync res ： ', res); //
      // yield put({ type: 'getListAsync' });
    },
  },
};
