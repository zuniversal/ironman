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

export const getList = p => noTipsGet('OMS/electricityuser/', p);
export const getItem = p => noTipsGet(`OMS/electricityuser/${p.d_id}`, p);
export const addItem = p => post('OMS/electricityuser/', p);
export const editItem = p => put(`OMS/electricityuser/${p.d_id}`, p);
// export const removeItem = p => remove(`OMS/electricityuser/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/electricityuser/${p}`, p);
