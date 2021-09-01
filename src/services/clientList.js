import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/customer`, p);
// export const getItem = p =>
//   req.noTipsGet(`crm/customer/${p.d_id}`);
export const getItem = p => req.noTipsGet(`console/OMS/customer/${p.d_id}`, p);
export const addItem = p => req.post(`crm/customer`, p);
export const editItem = p => req.put(`crm/customer/${p.d_id}`, p);
export const removeItem = p => req.remove(`crm/customer/${p.d_id}`, p);
