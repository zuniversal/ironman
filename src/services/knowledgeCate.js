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

export const getList = p => noTipsGet(`console/learning/warehouse/`, p);
export const getItem = p =>
  noTipsGet(`console/learning/warehouse/${p.d_id}`, p);
export const addItem = p => post(`console/learning/warehouse/`, p);
export const editItem = p => post(`console/learning/warehouse/`, p);
export const removeItem = p =>
  remove(`console/learning/warehouse/${p.d_id}`, p);
