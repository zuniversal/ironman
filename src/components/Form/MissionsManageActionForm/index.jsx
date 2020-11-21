import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { missionsTypeConfig, missionsStatusConfig } from '@/configs';
import { Tabs } from 'antd';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';

export const MissionsManageWorkOrderForm = props => {
  console.log(' MissionsManageWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientData,
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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageWorkOrderForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageContractForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        size={'small'}
        {...rest}
      ></SmartForm>

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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageScheduleForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        size={'small'}
        {...rest}
      ></SmartForm>

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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageConfirmScheduleForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        size={'small'}
        {...rest}
      ></SmartForm>

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
      <Tabs defaultActiveKey="1" onChange={props.onChange}>
        {/* {tabData.map((v, i) => (
          <TabPane tab={`工单-${v.power_number}`} key={i}></TabPane>
        ))} */}
        <TabPane tab={'工单1'} key="1"></TabPane>
        <TabPane tab={'工单2'} key="2"></TabPane>
      </Tabs>
    </div>
  );
};

TabPanes.defaultProps = {
  tabData: [],
};

export const MissionsManageOrderInfoForm = props => {
  console.log(' MissionsManageOrderInfoForm ： ', props); //

  const { power_data } = props.init;
  const onChange = index => {
    console.log(' onChange   index,   ： ', index, power_data);
    props.init.powerData = power_data[index];
  };

  const config = [
    {
      formType: 'CustomCom',
      CustomCom: <TabPanes onChange={onChange} tabData={[]}></TabPanes>,
      itemProps: {
        label: '',
        className: 'w100',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
        name: 'customer',
        className: 'w100',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '标题',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '类型',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '状态',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '巡检时间',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '客户',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '设备ID',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '反馈信息',
        name: 'customer',
        className: 'w100',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '反馈人',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '反馈电话',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '详细内容',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '反馈图片',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '派单信息',
        name: 'customer',
        className: 'w100',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '处理人',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '领取时间',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '处理时间',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '施工图片',
        name: 'customer',
        // className: 'w50',
      },
      // className: 'w50',
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init.task_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '工单日志',
        name: 'task_log',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' missionsManageOrderInfoForm '}>
      <SmartForm
        flexRow={2}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm>
    </div>
  );
};

MissionsManageOrderInfoForm.defaultProps = {};
