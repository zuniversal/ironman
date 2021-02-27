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

export const getList = p => noTipsGet('console/OMS/powerstation/', p);
export const getItem = p => noTipsGet(`console/OMS/powerstation/${p.d_id}`, p);
export const addItem = p => post('console/OMS/powerstation/', p);
export const editItem = p => put(`console/OMS/powerstation/${p.d_id}`, p);
export const removeItem = p => remove(`console/OMS/powerstation/${p.d_id}`, p);
export const removeItems = p => remove(`console/OMS/powerstation/`, p);

export const getPowerInfo = p => noTipsGet(`console/OMS/electricalinfo`, p);
export const addPowerInfo = p => post(`console/OMS/electricalinfo`, p);
export const editPowerInfo = p =>
  put(`console/OMS/electricalinfo/${p.d_id}`, p);
export const removePowerInfo = p => remove(`console/OMS/electricalinfo`, p);

export const addOutLine = p => post(`console/OMS/powerstation/outline`, p);
export const editOutLine = p =>
  put(`console/OMS/powerstation/outline/${p.d_id}`, p);
export const removeOutLine = p => remove(`console/OMS/powerstation/outline`, p);

export const exportData = p => get('console/OMS/powerstation/file', p);
export const exportDutyData = p => get('console/OMS/spect/export_report', p);
export const syncOA = p => noTipsGet(`console/OMS/powerstation/oa`, p);
export const createQRCode = p =>
  noTipsGet(`console/OMS/powerstation/qrcode/${p.d_id}`, p);

export const getCircuitItem = p =>
  noTipsGet(`console/OMS/powerstation/${p.power_station_id}/circuit`, p);
export const addCircuitItem = p =>
  post(`console/OMS/powerstation/${p.power_station_id}/circuit`, p);
export const editCircuitItem = p =>
  put(
    `console/OMS/powerstation/${p.power_station_id}/circuit/${p.circuit_id}`,
    p,
  );
// export const editCircuitItem = ({power_station_id, circuit_id, ...p}) =>
//   put(
//     `console/OMS/powerstation/${power_station_id}/circuit/${circuit_id}`,
//     p,
//   );
export const removeCircuitItem = p =>
  remove(
    `console/OMS/powerstation/${p.power_station_id}/circuit/${p.circuit_id}`,
    p,
  );
