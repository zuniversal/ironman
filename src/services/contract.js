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

export const getList = p => noTipsGet('console/OMS/contract', p);
export const getItem = p => noTipsGet(`console/OMS/contract`, p);
export const addItem = p => post('console/OMS/contract', p);
export const editItem = p => put(`console/OMS/contract/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/contract/${p.d_id}`, p);

export const getPdf = p =>
  noTipsGet(`console/OMS/contract/static/${p.path}.pdf`, p);
// export const getPdf = WS_PREFIX + '/api/v1/console/message/send_message/';
