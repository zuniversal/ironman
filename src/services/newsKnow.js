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

export const getList = p => noTipsGet(`console/learning/knowledge/`, p);
export const getItem = p => noTipsGet(`console/learning/knowledge/detail/`, p);
export const addItem = p => post(`console/learning/knowledge/detail/`, p);
// export const editItem = p => put(`console/learning/knowledge/${p.d_id}`, p);
export const editItem = p => put(`console/learning/knowledge/detail/`, p);
export const removeItem = p =>
  remove(`console/learning/knowledge/${p.d_id}`, p);
