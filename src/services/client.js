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

// export const getList = p => noTipsGet('console/OMS/customer', p);
export const getList = p => noTipsGet(`console/OMS/customer`, p);
export const getItem = p => noTipsGet(`console/OMS/customer/${p.d_id}`, p);
export const addItem = p => post('console/OMS/customer/', p);
export const editItem = p => put(`console/OMS/customer/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/customer/${p.d_id}`, p);
// export const removeItem = p => remove(`console/OMS/customer/${p}`, p);
export const removeItems = p => remove(`console/OMS/customer/`, p);

export const getRelatived = p => noTipsGet('console/OMS/customer/map', p);
export const getClientPower = p => noTipsGet('console/OMS/customer/ele_map', p);
export const getDistrict = p => noTipsGet('console/OMS/customer/district', p);
export const exportData = p => get('console/OMS/customer/file', p);
export const getPortrait = p =>
  noTipsGet(`console/OMS/customer/portrait/${p.d_id}`, p);
// export const addAdmin = p => post('console/OMS/customer/admin', p);
export const addAdmin = p => post('console/users', p);
export const editAdmin = p => put(`console/users/${p.d_id}`, p);
// export const removedAdmin = p => remove('console/OMS/customer/admin', p);
export const removeAdmin = p => remove(`console/users/${p.d_id}`, p);
