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

export const getItem = p => noTipsGet(`console/custom_info/CSS/me`, p);
// export const editItem = p => put(`console/custom_info/CSS/me`, p);
export const editItem = p => put(`console/user_center/info`, p);
export const changePwd = p => put(`console/user_center/password`, p);
