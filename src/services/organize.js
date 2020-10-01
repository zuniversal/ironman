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

export const getList = p => noTipsGet('organizations', p);
export const getItem = p => noTipsGet(`organizations/${p.d_id}`, p);
export const addItem = p => post('organizations/', p);
export const editItem = p => post(`organizations/${p.d_id}`, p);
export const removeItem = p => remove(`organizations/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`organizations/oa`, p);
export const getPortrait = p =>
  noTipsGet(`organizations/portrait/${p.d_id}`, p);
