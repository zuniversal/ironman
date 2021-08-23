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

export const getList = p => noTipsGet(`console/message/notifications`, p);
export const getItem = p => noTipsGet(`console/message/${p.d_id}`, p);
// export const addItem = p => post(`console/message/`, p);
// export const editItem = p => put(`console/message/${p.d_id}`, p);
// export const removeItem = p => remove(`console/message/${p}`, p);

export const noPopMsg = p => noTipsPut(`console/message/${p.d_id}/no_pop`, p);
export const noPopAllMsg = p => noTipsPut(`console/message/no_pop`, p);
export const readMsg = p => noTipsPut(`console/message/${p.d_id}/read`, p);
export const readAllMsg = p => noTipsPut(`console/message/read_all`, p);
