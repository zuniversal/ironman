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

export const login = p => noTipsPost('login', p);
export const logout = p => noTipsPost('logout', p);
export const getEnumList = p => noTipsGet('console/OMS/dictionary/info', p);
export const getList = p => noTipsGet('console/users', p);
export const getItem = p => noTipsGet(`console/users/${p.d_id}`, p);
export const addItem = p => post('console/users', p);
export const editItem = p => put(`console/users/${p.d_id}`, p);
export const removeItem = p => remove(`console/users/${p.d_id}`, p);

export const getUserInfo = p => noTipsGet('console/initialization', p);
