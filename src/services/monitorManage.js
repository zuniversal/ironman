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

export const getList = p => noTipsGet(`console/monitor/points`, p);
export const getItem = p => noTipsGet(`console/monitor/points/${p.d_id}`, p);
export const addItem = p => post(`console/monitor/points`, p);
export const editItem = p => put(`console/monitor/points/${p.d_id}`, p);
export const removeItem = p => remove(`console/monitor/points/${p.d_id}`, p);

export const getRealData = p => noTipsGet(`console/monitor/real_data`, p);
export const getManufacturerList = p =>
  noTipsGet(`console/monitor/manufacturers`, p);
