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

export const getList = p => noTipsGet('OMS/spect/plan/stations/', p);
export const getItem = p => noTipsGet(`OMS/spect/plan/${p.d_id}`, p);
export const addItem = p => post('OMS/spect/plan', p);
export const editItem = p => put(`OMS/spect/plan/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/spect/plan/${p.d_id}`, p);
