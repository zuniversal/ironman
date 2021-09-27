import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/user`, p);
export const getItem = p => req.noTipsGet(`crm/user/${p.d_id}`);
export const addItem = p => req.post('console/user', p);
export const editItem = p => req.put(`crm/user/${p.d_id}`, p);
export const removeItem = p => req.remove(`crm/user/${p.d_id}`, p);

export const importUser = p => req.post(`crm/user/import`, p);
export const getSalesmanList = p => req.noTipsGet('crm/user/simple', p);
