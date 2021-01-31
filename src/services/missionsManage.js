import {
  get,
  post,
  put,
  patch,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

export const getList = p => noTipsGet('console/OMS/task/tasks', p);
export const getItem = p => noTipsGet(`console/OMS/task/${p.d_id}/info`, p);
export const addItem = p => post('console/OMS/task', p);
export const editItem = p => put(`console/OMS/task/${p.d_id}/edit`, p);
export const removeItem = p => remove(`console/OMS/task/${p.d_id}`, p);

export const getMissionClient = p => noTipsGet(`console/OMS/task/customers`, p);
export const getClientItem = p =>
  noTipsGet(`console/OMS/task/customer/${p.d_id}`, p);
export const closeMission = p => put(`console/OMS/task/${p.d_id}`, p);
export const startWorkOrder = p => post(`console/OMS/task/order`, p);
export const linkContract = p => put(`console/OMS/task/${p.id}/contract`, p);
export const schedule = p => put(`console/OMS/task/${p.d_id}/plan_date`, p);
export const confirmSchedule = p =>
  put(`console/OMS/task/${p.d_id}/check_plan`, p);
// export const confirmSchedule = p =>
//   patch(`console/OMS/task/${p.d_id}/confirmSchedule`, p);

export const exportData = p => post('console/OMS/task/export', p);
