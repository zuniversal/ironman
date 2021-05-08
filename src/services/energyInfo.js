import { req } from '@/utils/request';

export const getPowerStatistic = p =>
  req.noTipsGet('console/customer_system/statistic', p);
export const getRecentPower = p =>
  req.noTipsGet('console/customer_system/recent_power', p);
export const getPowerData = p =>
  req.noTipsGet('console/customer_system/power_data', p);
export const getRecentPower10Day = p =>
  req.noTipsGet('console/customer_system/recent_10_day_power', p);
export const getRecentPower6Month = p =>
  req.noTipsGet('console/customer_system/recent_6_month_power', p);
