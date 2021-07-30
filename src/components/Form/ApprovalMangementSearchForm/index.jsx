import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';

const ApprovalMangementSearchForm = props => {
  const config = [
    // {
    //   // formType: 'Search',
    //   // selectData: ,
    //   itemProps: {
    //     label: '审批类型',
    //     name: '',
    //   },
    // },
    // {
    //   // formType: 'Search',
    //   // selectData: ,
    //   itemProps: {
    //     label: '审批人',
    //     name: '',
    //   },
    // },
    // {
    //   // formType: 'Search',
    //   // selectData: ,
    //   itemProps: {
    //     label: '提交人',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '公司名',
    //     name: '',
    //   },
    // },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '审批人',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '类型',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '提交人',
        name: '',
      },
    },
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

export default ApprovalMangementSearchForm;
