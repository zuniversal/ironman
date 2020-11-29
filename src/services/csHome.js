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

export const getStatistic = p =>
  noTipsGet(`console/CSP/home_page/statistic`, p);
export const getPowerInfo = p => noTipsGet(`console/CSP/home_page/ep_data`, p);
