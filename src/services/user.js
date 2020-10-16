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

export const getList = p => noTipsGet('users', p);
export const getItem = p => noTipsGet(`users/${p.d_id}`, p);
export const addItem = p => post('users', p);
export const editItem = p => put(`users/${p.d_id}`, p);
export const removeItem = p => remove(`users/${p.d_id}`, p);