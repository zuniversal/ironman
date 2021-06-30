import React from 'react';
import SmartForm from '@/common/SmartForm';
import { voltageLevelConfig } from '@/configs';

const PowerNumberForm = props => {
  const config = [
    {
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
    },
    {
      itemProps: {
        label: '电表号',
        name: 'meter_number',
      },
    },
    {
      itemProps: {
        label: '进线名称',
        name: 'incoming_line_name',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '倍率',
        name: 'magnification',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '装接容量',
        name: 'transformer_capacity',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '实际容量',
        name: 'real_capacity',
      },
    },
    {
      formType: 'Search',
      selectData: voltageLevelConfig,
      itemProps: {
        label: '电源等级',
        name: 'voltage_level',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default PowerNumberForm;
