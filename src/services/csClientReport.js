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

export const getList = ({ query, ...p }) =>
  noTipsGet(`console/OMS/customer/report?${query}`, p);
export const getItem = p =>
  noTipsGet(`console/OMS/customer/report/${p.d_id}`, p);
// export const getList = p => noTipsGet(`custom_info/`, p);
// export const getItem = p => noTipsGet(`custom_info/${p.d_id}`, p);
export const addItem = p => post('custom_info', p);
export const editItem = p => put(`custom_info/${p.d_id}`, p);
export const removeItem = p => remove(`custom_info/${p.d_id}`, p);
export const removeItems = p => remove(`custom_info/`, p);
