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

export const getList = p => noTipsGet('OMS/spect/defect/', p);
export const getItem = p => noTipsGet(`OMS/spect/defect/${p.d_id}`, p);
export const addItem = p => post('OMS/spect/defect', p);
export const editItem = p => put(`OMS/spect/defect/${p.d_id}`, p);
export const removeItem = p => remove(`OMS/spect/defect/${p.d_id}`, p);

export const syncOA = p => noTipsGet(`OMS/spect/defect/oa`, p);
export const getPortrait = p =>
  noTipsGet(`OMS/spect/defect/portrait/${p.d_id}`, p);
