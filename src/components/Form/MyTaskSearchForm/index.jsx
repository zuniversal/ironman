import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import { myTaskTypeConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getSearchList } from '@/services/userManage';

const MyTaskSearchForm = props => {
  const { data: userList, req: getSearchListAsync } = useHttp(getSearchList, {
    formatVal: 'nickname',
  });

  const config = [
    {
      formType: 'Search',
      selectData: userList,
      itemProps: {
        label: '提交人',
        name: 'user_id',
      },
    },
    {
      formType: 'Search',
      selectData: myTaskTypeConfig,
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    // {
    //   itemProps: {
    //     label: '进度',
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

export default MyTaskSearchForm;
