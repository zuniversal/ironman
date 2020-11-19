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

export const getList = p => noTipsGet('console/OMS/spect/task', p);
export const getItem = p => noTipsGet(`console/OMS/spect/task/${p.d_id}`, p);
export const addItem = p => post('console/OMS/spect/task', p);
export const editItem = p => put(`console/OMS/spect/task/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/spect/task/${p.d_id}`, p);

export const assignMission = p =>
  put(`console/OMS/spect/task/${p.d_id}/assign`, p);
// export const editMission = p => patch(`console/OMS/spect/task/${p.d_id}`, p);p);

export const exportData = p => get('console/OMS/team/files', p);
