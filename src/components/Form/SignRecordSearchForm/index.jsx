import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { formatSelectList } from '@/utils';
import { getRelatived } from '@/services/client';
import { getSearchList } from '@/services/user';

const SignRecordSearchForm = props => {
  const { data: clientList } = useHttp(() => getRelatived(), {});
  const { data: userList } = useHttp(getSearchList, {
    format: res => formatSelectList(res, 'nickname'),
  });

  const config = [
    {
      formType: 'Search',
      selectData: clientList,
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
    },
    {
      formType: 'Search',
      selectData: userList,
      itemProps: {
        label: '用户',
        name: 'user_id',
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

export default SignRecordSearchForm;
