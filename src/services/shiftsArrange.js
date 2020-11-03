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

export const getList = p => get('console/OMS/team/schedule', p);
export const getItem = p => noTipsGet(`console/OMS/team/schedule/${p.d_id}`, p);
export const addItem = p => post('console/OMS/team/schedule', p);
export const editItem = p => put(`console/OMS/team/schedule/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/team/schedule/${p.d_id}`, p);

export const exportData = p => get('console/OMS/team/schedule/files', p);
