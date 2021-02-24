// import mock from '../../../../mock/map';
import {
  get,
  post,
  put,
  remove,
  noTipsGet as request,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

const requestMock = url => {
  return Promise.resolve(mock[url]);
};

export const getPeopleReal = params =>
  request('console/OMS/dashboard/user_location', { params });
export const getPeopleLast = params =>
  request('console/OMS/dashboard/last_location', { params });
export const getAssets = id => requestMock('console/OMS/equipment/list');

export const getVehicle = params =>
  request('console/OMS/dashboard/cars', { params });
export const getCustomer = params =>
  request('console/OMS/dashboard/customers', { params });

/**
 * 登录
 */
export const login = params => request.post('login', params);

/**
 * 汇总数据
 */
export const getRealTimeData = () => request('console/OMS/dashboard/summary');

/**
 * 统计数据
 */
export const getStatisticsData = () =>
  request('console/OMS/dashboard/statistics');
export const getWeather = () => request('console/OMS/dashboard/weather');

/**
 * 户号详情
 */
export const getCustomerDetail = (id = 1) =>
  request(`console/OMS/dashboard/numbers/${id}/details`);
export const getDefectList = () => request('console/OMS/spect/defect');
export const getAlarmList = () =>
  request('console/OMS/dashboard/monitor/alarm');
export const getRepairList = () =>
  request('console/OMS/task/tasks', { type: 'rush_to_repair' });
// export const getEnergy = () => requestMock('console/OMS/dashboard/ele')
export const getMonitorPoints = (number, stationId) =>
  request(`console/monitor/old/numbers/${number}/stations/${stationId}/points`);
export const getRealData = (number, stationId, pointId) =>
  request(
    `console/monitor/old/numbers/${number}/stations/${stationId}/points/${pointId}/real_data`,
  );
export const getPeakData = ({ number, stationId, point, startTime, endTime }) =>
  request(
    `console/monitor/old/numbers/${number}/stations/${stationId}/points/${point}/statisticsdata?start_time=${startTime}&end_time=${endTime}`,
  );
export const getEnergy = ({ number, stationId, point }) =>
  request(
    `console/monitor/old/numbers/${number}/stations/${stationId}/points/${point}/statisticsdata?value=power_curve`,
  );
export const getMonitorData = ({
  number,
  stationId,
  point,
  startTime,
  endTime,
  query = '',
}) =>
  request(
    `console/monitor/old/numbers/${number}/stations/${stationId}/points/${point}/data?start_time=${startTime}&end_time=${endTime}${query}`,
  );
// export const getMonitorData = ({ number, stationId, point, startTime, endTime, query = '' }) =>
//   requestMock(`console/monitor/old/numbers/data`)
export const getSafeTool = () => requestMock('console/OMS/dashboard/safeTool');
export const getLiveVideo = () =>
  request('console/OMS/dashboard/monitor/videos');
export const getStationInfo = id => request(`console/OMS/powerstation/${id}`);
