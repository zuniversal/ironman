import React from 'react';
import SmartForm from '@/common/SmartForm';
import { clientListPlanTypeConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';
import { getServiceStaff } from '@/services/userManage';
import { getRelatived } from '@/services/client';

export const ClientClueApproveForm = props => {
  const { data: userList } = useHttp(getServiceStaff, {
    formatVal: 'nickname',
  });
  const { data: clientList } = useHttp(() => getRelatived({ get_all: '1' }));

  const config = [
    {
      itemProps: {
        label: '',
        name: 'd_id',
        className: 'hidden',
      },
    },
    {
      itemProps: {
        label: '客户',
        name: 'name',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'Search',
      selectData: userList,
      itemProps: {
        label: '分配业务员',
        name: 'salesman_id',
      },
    },
    {
      formType: 'Search',
      selectData: clientList,
      itemProps: {
        label: '服务公司',
        name: 'service_enterprise_id',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};
