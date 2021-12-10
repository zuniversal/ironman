// import regions from './regions'//
// console.log(' regions ： ', regions,  )//
// export const regoins = regions

import { arrMapObj, arrMapColor, createIndexArr } from '@/utils';
import { PRIMARY, INFO, SUB, WARN } from '@/constants';

export const expandLoadTreeList = [
  {
    label: '部门1',
    title: '部门1',
    value: 'app1',
    id: 'app1',
    pId: 0,
    indexes: 0,
  },
  {
    label: '部门12',
    title: '部门2',
    value: 'app2',
    id: 'app2',
    pId: 0,
    indexes: 8,
  },
  {
    id: 1,
    name: '总经办',
    value: 1,
    pId: 11,
    title: '总经办',
    label: '总经办',
    parent_id: null,
  },
  {
    id: '1',
    name: '营销客服中心',
    value: 2,
    pId: 22,
    title: '营销客服中心',
    label: '营销客服中心',
    parent_id: null,
  },
];

export const treeList = [
  {
    label: '部门1',
    title: '部门1',
    value: 'app1',
    id: 'app1',
    pId: 0,
    indexes: 0,
    children: [
      {
        label: '子部门1',
        title: '子部门1',
        value: 'msg1',
        id: 'msg1',
        // pId: 1,
        children: [
          {
            label: '子部门111',
            title: '子部门111',
            value: 'msg12',
            id: 'msg12',
            // pId: 2,
            children: [
              {
                label: '子部门1222',
                title: '子部门1222',
                value: 'msg132',
                id: 'value',
                // pId: 3,
              },
              {
                label: '子部门2333',
                title: '子部门2333',
                value: 'email1342',
                id: 'value',
                // pId: 3,
              },
            ],
          },
          {
            label: '子部门2',
            title: '子部门2',
            value: 'email12',
            id: 'email12',
            // pId: 2,
          },
        ],
      },
      {
        label: '子部门2',
        title: '子部门2',
        value: 'email1',
        id: 'email1',
        // pId: 1,
      },
    ],
  },
  {
    label: '部门12',
    title: '部门2',
    value: 'app2',
    id: 'app2',
    pId: 0,
    indexes: 8,
    children: [
      {
        label: '子部门1',
        title: '子部门1',
        value: 'msg2',
        id: 'msg2',
        // pId: 1,
      },
      {
        label: '子部门2',
        title: '子部门2',
        value: 'email2',
        id: 'email2',
        // pId: 1,
      },
    ],
  },
];

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
  {
    value: '4',
    label: '共享电工',
  },
];

export const teamTypeMap = arrMapObj(teamTypeConfig);

// export const teamTypeMap = {
//   0: '调度',
//   1: '值班',
//   2: '巡检',
//   3: '抢修',
// };

export const onDutyTypeConfig = [
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
  {
    value: '4',
    label: '共享电工',
  },
];

export const onDutyTypeMap = arrMapObj(onDutyTypeConfig);

// export const onDutyTypeMap = {
//   0: '调度',
//   1: '值班',
// };

export const customerTypeConfig = [
  {
    value: '0',
    label: '普通客户',
  },
  {
    value: '1',
    label: '托管客户',
  },
  // {
  //   value: 2,
  //   label: 'VIP客户',
  // },
  {
    value: '10',
    label: '监控客户',
  },
];

export const customerTypeMap = arrMapObj(customerTypeConfig);

export const industryTypeMap = {
  1: '工业',
};

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
    label: '待派发',
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

  {
    label: '进行中',
    value: 'in_progress',
  },
  {
    label: '待处理',
    value: 'pending',
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

export const inspectMissionStatusConfig = [
  {
    label: '待处理',
    value: 'pending',
  },
  {
    label: '处理中',
    value: 'in_process',
  },
  {
    label: '已完成',
    value: 'completed',
  },
];

export const inspectMissionStatusMap = arrMapObj(inspectMissionStatusConfig);

export const weakStatusConfig = [
  {
    label: '已处理',
    value: true,
  },
  {
    label: '未处理',
    value: false,
  },
];

export const weakStatusMap = arrMapObj(weakStatusConfig);

export const inspectMissionsSearchConfig = [
  {
    label: '待处理',
    value: 'pending',
  },
  {
    label: '待派发',
    value: 'waiting_dispatch',
  },
  {
    label: '已完成',
    value: 'completed',
  },
];

export const inspectMissionsStatusMap = arrMapObj(inspectMissionsSearchConfig);

export const site = province;
export const city = province;

export const noShowTitlePath = [
  '/om/home',
  '/cs/home',
  '/cs/energyInfo',
  '/cs/electricInfo',
  '/crm/turnRate',
  '/crm/saleData',
  '/crm/satisfactionDegree',
  '/crm/saleClue',
  // '/om/shiftsArrangeDetail'
];

export const httpTipsMap = {
  slow: '阿哦,加载中,请稍后',
  notNetWork: '阿哦,没有网络,请您检查网络设置',
  loadError: '阿哦,加载失败了,点击刷新试试（提供刷新按钮）',
};

export const workTicketExcuteConfig = [
  {
    label: '执行',
    value: 1,
  },
  {
    label: '未执行',
    value: 0,
  },
];

export const workTicketPeopleChangeConfig = [
  {
    label: '已全部拆除或拉开',
    value: 1,
  },
  {
    label: '未拆除已汇报调度由操作员拆除',
    value: 0,
  },
];

export const knowledgeTypeConfig = [
  {
    label: '新闻',
    value: 1,
  },
  {
    label: '知识点',
    value: 2,
  },
];

export const inspectTemplateConfig = [
  {
    label: '普通电站',
    value: 1,
  },
  {
    label: '特例',
    value: 2,
  },
];

export const inspectModelRadio = [
  {
    label: '月巡检',
    value: 0,
  },
  {
    label: '日巡检',
    value: 1,
  },
];

export const inspectModelRadioMap = arrMapObj(inspectModelRadio);

export const dayHours = createIndexArr(24).map(v => ({
  label: `${v}点`,
  value: `${v}`.padStart(2, '0') + ':00',
}));

export const dayHoursNum = createIndexArr(24).map(v => ({
  label: `${v}点`,
  value: `${v}`.padStart(2, '0'),
}));

export const contractTypeConfig = [
  {
    label: '托管',
    value: 1,
  },
  {
    label: '24小时托管',
    value: 2,
  },
  {
    label: '协管',
    value: 3,
  },
  {
    label: '维修',
    value: 4,
  },
  {
    label: '抢修',
    value: 5,
  },
  {
    label: '后出线',
    value: 6,
  },
  {
    label: '电试',
    value: 7,
  },
  {
    label: '业扩',
    value: 8,
  },
  {
    label: '综合能源服务',
    value: 9,
  },
  {
    label: '光伏及并网',
    value: 10,
  },
  {
    label: '监控安装',
    value: 11,
  },
  {
    label: '其他',
    value: 12,
  },
  {
    label: '电护卫',
    value: 13,
  },
  {
    label: '承揽加工',
    value: 14,
  },
  {
    label: '售电',
    value: 50,
  },
  {
    label: '购销',
    value: 51,
  },
  {
    label: '品牌服务',
    value: 15,
  },
  {
    label: '微电网',
    value: 16,
  },
  {
    label: '框架协议',
    value: 17,
  },
  {
    label: '共享电工',
    value: 18,
  },
  {
    label: '咨询',
    value: 19,
  },
  {
    label: '维保',
    value: 20,
  },
  {
    label: '租赁',
    value: 21,
  },
  {
    label: '会员制',
    value: 22,
  },
  {
    label: '充电桩',
    value: 23,
  },
  {
    label: '售电',
    value: 50,
  },
  {
    label: '购销',
    value: 51,
  },
  {
    label: '微电网分租',
    value: 101,
  },
];

export const contractTypeMap = arrMapObj(contractTypeConfig);

// export const voltageLevelConfig = [
//   {
//     label: '35kv',
//     value: '35kv',
//   },
//   {
//     label: '10kv',
//     value: '10kv',
//   },
//   {
//     label: '0.4kv',
//     value: '0.4kv',
//   },
// ];

export const notifyTypeConfig = [
  {
    label: '应用内通知',
    value: '2',
    key: 2,
  },
  {
    label: '短信',
    value: '0',
    key: 0,
  },
  {
    label: '邮件',
    value: '1',
    key: 1,
  },
];

export const notifyTypeWithAllConfig = [
  ...notifyTypeConfig,
  {
    label: '全选',
    value: 'all',
    key: 'all',
  },
];

export const notifyTypeMap = arrMapObj(notifyTypeConfig);

export const clientLevelConfig = [
  {
    label: '【签】VIP客户(集团)',
    value: '119',
  },
  {
    label: '【签】VIP客户',
    value: '120',
  },
  {
    label: '【签】优质客户',
    value: '110',
  },
  {
    label: '【签】普通客户',
    value: '100',
  },
  {
    label: '【签】边际客户',
    value: '90',
  },
  {
    label: '【分】已分配客户',
    value: '10',
  },
  {
    label: '【未】未分配客户',
    value: '0',
  },
  {
    label: '【无】无意向客户',
    value: '10',
  },
];

export const clientLevelMap = arrMapObj(clientLevelConfig);

export const clientTypeSearchConfig = [
  {
    label: '托管',
    value: 0,
  },
  {
    label: '普通客户',
    value: 1,
  },
];

export const clientTypeConfig = [
  {
    label: '托管',
    value: 0,
  },
  {
    label: '非托管',
    value: 1,
  },
];

export const clientTypeMap = arrMapObj(clientTypeConfig);

export const fullFormLayouts = {
  labelCol: {
    sm: { span: 0 },
  },
  wrapperCol: {
    sm: { span: 24 },
  },
};

export const halfFormLayouts = {
  labelCol: {
    sm: { span: 12 }, //
  },
  wrapperCol: {
    sm: { span: 12 }, //
  },
};

export const repairSourceConfig = [
  {
    label: '客户',
    value: '客户',
  },
  {
    label: '业务员',
    value: '业务员',
  },
];

export const enterpriseScaleConfig = [
  {
    label: '未知',
    value: '0',
  },
  // {
  //   label: '特大型',
  //   value: '0',
  // },
  {
    label: '大型',
    value: '1',
  },
  {
    label: '中型',
    value: '2',
  },
  {
    label: '小型',
    value: '3',
  },
  {
    label: '微型',
    value: '4',
  },
];

export const enterpriseScaleMap = arrMapObj(enterpriseScaleConfig);

export const enterpriseNatureConfig = [
  {
    label: '',
    value: '0',
  },
  // {
  //   label: '国有企业',
  //   value: '0',
  // },
  {
    label: '集体所有制企业',
    value: '1',
  },
  {
    label: '联营企业',
    value: '2',
  },
  {
    label: '三资企业',
    value: '3',
  },
  {
    label: '私营企业 ',
    value: '4',
  },
];

export const industryConfig = [
  {
    label: '农、林、牧、渔业',
    value: 0,
  },
  {
    label: '采矿业',
    value: 1,
  },
  {
    label: '制造业',
    value: 2,
  },
  {
    label: '电力、热力、燃气及水生产和供应业',
    value: 3,
  },
  {
    label: '建筑业；F 交通运输、仓储和邮政业',
    value: 4,
  },
  {
    label: '信息传输、软件和信息技术服务业',
    value: 5,
  },
  {
    label: '批发和零售业',
    value: 6,
  },
  {
    label: '住宿和餐饮业',
    value: 7,
  },
  {
    label: '金融业',
    value: 8,
  },
  {
    label: '房地产业',
    value: 9,
  },
  {
    label: '租赁和商务服务业',
    value: 10,
  },
  {
    label: '科学研究和技术服务业',
    value: 11,
  },
  {
    label: '水利、环境和公共设施管理业',
    value: 12,
  },
  {
    label: '居民服务、修理和其他服务业',
    value: 13,
  },
  {
    label: '教育',
    value: 14,
  },
  {
    label: '卫生和社会工作',
    value: 15,
  },
  {
    label: '文化、体育和娱乐业',
    value: 16,
  },
  {
    label: '公共管理、社会保障和社会组织',
    value: 17,
  },
  {
    label: '国际组织',
    value: 18,
  },
];

export const industryMap = arrMapObj(industryConfig);

export const assetScaleConfig = [
  {
    label: '100万以下',
    value: 0,
  },
  {
    label: '100万-1000万',
    value: 1,
  },
  {
    label: '1000万-5000万',
    value: 2,
  },
  {
    label: '5000万以上 ',
    value: 3,
  },
];

export const assetScaleMap = arrMapObj(assetScaleConfig);

export const corverAreaConfig = [
  {
    label: '100平米以下',
    value: '0',
  },
  {
    label: '100平米-1000平米',
    value: '1',
  },
  {
    label: '1000平米-5000平米',
    value: '2',
  },
  {
    label: '5000平米-1万平米',
    value: '3',
  },
  {
    label: '1万平米-10万平米',
    value: '4',
  },
  {
    label: '10万平米以上',
    value: '5',
  },
];

export const voltageLevelConfig = [
  {
    label: '',
    value: '0',
  },
  {
    label: '0.4KV',
    value: '1',
  },
  {
    label: '10KV',
    value: '2',
  },
  {
    label: '20KV',
    value: '6',
  },
  {
    label: '35KV',
    value: '3',
  },
  {
    label: '110KV',
    value: '4',
  },
  {
    label: '220KV',
    value: '5',
  },
];

export const voltageLevelMap = arrMapObj(voltageLevelConfig);

export const electricTypeConfig = [
  {
    label: '【分】单一制 工商业及其他用电',
    value: 1,
  },
  {
    label: '【分】单一制 农业生产用电',
    value: 2,
  },
  {
    label: '【分】两部制 大工业用电',
    value: 3,
  },
  {
    label: '【分】两部制 农业生产用电',
    value: 4,
  },
  {
    label: '【未】单一制 工商业及其他用电',
    value: 5,
  },
  {
    label: '【未】单一制 下水道动力用电',
    value: 6,
  },
  {
    label: '【未】单一制 农业生产用电',
    value: 7,
  },
  {
    label: '【未】单一制 农副业动力用电',
    value: 8,
  },
  {
    label: '【未】单一制 排灌动力用电',
    value: 9,
  },
  {
    label: '【未】两部制 工商业及其他用电',
    value: 10,
  },
  {
    label: '【未】两部制 铁合金烧碱用电',
    value: 11,
  },
  {
    label: '非居民 学校养老院用电',
    value: 12,
  },
  {
    label: '【新】单一制 工商业及其他用电',
    value: 13,
  },
  {
    label: '【新】单一制 未分时公廉租房用电',
    value: 14,
  },
  {
    label: '【分】两部制 工商业及其他用电',
    value: 15,
  },
  {
    label: '【未】两部制 大工业用电',
    value: 16,
  },
  {
    label: '光伏发电',
    value: 50,
  },
];

export const electricTypeMap = arrMapObj(electricTypeConfig);

export const billTypeConfig = [
  {
    label: '两部制 按实际最大需量计费',
    value: '3',
  },
  {
    label: '单一制 无基本电费',
    value: '1',
  },
  {
    label: '两部制 按变压器容量收费',
    value: '2',
  },
  {
    label: '两部制 按合同最大需量计',
    value: '4',
  },
  {
    label: '未知',
    value: '0',
    disabled: true,
  },
];

export const billTypeMap = arrMapObj(billTypeConfig);

export const normalConfig = [
  {
    label: '正常',
    value: '正常',
  },
  {
    label: '异常',
    value: '异常',
  },
];

export const inspectRecordDateConfig = [
  'es_check_date',
  'gw_check_date',
  'im_check_date',
  'ig_check_date',
  'is_check_date',
  'ex_check_date',
];

export const powerPointItemConfig = [
  {
    label: '线路号',
    value: 'line',
  },
  {
    label: 'A相电压',
    value: 'ua',
  },
  {
    label: 'B相电压',
    value: 'ub',
  },
  {
    label: 'C相电压',
    value: 'uc',
  },
  {
    label: 'A相电流',
    value: 'ia',
  },
  {
    label: 'B相电流',
    value: 'ib',
  },
  {
    label: 'C相电流',
    value: 'ic',
  },
  {
    label: 'A相功率',
    value: 'pa',
  },
  {
    label: 'B相功率',
    value: 'pb',
  },
  {
    label: 'C相功率',
    value: 'pc',
  },
  {
    label: '总功率',
    value: 'psum',
  },
  {
    label: 'A相无功功率',
    value: 'qa',
  },
  {
    label: 'B相无功功率',
    value: 'qb',
  },
  {
    label: 'C相无功功率',
    value: 'qc',
  },
  {
    label: '总无功功率',
    value: 'qsum',
  },
  {
    label: 'A相功率因数',
    value: 'pfa',
  },
  {
    label: 'B相功率因数',
    value: 'pfb',
  },
  {
    label: 'C相功率因数',
    value: 'pfc',
  },
  {
    label: '总功率因数',
    value: 'pfsum',
  },
  {
    label: '频率',
    value: 'fr',
  },
  {
    label: '有功需量',
    value: 'px',
  },
  {
    label: '感性无功',
    value: 'eq1',
  },
  {
    label: '容性无功',
    value: 'eq2',
  },
  {
    label: '总有功',
    value: 'ep',
  },
  {
    label: '线路温度',
    value: 'tc',
  },
  {
    label: '环境温度',
    value: 't',
  },
  {
    label: '环境湿度',
    value: 's',
  },
  {
    label: '时间',
    value: 'tm',
  },
];

export const powerPointItemMap = arrMapObj(powerPointItemConfig);

export const pressureCheckConfig = [
  {
    label: '正常',
    value: '正常',
  },
  {
    label: '异常',
    value: '异常',
  },
  {
    label: '无',
    value: '无',
  },
];

export const powerRateMap = {
  '1.00': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '1': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.99': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.98': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.97': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.96': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.95': {
    '0.90': '-0.75',
    '0.9': '-0.75',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.94': {
    '0.90': '-0.60',
    '0.9': '-0.60',
    '0.85': '-1.10',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.93': {
    '0.90': '-0.45',
    '0.9': '-0.45',
    '0.85': '-0.95',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.92': {
    '0.90': '-0.30',
    '0.9': '-0.30',
    '0.85': '-0.80',
    '0.80': '-1.30',
    '0.8': '-1.30',
  },
  '0.91': {
    '0.90': '-0.15',
    '0.9': '-0.15',
    '0.85': '-0.65',
    '0.80': '-1.15',
    '0.8': '-1.15',
  },
  '0.90': {
    '0.90': '0.00',
    '0.9': '0.00',
    '0.85': '-0.50',
    '0.80': '-1.00',
    '0.8': '-1.00',
  },
  '0.9': {
    '0.90': '0.00',
    '0.9': '0.00',
    '0.85': '-0.50',
    '0.80': '-1.00',
    '0.8': '-1.00',
  },
  '0.89': {
    '0.90': '+0.50',
    '0.9': '+0.50',
    '0.85': '-0.40',
    '0.80': '-0.90',
    '0.8': '-0.90',
  },
  '0.88': {
    '0.90': '+1.00',
    '0.9': '+1.00',
    '0.85': '-0.30',
    '0.80': '-0.80',
    '0.8': '-0.80',
  },
  '0.87': {
    '0.90': '+1.50',
    '0.9': '+1.50',
    '0.85': '-0.20',
    '0.80': '-0.70',
    '0.8': '-0.70',
  },
  '0.86': {
    '0.90': '+2.00',
    '0.9': '+2.00',
    '0.85': '-0.10',
    '0.80': '-0.60',
    '0.8': '-0.60',
  },
  '0.85': {
    '0.90': '+2.50',
    '0.9': '+2.50',
    '0.85': '0.00',
    '0.80': '-0.50',
    '0.8': '-0.50',
  },
  '0.84': {
    '0.90': '+3.00',
    '0.9': '+3.00',
    '0.85': '+0.50',
    '0.80': '-0.40',
    '0.8': '-0.40',
  },
  '0.83': {
    '0.90': '+3.50',
    '0.9': '+3.50',
    '0.85': '+1.00',
    '0.80': '-0.30',
    '0.8': '-0.30',
  },
  '0.82': {
    '0.90': '+4.00',
    '0.9': '+4.00',
    '0.85': '+1.50',
    '0.80': '-0.20',
    '0.8': '-0.20',
  },
  '0.81': {
    '0.90': '+4.50',
    '0.9': '+4.50',
    '0.85': '+2.00',
    '0.80': '-0.10',
    '0.8': '-0.10',
  },
  '0.80': {
    '0.90': '+5.00',
    '0.9': '+5.00',
    '0.85': '+2.50',
    '0.80': '0.00',
    '0.8': '0.00',
  },
  '0.8': {
    '0.90': '+5.00',
    '0.9': '+5.00',
    '0.85': '+2.50',
    '0.80': '0.00',
    '0.8': '0.00',
  },
  '0.79': {
    '0.90': '+5.50',
    '0.9': '+5.50',
    '0.85': '+3.00',
    '0.80': '+0.50',
    '0.8': '+0.50',
  },
  '0.78': {
    '0.90': '+6.00',
    '0.9': '+6.00',
    '0.85': '+3.50',
    '0.80': '+1.00',
    '0.8': '+1.00',
  },
  '0.77': {
    '0.90': '+6.50',
    '0.9': '+6.50',
    '0.85': '+4.00',
    '0.80': '+1.50',
    '0.8': '+1.50',
  },
  '0.76': {
    '0.90': '+7.00',
    '0.9': '+7.00',
    '0.85': '+4.50',
    '0.80': '+2.00',
    '0.8': '+2.00',
  },
  '0.75': {
    '0.90': '+7.50',
    '0.9': '+7.50',
    '0.85': '+5.00',
    '0.80': '+2.50',
    '0.8': '+2.50',
  },
};

// 网络类型
export const networkTypeConfig = [
  {
    value: '1',
    label: '3G',
  },
  {
    value: '2',
    label: '4G',
  },
  {
    value: '3',
    label: '5G',
  },
  {
    value: '4',
    label: 'WIFI',
  },
];

export const networkTypeMap = arrMapObj(networkTypeConfig);

export const monitorPointStatusConfig = [
  {
    value: '0',
    label: '异常',
  },
  {
    value: '1',
    label: '正常',
  },
  {
    value: '2',
    label: '断电',
  },
];

export const monitorPointStatusMap = arrMapObj(monitorPointStatusConfig);

export const monitorDeviceStatusConfig = [
  {
    value: '1',
    label: '正常',
  },
  {
    value: '2',
    label: '断电',
  },
  {
    value: '3',
    label: '已拆回',
  },
];

export const monitorDeviceStatusMap = arrMapObj(monitorDeviceStatusConfig);

export const manufacturerConfig = [
  {
    value: '1',
    label: '安科瑞',
    models: [
      {
        value: '1',
        label: 'ADW300-HJ-4G',
      },
    ],
  },
  {
    value: '2',
    label: '中电',
    models: [
      {
        value: '2',
        label: '350-E',
      },
    ],
  },
];

export const deviceFrequencyConfig = [
  {
    value: '300',
    label: '5分钟',
  },
];

export const deviceFrequencyMap = arrMapObj(deviceFrequencyConfig);

export const alarmRecordStatusConfig = [
  // {
  //   value: '0',
  //   label: '未处理',
  // },
  // {
  //   value: '1',
  //   label: '已处理',
  // },
  {
    value: '1',
    label: '未处理',
  },
  {
    value: '2',
    label: '已处理',
  },
];

export const alarmRecordStatusMap = arrMapObj(alarmRecordStatusConfig);

export const alarmRecordLevelConfig = [
  {
    value: '1',
    label: '黄色告警',
  },
  {
    value: '2',
    label: '红色告警',
  },
];

export const alarmRecordLevelMap = arrMapObj(alarmRecordLevelConfig);

export const alarmRecordTypeConfig = [
  {
    value: '1',
    label: '电压异常',
  },
  {
    value: '2',
    label: '电流异常',
  },
  {
    value: '3',
    label: '负载异常',
  },
  {
    value: '4',
    label: '设备断电',
  },
  {
    value: '5',
    label: '设备失联',
  },
  {
    value: '6',
    label: '单日上传率异常',
  },
];

export const alarmRecordTypeMap = arrMapObj(alarmRecordTypeConfig);

export const APPROVAL_PASS = '0'; //
export const WAIT_APPROVAL = '1'; //
export const PASS_APPROVAL = '2'; //
export const monitorApprovalConfig = [
  {
    value: APPROVAL_PASS,
    label: '待上线',
  },
  {
    value: WAIT_APPROVAL,
    label: '待审批',
  },
  {
    value: '2',
    label: '已通过',
  },
];

export const monitorApprovalMap = arrMapObj(monitorApprovalConfig);

export const validityPeriodConfig = [
  {
    value: '0',
    label: '三个月',
    time: 90,
  },
  {
    value: '1',
    label: '半年',
    time: 180,
  },
  {
    value: '2',
    label: '一年',
    time: 365,
  },
];

export const validityPeriodMap = arrMapObj(validityPeriodConfig);

export const iotAccountConfig = [
  {
    value: '0',
    label: '待审批',
  },
  {
    value: '1',
    label: '已通过',
  },
  {
    value: '2',
    label: '监控数据异常',
  },
  {
    value: '3',
    label: '填报内容错误',
  },
];

export const iotAccountMap = arrMapObj(iotAccountConfig);

export const changeNumberProps = {
  min: 0,
  // max: 1,
  step: 0.01,
  precision: 2,
};

export const monitorApprovalImgConfig = [
  'device_img',
  'meter_img',
  'trans_nameplate_img',
  'complete_img',
  'data_img',
  'other_img',
];

export const recentPowerAxisConfig = ['峰', '平', '谷'];

export const powerMoneyAxisConfig = [
  '峰电量',
  '平电量',
  '谷电量',
  '电费',
  // '峰电价',
  // '平电价',
  // '谷电价',
  // '电量',
  // '电价',
];

export const simcardStatusMap = {
  true: '激活',
  false: '未激活',
};

export const assetTypeConfig = [
  {
    value: '1001',
    label: '高压常规开关柜',
  },
  {
    value: '1002',
    label: '高压充气开关柜',
  },
  {
    value: '1003',
    label: '400V开关柜',
  },
  {
    value: '2001',
    label: '电流互感器',
  },
  {
    value: '2002',
    label: '电压互感器',
  },
  {
    value: '3001',
    label: '多功能表',
  },
  {
    value: '4001',
    label: '真空断路器',
  },
  {
    value: '4002',
    label: 'SF6断路器',
  },
  {
    value: '4003',
    label: '少油断路器',
  },
  {
    value: '4004',
    label: '微型断路器',
  },
  {
    value: '4005',
    label: '框架断路器',
  },
  {
    value: '4006',
    label: '塑壳断路器',
  },
  {
    value: '5001',
    label: '避雷器',
  },
  {
    value: '6001',
    label: '熔断器',
  },
  {
    value: '7001',
    label: '多功能表',
  },
  {
    value: '8001',
    label: '隔离开关刀闸',
  },
  {
    value: '8002',
    label: '负荷开关刀闸',
  },
  {
    value: '8003',
    label: '接地刀闸',
  },
  {
    value: '9001',
    label: '开关柜带电显示装置',
  },
  {
    value: '9002',
    label: '变压器带电显示',
  },
  {
    value: '1001',
    label: '温湿度装置',
  },
  {
    value: '1101',
    label: '触头盒',
  },
  {
    value: '1102',
    label: '套管',
  },
  {
    value: '1103',
    label: '绝缘支柱',
  },
  {
    value: '1201',
    label: '干式变压器',
  },
  {
    value: '1202',
    label: '油浸式变压器',
  },
  {
    value: '1301',
    label: '有载调压',
  },
  {
    value: '1401',
    label: '温控仪',
  },
  {
    value: '1501',
    label: '风机',
  },
  {
    value: '1601',
    label: '400V电容器柜',
  },
  {
    value: '1701',
    label: '控制器',
  },
  {
    value: '1801',
    label: '接触器',
  },
  {
    value: '1901',
    label: '电抗器',
  },
  {
    value: '2001',
    label: '直流屏',
  },
  {
    value: '2002',
    label: '通讯屏',
  },
  {
    value: '2003',
    label: '故障录波屏',
  },
  {
    value: '2004',
    label: '光端机屏',
  },
  {
    value: '2005',
    label: '其它辅助屏',
  },
  {
    value: '2006',
    label: '辅助屏充电模块',
  },
  {
    value: '2007',
    label: '辅助屏电池',
  },
  {
    value: '2008',
    label: '辅助屏电源稳压',
  },
  {
    value: '2009',
    label: '辅助屏分布式直流电源装置',
  },
  {
    value: '2010',
    label: '辅助屏模块',
  },
  {
    value: '2011',
    label: '辅助屏母块',
  },
  {
    value: '2012',
    label: '辅助屏显示屏',
  },
  {
    value: '2013',
    label: '辅助屏蓄电池',
  },
  {
    value: '2101',
    label: '三相电能计量柜',
  },
  {
    value: '2201',
    label: '馈线名',
  },
];

export const assetTypeMap = arrMapObj(assetTypeConfig);

const ocVoltageExtra = [
  // {
  //   noRule: true,
  //   itemProps: {
  //     label: '分/合闸电压',
  //     name: ['extra_data', 'ocVoltage'],
  //   },
  // },
  { label: '分/合闸电压', name: 'ocVoltage' },
];
const workVoltageExtra = [
  // {
  //   noRule: true,
  //   itemProps: {
  //     label: '工作电压',
  //     name: ['extra_data', 'workVoltage'],
  //   },
  // },
  { label: '工作电压', name: 'workVoltage' },
];
// [
//   {label: '', name: '', },
// ],

const transformerExtra = [
  { label: '短路阻抗', name: 'wiringGroup' },
  { label: '短路阻抗', name: 'shortImpedance' },
  { label: '冷却方式', name: 'coolingMethod' },
  { label: '空载损耗', name: 'unloadLoss' },
  { label: '负载损耗', name: 'loadLoss' },
];

const sensorExtra = [
  { label: '变比', name: 'ratio' },
  { label: '准确度', name: 'precision' },
  { label: '额定二次容量', name: 'secCapacity' },
];

const capacitorExtra = [{ label: '接线方式', name: 'wiringMethod' }];

export const assetFormTypeMap = {
  4001: ocVoltageExtra,
  4002: ocVoltageExtra,
  4003: ocVoltageExtra,
  4004: ocVoltageExtra,
  4005: ocVoltageExtra,
  4006: ocVoltageExtra,
  9001: workVoltageExtra,
  9001: transformerExtra,
  9002: transformerExtra,
  1201: transformerExtra,
  1202: transformerExtra,

  2001: sensorExtra,
  2002: sensorExtra,

  2002: sensorExtra,

  1601: capacitorExtra,
};

export const cameraSystemConfig = [
  {
    value: '1',
    label: '乐橙云',
  },
  {
    value: '2',
    label: '萤石云',
  },
  {
    value: '3',
    label: '哈罗鱼',
  },
];

export const cameraSystemMap = arrMapObj(cameraSystemConfig);

export const CAMERA1 = '1'; //
export const CAMERA2 = '2';
export const cameraTypeConfig = [
  { value: CAMERA1, label: '头盔摄像头' },
  { value: CAMERA2, label: '固定式摄像头' },
];

export const cameraTypeMap = arrMapObj(cameraTypeConfig);

export const CLIENTLIST_PRIVATE = 'private'; //
export const CLIENTLIST_PUBLIC = 'public'; //
export const clientListTabConfig = [
  {
    tab: '客户私海',
    key: CLIENTLIST_PRIVATE,
    value: 0,
  },
  {
    tab: '客户公海',
    key: CLIENTLIST_PUBLIC,
    value: 1,
  },
];
export const clientListTabMap = arrMapObj(clientListTabConfig, {
  key: 'key',
  label: 'value',
});

// export const MYTASK_PENDING_APPROVE = 'pending_approve'; //
// export const MYTASK_COMPLETE = 'complete'; //
// export const MYTASK_APPROVING = 'approving'; //
export const MYTASK_PENDING_APPROVE = 'pending'; //
export const MYTASK_COMPLETE = 'completed'; //
export const MYTASK_APPROVING = 'pending_approval'; //
export const mytaskTabConfig = [
  {
    tab: '待处理',
    key: MYTASK_PENDING_APPROVE,
    label: '待处理',
    value: MYTASK_PENDING_APPROVE,
  },
  {
    tab: '审批中',
    key: MYTASK_APPROVING,
    label: '审批中',
    value: MYTASK_APPROVING,
  },
  {
    tab: '已完成',
    key: MYTASK_COMPLETE,
    label: '已完成',
    value: MYTASK_COMPLETE,
  },
];

export const mytaskTabMap = arrMapObj(mytaskTabConfig);

export const clientPortraitSpreadConfig = [
  {
    label: '地区分布',
    value: '地区分布',
    key: 'adcodeList',
  },
  {
    label: '行业分布',
    value: '行业分布',
    key: 'industryList',
  },
  {
    label: '企业规模分布',
    value: '企业规模分布',
    key: 'saleList',
  },
  {
    label: '资产规模分布',
    value: '资产规模分布',
    key: 'assetList',
  },
];

export const clientListPlanTypeConfig = [
  {
    value: '1',
    label: '托管计划',
  },
  {
    value: '2',
    label: '电力施工',
  },
  {
    value: '3',
    label: '电气试验',
  },
  {
    value: '4',
    label: '抢修',
  },
];

export const clientListPlanTypeMap = arrMapObj(clientListPlanTypeConfig);

export const saleDataEchartsConfig = [
  {
    label: '销售额地区占比',
    value: '销售额地区占比',
    key: 'saleAreaData',
    subtextKey: 'saleAreaAmount',
  },
  {
    label: '销售额行业占比',
    value: '销售额行业占比',
    key: 'saleIndustyData',
    subtextKey: 'saleIndustyAmount',
  },
];

export const notifyClientEventConfig = [
  {
    label: '客户负责小欧手变更',
    value: '客户负责小欧手变更',
    key: '客户负责小欧手变更',
  },
  {
    label: '客户签约',
    value: '客户签约',
    key: '客户签约',
  },
  {
    label: '客户合同到期',
    value: '客户合同到期',
    key: '客户合同到期',
  },
  {
    label: '客户出现报警',
    value: '客户出现报警',
    key: '客户出现报警',
  },
  {
    label: '全选',
    value: '全选',
    key: '全选',
  },
];

export const notifyClientLinkConfig = [
  {
    label: '自动关联负责人',
    value: '自动关联负责人',
    key: '自动关联负责人',
  },
];

export const planContractStepConfig = [
  {
    title: '信息补充',
    value: '1',
  },
  {
    title: '方案阶段',
    value: '2',
  },
  {
    title: '合同阶段',
    value: '3',
  },
];

export const planContractDescConfig = current => [
  {
    label: '提交人',
    value: 'submitterName',
  },
  {
    label: '联系电话',
    value: 'submitterPhone',
  },
  {
    label: '提交时间',
    value: 'createdTime',
  },
  {
    label: '所属计划',
    value: 'planName',
    span: current === 2 ? 1 : 3,
  },
  ...(current === 2
    ? [
        {
          label: '合同金额',
          value: 'amount',
          span: 2,
        },
      ]
    : []),
  {
    label: '方案详情',
    label: '详情',
    value: 'file',
    span: 3,
    type: 'showPDF',
  },
];

export const systemNotifyConfig = [
  {
    label: '系统通知',
    value: '1',
    color: PRIMARY,
  },
  {
    label: '任务',
    value: '2',
    color: INFO,
  },
  {
    label: '巡检任务',
    value: '3',
    color: SUB,
  },
  {
    label: '监控告警',
    value: '4',
    color: WARN,
  },
];

export const systemNotifyMap = arrMapObj(systemNotifyConfig);
export const systemNotifyColorMap = arrMapColor(systemNotifyConfig);

export const clientClueLevelConfig = [
  {
    label: '低价值客户',
    value: '0',
  },
  {
    label: '中价值客户',
    value: '1',
  },
  {
    label: '高价值客户',
    value: '2',
  },
];

export const clientClueLevelMap = arrMapObj(clientClueLevelConfig);

export const clientClueStatusConfig = [
  {
    label: '待审批',
    value: '0',
  },
  {
    label: '已审批',
    value: '1',
  },
];

export const clientClueStatusMap = arrMapObj(clientClueStatusConfig);

export const myTaskTypeConfig = [
  {
    label: '信息补充',
    value: '1',
  },
  {
    label: '方案阶段',
    value: '2',
  },
  {
    label: '合同阶段',
    value: '3',
  },
  {
    label: '新客户录入',
    value: '4',
  },
  {
    label: '投诉',
    value: '5',
  },
];

export const myTaskTypeMap = arrMapObj(myTaskTypeConfig);

export const credentialsTypeConfig = [
  {
    label: '信息补充',
    value: '1',
  },
  {
    label: '方案阶段',
    value: '2',
  },
  {
    label: '合同阶段',
    value: '3',
  },
  {
    label: '新客户录入',
    value: '4',
  },
  {
    label: '投诉',
    value: '5',
  },
];

export const userStatusConfig = [
  {
    label: '在职',
    value: '1',
  },
  {
    label: '离职',
    value: '2',
  },
];

export const userStatusMap = arrMapObj(userStatusConfig);

export const certificationStatusConfig = [
  {
    label: '未认证',
    value: '0',
  },
  {
    label: '认证',
    value: '1',
  },
];

export const certificationStatusMap = arrMapObj(certificationStatusConfig);

export const certificateTypeConfig = [
  {
    label: '身份证',
    value: '1',
  },
  {
    label: '护照',
    value: '2',
  },
  {
    label: '港澳居民来往内地通行证',
    value: '3',
  },
  {
    label: '台湾居民来往大陆通行证',
    value: '4',
  },
  {
    label: '外国人永久居留身份证',
    value: '5',
  },
  {
    label: '港澳台居民居住证',
    value: '6',
  },
];

export const certificateTypeMap = arrMapObj(certificateTypeConfig);

export const genderRadios = [
  { label: '男', value: 1, key: '1' },
  { label: '女', value: 0, key: '0' },
];

export const crmNotifyTypeConfig = [
  {
    label: '站内',
    value: 1,
    key: 1,
  },
  {
    label: '短信',
    value: 2,
    key: 2,
  },
];

export const crmNotifyTypeMap = arrMapObj(crmNotifyTypeConfig);

export const crmMsgRadioCofig = [
  { label: '任务跟进', value: 1, key: '1' },
  { label: '任务催办', value: 2, key: '2' },
  { label: '客户投诉', value: 3, key: '3' },
];

export const crmMsgRadioMap = arrMapObj(crmMsgRadioCofig);

export const houseNoImgConfig = [
  { key: 'circuit_imgs', type: 'array' },
  { key: 'station_imgs', type: 'array' },
  { key: 'bill_imgs', type: 'array' },
  // {key: 'streetscape_img', type: 'string',},
];

export const boolConfig = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

export const boolMap = arrMapObj(boolConfig);

export const planListInfoDescConfig = [
  {
    label: '计划名称',
    value: 'name',
  },
  {
    label: '计划类型',
    value: 'planType',
  },
  {
    label: '方案时间',
    value: 'planTime',
  },
  {
    label: '合同时间',
    value: 'contractTime',
  },
  {
    label: '签约时间',
    value: 'signTime',
  },
];

export const phoneRule = {
  message: '请输入正确的手机号',
  pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
};

export const emailRule = {
  message: '邮箱格式不正确',
  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
};

export const assetDetailConfig = [
  {
    label: '设备名称',
    value: 'name',
  },
  {
    label: '设备类型',
    value: 'type',
    dataMap: assetTypeMap,
  },
  {
    label: '容量',
    value: 'real_capacity',
    value: 'capacity',
    unit: 'kVA',
  },
  {
    label: '厂商',
    value: 'manufacturer',
  },
  {
    label: '型号',
    value: 'model',
  },
  {
    label: '所属客户',
    value: 'customer_name',
  },
  {
    label: '户号',
    value: 'code',
  },
];
