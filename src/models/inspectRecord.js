import { init, action } from '@/utils/createAction';
import * as services from '@/services/inspectRecord';
import * as clientServices from '@/services/client';
import * as powerStationServices from '@/services/powerStation';
import { formatSelectList, nowYearMonth } from '@/utils';
import { missionsStatusMap, inspectRecordDateConfig } from '@/configs';
import moment from 'moment';

const namespace = 'inspectRecord';
const { createActions } = init(namespace);

const otherActions = ['getMissionItemAsync', 'getClientAsync', 'getPowerAsync'];

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
    isShowPdfDetail: false,
    missionItemDetail: {},
    isShowExportPdf: false,

    isExportPDF: false,
    clientList: [],
    powerList: [],
    isEdit: false,
    itemDetailCopy: {},
    formData: {},
    formKey: 0,
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
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
      console.log(' onCancel 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: false,
        itemDetail: {},
        isEdit: false,
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list.map(v => ({
          ...v,
          end_time: v.end_time ? v.end_time.split('T')[0] : '',
          assign_date: v.assign_date ? v.assign_date.split('T')[0] : '',
          // created_time: v.created_time?.split('T')[0],
        })),
        count: payload.rest.count,
        isShowModal: false,
        searchInfo: payload.searchInfo,
      };
    },
    getItem(state, { payload, type }) {
      const {
        created_time = '',
        start_time = '',
        end_time = '',
        power_data = [],
        inspection_task,
        spect_out = [],
        safety_equirpment = {},
      } = payload.bean;
      const isExportPDF = payload.payload.extraAction === 'showExportPdf';
      console.log(' getItemgetItem ： ', payload, isExportPDF);
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

      const safetyEquirpment = {
        ...safety_equirpment,
      };
      inspectRecordDateConfig.forEach((v, i) => {
        console.log(' inspectRecordDateConfig v ： ', safety_equirpment, v, i);
        safetyEquirpment[v] = moment(safety_equirpment[v]);
      });
      console.log(' safetyEquirpment ： ', safetyEquirpment, safety_equirpment);

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

        safety_equirpment: safetyEquirpment,
      };

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
        isShowPdfDetail: isExportPDF,
        isShowExportPdf: isExportPDF,
        isShowModal: !isExportPDF,
        isExportPDF: isExportPDF,
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
        isEdit: false,
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

    getClient(state, { payload, type }) {
      console.log(' getClient 修改  ： ', state, payload, type);
      return {
        ...state,
        clientList: formatSelectList(payload.list, 'name'),
      };
    },
    getPower(state, { payload, type }) {
      console.log(' getPower 修改  ： ', state, payload, type);
      return {
        ...state,
        powerList: formatSelectList(payload.list, 'name'),
      };
    },
    closePdf(state, { payload, type }) {
      return {
        ...state,
        isShowPdfDetail: false,
      };
    },
    getMissionItem(state, { payload, type }) {
      const {
        created_time = '',
        start_time = '',
        end_time = '',
        status,
      } = payload.bean;
      console.log(' getMissionItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        missionItemDetail: {
          ...payload.bean,
          created_time: created_time ? created_time.split('T')[0] : '',
          start_time: start_time ? start_time.split('T')[0] : '',
          end_time: end_time ? end_time.split('T')[0] : '',
          status: missionsStatusMap[status],
        },
      };
    },

    closePdf(state, { payload, type }) {
      return {
        ...state,
        isShowExportPdf: false,
      };
    },
    toggleExportPDF(state, { payload, type }) {
      console.log(' finish  toggleExportPDF ： ', payload, state);
      return {
        ...state,
        isExportPDF: !state.isExportPDF,
        isShowExportPdf: !state.isShowExportPdf,
        isShowPdfDetail: !state.isShowPdfDetail,
      };
    },
    toggleEdit(state, { payload, type }) {
      console.log(' toggleEdit ： ', payload);
      return {
        ...state,
        isEdit: !state.isEdit,
      };
    },
    onFieldChange(state, { payload, type }) {
      console.log(' onFieldChange ： ', payload);
      // const {powerData,  } = payload.formData
      // // const {powerData,  } = payload.value
      const { itemDetailCopy, itemDetail, formData, formKey } = state;
      const newState = {
        ...itemDetailCopy,
      };
      const { aimFor, keys, index, formVal, form, value } = payload;

      // form.setFieldsValue({
      //   powerData: { id: '999' },
      // });
      if (aimFor === 'maxMd') {
        // if (payload.value.powerData) {
        const { powerData } = formVal;
        console.log(' powerData ： ', powerData);
        const maxMDKeys = ['peak_md', 'flat_1_md', 'flat_2_md', 'valley_md'];
        const maxMDArr = maxMDKeys.map(v => powerData[v]).filter(v => v);
        const maxMDVal = Math.max(...maxMDArr);
        const maxMD = maxMDVal * powerData.multiplying_power;
        console.log(
          ' maxMDArr  maxMDKeys.map v ： ',
          maxMDVal,
          formVal,
          powerData.multiplying_power,
          maxMD,
          formData,
          maxMDArr,
          newState,
          formKey,
          itemDetailCopy,
        );
        itemDetailCopy.power_data[index].maxMD = maxMD;
        formData.power_data[index].maxMD = maxMD;
        newState.maxMD = maxMD;
        form.setFieldsValue({
          // battery_voltage: maxMD,
          powerData: {
            ...powerData,
            max_md: maxMD,
            [keys]: value,
          },
        });

        console.log(' form.getFieldsValue() ： ', form.getFieldsValue());
      }
      // const {powerData,  } = payload.formData
      // // const {powerData,  } = payload.value

      return {
        ...state,
        // formKey: formKey++,
        itemDetailCopy: {
          ...newState,
        },
        formData,
        // itemDetail: {
        //   ...itemDetail,
        // },
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        ...payload,
        status: 'completed',
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
      console.log(' getItemAsync ： ', payload);
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put(action({ ...res, payload }));
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      // yield put(action({ ...res, payload }));
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put(action({ ...res, payload }));
    },

    *getClientAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getPowerAsync({ payload, action, type }, { call, put }) {
      const res = yield call(powerStationServices.getList, payload);
      yield put(action({ ...res, payload }));
    },
    *getMissionItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getMissionItem, payload);
      yield put(action({ ...res, payload }));
      // yield put({ type: 'getItem', payload: { ...res, payload } });
    },
  },
};
