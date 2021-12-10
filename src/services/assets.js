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
// export const getList = p => noTipsGet('console/OMS/equipment/tree?electricity_user_id=7019', p);
// export const getItem = p => noTipsGet(`console/OMS/equipment`, p);
// export const addItem = p => post('console/OMS/equipment', p);
// export const editItem = p => put(`console/OMS/equipment/${p.d_id}`, p);
// export const removeItem = p => remove(`console/OMS/equipment/${p.d_id}`, p);
// // export const removeItems = p => remove(`console/OMS/equipment`, p);
// export const removeItems = p => remove(`console/OMS/equipment/deletes`, p);

export const getList = p =>
  noTipsGet(
    // 'console/OMS/equipment/tree?electricity_user_id=5976&customer_id=5976',
    'console/OMS/equipment/tree',
    p,
  );
export const getItem = p => noTipsGet(`console/OMS/equipment/${p.d_id}`);
export const addItem = p => post('console/OMS/equipment/tree', p);
export const editItem = p => put(`console/OMS/equipment/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/equipment/${p.d_id}`, p);
// export const removeItems = p => remove(`console/OMS/equipment`, p);
export const removeItems = p => remove(`console/OMS/equipment/deletes`, p);
export const getAssetDevice = ({ query = '', ...p }) =>
  noTipsGet(`console/OMS/equipment${query}`, p);

export const createQRCode = p =>
  noTipsGet(`console/OMS/equipment/qrcode/${p.d_id}`, p);

export const exportData = p => noTipsGet('console/OMS/equipment/file', p);
export const getTemplate = p =>
  noTipsGet('console/OMS/equipment/getTemplate', p);
export const uploadFile = parseUrl('console/OMS/equipment/upload');
export const getTransformer = p =>
  noTipsGet('console/OMS/equipment/transformer', p);

export const getAssetDetail = p =>
  noTipsGet(`console/OMS/equipment/${p.d_id}/info`);
