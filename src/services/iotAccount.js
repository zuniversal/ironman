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

export const getList = p => noTipsGet(`console/sim_card/list`, p);
export const getItem = p => noTipsGet(`console/sim_card/${p.d_id}/info`);
export const addItem = p => post(`console/sim_card/create`, p);
export const editItem = p => put(`console/sim_card/${p.d_id}/update`, p);
export const removeItem = p => remove(`console/sim_card/${p.d_id}/delete`, p);
