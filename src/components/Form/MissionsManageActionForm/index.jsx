import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { missionsTypeConfig, missionsStatusConfig } from '@/configs';
import { Tabs } from 'antd';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import SmartImg from '@/common/SmartImg';

export const MissionsManageWorkOrderForm = props => {
  console.log(' MissionsManageWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getClientAsync,
      // selectData: props.clientData,
      itemProps: {
        label: '客户',
        name: 'client',
      },
      comProps: {
        disabled: true, //
      },
    },
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: missionsTypeConfig,
      itemProps: {
        label: '类型',
        name: 'type',
      },
      comProps: {
        // disabled: true,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '分配给',
        name: 'team_id',
      },
    },
  ];

  return (
    <div className={' MissionsManageWorkOrderForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageWorkOrderForm.defaultProps = {};

export const MissionsManageContractForm = props => {
  console.log(' MissionsManageContractForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getContractAsync,
      selectData: props.contractList,
      itemProps: {
        label: '选择合同',
        name: 'contract_id',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' MissionsManageContractForm '}>
      <SmartForm config={config} size={'small'} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageContractForm.defaultProps = {};

export const MissionsManageScheduleForm = props => {
  console.log(' MissionsManageScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
        name: 'plan_date',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' MissionsManageScheduleForm '}>
      <SmartForm config={config} size={'small'} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageScheduleForm.defaultProps = {};

const scheduleRadios = [
  // { label: '通过', value: 'yes', key: 'yes' },
  // { label: '驳回', value: 'no', key: 'no' },
  { label: '通过', value: true, key: 'yes' },
  { label: '驳回', value: false, key: 'no' },
];

export const MissionsManageConfirmScheduleForm = props => {
  console.log(' MissionsManageConfirmScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Radio',
      radioData: scheduleRadios,
      itemProps: {
        label: '确认排期',
        className: 'w100',
        name: 'result',
      },
    },
    {
      noRule: true,
      formType: 'TextArea',
      itemProps: {
        label: '理由',
        name: 'reason',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' MissionsManageConfirmScheduleForm '}>
      <SmartForm config={config} size={'small'} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageConfirmScheduleForm.defaultProps = {};

const { TabPane } = Tabs;

const TabPanes = props => {
  const { tabData } = props; //
  return (
    <div className="w100">
      <Tabs defaultActiveKey="0" onChange={props.onChange}>
        {tabData.map((v, i) => (
          <TabPane tab={`工单-${i + 1}`} key={i}></TabPane>
        ))}
        {/* <TabPane tab={'工单11'} key="0"></TabPane>
        <TabPane tab={'工单2'} key="1"></TabPane>
        <TabPane tab={'工单2'} key="2"></TabPane>
        <TabPane tab={'工单2'} key="3"></TabPane> */}
      </Tabs>
    </div>
  );
};

TabPanes.defaultProps = {
  tabData: [],
};

const formLayouts15 = {
  labelCol: {
    sm: { span: 4 }, //
  },
  wrapperCol: {
    sm: { span: 20 }, //
  },
};

const formLayouts = {
  labelCol: {
    sm: { span: 8 }, //
  },
  wrapperCol: {
    sm: { span: 16 }, //
  },
};

export const MissionsManageOrderInfoForm = props => {
  console.log(' MissionsManageOrderInfoForm ： ', props); //

  const { extra } = props.init;
  const { task = {}, file } = props.init;
  const buildFile = file ? file : [];
  const responseFile = task.file ? task.file : [];
  const initData = props.init;
  const onChange = index => {
    console.log(' onChange   index,   ： ', index, extra.order_list);
    props.showItemAsync({
      action: 'workOrderDetailAsync',
      // d_id: extra.order_list[index],
      d_id: [0, 1, 2, 3][index],
      extra: extra,
    });
    // props.init.powerData = extra[index];
  };

  const config = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <TabPanes onChange={onChange} tabData={extra.order_list}></TabPanes>
      ),
      itemProps: {
        label: '',
        className: 'w100',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '标题:',
        name: 'name',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '类型:',
        name: 'type',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '状态:',
        name: 'status',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    // {
    //   itemProps: {
    //     label: '巡检时间:',
    //     name: '',
    //   },
    //   comProps: {
    //     allowClear: false,
    //     className: 'detailItem w-200',
    //   },
    // },
    {
      itemProps: {
        label: '客户:',
        name: ['task', 'customer', 'name'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '设备ID:',
        name: ['task', 'equipments', 'name'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '反馈信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '反馈人:',
        name: ['task', 'contacts'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '反馈电话:',
        name: ['task', 'contacts_phone'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '详细内容:',
        name: ['task', 'describe'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {/* {createArr(12).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))} */}
          {responseFile.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '反馈图片:',
        name: ['task', 'file'],
        className: 'w100',
        ...formLayouts15,
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '派单信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '处理人:',
        name: ['team', 'team_headman'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '领取时间:',
        name: 'receiving_time',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '处理时间:',
        name: 'commencement_date',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {/* {createArr(4).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))} */}
          {buildFile.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '施工图片:',
        name: 'file',
        className: 'w100',
        ...formLayouts15,
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init?.work_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '工单日志:',
        name: 'task_log',
      },
    },
  ];
  // .map((v) => ({...v, itemProps: {...v.itemProps, colon: true,  }}));

  return (
    <div className={' missionsManageOrderInfoForm '}>
      <SmartForm
        flexRow={2}
        config={config}
        init={initData}
        // init={{}}

        noRuleAll
        isDisabledAll
        formLayouts={formLayouts}

        // {...props}
      ></SmartForm>
    </div>
  );
};

MissionsManageOrderInfoForm.defaultProps = {};
