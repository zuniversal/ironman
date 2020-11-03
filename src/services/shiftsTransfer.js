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

export const getList = p => noTipsGet('console/OMS/team/handover', p);
export const getItem = p => noTipsGet(`console/OMS/team/handover/${p.d_id}`, p);
export const addItem = p => post('console/OMS/team/handover', p);
export const editItem = p => put(`console/OMS/team/handover/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/team/handover/${p.d_id}`, p);

export const exportData = p => noTipsGet(`console/OMS/team/handover/files`, p);
export const upload = p => post(`console/OMS/team/handover/files`, p);
