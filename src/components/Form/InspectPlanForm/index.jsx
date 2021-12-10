import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';

const InspectPlanForm = props => {
  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '电气告警条件',
        key: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: props.userList,
      itemProps: {
        label: '设备状态',
        key: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        key: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '能耗阈值',
        key: '',
      },
    },
    {
      itemProps: {
        label: '能耗过低',
        key: '',
      },
    },
    {
      itemProps: {
        label: '能耗过高',
        key: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        key: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电流阈值',
        key: '',
      },
    },
    {
      itemProps: {
        label: '电流过低',
        key: '',
      },
    },
    {
      itemProps: {
        label: '电流过高',
        key: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        key: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电压阈值',
        key: '',
      },
    },
    {
      itemProps: {
        label: '电压过低',
        key: '',
      },
    },
    {
      itemProps: {
        label: '电压过高',
        key: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        key: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '温度阈值',
        key: '',
      },
    },
    {
      itemProps: {
        label: '温度过低',
        key: '',
      },
    },
    {
      itemProps: {
        label: '温度过高',
        key: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        key: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '湿度阈值',
        key: '',
      },
    },
    {
      itemProps: {
        label: '湿度过低',
        key: '',
      },
    },
    {
      itemProps: {
        label: '湿度过高',
        key: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        key: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

InspectPlanForm.defaultProps = {};

export default InspectPlanForm;
