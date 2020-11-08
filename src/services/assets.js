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
// console/OMS/
export const getList = p => noTipsGet('console/OMS/equipment', p);
export const getItem = p => noTipsGet(`console/OMS/equipment`, p);
export const addItem = p => post('console/OMS/equipment', p);
export const editItem = p => put(`console/OMS/equipment/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/equipment/${p.d_id}`, p);
// export const removeItems = p => remove(`console/OMS/equipment`, p);
export const removeItems = p => remove(`console/OMS/equipment/deletes`, p);

// export const syncOA = p => noTipsGet(`console/OMS/equipment/OA/`, p);
export const createQRCode = p =>
  noTipsGet(`console/OMS/equipment/qrcode/${p.d_id}`, p);

export const exportData = p => noTipsGet('console/OMS/equipment/file', p);
export const getTemplate = p =>
  noTipsGet('console/OMS/equipment/getTemplate', p);
export const uploadFile = parseUrl('console/OMS/equipment/upload');
