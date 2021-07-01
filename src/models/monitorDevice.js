import { init, action } from '@/utils/createAction';
import * as services from '@/services/monitorDevice';
import { formatSelectList, nowYearMonth, tips } from '@/utils';

const namespace = 'monitorDevice';
const { createActions } = init(namespace);

const otherActions = ['getRealDataAsync', 'handleFileAsync', 'uploadFileAsync'];

const batchTurnActions = ['setIsImporting'];

export const actions = {
  ...createActions(otherActions, batchTurnActions),
};

// console.log(' actions ： ', actions,  )//

export const mapStateToProps = state => state[namespace];

const loopUpload = ({ res, cb }) => {
  let timer = null;
  const { record_id } = res.bean;
  console.log(' loopUpload   ,   ： ', res, record_id, timer);

  const handleRequest = async () => {
    const res = await services.handleFile({ d_id: record_id });
    const { status } = res.bean;
    console.log(' handleRes    res await 结果  ：', res, timer, status); //
    if (status == 1) {
      const statusMap = {
        0: '文件上传中！',
        1: '文件上传完成！',
        2: '文件上传失败！',
      };
      tips(`${statusMap[status]}`, status);
      cb({ isImporting: false, importStatus: statusMap[status] });
      clearInterval(timer);
    }
  };
  timer = setInterval(handleRequest, 2000);
};

export default {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    realDataParams: {},
    isImporting: false,
    importStatus: '',
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
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list.map(v => ({
          ...v,
          approval_time:
            v.approval_time !== 'NaT' ? v.approval_time : undefined,
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      const {
        customer_id,
        station_id,
        electricity_user_id,
        equipment_id,
        device_id,
        template_id,
      } = payload.bean;

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          customer_id: `${customer_id}`,
          electricity_user_id: `${electricity_user_id}`,
          station_id: `${station_id}`,
          equipment_id: `${equipment_id}`,
          device_id: `${device_id}`,
          template_id: `${template_id}`,
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

    getRealData(state, { payload, type }) {
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        realDataParams: payload.payload.realDataParams,
        itemDetail: {
          ...payload.bean,
          // customer_id: `${customer_id}`,
          // electricity_user_id: `${electricity_user_id}`,
          // station_id: `${station_id}`,
          // equipment_id: `${equipment_id}`,
          // device_id: `${device_id}`,
          // template_id: `${template_id}`,
        },
      };
    },
    setIsImporting(state, { payload, type }) {
      console.log(' setIsImporting ： ', payload); //
      return {
        ...state,
        isImporting: payload.isImporting,
        importStatus: payload.importStatus,
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

    *handleFileAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.handleFile, payload);
    },
    *uploadFileAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.uploadFile, payload);
      console.log(' handleRes res   e,   ： ', res);
      // const handleRes = yield call(services.handleFile, {d_id: res.bean.record_id});
      // console.log(' handleRes   e,   ： ', handleRes);
      yield put({
        type: 'setIsImporting',
        payload: {
          isImporting: true,
        },
      });
      loopUpload({ res, cb: payload.cb });
    },
    *getRealDataAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getRealData, payload);
      yield put(action({ ...res, payload }));
    },
  },
};
