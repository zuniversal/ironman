import React from 'react';
import SmartForm from '@/common/SmartForm';

export const MonitorApprovalRemarkForm = props => {
  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '备注',
        name: 'comments',
      },
    },
  ];

  return <SmartForm size={'small'} config={config} {...props}></SmartForm>;
};
