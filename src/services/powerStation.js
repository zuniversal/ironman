import {
  get,
  post,
  put,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

export const getList = p => noTipsGet('console/OMS/powerstation/', p);
export const getItem = p => noTipsGet(`console/OMS/powerstation/${p.d_id}`, p);
export const addItem = p => post('console/OMS/powerstation/', p);
export const editItem = p => put(`console/OMS/powerstation/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/powerstation/${p.d_id}`, p);
export const removeItems = p => remove(`console/OMS/powerstation/`, p);

export const addPowerInfo = p => post(`console/OMS/electricalinfo`, p);
export const editPowerInfo = p =>
  put(`console/OMS/electricalinfo/${p.d_id}`, p);
export const removePowerInfo = p => remove(`console/OMS/electricalinfo`, p);
export const exportData = p => get('console/OMS/powerstation/file', p);
export const syncOA = p => noTipsGet(`console/OMS/powerstation/oa`, p);
export const createQRCode = p =>
  noTipsGet(`console/OMS/powerstation/qrcode/${p.d_id}`, p);
