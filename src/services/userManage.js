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

export const getList = p => noTipsGet('console/users', p);
export const getItem = p => noTipsGet(`console/users/${p.d_id}`, p);
export const addItem = p => post('console/users', p);
export const editItem = p => put(`console/users/${p.d_id}`, p);
export const removeItem = p => remove(`console/users/${p.d_id}`, p);
