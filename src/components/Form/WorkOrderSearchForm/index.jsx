import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { workOrderStatusConfig } from '@/configs';

const WorkOrderSearchForm = props => {
  const config = [
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '处理人',
        name: 'user_id',
      },
    },
    {
      formType: 'Search',
      selectData: workOrderStatusConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },

    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    //
    // },

    {
      noLabel: true,
      itemProps: {
        label: '任务/客户名称',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

WorkOrderSearchForm.defaultProps = {};

export default WorkOrderSearchForm;
