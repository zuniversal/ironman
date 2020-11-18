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
  noTipsGet(`console/organizations/css_detail/info`, p);
export const addItem = p => post('console/organizations/css_org/info', p);
export const editItem = p => put(`console/organizations/css_org/info`, p);
export const removeItem = p => remove(`console/organizations/css_org/info`, p);

export const getUserHouseNo = p =>
  noTipsGet('console/organizations/css_eus/info', p);
