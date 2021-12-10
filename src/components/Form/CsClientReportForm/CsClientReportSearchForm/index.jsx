import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { workOrderStatusConfig } from '@/configs';

const CsClientReportSearchForm = props => {
  const config = [
    // {
    //   noLabel: true,
    //   itemProps: {
    //     label: '报告名称',
    //     name: 'keyword',
    //   },
    // },
    // {
    //   formType: 'RangePicker',
    //   itemProps: {
    //     label: '日期',
    //     name: '',
    //   },
    // },

    // {
    //   noRule: false,
    //   formType: 'Search',
    //   selectData: props.clientList,
    //   itemProps: {
    //     label: '客户',
    //     name: 'customer_id',
    //   },
    //   comProps: {
    //     mode: 'multiple',
    //   },
    // },
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择月份',
        name: 'year_month',
      },
    },
    // {
    //   noLabel: true,
    //   itemProps: {
    //     label: '户号/客户名称/客户代表/巡检组长',
    //     name: 'filter',
    //   },
    //   comProps: {
    //     className: 'keywordInput',
    //   },
    // },
  ];

  return <SearchForm config={config} noRule={false} {...props}></SearchForm>;
};

CsClientReportSearchForm.defaultProps = {};

export default CsClientReportSearchForm;
