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

export const getList = p => noTipsGet(`OMS/order`, p);
export const getItem = p => noTipsGet(`OMS/order/${p.d_id}/info`, p);
export const addItem = p => post(`OMS/order`, p);
export const editItem = p => put(`OMS/order/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/order/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/order/OA`, p);
export const getPortrait = p => noTipsGet(`OMS/order/portrait/${p.d_id}`, p);

export const dispatchOrder = p => post(`OMS/order/${p.d_id}/assignment/`, p);
export const addWorkTicket = p => post(`OMS/order/${p.d_id}/work_ticket/`, p);
