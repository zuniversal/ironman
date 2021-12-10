import React, { useEffect } from 'react';
import SmartForm from '@/common/SmartForm';

const OutlineForm = props => {
  const config = [
    {
      noRule: true,
      colCls: 'hidden',
      itemProps: {
        label: '出线侧编号',
        name: 'id',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '出线侧名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: props.powerInfoData,
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default OutlineForm;
