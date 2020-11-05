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

export const getList = p => noTipsGet('console/OMS/spect/defect', p);
export const getItem = p => noTipsGet(`console/OMS/spect/defect/${p.d_id}`, p);
export const addItem = p => post('console/OMS/spect/defect', p);
export const editItem = p => put(`console/OMS/spect/defect/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/spect/defect/${p.d_id}`, p);
