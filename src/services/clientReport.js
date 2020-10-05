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

export const getList = p => noTipsGet('OMS/custom_report/bills', p);
export const getItem = p => noTipsGet(`OMS/custom_report/bills/${p.d_id}`, p);
export const addItem = p => post('OMS/custom_report/bills', p);
export const editItem = p => put(`OMS/custom_report/bills/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/custom_report/bills/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/custom_report/bills/oa`, p);
export const getPortrait = p =>
  noTipsGet(`OMS/custom_report/bills/portrait/${p.d_id}`, p);
