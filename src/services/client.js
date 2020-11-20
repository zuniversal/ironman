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

export const getList = p => noTipsGet('console/OMS/customer', p);
export const getItem = p => noTipsGet(`console/OMS/customer/${p.d_id}`, p);
export const addItem = p => post('console/OMS/customer/', p);
export const editItem = p => put(`console/OMS/customer/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/customer/${p.d_id}`, p);
// export const removeItem = p => remove(`console/OMS/customer/${p}`, p);
export const removeItems = p => remove(`console/OMS/customer/`, p);

export const getDistrict = p => noTipsGet('console/OMS/customer/district', p);
export const exportData = p => get('console/OMS/customer/file', p);
export const syncOA = p => noTipsGet(`console/OMS/customer/OA`, p);
export const getPortrait = p =>
  noTipsGet(`console/OMS/customer/portrait/${p.d_id}`, p);
export const addAdmin = p => post('console/OMS/customer/admin', p);
