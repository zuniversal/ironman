import { req } from '@/utils/request';

export const getList = p =>
  req.noTipsGet(`crm/plan/tasks`, { status: 'pending_approval', ...p });
export const getItem = p => req.noTipsGet(`crm/plan/task/${p.d_id}`);

export const approveTask = p => req.put(`crm/plan/task/${p.d_id}/approve`, p);
