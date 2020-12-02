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

export const getList = p => noTipsGet(`console/OMS/order`, p);
export const getItem = p => noTipsGet(`console/OMS/order/${p.d_id}/info`, p);
export const addItem = p => post(`console/OMS/order`, p);
export const editItem = p => put(`console/OMS/order/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/order/${p.d_id}`, p);
export const dispatchOrder = p =>
  put(`console/OMS/order/${p.d_id}/assignment`, p);
export const addTicket = p =>
  post(`console/OMS/order/${p.d_id}/work_ticket`, p);

export const exportData = p => post('console/OMS/order/export', p);
// export const exportData = p => get('console/OMS/order/export', p);
