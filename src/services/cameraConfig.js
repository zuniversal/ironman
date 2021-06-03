import { req } from '@/utils/request';

export const getList = p =>
  req.noTipsGet(`console/video_management/list_device`, p);
export const getItem = p =>
  req.noTipsGet(`console/video_management/device/${p.d_id}`);
export const addItem = p => req.post(`console/video_management/bind_device`, p);
export const editItem = p =>
  req.put(`console/video_management/device/${p.d_id}`, p);
export const removeItem = p =>
  req.remove(`console/video_management/device/${p.d_id}`, p);

export const getDeviceEntityList = p =>
  req.noTipsGet(`console/video_management/device_entities`, p);
export const getCameraVideo = p =>
  req.post(`console/video_management/device/${p.d_id}/video_url`, p);
