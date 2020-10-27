import {
  get,
  post,
  put,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
  parseUrl,
} from '@/utils/request';
// OMS/
export const getList = p => noTipsGet('equipment/', p);
export const getItem = p => noTipsGet(`equipment`, p);
export const addItem = p => post('equipment/', p);
export const editItem = p => put(`equipment/${p.d_id}`, p);
export const removeItem = p => remove(`equipment/${p.id}`, p);
export const removeItems = p => remove(`equipment`, p);

// export const syncOA = p => noTipsGet(`equipment/OA/`, p);
export const createQRCode = p => noTipsGet(`equipment/qrcode/${p.d_id}`, p);

export const exportData = p => noTipsGet('equipment/download/', p);
export const getTemplate = p => noTipsGet('equipment/getTemplate', p);
export const uploadFile = parseUrl('equipment/upload');
