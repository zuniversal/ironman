import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';

const AlarmRecordForm = props => {
  console.log(' AlarmRecordForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
      },
    },
    {
      itemProps: {
        label: '客户名称',
      },
    },
    {
      itemProps: {
        label: '电站',
      },
    },
    {
      itemProps: {
        label: '监测点',
      },
    },
    {
      itemProps: {
        label: '地址',
      },
    },
    {
      itemProps: {
        label: '关联设备',
      },
    },
    {
      itemProps: {
        label: '设备ID',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '告警信息',
      },
    },
    {
      itemProps: {
        label: '告警类型',
      },
    },
    {
      itemProps: {
        label: '当前状态',
      },
    },
    {
      itemProps: {
        label: '领确认',
      },
    },
    {
      itemProps: {
        label: '告警信息',
      },
    },
    {
      itemProps: {
        label: '开始时间',
      },
    },
    {
      itemProps: {
        label: '开始时间',
      },
    },
    {
      itemProps: {
        label: '持续时长',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init.work_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '处理日志',
        name: ' ',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

AlarmRecordForm.defaultProps = {};

export default AlarmRecordForm;
