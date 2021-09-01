import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/plan`, p);
export const getItem = p => req.noTipsGet(`crm/plan/${p.d_id}`);
export const addItem = p => req.post(`crm/plan/create`, p);
export const editItem = p => req.put(`crm/plan/${p.d_id}/edit`, p);
export const removeItem = p => req.remove(`crm/plan/${p.d_id}/delete`, p);
