import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/userManage';

const TurnRateSearchForm = props => {
  const { data: serviceStaffList, req: getServiceStaffListAsync } = useHttp(
    getServiceStaff,
    {
      formatVal: 'nickname',
    },
  );

  const config = [
    {
      formType: 'Search',
      selectData: serviceStaffList,
      itemProps: {
        label: '客户代表',
        name: 'user_id',
      },
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

export default TurnRateSearchForm;
