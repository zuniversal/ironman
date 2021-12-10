import React from 'react';
import SmartForm, { SearchForm } from '@/common/SmartForm';
import { workOrderStatusConfig } from '@/configs';

const CsInspectRecordSearchForm = props => {
  const config = [
    {
      // formType: 'Select',
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
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: '',
      },
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

CsInspectRecordSearchForm.defaultProps = {};

export default CsInspectRecordSearchForm;
