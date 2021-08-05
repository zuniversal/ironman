import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`console/monitor/devices/record`, p);
export const getItem = p =>
  req.noTipsGet(`console/monitor/devices/record/${p.d_id}`);
export const addItem = p => req.post(`console/monitor/devices/record`, p);
export const editItem = p =>
  req.put(`console/monitor/devices/record/${p.d_id}`, p);
export const removeItem = p =>
  req.remove(`console/monitor/devices/record/${p.d_id}`, p);
