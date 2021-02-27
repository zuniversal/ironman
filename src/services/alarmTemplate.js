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

export const getList = p => noTipsGet(`console/monitor/templates`, p);
export const getItem = p => noTipsGet(`console/monitor/templates/${p.d_id}`, p);
export const addItem = p => post(`console/monitor/templates`, p);
export const editItem = p => put(`console/monitor/templates/${p.d_id}`, p);
export const removeItem = p => remove(`console/monitor/templates/${p.d_id}`, p);
