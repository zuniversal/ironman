import React from 'react';
import SmartForm from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

export const config = [
  {
    itemProps: {
      label: '物料编号',
      name: 'code',
    },
  },
  {
    itemProps: {
      label: '物料名称',
      name: 'name',
    },
  },
  {
    formType: 'InputNumber',
    itemProps: {
      label: '单价(元)',
      name: 'price',
    },
  },
];

const GoodsForm = props => {
  return <SmartForm config={config} {...props}></SmartForm>;
};

GoodsForm.defaultProps = {};

export default GoodsForm;
