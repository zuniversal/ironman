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

export const getList = p => noTipsGet('console/OMS/spect/task', p);
// export const getItem = p => noTipsGet(`console/OMS/spect/task/${p.d_id}`, p);
export const getItem = p => noTipsGet(`console/OMS/spect/record/${p.d_id}`, p);
export const addItem = p => post('console/OMS/spect/record', p);
export const editItem = p => put(`console/OMS/spect/record/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/spect/record/${p.d_id}`, p);

export const getMissionItem = p =>
  noTipsGet(`console/OMS/spect/task/${p.d_id}`, p);
