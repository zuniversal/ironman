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

export const getList = p => noTipsGet('powerstation/', p);
export const getItem = p => noTipsGet(`powerstation/${p.d_id}`, p);
export const addItem = p => post('powerstation', p);
export const editItem = p => put(`powerstation/${p.d_id}`, p);
export const removeItem = p => remove(`powerstation/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`powerstation/oa`, p);
export const createQRCode = p => noTipsGet(`powerstation/qrcode/${p.d_id}`, p);
