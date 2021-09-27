import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/customer/portrait`, p);
export const getItem = p => req.noTipsGet(`crm/customer/portrait/${p.d_id}`);
export const addItem = p => req.post(`crm/customer/portrait`, p);
export const editItem = p => req.put(`crm/customer/portrait/${p.d_id}`, p);
export const removeItem = p => req.remove(`crm/customer/portrait/${p.d_id}`, p);

export const getTurnRateProgress = p =>
  req.noTipsGet(`/crm/statistic/funnel`, p);
export const getClientSignTrend = p => req.noTipsGet(`/crm/statistic/trend`, p);
