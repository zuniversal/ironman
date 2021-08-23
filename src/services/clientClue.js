import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/customer/clue`, p);
export const getItem = p => req.noTipsGet(`crm/customer/clue/${p.d_id}`);
export const addItem = p => req.post(`crm/customer/clue`, p);
export const editItem = p => req.put(`crm/customer/clue/${p.d_id}`, p);
export const removeItem = p => req.remove(`crm/customer/clue/${p.d_id}`, p);
