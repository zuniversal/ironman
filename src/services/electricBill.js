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

export const getList = p =>
  noTipsGet(`console/electricity_bill/tariff_type`, p);
export const getItem = p => noTipsGet(`console/electricity_bill/${p.d_id}`, p);
export const addItem = p => post(`console/electricity_bill/create`, p);
export const editItem = p => put(`console/electricity_bill/${p.d_id}/edit`, p);
export const removeItem = p =>
  remove(`console/electricity_bill/${p.d_id}/delete`, p);
