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

export const getList = p => noTipsGet('OMS/customer', p);
export const getItem = p => noTipsGet(`OMS/customer/${p.d_id}`, p);
export const addItem = p => post('OMS/customer/', p);
export const editItem = p => put(`OMS/customer/${p.d_id}`, p);
// export const removeItem = p => remove(`OMS/customer/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/customer/${p}`, p);
export const removeItems = p => remove(`OMS/customer/`, p);

export const exportData = p => noTipsGet('OMS/customer/file', p);
export const syncOA = p => noTipsGet(`OMS/customer/OA`, p);
export const getPortrait = p => noTipsGet(`OMS/customer/portrait/${p.d_id}`, p);
export const addAdmin = p => post('OMS/customer/admin', p);
