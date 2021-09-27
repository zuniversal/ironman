import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/app/messages`, p);
export const getItem = p => req.noTipsGet(`crm/app/message/${p.d_id}`);
export const addItem = p => req.post(`crm/plan/create_message`, p);
