import { init, action } from '@/utils/createAction';
import * as services from '@/services/cameraConfig';
import { formatSelectList, nowYearMonth, tips } from '@/utils';
import { CAMERA1 } from '@/configs';

const namespace = 'cameraConfig';
const { createActions } = init(namespace);

const otherActions = ['getCameraVideoAsync', 'getVideoPreviewAsync'];

const batchTurnActions = ['onCameraTabsChange', 'onCancel2'];

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
    d_id: '',

    searchInfo: {},
    type: 'FixedCameraConfigTable',
    type: CAMERA1,
    videoUrl: '',
    token: '',
    extraPayload: {},

    isShowModal2: false,
    action2: '',
  },

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
          station_id: payload.bean.station
            ? `${payload.bean.station.id}`
            : null,
          customer_id: `${payload.bean.customer_id}`,
          system: payload.bean.video_system,
          system: `${payload.bean.system_id}`,
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

    onCameraTabsChange(state, { payload, type }) {
      console.log(' onCameraTabsChange ： ', payload);
      return {
        ...state,
        type: payload.type,
      };
    },
    getCameraVideo(state, { payload, type }) {
      console.log(' getCameraVideo ： ', payload);
      return {
        ...state,
        // videoUrl: payload.bean?.data.url,
        videoUrl: payload.list[0].url,
        token: payload.list[0].token,
        // action: payload.payload.action,
        action: 'showCameraVideo',
        isShowModal: true,
        extraPayload: payload.payload.extraPayload,
      };
    },

    onCancel2(state, { payload, type }) {
      console.log(' onCancel2 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal2: false,
      };
    },
    getVideoPreview(state, { payload, type }) {
      console.log(' getVideoPreview ： ', payload);
      return {
        ...state,
        videoUrl: payload.list[0].url,
        token: payload.list[0].token,
        action2: 'showCameraVideo',
        isShowModal2: true,
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
    *getCameraVideoAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getCameraVideo, payload);
      yield put({ type: 'getCameraVideo', payload: { ...res, payload } });
      // yield put({ type: 'getCameraVideo',  });
    },
    *getVideoPreviewAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getVideoPreview, payload);
      if (res.list) {
        yield put({ type: 'getVideoPreview', payload: { ...res, payload } });
      } else {
        tips('无视频可以预览！', 2);
      }
    },
  },
};
