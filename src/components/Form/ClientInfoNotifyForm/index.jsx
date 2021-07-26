import React, { useEffect } from 'react';
import SmartForm from '@/common/SmartForm';

const ClientInfoNotifyForm = props => {
  console.log(' ClientInfoNotifyForm ： ', props); //

  const config = [
    {
      itemProps: {
        label: '名称',
        name: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default ClientInfoNotifyForm;
