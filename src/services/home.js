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

export const getStatistic = p =>
  noTipsGet(`console/home_page/web_statistic`, p);
export const getOrdersChart = p => noTipsGet(`console/home_page/order_data`, p);
export const getInspectionsChart = p =>
  noTipsGet(`console/home_page/inspection_task_data`, p);
export const getPendingOrders = p => noTipsGet(`console/home_page/orders`, p);
export const getInspectionTasks = p =>
  noTipsGet(`console/home_page/inspection_tasks`, p);
