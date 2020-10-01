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

export const getList = p => noTipsGet('organizations/accounts', p);
export const getItem = p => noTipsGet(`organizations/accounts/${p.d_id}`, p);
export const addItem = p => post('organizations/accounts', p);
export const editItem = p => put(`organizations/accounts/${p.d_id}`, p);
export const removeItem = p => remove(`organizations/accounts/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`organizations/accounts/oa`, p);
export const getPortrait = p =>
  noTipsGet(`organizations/accounts/portrait/${p.d_id}`, p);
