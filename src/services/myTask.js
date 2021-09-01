import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/plan/tasks`, p);
export const getItem = p => req.noTipsGet(`crm/plan/tasks/${p.d_id}`);
export const addItem = p => req.post(`crm/plan/tasks`, p);
export const editItem = p => req.put(`crm/plan/tasks/${p.d_id}`, p);
export const removeItem = p => req.remove(`crm/plan/tasks/${p.d_id}`, p);
