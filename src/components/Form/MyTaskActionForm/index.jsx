import React from 'react';
import SmartForm from '@/common/SmartForm';
import { clientListPlanTypeConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';
import { getServiceStaff } from '@/services/userManage';
import { getRelatived } from '@/services/client';

export const MyTaskApproveForm = props => {
  const config = [
    {
      formType: 'TextArea',
      noRule: true,
      itemProps: {
        label: '审批原因',
        name: 'reason',
      },
    },
  ];

  return <SmartForm size={'small'} config={config} {...props}></SmartForm>;
};
