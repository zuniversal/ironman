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

export const getStatCount = p =>
  noTipsGet(`console/v1/console/CSP/home_page/ep_data`, p);
export const getPowerInfo = p =>
  noTipsGet(`console/v1/console/CSP/home_page/ep_data`, p);
