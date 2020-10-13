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

export const getList = p => noTipsGet('OMS/team/handover', p);
export const getItem = p => noTipsGet(`OMS/team/handover/${p.d_id}`, p);
export const addItem = p => post('OMS/team/handover', p);
export const editItem = p => put(`OMS/team/handover/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/team/handover/${p.d_id}`, p);

export const exportData = p => noTipsGet(`OMS/team/handover/files`, p);
export const upload = p => post(`OMS/team/handover/files`, p);
