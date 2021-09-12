import { req } from '@/utils/request';

export const getSaleCount = p =>
  req.noTipsGet(`/crm/statistic/contract_statistic`, p);
export const getSaleAmount = p =>
  req.noTipsGet(`/crm/statistic/amount_statistic`, p);
export const getSaleArea = p =>
  req.noTipsGet(`/crm/statistic/area_industry_statistic`, p);
