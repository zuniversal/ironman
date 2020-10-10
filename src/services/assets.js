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

export const getList = p => noTipsGet('OMS/equipment/list', p);
export const getItem = p => noTipsGet(`OMS/equipment/${p.d_id}`, p);
export const addItem = p => post('OMS/equipment/', p);
export const editItem = p => put(`OMS/equipment`, p);
export const removeItem = p => remove(`OMS/equipment/${p.d_id}`, p);
export const removeItems = p => remove(`OMS/equipments/`, p);

export const syncOA = p => noTipsGet(`OMS/equipment/OA/`, p);
export const createQRCode = p => noTipsGet(`OMS/equipment/qrcode/${p.d_id}`, p);

export const exportData = p => noTipsGet('OMS/equipment/download/', p);
export const getTemplate = p => noTipsGet('OMS/equipment/getTemplate', p);
export const uploadFile = parseUrl('OMS/equipment/upload', );
