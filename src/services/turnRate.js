import { req } from '@/utils/request';

export const getTurnRateProgress = p => req.noTipsGet(`statistic/funnel`, p);
