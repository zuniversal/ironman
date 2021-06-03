import { req } from '@/utils/request';

export const getList = p =>
  req.noTipsGet(`console/video_management/video_system`, p);
export const getItem = p =>
  req.noTipsGet(`console/video_management/video_system/${p.d_id}`);
export const addItem = p =>
  req.post(`console/video_management/create_video_system`, p);
export const editItem = p =>
  req.put(`console/video_management/video_system/${p.d_id}`, p);
export const removeItem = p =>
  req.remove(`console/video_management/video_system/${p.d_id}`, p);
