import { req } from '@/utils/request';

export const getSaleClueCount = p => req.noTipsGet(`/crm/statistic/clue`, p);
export const getSaleClueTrend = p =>
  req.noTipsGet(`/crm/statistic/clue_trend`, p);
