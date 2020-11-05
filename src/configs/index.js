// import regions from './regions'//
// console.log(' regions ： ', regions,  )//
// export const regoins = regions

export const regoins = [
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '深圳市',
        label: '深圳市',
        children: [
          {
            value: '南山区',
            label: '南山区',
          },
        ],
      },
    ],
  },
];

export const province = [
  {
    value: '广东省',
    label: '广东省',
  },
  {
    value: '深圳市',
    label: '深圳市',
  },
  {
    value: '南山区',
    label: '南山区',
  },
];

export const arrMapObj = arr => {
  const obj = {};
  arr.forEach(v => (obj[v.value] = v.label));
  return obj;
};

export const teamTypeConfig = [
  {
    value: '0',
    label: '调度',
  },
  {
    value: '1',
    label: '值班',
  },
  {
    value: '2',
    label: '巡检',
  },
  {
    value: '3',
    label: '抢修',
  },
];

export const teamTypeMap = {
  0: '调度',
  1: '值班',
  2: '巡检',
  3: '抢修',
};

export const onDutyTypeConfig = [
  {
    value: 0,
    label: '调度',
  },
  {
    value: 1,
    label: '值班',
  },
];

export const onDutyTypeMap = {
  0: '调度',
  1: '值班',
};

export const customerTypeConfig = [
  {
    value: 0,
    label: '普通客户',
  },
  {
    value: 1,
    label: '托管客户',
  },
  {
    value: 2,
    label: 'VIP客户',
  },
];

export const missionsTypeConfig = [
  {
    label: '抢修',
    value: 'rush_to_repair',
  },
  {
    label: '电力施工',
    value: 'power_construction',
  },
  {
    label: '电气试验',
    value: 'electrical_testing',
  },
  {
    label: '需量申报',
    value: 'demand_declaration',
  },
];

export const missionsTypeMap = arrMapObj(missionsTypeConfig);

export const missionsStatusConfig = [
  {
    label: '待排期',
    value: 'waiting_plan',
  },
  {
    // 确认排期
    label: '待确认排期',
    value: 'waiting_confirm',
  },
  {
    label: '待派单',
    value: 'waiting_dispatch',
  },
  {
    label: '处理中',
    value: 'in_process',
  },
  {
    label: '已完成',
    value: 'completed',
  },
  {
    label: '挂起',
    value: 'hang-up',
  },
];

export const missionsStatusMap = arrMapObj(missionsStatusConfig);

export const workOrderStatusConfig = [
  {
    label: '待派单',
    value: 'waiting_dispatch',
  },
  {
    label: '待处理',
    value: 'pending',
  },
  {
    label: '已完成',
    value: 'completed',
  },
];

export const workOrderStatusMap = arrMapObj(workOrderStatusConfig);

export const site = province;
export const city = province;

export const noShowTitlePath = [
  '/om/home',
  // '/om/shiftsArrangeDetail'
];

export const httpTipsMap = {
  slow: '阿哦，加载中，请稍后',
  notNetWork: '阿哦，没有网络，请您检查网络设置',
  loadError: '阿哦，加载失败了，点击刷新试试（提供刷新按钮）',
};
