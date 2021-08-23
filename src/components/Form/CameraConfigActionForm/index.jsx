import React, { useState } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getSearchList } from '@/services/user';
import { formatSelectList } from '@/utils';

export const CameraConfigUserForm = props => {
  console.log(' CameraConfigUserForm ： ', props);
  const { data: userList, req: getUserListAsync } = useHttp(getSearchList, {
    format: res => formatSelectList(res, 'nickname'),
  });

  const config = [
    {
      formType: 'Search',
      selectData: userList,
      itemProps: {
        label: '选择电工',
        name: 'user_id',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return <SmartForm config={config} size={'small'} {...props}></SmartForm>;
};
