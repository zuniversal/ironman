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

export const getList = p => noTipsGet(`console/monitor/devices`, p);
export const getItem = p => noTipsGet(`console/monitor/devices/${p.d_id}`);
export const addItem = p => post(`console/monitor/devices`, p);
export const editItem = p => put(`console/monitor/devices/${p.d_id}`, p);
export const removeItem = p => remove(`console/monitor/devices/${p.d_id}`, p);
