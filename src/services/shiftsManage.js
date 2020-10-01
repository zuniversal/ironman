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

export const getList = p => noTipsGet('OMS/team/', p);
export const getItem = p => noTipsGet(`OMS/team//${p.d_id}`, p);
export const addItem = p => post('OMS/team/', p);
export const editItem = p => put(`OMS/team//${p.d_id}`, p);
export const removeItem = p => remove(`OMS/team//${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/team//oa`, p);
export const getPortrait = p => noTipsGet(`OMS/team//portrait/${p.d_id}`, p);
