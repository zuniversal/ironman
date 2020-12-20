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

export const getList = p => noTipsGet(`console/perms`, p);
export const getItem = p => noTipsGet(`console/perms/${p.d_id}/info`, p);
