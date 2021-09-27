import { init } from '@/utils/createAction';
import * as services from '@/services/myTask';
import * as clientClueServices from '@/services/clientClue';
import * as clientServices from '@/services/client';
import { MYTASK_PENDING_APPROVE } from '@/configs';

const namespace = 'myTask';
const { createActions, createAction } = init(namespace);

const otherActions = [];

const batchTurnActions = ['onTabChange'];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},

  tabType: MYTASK_PENDING_APPROVE,
  taskInfo: {},
  planStepInfo: {},
  planStepId: '',
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      let taskInfo = [];
      if (payload.taskInfo) {
        taskInfo = payload.taskInfo;
      }
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        taskInfo,
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
    // getItem(state, { payload, type }) {
    //   console.log(' getItemgetItem ： ', payload);
    //   const { file, logo } = payload.clientClueRes.bean.content.enterprise;

    //   return {
    //     ...state,
    //     action: payload.payload.action,
    //     isShowModal: true,
    //     itemDetail: {
    //       ...payload.bean,
    //       clientClueRes: {
    //         ...payload.clientClueRes.bean,
    //         ...payload.clientClueRes.bean.content,
    //         file: file ? file.split(',') : [],
    //         logo: logo ? logo.split(',') : [],
    //         contacts: payload.clientClueRes.bean.content.contacts.map(v => ({
    //           ...v,
    //           is_urge: [v.is_urge ? 1 : 0],
    //           is_quit: [v.is_quit ? 1 : 0],
    //           tags: v.tags?.map(v => `${v.id}`) ?? [],
    //         })),
    //       },
    //     },
    //   };
    // },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      const { file, logo } = payload.clientClueRes.bean.enterprise;

      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        itemDetail: {
          ...payload.bean,
          clientClueRes: {
            ...payload.clientClueRes.bean,
            file: file ? file.split(',') : [],
            logo: logo ? logo.split(',') : [],
            contacts: payload.clientClueRes.bean.contacts.map(v => ({
              ...v,
              is_urge: [v.is_urge ? 1 : 0],
              is_quit: [v.is_quit ? 1 : 0],
              tags: v.tags?.map(v => `${v.id}`) ?? [],
            })),
          },
        },
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        planStepInfo: payload.bean,
        planStepId: payload.payload.d_id,
      };
    },
    addItem(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    editItem(state, { payload, type }) {
      return {
        ...state,
        isShowModal: false,
      };
    },
    removeItem(state, { payload, type }) {
      return {
        ...state,
      };
    },

    onTabChange(state, { payload, type }) {
      console.log(' onTabChange ： ', payload);
      return {
        ...state,
        tabType: payload.tabType,
      };
    },
    getClient(state, { payload, type }) {
      console.log(' getClient 修改  ： ', state, payload, type);
      const {
        customer_admin,
        service_staff,
        last_service_staff,
        electricityuser,
        file,
        contacts,
        service_staff_name,
        last_service_staff_name,
        service_organization_name,
        enterprise,
      } = payload.bean;
      const { userList, adminList } = state;
      const serviceStaff = {
        ...service_staff,
        value: `${service_staff?.id}`,
        label: service_staff?.nickname,
      };
      const lastServiceStaff = {
        ...last_service_staff,
        value: `${last_service_staff?.id}`,
        label: last_service_staff?.nickname,
      };
      console.log(
        ' serviceStaff, lastServiceStaff ： ',
        serviceStaff,
        lastServiceStaff,
      );
      return {
        ...state,
        itemDetail: {
          ...payload.bean,
          customer_admin:
            customer_admin && customer_admin.length > 0
              ? customer_admin.map(v => ({ ...v, tags: [] }))
              : [],
          d_id: payload.payload.d_id,
          service_staff: service_staff?.id,
          last_service_staff:
            last_service_staff && last_service_staff?.id
              ? last_service_staff?.id
              : null,
          // electricityuser: electricityuser.map(v => v.number).join(','),
          file: file ? file.split(',') : [],
          enterprise: {
            ...enterprise,
            file: enterprise?.file ? enterprise?.file.split(',') : [],
            logo: enterprise?.logo ? enterprise?.logo.split(',') : [],
          },

          contacts: contacts.map(v => ({
            ...v,
            is_urge: [v.is_urge],
            is_quit: [v.is_quit],
            tags: v.tags.map(v => `${v.id}`) ?? [],
          })),
          service_staff: `${service_staff_name}`,
          last_service_staff: `${last_service_staff_name}`,
          // service_organization_id: service_organization_name ?? '',
        },
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
      yield put({ type: 'getItem', payload: { payload } });
      return;
      const res = yield call(services.getItem, payload);
      // const clientClueRes = yield call(clientClueServices.getItem, payload);
      // const clientClueRes = yield call(clientClueServices.getItem, {
      // const clientClueRes = yield call(clientServices.getItem, {
      //   d_id: res.bean.customer.customer_id,
      //   // d_id: 90049,
      // });
      // const clientClueRes = yield put({ type: 'approveTaskAsync', payload: {
      //   d_id: res.bean.customer.id,
      //   d_id: 14,
      // }});
      // console.log(' getItemAsyncgetItemAsync 修改  ： ', clientClueRes);
      // yield put({
      //   type: 'getItem',
      //   payload: { ...res, payload, clientClueRes },
      // });
      // yield put({
      //   type: 'getClientAsync',
      //   payload: {
      //     d_id: res.bean.customer.customer_id,
      //   },
      // });
      yield put({ type: 'getItem', payload: { ...res, payload } });
    },
    *getClientAsync({ payload, action, type }, { call, put }) {
      console.log(' getClientAsync ： ', payload); //
      const res = yield call(clientServices.getItem, payload);
      yield put({ type: 'getClient', payload: { ...res, payload } });
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

    *approveTaskAsync({ payload, action, type }, { call, put }) {
      console.log(' approveTaskAsync 修改  ： ', payload);
      const res = yield call(services.approveTask, payload);
      yield put({ type: 'getListAsync' });
    },
  },
};

export const actions = createAction(model);

export default model;
