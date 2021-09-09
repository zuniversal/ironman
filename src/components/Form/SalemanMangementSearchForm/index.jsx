import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import { userStatusConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';

const SalemanMangementSearchForm = props => {
  const config = [
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '子公司',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: userStatusConfig,
      itemProps: {
        label: '状态',
        name: '',
      },
    },
    {
      itemProps: {
        label: '姓名',
        name: '',
      },
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

export default SalemanMangementSearchForm;
