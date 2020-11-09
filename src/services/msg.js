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

export const getList = p => noTipsGet('console/OMS/message/', p);
export const getItem = p => noTipsGet(`console/OMS/message/${p.d_id}`, p);
export const addItem = p => post('console/OMS/message', p);
export const editItem = p => put(`console/OMS/message/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/message/${p.d_id}`, p);
