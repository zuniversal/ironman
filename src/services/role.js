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

export const getList = p => noTipsGet('roles', p);
export const getItem = p => noTipsGet(`roles/${p.d_id}`, p);
export const addItem = p => post('roles', p);
export const editItem = p => put(`roles/${p.d_id}`, p);
export const removeItem = p => remove(`roles/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`roles/oa`, p);
export const getPortrait = p => noTipsGet(`roles/portrait/${p.d_id}`, p);
