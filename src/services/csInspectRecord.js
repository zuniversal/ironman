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

export const getList = p => noTipsGet(`console/OMS/spect/task`, p);
export const confirmInspect = p => put(`console/OMS/order/${p.d_id}`, p);
