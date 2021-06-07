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

export const getList = p => noTipsGet(`console/monitor/alarm`, p);
export const getItem = p => noTipsGet(`console/monitor/alarm/${p.d_id}`, p);
export const addItem = p => post(`console/monitor/alarm`, p);
export const editItem = p => put(`console/monitor/alarm/${p.d_id}`, p);
export const removeItem = p => remove(`console/monitor/alarm/${p.d_id}`, p);
export const removeItems = p => remove(`console/monitor/alarm/`, p);

// export const getAlarmCurveList = p =>
//   noTipsGet(`/console/OMS/dashboard/monitor/range_data`, p);

export const getAlarmCurveList = p =>
  noTipsGet(
    `/console/OMS/dashboard/monitor/range_data?alarm=1&start_time=2021-06-07 00:00:00&end_time=2021-06-07 23:59:59`,
    p,
  );
getAlarmCurveList();
