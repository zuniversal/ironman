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

export const getList = p => noTipsGet('console/user', p);
// export const getList = p => noTipsGet('console/users/search', p);
export const getSearchList = p => noTipsGet('console/users/search', p);
export const getServiceStaff = p =>
  noTipsGet('console/users/search', { service_staff: 1, ...p }); // 客户代表
export const getTeamLeader = p =>
  noTipsGet('console/users/search', { ...p, team_headman: 1 }); // 组长
export const getItem = p => noTipsGet(`console/user/${p.d_id}`, p);
export const addItem = p => post('console/user', p);
export const editItem = p => put(`console/user/${p.d_id}`, p);
export const removeItem = p => remove(`console/user/${p.d_id}`, p);

export const changePassword = p => put(`console/user/${p.d_id}/password`, p);
