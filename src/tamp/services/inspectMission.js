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

export const getList = p => noTipsGet('OMS/spect/task/', p);
export const getItem = p => noTipsGet(`OMS/spect/task/${p.d_id}`, p);
export const addItem = p => post('OMS/spect/task', p);
export const editItem = p => put(`OMS/spect/task/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/spect/task/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/spect/task/oa`, p);
export const getPortrait = p => noTipsGet(`OMS/spect/task/portrait/${p.d_id}`, p);
