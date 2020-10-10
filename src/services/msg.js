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

export const getList = p => noTipsGet('OMS/message/', p);
export const getItem = p => noTipsGet(`OMS/message/${p.d_id}`, p);
export const addItem = p => post('OMS/message', p);
export const editItem = p => put(`OMS/message/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/message/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/message/oa`, p);
export const getPortrait = p => noTipsGet(`OMS/message/portrait/${p.d_id}`, p);
