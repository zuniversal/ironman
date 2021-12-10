import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

const AlarmTemplateForm = props => {
  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '电气告警条件',
      },
    },
    {
      itemProps: {
        label: '设备状态',
      },
    },
    {
      itemProps: {
        label: '持续',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '能耗阈值',
      },
    },
    {
      itemProps: {
        label: '能耗过低',
      },
    },
    {
      itemProps: {
        label: '能耗过高',
      },
    },
    {
      itemProps: {
        label: '持续',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电流阈值',
      },
    },
    {
      itemProps: {
        label: '电流过低',
      },
    },
    {
      itemProps: {
        label: '电流过高',
      },
    },
    {
      itemProps: {
        label: '持续',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电压阈值',
      },
    },
    {
      itemProps: {
        label: '电压过低',
      },
    },
    {
      itemProps: {
        label: '电压过高',
      },
    },
    {
      itemProps: {
        label: '持续',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '温度阈值',
      },
    },
    {
      itemProps: {
        label: '温度过低',
      },
    },
    {
      itemProps: {
        label: '温度过高',
      },
    },
    {
      itemProps: {
        label: '持续',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '湿度阈值',
      },
    },
    {
      itemProps: {
        label: '湿度过低',
      },
    },
    {
      itemProps: {
        label: '湿度过高',
      },
    },
    {
      itemProps: {
        label: '持续',
      },
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

AlarmTemplateForm.defaultProps = {};

export default AlarmTemplateForm;
