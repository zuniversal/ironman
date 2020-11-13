import {
  get,
  post,
  put,
  patch,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

export const getList = p => noTipsGet('console/OMS/task/tasks', p);
export const getItem = p => noTipsGet(`console/OMS/task/${p.d_id}/info`, p);
export const addItem = p => post(`console/OMS/task`, p);
export const editItem = p => put(`console/OMS/task/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/task/${p.d_id}`, p);

// export const confirm = p => patch(`console/CMP/inspection/${p.d_id}`, p);
export const confirm = p => patch(`console/OMS/task/${p.d_id}/confirm`, p);
