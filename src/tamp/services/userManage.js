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

export const getList = p => noTipsGet('accounts/', p);
export const getItem = p => noTipsGet(`accounts/${p.d_id}`, p);
export const addItem = p => post('accounts', p);
export const editItem = p => put(`accounts/${p.d_id}`, p);
export const removeItem = p => remove(`accounts/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`accounts/oa`, p);
export const getPortrait = p => noTipsGet(`accounts/portrait/${p.d_id}`, p);
