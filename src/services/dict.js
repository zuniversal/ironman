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

export const getList = p => noTipsGet('console/OMS/dictionary/', p);
export const getItem = p => noTipsGet(`console/OMS/dictionary/${p.d_id}`, p);
export const addItem = p => post('console/OMS/dictionary', p);
export const editItem = p => put(`console/OMS/dictionary/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/dictionary/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`console/OMS/dictionary/oa`, p);
export const getPortrait = p =>
  noTipsGet(`console/OMS/dictionary/portrait/${p.d_id}`, p);
