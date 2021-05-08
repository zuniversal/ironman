import { req } from '@/utils/request';

export const getPowerInfo = p =>
  req.noTipsGet('console/customer_system/power_info', p);
