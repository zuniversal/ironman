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

export const getList = p => noTipsGet('OMS/task/tasks', p);
export const getItem = p => noTipsGet(`OMS/task/${p.d_id}/info`, p);
export const addItem = p => post('OMS/task/order', p);
export const editItem = p => put(`OMS/task/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/task/${p.d_id}`, p);
