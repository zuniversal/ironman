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

export const getList = p => noTipsGet(`console/OMS/order/material`, p);
export const getItem = p =>
  noTipsGet(`console/OMS/order/material/${p.d_id}/info`, p);
export const addItem = p => post(`console/OMS/order/material`, p);
export const editItem = p =>
  put(`console/OMS/order/material/${p.d_id}/edit`, p);
export const removeItem = p =>
  remove(`console/OMS/order/material/${p.d_id}/edit`, p);
export const removeItems = p => remove(`console/OMS/order/material`, p);
