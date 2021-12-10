import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`crm/plan/sign_in`, p);
