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

export const login = p => noTipsGet('login', p);
export const getEnumList = p => noTipsGet('console/OMS/dictionary/info', p);
