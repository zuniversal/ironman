import React from 'react';
import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';

const MonitorManageSearchForm = props => {
  const config = [
    {
      itemProps: {
        label: '客户',
        name: 'customer_name',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'name',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

MonitorManageSearchForm.defaultProps = {};

export default MonitorManageSearchForm;
