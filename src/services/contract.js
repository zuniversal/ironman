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

export const getList = p => noTipsGet('OMS/contract', p);
export const getItem = p => noTipsGet(`OMS/contract`, p);
export const addItem = p => post('OMS/contract', p);
export const editItem = p => put(`OMS/contract/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/contract/${p.d_id}`, p);
