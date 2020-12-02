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

export const getList = p => noTipsGet('console/roles', p);
export const getItem = p => noTipsGet(`console/roles/${p.d_id}`, p);
export const addItem = p => post('console/roles', p);
export const editItem = p => put(`console/roles/${p.d_id}`, p);
export const removeItem = p => remove(`console/roles/${p.d_id}`, p);
