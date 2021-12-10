import React from 'react';
import SmartForm from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

export const config = [
  {
    formType: 'Select',
    noRule: true,
    itemProps: {
      label: '模块',
    },
  },
  {
    itemProps: {
      label: '名称',
    },
  },
  {
    formType: 'TextArea',
    noRule: true,
    itemProps: {
      label: '枚举值',
    },
  },
  {
    noRule: true,
    itemProps: {
      label: '关联设备',
    },
  },
  {
    formType: 'TextArea',
    noRule: true,
    itemProps: {
      label: '备注',
    },
  },
];

const ShiftsForm = props => {
  return <SmartForm config={config} {...props}></SmartForm>;
};

ShiftsForm.defaultProps = {};

export default ShiftsForm;
