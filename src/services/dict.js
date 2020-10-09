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

export const getList = p => noTipsGet('OMS/dictionary/', p);
export const getItem = p => noTipsGet(`OMS/dictionary/${p.d_id}`, p);
export const addItem = p => post('OMS/dictionary', p);
export const editItem = p => put(`OMS/dictionary/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/dictionary/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/dictionary/oa`, p);
export const getPortrait = p =>
  noTipsGet(`OMS/dictionary/portrait/${p.d_id}`, p);
