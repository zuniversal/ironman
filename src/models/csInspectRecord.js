import { init, action } from '@/utils/createAction'; //
import * as services from '@/services/csInspectRecord';
import { formatSelectList, nowYearMonth } from '@/utils';

const namespace = 'csInspectRecord';
const { createActions } = init(namespace);

const otherActions = ['getMissionItemAsync', 'confirmInspectAsync'];

const batchTurnActions = [
  'closePdf',
  'toggleExportPDF',
  'toggleEdit',
  'onFieldChange',
];

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
    isShowExportPdf: false,
    isShowPdfDetail: false,
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type); //
      if (payload.action === 'inspectReport') {
        // setTimeout(() => {
        //   window.print()
        // }, 3000)
        // setTimeout(() => window.print(), 2000)
      }

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
        dataList: payload.list.map(v => ({
          ...v,
          work_date: v.work_date ? v.work_date.split('T')[0] : '',
          assign_date: v.assign_date ? v.assign_date.split('T')[0] : '',
          created_time: v.work_date ? v.work_date.split('T')[0] : '',
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload); //
      const {
        created_time = '',
        start_time = '',
        end_time = '',
        power_data = [],
        inspection_task,
        spect_out = [],
      } = payload.bean;
      const isExportPdf = payload.payload.extraAction === 'showExportPdf';
      const spectInData = [];
      power_data?.forEach(v =>
        v?.spect_in.forEach(item => spectInData.push(item)),
      );
      // const powerDataFormat = power_data.map((v, index) => {
      //   v.spect_in.forEach(item => spectInData.push(item))
      //   return {
      //     ...v,
      //     index,
      //   }
      // });

      const itemDetail = {
        ...payload.bean,
        // created_time: created_time ? created_time.split('T')[0] : '',
        // start_time: start_time ? start_time.split('T')[0] : '',
        // end_time: end_time ? end_time.split('T')[0] : '',
        workDate:
          inspection_task && inspection_task.work_date
            ? inspection_task.work_date.split('T')[0]
            : '',
        powerData: power_data && power_data[0],
        power_data: power_data.map(v => ({
          ...v,
          spect_out: v.spect_out.map(v => ({
            ...v,
            outlineName: v?.outline?.name,
          })),
        })),
        spectInData,
      };
      console.log(' getItemgetItem ： ', payload, itemDetail, power_data); //

      const formData = {
        ...payload.bean,
        spectIn:
          power_data[0] && power_data[0].spect_in ? power_data[0].spect_in : [],
        spectOut: spect_out.length > 0 ? spect_out[0] : {},
        index: 0,
      };

      return {
        ...state,
        action: payload.payload.action,
        isShowPdfDetail: isExportPdf,
        isShowExportPdf: isExportPdf,
        isShowModal: isExportPdf ? false : true,
        d_id: payload.payload.d_id,
        itemDetail: itemDetail,
        itemDetailCopy: itemDetail,
        formData: formData,
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

    closePdf(state, { payload, type }) {
      return {
        ...state,
        isShowExportPdf: false,
        isShowPdfDetail: false,
      };
    },
    toggleExportPDF(state, { payload, type }) {
      console.log(' toggleExportPDF ： ', payload); //
      return {
        ...state,
        isExportPDF: !state.isExportPDF,
        isShowExportPdf: !state.isShowExportPdf,
        isShowPdfDetail: !state.isShowPdfDetail,
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
      console.log(' getItemAsync ： ', payload); //
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    // *addItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.addItem, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *editItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.editItem, payload);
    //   yield put(action({ ...res, payload }));
    // },
    // *removeItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.removeItem, payload);
    //   yield put(action({ ...res, payload }));
    // },

    // *getMissionItemAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.getMissionItem, payload);
    //   yield put({ type: 'getItem', payload: { ...res, payload } });
    // },
    // *confirmInspectAsync({ payload, action, type }, { call, put }) {
    //   const res = yield call(services.confirmInspect, payload);
    //   yield put({ type: 'getItem', payload: { ...res, payload } });
    // },
  },
};
