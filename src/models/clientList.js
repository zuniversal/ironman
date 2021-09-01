import { init } from '@/utils/createAction';
import * as services from '@/services/clientList';
import * as clientPlanServices from '@/services/clientPlan';
import { CLIENTLIST_PRIVATE } from '@/configs';

const namespace = 'clientList';
const { createActions, createAction } = init(namespace);

const otherActions = ['addClientPlanAsync', 'getClientPlanDetailAsync'];

const batchTurnActions = ['onTabChange'];

export const mapStateToProps = state => state[namespace];

const initialState = {
  action: '',
  isShowModal: false,
  dataList: [],
  count: 0,
  itemDetail: {},
  searchInfo: {},
  tabType: CLIENTLIST_PRIVATE,
  customer_id: null,
  clientPlanList: [],
};

const model = {
  namespace,

  state: initialState,

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
        // itemDetail: payload.record ?? {},
        customer_id: payload.customer_id,
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
      console.log(' getItem 修改  ： ', state, payload, type);
      const {
        customer_admin,
        service_staff,
        last_service_staff,
        electricityuser,
        file,
        contact,
        service_staff_name,
        last_service_staff_name,
        service_organization_name,
        enterprise,
      } = payload.bean;
      const { userList } = state;
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
      const adminList =
        customer_admin && customer_admin.length > 0
          ? customer_admin.map(v => ({
              ...v,
              // tags: v.tags ?? [],
              tags: v.tags.map(v => `${v.id}`) ?? [],
              password: v.password ? v.password : null,
              wechat: v.wechat ? v.wechat : null,
              email: v.email ? v.email : null,
            }))
          : // : [{}]
            null;
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: {
          ...payload.bean,
          customer_admin: adminList,
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
            tax_num: enterprise.tax_num ? enterprise.tax_num : null,
            legal_person: enterprise.legal_person
              ? enterprise.legal_person
              : null,
            legal_person_phone: enterprise.legal_person_phone
              ? enterprise.legal_person_phone
              : null,
            industry: enterprise.industry ? enterprise.industry : null,
            asset: enterprise.asset ? enterprise.asset : null,
            covered_area: enterprise.covered_area
              ? enterprise.covered_area
              : null,
            parent_enterprise_id: enterprise.parent_enterprise_id
              ? enterprise.parent_enterprise_id
              : null,
          },

          contact: contact.map(v => ({
            ...v,
            is_urge: v.is_urge ? [v.is_urge] : [],
            is_quit: v.is_quit ? [v.is_quit] : [],
            tags: v.tags.map(v => `${v.id}`) ?? [],
            comments: v.comments ? v.comments : null,
            phone: v.phone ? v.phone : null,
            tel: v.tel ? v.tel : null,
            qq: v.qq ? v.qq : null,
            wechat: v.wechat ? v.wechat : null,
            email: v.email ? v.email : null,
          })),
          service_staff: `${service_staff_name}`,
          last_service_staff: `${last_service_staff_name}`,
          // service_organization_id: service_organization_name ?? null,
        },
        // adminList: [payload.bean.customer_admin],
        adminList: payload.bean.customer_admin,
        adminList,
        tableData: payload.bean.customer_admin.map(v => ({
          ...v,
          // acount:
          key: Math.random(),
          password: '',
          isEdit: false,
        })),
        // adminList: [...adminList, payload.bean.customer_admin],
        // userList: [serviceStaff, lastServiceStaff, ...userList],
        userList: filterObjSame([...userList, serviceStaff, lastServiceStaff]),
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

    getClientPlanDetail(state, { payload, type }) {
      console.log(' getClientPlanDetail ： ', payload); //
      return {
        ...state,
        isShowModal: true,
        action: payload.payload.action,
        clientPlanList: payload.list,
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
      console.log(' getItemAsync ： '); //
      const res = yield call(services.getItem, payload);
      // yield put({ type: 'getItem' });
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

    *getClientPlanDetailAsync({ payload, action, type }, { call, put }) {
      console.log(' getClientPlanDetailAsync ： ', payload); //
      const res = yield call(clientPlanServices.getList, payload);
      yield put({ type: 'getClientPlanDetail', payload: { ...res, payload } });
    },
    *addClientPlanAsync({ payload, action, type }, { call, put }) {
      const res = yield call(clientPlanServices.addItem, payload);
      // yield put({ type: 'addClientPlan', payload: { ...res, payload, } });
      yield put({ type: 'getListAsync' });
    },
  },
};

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };
export const actions = createAction(model);
console.log(
  ' model 修改  ： ',
  Object.keys(model.effects),
  actions,
  createAction(model),
);

export default model;
