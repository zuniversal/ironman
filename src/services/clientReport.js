import {
  get,
  post,
  put,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

// export const getList = p => noTipsGet('console/OMS/custom_report/bills', p);
// export const getItem = p =>
//   noTipsGet(`console/OMS/custom_report/bills/${p.d_id}`, p);
// export const addItem = p => post('console/OMS/custom_report/bills', p);
// export const editItem = p =>
//   put(`console/OMS/custom_report/bills/${p.d_id}`, p);
// export const removeItem = p =>
//   remove(`console/OMS/custom_report/bills/${p.d_id}`, p);

export const getList = p => noTipsGet(`console/OMS/customer/report`, p);
export const getItem = p =>
  noTipsGet(`console/OMS/customer/report/${p.d_id}`, p);
export const addItem = p => post(`console/OMS/report/`, p);
export const editItem = p => put(`console/OMS/report/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/report/${p}`, p);
export const removeItems = p => remove(`console/OMS/report/`, p);
