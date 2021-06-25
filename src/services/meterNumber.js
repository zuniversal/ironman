import { req } from '@/utils/request';

export const getItem = p =>
  req.noTipsGet(`console/OMS/electricalinfo/${p.d_id}?transformer=1`, p);
