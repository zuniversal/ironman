import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`console/monitor/devices`, p);
export const getItem = p => req.noTipsGet(`console/monitor/devices/${p.d_id}`);
export const addItem = p => req.post(`console/monitor/devices`, p);
export const editItem = p => req.put(`console/monitor/devices/${p.id}`, p);
export const removeItem = p =>
  req.remove(`console/monitor/devices/${p.d_id}`, p);

export const uploadFile = p =>
  req.noTipsPost(`console/monitor/devices/import`, p);
export const handleFile = p =>
  req.noTipsGet(`console/monitor/devices/import/record/${p.d_id}`, p);
