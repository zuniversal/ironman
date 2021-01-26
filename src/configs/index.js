// import regions from './regions'//
// console.log(' regions ： ', regions,  )//
// export const regoins = regions

import { createIndexArr } from '@/utils';

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

export const onDutyTypeMap = {
  0: '调度',
  1: '值班',
};

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
  '/cs/home',
  // '/om/shiftsArrangeDetail'
];

export const httpTipsMap = {
  slow: '阿哦，加载中，请稍后',
  notNetWork: '阿哦，没有网络，请您检查网络设置',
  loadError: '阿哦，加载失败了，点击刷新试试（提供刷新按钮）',
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

export const notifyTypeConfig = [
  {
    label: '应用内通知',
    value: 2,
    key: 2,
  },
  {
    label: '短信',
    value: 0,
    key: 0,
  },
  {
    label: '邮件',
    value: 1,
    key: 1,
  },
];

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

export const clientLevelConfig = [
  {
    label: '【签】VIP客户(集团)',
    value: 119,
  },
  {
    label: '【签】VIP客户',
    value: 120,
  },
  {
    label: '【签】优质客户',
    value: 110,
  },
  {
    label: '【签】普通客户',
    value: 100,
  },
  {
    label: '【签】边际客户',
    value: 90,
  },
  {
    label: '【分】已分配客户',
    value: 10,
  },
  {
    label: '【未】未分配客户',
    value: 0,
  },
  {
    label: '【无】无意向客户',
    value: 10,
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
    label: '特大型',
    value: '0',
  },
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

export const enterpriseNatureConfig = [
  {
    label: '国有企业',
    value: '0',
  },
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

export const corverAreaConfig = [
  {
    label: '100平米以下',
    value: 0,
  },
  {
    label: '100平米-1000平米',
    value: 1,
  },
  {
    label: '1000平米-5000平米',
    value: 2,
  },
  {
    label: '5000平米-1万平米',
    value: 3,
  },
  {
    label: '1万平米-10万平米',
    value: 4,
  },
  {
    label: '10万平米以上',
    value: 5,
  },
];

export const voltageLevelConfig = [
  {
    label: '0.4KV',
    value: 1,
  },
  {
    label: '10KV',
    value: 2,
  },
  {
    label: '20KV',
    value: 6,
  },
  {
    label: '35KV',
    value: 3,
  },
  {
    label: '110KV',
    value: 4,
  },
  {
    label: '220KV',
    value: 5,
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
