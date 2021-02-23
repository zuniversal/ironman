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

export const getPowerPointList = p =>
  noTipsGet(
    `console/monitor/old/numbers/${p.number}/stations/${p.powerstation_id}/points`,
    p,
  );
export const getPowerPointRealList = p =>
  noTipsGet(
    `console/monitor/old/numbers/${p.number}/stations/${p.powerstation_id}/points/${p.point_id}/real_data`,
    p,
  );
