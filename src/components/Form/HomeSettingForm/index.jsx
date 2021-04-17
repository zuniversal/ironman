import React from 'react';
import './style.less';
import { Tabs, Checkbox } from 'antd';
import SmartForm from '@/common/SmartForm';

const CheckboxGroup = Checkbox.Group;

const checkboxSelfData = [
  { label: '完成工单数', value: 'completeOrder', key: 'completeOrder' },
  { label: '完成巡检数', value: 'compeleteInspect', key: 'compeleteInspect' },
  { label: '完成任务数', value: 'compeleteMission', key: 'compeleteMission' },

  { label: '小组数据统计', value: 'groupCount', key: 'groupCount' },

  { label: '待巡检任务', value: 'inspectMission', key: 'inspectMission' },
  { label: '待处理工单', value: 'pendingOrder', key: 'pendingOrder' },

  // { label: '未领取工单', value: 'waitReceive', key: 'waitReceive', },
  // { label: '未领取巡检任务', value: 'waitInspect', key: 'waitInspect', },
];

const checkboxData = [
  { label: '完成工单数', value: 'completeOrder', key: 'completeOrder' },
  { label: '完成巡检数', value: 'compeleteInspect', key: 'compeleteInspect' },
  { label: '完成任务数', value: 'compeleteMission', key: 'compeleteMission' },

  { label: '小组数据统计', value: 'groupCount', key: 'groupCount' },

  { label: '待巡检任务', value: 'inspectMission', key: 'inspectMission' },
  { label: '待处理工单', value: 'pendingOrder', key: 'pendingOrder' },

  { label: '未领取工单', value: 'waitReceive', key: 'waitReceive' },
  { label: '未领取巡检任务', value: 'waitInspect', key: 'waitInspect' },
];

const checkboxConfig = [
  {
    CustomCom: (
      <div className="rowTitle" key={'self'}>
        本人
      </div>
    ),
  },
  ...checkboxSelfData,
  {
    CustomCom: (
      <div className="rowTitle" key={'group'}>
        本组
      </div>
    ),
  },
  ...checkboxData.map(v => ({
    ...v,
    value: v.value + 'Group',
    key: v.key + 'Group',
  })),
  {
    CustomCom: (
      <div className="rowTitle" key={'all'}>
        全部
      </div>
    ),
  },
  ...checkboxData.map(v => ({
    ...v,
    value: v.value + 'All',
    key: v.key + 'All',
  })),
];

const { TabPane } = Tabs;

const tabPanesConfig = [
  { label: '本人', value: 'personal', key: 'personal' },
  { label: '本组', value: 'group', key: 'group' },
  { label: '全部', value: 'all', key: 'all' },
];

const TabPanes = props => {
  const { tabData } = props;
  return (
    <div className="w100">
      <Tabs defaultActiveKey="0" onChange={props.onChange}>
        {tabData.map((v, i) => (
          <TabPane tab={`${v[props.tabItemKey]}`} key={i}></TabPane>
        ))}
      </Tabs>
    </div>
  );
};

TabPanes.defaultProps = {
  tabItemKey: '',
  tabPrefix: '',
  tabData: [],
};

const HomeSettingForm = props => {
  console.log(' HomeSettingForm ： ', props);
  const { formBtn, ...rest } = props;

  console.log(' checkboxConfig ： ', checkboxConfig);
  // const CheckboxItems = checkboxData.map(v => (
  //   v.type === 'custom' ? <div>ssssssssss</div> : <Checkbox key={v.value} value={v.value}>
  //     {v.label}
  //   </Checkbox>
  // ));

  const config = [
    {
      noRule: true,
      formType: 'Checkbox',
      checkboxData: checkboxConfig,
      itemProps: {
        label: '',
        name: 'homeSettings',
      },
    },

    // {
    //   formType: 'CustomCom',
    //   CustomCom: <div className="rowTitle">
    //     本人
    //   </div>
    // },
    // {
    //   noRule: true,
    //   formType: 'Checkbox',
    //   checkboxData: checkboxSelfData,
    //   itemProps: {
    //     label: '',
    //     name: 'homeSettings',
    //   },
    // },
    // {
    //   formType: 'CustomCom',
    //   CustomCom: <div className="rowTitle">
    //     本组
    //   </div>
    // },
    // {
    //   noRule: true,
    //   formType: 'Checkbox',
    //   checkboxData: checkboxData,
    //   itemProps: {
    //     label: '',
    //     name: 'groupSettings',
    //   },
    // },
    // {
    //   formType: 'CustomCom',
    //   CustomCom: <div className="rowTitle">
    //     全部
    //   </div>
    // },
    // {
    //   noRule: true,
    //   formType: 'Checkbox',
    //   checkboxData: checkboxData,
    //   itemProps: {
    //     label: '',
    //     name: 'allSettings',
    //   },
    // },

    // {
    //   formType: 'CustomCom',
    //   CustomCom: <CheckboxGroup>{CheckboxItems}</CheckboxGroup>,
    // },
  ];

  return (
    <div className={' homeSettingForm '}>
      {/* {tabPanesConfig.map((v, i) => <TabPanes tabData={tabPanesConfig} tabItemKey={'label'} key={i} {...v}></TabPanes>)} */}
      {/* <TabPanes tabData={tabPanesConfig} tabItemKey={'label'} ></TabPanes> */}

      <SmartForm
        config={config}
        // init={{
        //   settings: ['item1', 'item2'],
        // }}
        noLabelLayout
        {...props}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

HomeSettingForm.defaultProps = {};

export default HomeSettingForm;
