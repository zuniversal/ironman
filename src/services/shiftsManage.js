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

export const getList = p => noTipsGet(`console/OMS/team/`, p);
export const getItem = p => noTipsGet(`console/OMS/team/${p.d_id}`, p);
export const addItem = p => post(`console/OMS/team/`, p);
export const editItem = p => put(`console/OMS/team/${p.d_id}`, p);
// export const removeItem = p => remove(`console/OMS/team/${p}`, p);
export const removeItem = p => remove(`console/OMS/team/${p.d_id}`, p);
export const removeItems = p => remove(`console/OMS/team/`, p);

export const exportData = p => noTipsGet(`console/OMS/team/files`, p);
