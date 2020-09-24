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

export const getList = p => noTipsGet('custom/custom_info/', p);
export const getItem = p => noTipsGet(`custom/custom_info/${p.d_id}`, p);
export const addItem = p => post('custom/custom_info', p);
export const editItem = p => put(`custom/custom_info/${p.d_id}`, p);
export const removeItem = p => remove(`custom/custom_info/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`custom/custom_info/oa`, p);
export const getPortrait = p => noTipsGet(`custom/custom_info/portrait/${p.d_id}`, p);
