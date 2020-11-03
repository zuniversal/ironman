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
// export const editItem = p => post(`custom_info/${p.custom_id}`, p);
export const editItem = p => put(`custom_info/${p.custom_id}`, p);
// export const getItem = p => noTipsGet(`custom_info/info`, p);
// export const editItem = p => post(`custom_info/info`, p);
export const removeItem = p => remove(`custom_info/${p.d_id}`, p);
