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

export const getUnScheduleList = p =>
  noTipsGet('console/OMS/spect/plan/stations', p);
export const getScheduledList = p => noTipsGet('console/OMS/spect/plans', p);
export const getItem = p => noTipsGet(`console/OMS/spect/plan/${p.d_id}`, p);
export const addItem = p => post('console/OMS/spect/plan', p);
export const editItem = p => put(`console/OMS/spect/plan/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/spect/plan/${p.d_id}`, p);
export const changePlan = p => put(`console/OMS/spect/plan/change_plan`, p);
