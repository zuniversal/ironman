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

export const getList = p => noTipsGet('OMS/powerstation/', p);
export const getItem = p => noTipsGet(`OMS/powerstation/${p.d_id}`, p);
export const addItem = p => post('OMS/powerstation', p);
export const editItem = p => put(`OMS/powerstation/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/powerstation/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/powerstation/oa`, p);
export const createQRCode = p =>
  noTipsGet(`OMS/powerstation/qrcode/${p.d_id}`, p);
