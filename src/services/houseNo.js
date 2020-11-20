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

export const getList = p => noTipsGet('console/OMS/electricityuser/', p);
export const getItem = p =>
  noTipsGet(`console/OMS/electricityuser/${p.d_id}`, p);
export const addItem = p => post('console/OMS/electricityuser/', p);
export const editItem = p => put(`console/OMS/electricityuser/${p.d_id}`, p);
export const removeItem = p =>
  remove(`console/OMS/electricityuser/${p.d_id}`, p);
// export const removeItem = p => remove(`console/OMS/electricityuser/${p}`, p);
export const removeItems = p => remove(`console/OMS/electricityuser/`, p);
export const exportData = p => get('console/OMS/electricityuser/file', p);
