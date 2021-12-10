import React from 'react';
import SmartForm from '@/common/SmartForm';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';

const AlarmRecordForm = props => {
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
        label: '监控点',
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
