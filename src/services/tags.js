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

export const getList = p => noTipsGet('console/tags', p);
export const getItem = p => noTipsGet(`console/tags/${p.d_id}`, p);
export const addItem = p => post('console/tags', p);
export const editItem = p => put(`console/tags/${p.d_id}`, p);
export const removeItem = p => remove(`console/tags/${p.d_id}`, p);

export const getTagUser = p => noTipsGet(`console/tags/${p.d_id}/users`, p);
