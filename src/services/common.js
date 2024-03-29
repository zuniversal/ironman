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
import { WS_PREFIX } from '@/constants';

export const login = p => noTipsGet('login', p);
export const getEnumList = p => noTipsGet('console/OMS/dictionary/info', p);
export const getGeo = p => noTipsGet('console/geo', p);
export const getRegion = p => noTipsGet('console/region', p);
export const getRegionOne = p => noTipsGet('console/region', {subdistrict: '1', ...p});
export const uploadFile = p => post('upload', p);

export const notifyWs = WS_PREFIX + '/api/v1/console/message/send_message/';

export const getPdf = p => noTipsGet(p);
