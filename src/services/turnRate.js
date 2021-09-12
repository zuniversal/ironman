import { req } from '@/utils/request';

export const getTurnRateProgress = p =>
  req.noTipsGet(`/crm/statistic/funnel`, p);
export const getClientSignTrend = p => req.noTipsGet(`/crm/statistic/trend`, p);
