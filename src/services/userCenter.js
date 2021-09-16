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

// export const getItem = p => noTipsGet(`console/custom_info/${p.d_id}`, p);
// // export const editItem = p => post(`console/custom_info/${p.custom_id}`, p);
// export const editItem = p => put(`console/custom_info/${p.custom_id}`, p);
// export const getItem = p => noTipsGet(`console/custom_info/info`, p);
export const getItem = p => noTipsGet(`console/user_center/info`, p);
export const addItem = p => post('console/custom_info', p);
// export const editItem = p => put(`console/custom_info/info`, p);
export const editItem = p => put(`console/user_center/info`, p);
// export const editItem = p => post(`console/custom_info/info`, p);
export const removeItem = p => remove(`console/custom_info/${p.d_id}`, p);

export const changePwd = p => put(`console/user_center/password`, p);
