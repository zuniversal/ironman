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

export const getList = p => noTipsGet('console/organizations/css_org/info', p);
export const getItem = p =>
  noTipsGet(`console/organizations/css_org/info/${p.d_id}`, p);
export const addItem = p => post('console/organizations/css_org/info', p);
export const editItem = p =>
  put(`console/organizations/css_org/info/${p.d_id}`, p);
export const removeItem = p =>
  remove(`console/organizations/css_org/info/${p.d_id}`, p);
