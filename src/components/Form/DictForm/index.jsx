import React from 'react';
import SmartForm from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

export const config = [
  {
    // formType: 'Select',
    noRule: true,
    itemProps: {
      label: '模块',
      name: 'model',
    },
  },
  {
    itemProps: {
      label: '名称',
      name: 'name',
    },
  },
  {
    formType: 'TextArea',
    noRule: true,
    itemProps: {
      label: '枚举值',
      name: 'value',
    },
  },
  {
    noRule: true,
    itemProps: {
      label: '关联设备',
      name: 'equipment_id',
    },
  },
  {
    formType: 'TextArea',
    noRule: true,
    itemProps: {
      label: '备注',
      name: 'remark',
    },
  },
];

const DictForm = props => {
  return <SmartForm config={config} {...props}></SmartForm>;
};

DictForm.defaultProps = {};

export default DictForm;
