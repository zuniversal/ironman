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

export const getPowerStatistic = p =>
  noTipsGet('console/customer_system/statistic', p);
export const getRecentPower = p =>
  noTipsGet('console/customer_system/recent_power', p);
export const getPowerData = p =>
  noTipsGet('console/customer_system/power_data', p);
