import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { inspectMissionsSearchConfig } from '@/configs';

const InspectMissionSearchForm = props => {
  console.log(' InspectMissionSearchForm ： ', props);
  const config = [
    {
      // 职位 班组组长
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '处理人',
        name: 'team',
      },
    },
    {
      formType: 'Search',
      selectData: inspectMissionsSearchConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
      formType: 'DatePicker',
      formType: 'MonthPicker',
      itemProps: {
        label: '年月',
        name: 'year_month',
      },
    },
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    //
    // },

    {
      // formType: 'Select',
      noLabel: true,
      itemProps: {
        label: '名称',
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

export default InspectMissionSearchForm;
