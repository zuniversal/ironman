import React from 'react';
import { SearchForm } from '@/common/SmartForm';

const ClientPortraitSearchForm = props => {
  const config = [
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '地区',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '行业',
        name: '',
      },
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

export default ClientPortraitSearchForm;
