import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/userManage';
import { getList } from '@/services/clientList';
import { clientClueStatusConfig } from '@/configs';
import { formatSelectList } from '@/utils';

const ClientListSearchForm = props => {
  const { data: serviceStaffList, req: getServiceStaffAsync } = useHttp(
    getServiceStaff,
    {
      format: res => formatSelectList(res, 'nickname'),
    },
  );

  const config = [
    {
      formType: 'Search',
      selectData: clientClueStatusConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    // {
    //   formType: 'Search',
    //   selectData: serviceStaffList,
    //   itemProps: {
    //     label: '客户代表',
    //     name: '',
    //   },
    // },
    {
      noLabel: true,
      itemProps: {
        label: '关键字',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

export default ClientListSearchForm;
