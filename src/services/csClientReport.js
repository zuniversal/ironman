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

export const getItem = p => noTipsGet(`custom_info/${p.d_id}`, p);
export const addItem = p => post('custom_info', p);
export const removeItem = p => remove(`custom_info/${p.d_id}`, p);
