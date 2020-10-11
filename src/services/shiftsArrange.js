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

export const getList = p => noTipsGet('OMS/team/schedule', p);
export const getItem = p => noTipsGet(`OMS/team/schedule/${p.d_id}`, p);
export const addItem = p => post('OMS/team/schedule', p);
export const editItem = p => put(`OMS/team/schedule/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/team/schedule/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/team/schedule/oa`, p);
export const getPortrait = p =>
  noTipsGet(`OMS/team/schedule/portrait/${p.d_id}`, p);
